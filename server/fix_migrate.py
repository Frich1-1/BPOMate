import sys
import re

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\server\scripts\migrate.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Instead of relying on string match, let's just rewrite the way data is loaded
new_loader = """
    const dataRaw = fs.readFileSync(dataPath, 'utf-8');
    const cleanedData = dataRaw.replace(/export\\s+default\\s+BPOM_DB;?/g, '');
    const extractDbCode = cleanedData + '\\nreturn BPOM_DB;';
    const BPOM_DB = new Function(extractDbCode)();
"""

content = re.sub(r'const dataRaw = fs\.readFileSync\(dataPath, \'utf-8\'\);[\s\S]*?const BPOM_DB = new Function\(extractDbCode\)\(\);', new_loader, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated migrate.js")
