import sys

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\index.css'
with open(file_path, 'r', encoding='utf-8') as f:
    css = f.read()

intro_css = """
/* Intro Screen Styles */
.intro-screen { background: var(--bg-surface); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; color: white; padding: 2rem; text-align: center; }
.intro-content { max-width: 800px; }
.intro-line { opacity: 0; transform: translateY(20px); transition: all 1s ease; margin-bottom: 1.5rem; display: none; }
.intro-line.visible { opacity: 1; transform: translateY(0); display: block; animation: fadeInUp 0.8s ease forwards; }
.intro-line h1 { font-size: 3rem; font-weight: 800; letter-spacing: -0.03em; margin: 0; color: white; }
.intro-line p { font-size: 1.25rem; color: var(--text-dark-muted); line-height: 1.6; margin: 0; }
.intro-btn { font-size: 1.2rem; padding: 1rem 2rem; display: inline-flex; align-items: center; gap: 0.75rem; animation: pulseGlow 2s infinite; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseGlow {
  0% { box-shadow: 0 0 0 0 rgba(17, 186, 112, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(17, 186, 112, 0); }
  100% { box-shadow: 0 0 0 0 rgba(17, 186, 112, 0); }
}
"""

if "/* Intro Screen Styles */" not in css:
    with open(file_path, 'a', encoding='utf-8') as f:
        f.write("\n" + intro_css)
    print("Intro CSS added.")
