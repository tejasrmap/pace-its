with open('src/data/canonicalPages.json', 'r', encoding='utf-8') as f:
    text = f.read()

replacements = [
    (
        'https://pace.ac.in/public/assets/images/syllabus/ME_R23.pdf',
        'https://pace.ac.in/public/assets/images/syllabus/MECH_R23.pdf'
    ),
    (
        'https://pace.ac.in/public/assets/images/NBA_Accreditation_1st_2017.pdf',
        'https://pace.ac.in/public/assets/images/NBA%20ACCREDITATION%20FOR%20EEE,%20ECE,%20CSE%20FROM%202017%20TO%202020.pdf'
    ),
    (
        'https://pace.ac.in/SSR/SSR-2023-24.pdf',
        'https://pace.ac.in/public/assets/images/proffessional-bodies/National_Institutional_Ranking_Framework_2024.pdf'
    ),
    (
        'https://pace.ac.in/assets/images/SSR-DATA.pdf',
        'https://pace.ac.in/public/assets/images/Mandatory%20Disclosure%20PACEITS-KQ.pdf'
    )
]

for old_url, new_url in replacements:
    count = text.count(old_url)
    text = text.replace(old_url, new_url)
    print(f"Replaced {count} occurrences of {old_url} -> {new_url}")

with open('src/data/canonicalPages.json', 'w', encoding='utf-8') as f:
    f.write(text)

print("canonicalPages.json document links updated successfully.")
