import os
import sys
import re
import json
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin, urldefrag
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_DOMAIN = 'pace.ac.in'
BASE_URL = 'https://pace.ac.in/'

DOC_EXTENSIONS = ('.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.zip', '.rar', '.csv')
IMAGE_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico', '.bmp')
STATIC_IGNORE = ('.css', '.js', '.woff', '.woff2', '.ttf', '.eot')

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

def clean_url(url):
    url, _ = urldefrag(url)
    url = url.strip()
    p = urlparse(url)
    if not p.scheme:
        return None
    # normalize scheme and netloc
    scheme = 'https' if p.scheme in ('http', 'https') else p.scheme
    netloc = p.netloc.lower()
    path = p.path
    # remove double slashes
    path = re.sub(r'/{2,}', '/', path)
    # remove trailing slash unless it is root
    if path.endswith('/') and len(path) > 1:
        path = path[:-1]
    query = f'?{p.query}' if p.query else ''
    return f"{scheme}://{netloc}{path}{query}"

def is_internal(url):
    p = urlparse(url)
    netloc = p.netloc.lower()
    return netloc == 'pace.ac.in' or netloc == 'www.pace.ac.in'

def is_subdomain(url):
    p = urlparse(url)
    netloc = p.netloc.lower()
    return netloc.endswith('.pace.ac.in') and netloc not in ('pace.ac.in', 'www.pace.ac.in')

def get_file_ext(url):
    path = urlparse(url).path.lower()
    for ext in DOC_EXTENSIONS + IMAGE_EXTENSIONS + STATIC_IGNORE:
        if path.endswith(ext):
            return ext
    return None

class PaceCrawler:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(headers)
        self.visited = set()
        self.to_visit = set([BASE_URL])
        self.discovered_urls = set([BASE_URL])
        self.documents = set()
        self.images = set()
        self.external_links = set()
        self.subdomains = set()
        self.inaccessible = []
        self.pages_data = []

    def extract_page_data(self, url, html, status_code, response_headers):
        soup = BeautifulSoup(html, 'html.parser')
        
        # Remove script and style elements for clean text
        for s in soup(['script', 'style', 'noscript']):
            s.decompose()

        title = soup.title.string.strip() if soup.title and soup.title.string else 'PACE Institute of Technology & Sciences'
        
        # Breadcrumbs
        breadcrumbs = []
        bc_elements = soup.find_all(class_=lambda c: c and 'breadcrumb' in str(c).lower())
        for bc in bc_elements:
            for item in bc.find_all(['li', 'a', 'span']):
                txt = item.get_text(strip=True)
                if txt and txt not in breadcrumbs:
                    breadcrumbs.append(txt)

        # Headings
        headings = {
            'h1': [h.get_text(strip=True) for h in soup.find_all('h1') if h.get_text(strip=True)],
            'h2': [h.get_text(strip=True) for h in soup.find_all('h2') if h.get_text(strip=True)],
            'h3': [h.get_text(strip=True) for h in soup.find_all('h3') if h.get_text(strip=True)],
            'h4': [h.get_text(strip=True) for h in soup.find_all('h4') if h.get_text(strip=True)],
        }

        # Department / Custom Tabs
        tabs = []
        tab_navs = soup.find_all(class_=lambda c: c and any(k in str(c).lower() for k in ['nav-pills', 'nav-tabs', 'tab-list']))
        for tnav in tab_navs:
            for tab_item in tnav.find_all(['a', 'button', 'li']):
                t_txt = tab_item.get_text(strip=True)
                target_id = tab_item.get('href', '') or tab_item.get('data-bs-target', '') or tab_item.get('data-target', '')
                if t_txt and len(t_txt) < 50:
                    tabs.append({'name': t_txt, 'target': target_id})

        # Tab contents
        tab_panes = []
        for pane in soup.find_all(class_=lambda c: c and 'tab-pane' in str(c).lower()):
            pane_id = pane.get('id', '')
            pane_text = pane.get_text(separator=' ', strip=True)
            pane_docs = []
            for a in pane.find_all('a', href=True):
                h = urljoin(url, a['href'])
                if any(h.lower().endswith(ext) for ext in DOC_EXTENSIONS):
                    pane_docs.append({'title': a.get_text(strip=True), 'url': h})
            tab_panes.append({
                'id': pane_id,
                'text_sample': pane_text[:300] if pane_text else '',
                'documents': pane_docs
            })

        # Tables
        tables = []
        for tbl in soup.find_all('table'):
            tbl_data = {'headers': [], 'rows': []}
            headers_cells = tbl.find_all(['th'])
            if headers_cells:
                tbl_data['headers'] = [th.get_text(strip=True) for th in headers_cells]
            
            for tr in tbl.find_all('tr'):
                cells = [td.get_text(strip=True) for td in tr.find_all('td')]
                if cells:
                    tbl_data['rows'].append(cells)
            if tbl_data['rows'] or tbl_data['headers']:
                tables.append(tbl_data)

        # Images
        page_images = []
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src')
            if src:
                full_img_url = urljoin(url, src.strip())
                alt = img.get('alt', '').strip()
                page_images.append({'src': full_img_url, 'alt': alt})
                self.images.add(full_img_url)

        # Downloads / Documents
        page_docs = []
        for a in soup.find_all('a', href=True):
            h = urljoin(url, a['href'].strip())
            cl_h = clean_url(h)
            if not cl_h:
                continue
            ext = get_file_ext(cl_h)
            if ext in DOC_EXTENSIONS:
                doc_title = a.get_text(strip=True) or os.path.basename(urlparse(cl_h).path)
                page_docs.append({'title': doc_title, 'url': cl_h, 'extension': ext})
                self.documents.add((cl_h, doc_title))

        # Forms
        forms = []
        for f in soup.find_all('form'):
            f_action = urljoin(url, f.get('action', ''))
            f_method = f.get('method', 'GET').upper()
            inputs = []
            for inp in f.find_all(['input', 'select', 'textarea']):
                inputs.append({
                    'tag': inp.name,
                    'type': inp.get('type', 'text'),
                    'name': inp.get('name', ''),
                    'placeholder': inp.get('placeholder', '')
                })
            forms.append({'action': f_action, 'method': f_method, 'inputs': inputs})

        # Clean Main Content Text
        # Prefer main / container / article
        content_elem = soup.find(['main', 'article']) or soup.find(id=re.compile(r'content|main', re.I)) or soup.find(class_=re.compile(r'content|main|page-wrapper', re.I)) or soup.body
        body_text = content_elem.get_text(separator='\n', strip=True) if content_elem else soup.get_text(separator='\n', strip=True)
        # remove excessive newlines
        body_text = re.sub(r'\n{3,}', '\n\n', body_text)

        # Discovered Links
        internal_links = set()
        external_links = set()
        for a in soup.find_all('a', href=True):
            raw_href = a['href'].strip()
            if raw_href.startswith(('javascript:', 'mailto:', 'tel:', '#')):
                continue
            full_link = clean_url(urljoin(url, raw_href))
            if not full_link:
                continue
            
            ext = get_file_ext(full_link)
            if ext in DOC_EXTENSIONS:
                self.documents.add((full_link, a.get_text(strip=True)))
                continue
            if ext in IMAGE_EXTENSIONS:
                self.images.add(full_link)
                continue
            if ext in STATIC_IGNORE:
                continue

            if is_internal(full_link):
                internal_links.add(full_link)
            elif is_subdomain(full_link):
                self.subdomains.add(full_link)
            else:
                external_links.add(full_link)
                self.external_links.add(full_link)

        return {
            'url': url,
            'title': title,
            'status_code': status_code,
            'content_type': response_headers.get('content-type', ''),
            'breadcrumbs': breadcrumbs,
            'headings': headings,
            'tabs': tabs,
            'tab_panes_count': len(tab_panes),
            'tables_count': len(tables),
            'tables': tables,
            'images_count': len(page_images),
            'images': page_images[:50], # first 50 per page
            'documents_count': len(page_docs),
            'documents': page_docs,
            'forms_count': len(forms),
            'forms': forms,
            'internal_links_count': len(internal_links),
            'external_links_count': len(external_links),
            'text_length': len(body_text),
            'full_text': body_text
        }, internal_links

    def crawl_all(self, max_threads=6):
        print(f"Starting crawl from {BASE_URL}...")
        
        while self.to_visit:
            current_batch = list(self.to_visit)[:max_threads * 2]
            self.to_visit.difference_update(current_batch)

            def fetch(u):
                try:
                    res = self.session.get(u, timeout=15, allow_redirects=True)
                    return u, res, None
                except Exception as err:
                    return u, None, err

            with ThreadPoolExecutor(max_workers=max_threads) as executor:
                futures = [executor.submit(fetch, u) for u in current_batch if u not in self.visited]
                for future in as_completed(futures):
                    u, res, err = future.result()
                    self.visited.add(u)

                    if err:
                        print(f"[FAIL] {u} - {err}")
                        self.inaccessible.append({'url': u, 'reason': str(err)})
                        continue

                    final_url = clean_url(res.url) or u
                    self.visited.add(final_url)

                    if res.status_code != 200:
                        print(f"[{res.status_code}] {u}")
                        self.inaccessible.append({'url': u, 'status_code': res.status_code, 'reason': f'HTTP {res.status_code}'})
                        continue

                    c_type = res.headers.get('content-type', '').lower()
                    if 'text/html' not in c_type:
                        # Non-html asset
                        ext = get_file_ext(final_url)
                        if ext in DOC_EXTENSIONS:
                            self.documents.add((final_url, os.path.basename(final_url)))
                        elif ext in IMAGE_EXTENSIONS:
                            self.images.add(final_url)
                        continue

                    try:
                        page_info, found_internals = self.extract_page_data(final_url, res.text, res.status_code, res.headers)
                        self.pages_data.append(page_info)
                        print(f"[200 OK] ({len(self.pages_data)}) {final_url} | Headings: {sum(len(v) for v in page_info['headings'].values())} | Tables: {page_info['tables_count']} | Docs: {page_info['documents_count']}")
                        
                        # Save single page JSON
                        slug = re.sub(r'[^a-zA-Z0-9_\-]', '_', final_url.replace('https://pace.ac.in/', '').strip('/'))
                        if not slug:
                            slug = 'homepage'
                        with open(f"documentation/extracted_pages/{slug[:80]}.json", 'w', encoding='utf-8') as pf:
                            json.dump(page_info, pf, indent=2, ensure_ascii=False)

                        for link in found_internals:
                            self.discovered_urls.add(link)
                            if link not in self.visited:
                                self.to_visit.add(link)

                    except Exception as parse_err:
                        print(f"[PARSE ERROR] {final_url}: {parse_err}")
                        self.inaccessible.append({'url': final_url, 'reason': f"Parse error: {parse_err}"})

            print(f"--- Progress: Visited {len(self.visited)} | In queue: {len(self.to_visit)} | Pages Extracted: {len(self.pages_data)} | Discovered URLs: {len(self.discovered_urls)} | Docs: {len(self.documents)} ---")

        print("\n=== Crawl Complete ===")
        print(f"Total Pages Successfully Extracted: {len(self.pages_data)}")
        print(f"Total Discovered URLs: {len(self.discovered_urls)}")
        print(f"Total Documents (PDFs, Docs, etc.): {len(self.documents)}")
        print(f"Total Images/Assets Discovered: {len(self.images)}")
        print(f"Total External Links: {len(self.external_links)}")
        print(f"Total Subdomains: {len(self.subdomains)}")
        print(f"Total Inaccessible / Error URLs: {len(self.inaccessible)}")

    def save_all_data(self):
        # Save raw JSONs
        with open('documentation/raw_data/all_pages.json', 'w', encoding='utf-8') as f:
            json.dump(self.pages_data, f, indent=2, ensure_ascii=False)

        docs_list = [{'url': url, 'title': title} for (url, title) in sorted(self.documents)]
        with open('documentation/raw_data/all_documents.json', 'w', encoding='utf-8') as f:
            json.dump(docs_list, f, indent=2)

        with open('documentation/raw_data/all_images.json', 'w', encoding='utf-8') as f:
            json.dump(sorted(list(self.images)), f, indent=2)

        with open('documentation/raw_data/all_external_links.json', 'w', encoding='utf-8') as f:
            json.dump(sorted(list(self.external_links)), f, indent=2)

        with open('documentation/raw_data/all_subdomains.json', 'w', encoding='utf-8') as f:
            json.dump(sorted(list(self.subdomains)), f, indent=2)

        with open('documentation/raw_data/inaccessible_urls.json', 'w', encoding='utf-8') as f:
            json.dump(self.inaccessible, f, indent=2)

if __name__ == '__main__':
    crawler = PaceCrawler()
    crawler.crawl_all(max_threads=6)
    crawler.save_all_data()

