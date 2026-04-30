import sys

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\index.css'
with open(file_path, 'r', encoding='utf-8') as f:
    css = f.read()

landing_css = """
/* Landing Page Styles */
.landing-page { background: var(--bg-surface); min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }
.landing-page .global-header { background: rgba(2, 44, 27, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.05); }

.hero-section { padding: 180px 2rem 100px; max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center; }
.hero-title { font-size: 5.5rem; font-weight: 800; line-height: 1.05; letter-spacing: -0.04em; margin-bottom: 1.5rem; color: var(--text-dark); }
.hero-subtitle { font-size: 1.25rem; color: var(--text-dark-muted); line-height: 1.6; margin-bottom: 2.5rem; max-width: 540px; }
.hero-actions { display: flex; gap: 1rem; }

.hero-visual { position: relative; height: 500px; display: flex; align-items: center; justify-content: center; }
.hero-visual::before { content: ''; position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%); z-index: 0; }
.floating-card { position: absolute; background: white; padding: 2rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-float); border: 1px solid var(--border-light); z-index: 2; animation: float 6s ease-in-out infinite; }
.card-1 { top: 10%; right: 5%; width: 280px; animation-delay: 0s; }
.card-2 { bottom: 15%; left: 0; width: 320px; animation-delay: -3s; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

.trusted-section { border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); padding: 4rem 2rem; text-align: center; background: var(--bg-light); }
.trusted-section p { font-size: 0.8rem; font-weight: 700; color: var(--text-dark-muted); letter-spacing: 0.1em; margin-bottom: 2rem; }
.logo-strip { display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; opacity: 0.6; filter: grayscale(100%); }
.mock-logo { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; }

.features-section { padding: 100px 2rem; max-width: 1280px; margin: 0 auto; }
.feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
.section-title { font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.03em; }
.section-desc { font-size: 1.2rem; color: var(--text-dark-muted); margin-bottom: 3rem; line-height: 1.6; }
.feature-item { display: flex; gap: 1.25rem; margin-bottom: 2rem; }
.f-icon { width: 48px; height: 48px; background: var(--taxwire-light-green); color: var(--taxwire-accent); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.feature-item h4 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem; }
.feature-item p { color: var(--text-dark-muted); font-size: 1rem; line-height: 1.5; }

.feature-image { background: var(--bg-light); border-radius: var(--radius-xl); padding: 2rem; border: 1px solid var(--border-light); }
.mock-dashboard { background: white; height: 400px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); overflow: hidden; display: flex; flex-direction: column; }
.mock-header { height: 40px; background: var(--taxwire-dark); }
.mock-body { display: flex; flex: 1; }
.mock-sidebar { width: 60px; background: var(--bg-light); border-right: 1px solid var(--border-light); }
.mock-content { flex: 1; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.mock-row { height: 60px; background: var(--bg-light); border-radius: var(--radius-sm); }
.mock-row.half { width: 60%; }

.landing-page .global-footer { background: var(--bg-light); padding: 3rem 2rem; border-top: 1px solid var(--border-light); }
.footer-content { max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.footer-links { display: flex; gap: 2rem; color: var(--text-dark-muted); font-weight: 600; font-size: 0.9rem; }
"""

if "/* Landing Page Styles */" not in css:
    with open(file_path, 'a', encoding='utf-8') as f:
        f.write("\n" + landing_css)
    print("Landing CSS added.")
