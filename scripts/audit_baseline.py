import json
import glob
import os

with open('package.json', 'r', encoding='utf-8') as f:
    pkg = json.load(f)

with open('src/data/canonicalPages.json', 'r', encoding='utf-8') as f:
    canonical_pages = json.load(f)

admin_routes = []
for root, dirs, files in os.walk('src/app/admin'):
    for file in files:
        if file in ('page.tsx', 'page.jsx', 'page.js'):
            rel_dir = os.path.relpath(root, 'src/app/admin').replace('\\', '/')
            admin_routes.append('/admin' if rel_dir == '.' else f'/admin/{rel_dir}')

api_routes = []
for root, dirs, files in os.walk('src/app/api'):
    for file in files:
        if file in ('route.ts', 'route.js'):
            rel_dir = os.path.relpath(root, 'src/app/api').replace('\\', '/')
            api_routes.append(f'/api/{rel_dir}')

templates = set()
for p in canonical_pages.values():
    templates.add(p.get('template', 'InstitutionalTemplate'))

components = glob.glob('src/components/**/*.tsx', recursive=True)

print("=== INDEPENDENT REPOSITORY BASELINE ===")
print(f"Node Dependencies: {len(pkg.get('dependencies', {}))} dependencies, {len(pkg.get('devDependencies', {}))} devDependencies")
print(f"Next.js Version: {pkg.get('dependencies', {}).get('next')}")
print(f"React Version: {pkg.get('dependencies', {}).get('react')}")
print(f"Total Canonical Pages: {len(canonical_pages)}")
print(f"Total Admin CMS Screens: {len(admin_routes)}")
print(f"Admin Screens List: {sorted(admin_routes)}")
print(f"Total API Routes: {len(api_routes)}")
print(f"API Routes List: {sorted(api_routes)}")
print(f"Unique Page Templates: {len(templates)} -> {sorted(list(templates))}")
print(f"Total React Components: {len(components)}")
