import sys
import re

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update LandingPage Brand
landing_brand_old = r'<div className="brand" style={{ cursor: \'pointer\' }} onClick=\{\(\) => window\.scrollTo\(0,0\)\}>\s*<div className="brand-icon"><Shield size=\{20\} /></div>\s*BPOMate\s*</div>'
landing_brand_new = """<div className="brand" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }} onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="BPOMate Logo" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 12px rgba(17,186,112,0.4)' }} />
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'white' }}>BPOMate</span>
          </div>"""
content = re.sub(landing_brand_old, landing_brand_new, content)

# 2. Update Auth Screen Brand
auth_brand_old = r'<div className="auth-logo">\s*<div className="auth-logo-icon"><Shield size=\{24\} color="white" /></div>\s*BPOMate\s*</div>'
auth_brand_new = """<div className="auth-logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/logo.png" alt="BPOMate Logo" style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 8px 24px rgba(17,186,112,0.4)', background: 'white' }} />
            <span style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'white' }}>BPOMate</span>
          </div>"""
content = re.sub(auth_brand_old, auth_brand_new, content)

# 3. Update App Shell Brand
app_brand_old = r'<div className="brand">\s*<div className="brand-icon"><Shield size=\{20\} /></div>\s*BPOMate\s*</div>'
app_brand_new = """<div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src="/logo.png" alt="BPOMate Logo" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 12px rgba(17,186,112,0.4)' }} />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'white' }}>BPOMate</span>
            </div>"""
content = re.sub(app_brand_old, app_brand_new, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("App.jsx logos updated.")
