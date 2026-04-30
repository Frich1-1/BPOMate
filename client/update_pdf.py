import sys

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace PDF generation colors
content = content.replace('setTextColor(124, 58, 237)', 'setTextColor(6, 64, 43)')
content = content.replace('setFillColor(124, 58, 237)', 'setFillColor(6, 64, 43)')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('App.jsx PDF colors updated.')
