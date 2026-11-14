import os

api_dir = 'src/app/api'
modified = []
for root, dirs, files in os.walk(api_dir):
    for f in files:
        if f.endswith('.ts') or f.endswith('.js'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fh:
                content = fh.read()
            if 'force-dynamic' not in content:
                lines = content.splitlines()
                insert_idx = 0
                for i, line in enumerate(lines):
                    if line.startswith('import '):
                        insert_idx = i + 1
                lines.insert(insert_idx, "\nexport const dynamic = 'force-dynamic';")
                with open(path, 'w', encoding='utf-8') as fh:
                    fh.write('\n'.join(lines) + '\n')
                modified.append(path)

print(f'Modified API routes count: {len(modified)}')
for m in modified:
    print(f'  {m}')
