import sys
import re

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove glow divs
content = re.sub(r'\s*<div className="glow glow-1"></div>', '', content)
content = re.sub(r'\s*<div className="glow glow-2"></div>', '', content)

# Remove animate-up and stagger styles
content = content.replace(' animate-up', '')
content = content.replace('animate-up ', '')
content = content.replace('animate-up', '')
content = re.sub(r',\s*\'--stagger\':\s*\d+', '', content)
content = re.sub(r'style={{\s*\'--stagger\':\s*\d+\s*}}', '', content)
content = re.sub(r'\s*style={{}}', '', content)

# Modify Auth Brand text
content = content.replace('Regulatory<br /><span className="text-gradient">Intelligence,</span><br />Automated<span className="cursor-blink">|</span>', 'Global regulatory compliance<br />solved.<br /><span style={{ fontSize: \'1.25rem\', color: \'#E2F2EB\', fontWeight: 400, marginTop: \'1rem\', display: \'block\' }}>Automate global compliance, saving teams time and money.</span>')
content = content.replace('Join the<br /><span className="text-gradient">Platform</span>', 'Join the<br />Platform')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('App.jsx further cleaned.')
