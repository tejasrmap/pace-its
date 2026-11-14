import json
import urllib.request
import urllib.error
import re
import time
from concurrent.futures import ThreadPoolExecutor

with open('src/data/canonicalPages.json', 'r', encoding='utf-8') as f:
    canonical_pages = json.load(f)

admin_routes = [
    '/admin', '/admin/admissions', '/admin/audit-logs', '/admin/courses',
    '/admin/departments', '/admin/documents', '/admin/faculty', '/admin/gallery',
    '/admin/login', '/admin/news', '/admin/pages', '/admin/placements',
    '/admin/research', '/admin/settings', '/admin/users'
]

routes_to_test = ['/'] + list(canonical_pages.keys()) + admin_routes
print(f"Total routes to test: {len(routes_to_test)}")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PACE-ITS-QA-Tester/1.0'
}

def test_route(path):
    url = f"http://localhost:3005{path}"
    start_time = time.time()
    req = urllib.request.Request(url, headers=headers)
    status = "NOT TESTED"
    code = None
    title = ""
    error_msg = ""
    duration = 0
    
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            code = resp.getcode()
            duration = round((time.time() - start_time) * 1000, 1)
            body = resp.read().decode('utf-8', errors='ignore')
            title_match = re.search(r'<title>(.*?)</title>', body, re.IGNORECASE)
            title = title_match.group(1).strip() if title_match else ""
            
            # Check for error indicators in body
            if code == 200 and "Internal Server Error" not in body and "Application error" not in body:
                status = "PASS"
            else:
                status = "FAIL"
                error_msg = "Error content found in response body"
    except urllib.error.HTTPError as e:
        code = e.code
        duration = round((time.time() - start_time) * 1000, 1)
        if e.code in (401, 403):
            status = "BLOCKED (Requires Authentication)"
        else:
            status = f"FAIL (HTTP {e.code})"
        error_msg = str(e.reason)
    except Exception as e:
        status = "FAIL (Exception)"
        error_msg = str(e)
        duration = round((time.time() - start_time) * 1000, 1)
        
    return {
        'route': path,
        'status': status,
        'http_code': code,
        'title': title,
        'duration_ms': duration,
        'error': error_msg
    }

print("Executing automated test across all routes...", flush=True)

with ThreadPoolExecutor(max_workers=8) as executor:
    results = list(executor.map(test_route, routes_to_test))

pass_count = sum(1 for r in results if r['status'] == 'PASS')
fail_count = sum(1 for r in results if 'FAIL' in r['status'])
blocked_count = sum(1 for r in results if 'BLOCKED' in r['status'])

print(f"\n=== TEST EXECUTION SUMMARY ===")
print(f"Total Routes Tested: {len(results)}")
print(f"PASS: {pass_count}")
print(f"FAIL: {fail_count}")
print(f"BLOCKED: {blocked_count}")

with open('documentation/route_test_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

if fail_count > 0:
    print("\nFailed routes:")
    for r in results:
        if 'FAIL' in r['status']:
            print(f"  [{r['http_code']}] {r['route']} -> {r['error']}")
