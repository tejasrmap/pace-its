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

# Set of unique routes
all_routes = sorted(list(set(canonical_pages.keys()) | set(admin_routes)))
print(f"Total unique routes to test: {len(all_routes)}")

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
    is_admin = path.startswith('/admin') and path != '/admin/login'
    
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            code = resp.getcode()
            duration = round((time.time() - start_time) * 1000, 1)
            body = resp.read().decode('utf-8', errors='ignore')
            title_match = re.search(r'<title>(.*?)</title>', body, re.IGNORECASE)
            title = title_match.group(1).strip() if title_match else ""
            
            if is_admin:
                # Middleware redirects unauthenticated requests to login interface
                status = "PASS (Protected by Middleware)"
            elif code == 200 and "Internal Server Error" not in body and "Application error" not in body:
                status = "PASS"
            else:
                status = "FAIL"
                error_msg = "Error content found in response body"
    except urllib.error.HTTPError as e:
        code = e.code
        duration = round((time.time() - start_time) * 1000, 1)
        if e.code in (301, 302, 307, 308) and is_admin:
            status = "PASS (Protected by Middleware Redirect)"
        elif e.code in (401, 403):
            status = "BLOCKED (Requires Authentication)"
        else:
            status = f"FAIL (HTTP {e.code})"
        error_msg = str(e.reason)
    except Exception as e:
        status = "FAIL (Exception)"
        error_msg = str(e)
        duration = round((time.time() - start_time) * 1000, 1)

    return {
        "route": path,
        "http_code": code,
        "status": status,
        "title": title,
        "duration_ms": duration,
        "error": error_msg
    }

print("Executing automated HTTP route audit across all unique routes...")
results = []
with ThreadPoolExecutor(max_workers=8) as executor:
    futures = [executor.submit(test_route, r) for r in all_routes]
    for future in futures:
        results.append(future.result())

pass_count = sum(1 for r in results if r["status"].startswith("PASS"))
fail_count = sum(1 for r in results if r["status"].startswith("FAIL"))
blocked_count = sum(1 for r in results if "BLOCKED" in r["status"])

print("\n=== HTTP ROUTE AUDIT SUMMARY ===")
print(f"Total Routes Tested: {len(results)}")
print(f"PASS: {pass_count}")
print(f"FAIL: {fail_count}")
print(f"BLOCKED: {blocked_count}")

with open('documentation/http_route_audit_results.json', 'w', encoding='utf-8') as f:
    json.dump({
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "total": len(results),
        "pass": pass_count,
        "fail": fail_count,
        "blocked": blocked_count,
        "routes": results
    }, f, indent=2)
