import os
import glob
import re

admin_files = glob.glob('src/app/admin/**/*.tsx', recursive=True)

report = []

for f in admin_files:
    rel = os.path.relpath(f, 'src/app/admin').replace('\\', '/')
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    has_prototype_banner = 'Prototype' in content or 'prototype' in content or 'Demo' in content or 'Mock' in content
    has_modal = 'isModalOpen' in content or 'Modal' in content or 'modal' in content
    has_crud = any(op in content for op in ['handleAdd', 'handleCreate', 'handleDelete', 'handleEdit', 'handleSave', 'handleUpdate'])
    has_search = 'search' in content.lower()
    has_filter = 'filter' in content.lower()
    
    report.append({
        'screen': f"/admin/{rel.replace('/page.tsx', '').replace('page.tsx', '')}".rstrip('/'),
        'file': f,
        'has_prototype_banner': has_prototype_banner,
        'has_modal': has_modal,
        'has_crud': has_crud,
        'has_search': has_search,
        'has_filter': has_filter
    })

print(f"{'Screen':<30} | {'Banner':<8} | {'Modal':<8} | {'CRUD':<8} | {'Search':<8} | {'Filter':<8}")
print("-" * 80)
for r in report:
    print(f"{r['screen']:<30} | {str(r['has_prototype_banner']):<8} | {str(r['has_modal']):<8} | {str(r['has_crud']):<8} | {str(r['has_search']):<8} | {str(r['has_filter']):<8}")

