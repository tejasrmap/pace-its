import glob
import json
import os
import re
from collections import defaultdict
from urllib.parse import urlparse

def get_canonical_path(url):
    p = urlparse(url).path
    clean = re.sub(r'^(/(public|index\.php))+', '', p)
    if not clean:
        clean = '/'
    return clean

def categorize_route(path):
    if path == '/':
        return 'Homepage', 'Home', 'HomepageTemplate'
    elif path.startswith('/about') or path in ['/pace-at-glance', '/vision-and-mission', '/affiliation-and-accreditation', '/awards-and-accolades', '/why-pace', '/newsletters', '/organization-chart']:
        return 'About Us', 'About', 'InstitutionalTemplate'
    elif path.startswith('/administration'):
        return 'Administration', 'Administration', 'AdminProfileTemplate'
    elif path.startswith('/admissions'):
        return 'Admissions', 'Admissions', 'AdmissionsTemplate'
    elif path.startswith('/academics/departments/polytechnic'):
        return 'Polytechnic', 'Academics - Diploma', 'PolytechnicTemplate'
    elif path.startswith('/academics/departments'):
        return 'Engineering & PG Departments', 'Academics - Departments', 'DepartmentTemplate'
    elif path.startswith('/academics') or path in ['/regulations', '/curriculum_syllabus']:
        return 'Academics', 'Academics', 'AcademicRegulationsTemplate'
    elif 'placement' in path or path in ['/skill-development', '/career-guidance-cell', '/tpo', '/trainings-and-placements']:
        return 'Training & Placements', 'Placements', 'PlacementTemplate'
    elif path.startswith('/committees/statutory'):
        return 'Statutory Committees', 'Committees', 'CommitteeDetailTemplate'
    elif path.startswith('/committees/non-statutory'):
        return 'Non-Statutory Committees', 'Committees', 'CommitteeDetailTemplate'
    elif path.startswith('/committees'):
        return 'Committees', 'Committees', 'CommitteeDirectoryTemplate'
    elif path.startswith('/research-and-development'):
        return 'Research & Development', 'Research', 'ResearchTemplate'
    elif path.startswith('/campus'):
        return 'Campus & Student Life', 'Campus', 'CampusFacilityTemplate'
    elif path.startswith('/display-events-gallery') or path.startswith('/display-gallery') or path in ['/college-events']:
        return 'Galleries & Events', 'Campus Life', 'GalleryEventTemplate'
    elif 'examination' in path or path.startswith('/0/') or path.startswith('/1/'):
        return 'Examinations & Results', 'Academics', 'ExaminationArchiveTemplate'
    elif path.startswith('/affiliation-and-accreditation'):
        return 'Accreditations & Disclosures', 'Institutional', 'AccreditationTemplate'
    elif 'graduation-day' in path:
        return 'Graduation Reports', 'Institutional', 'GraduationReportTemplate'
    elif path in ['/aicte-idea-lab', '/qic', '/iqac', '/privacypolicy', '/termsandconditions', '/contact-us', '/careers', '/isr', '/icsr', '/collaboration', '/elearning']:
        return 'Institutional & Compliance', 'Institutional', 'InstitutionalTemplate'
    else:
        return 'Other Institutional Pages', 'General', 'InstitutionalTemplate'

def main():
    os.makedirs('src/data', exist_ok=True)
    files = glob.glob('documentation/extracted_pages/*.json')
    canonical_pages = {}

    for f in files:
        with open(f, 'r', encoding='utf-8') as fp:
            d = json.load(fp)
            c_path = get_canonical_path(d.get('url', ''))
            if c_path not in canonical_pages or ('/public' in canonical_pages[c_path]['url'] or '/index.php' in canonical_pages[c_path]['url']):
                canonical_pages[c_path] = d

    processed_pages = {}
    for path, data in canonical_pages.items():
        sec, cat, tmpl = categorize_route(path)
        title = data.get('title', 'PACE ITS')
        if title.lower() == 'pace':
            title = path.strip('/').replace('-', ' ').replace('/', ' — ').title() or 'Homepage'

        processed_pages[path] = {
            'canonicalPath': path,
            'sourceUrl': data.get('url'),
            'title': title,
            'section': sec,
            'category': cat,
            'template': tmpl,
            'breadcrumbs': data.get('breadcrumbs', []),
            'headings': data.get('headings', {}),
            'tabs': data.get('tabs', []),
            'tables': data.get('tables', []),
            'documents': data.get('documents', []),
            'images': data.get('images', []),
            'forms': data.get('forms', []),
            'fullText': data.get('full_text', '')[:4000] # preserve rich text for search & display
        }

    with open('src/data/canonicalPages.json', 'w', encoding='utf-8') as f:
        json.dump(processed_pages, f, indent=2, ensure_ascii=False)

    print(f"Exported {len(processed_pages)} processed canonical pages to src/data/canonicalPages.json")

if __name__ == '__main__':
    main()

