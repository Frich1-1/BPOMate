import sys

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add LandingPage component
landing_page_code = """
function LandingPage({ setScreen }) {
  return (
    <div className="landing-page">
      <header className="global-header" style={{ position: 'fixed', width: '100%' }}>
        <div className="header-left">
          <div className="brand" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo(0,0)}>
            <div className="brand-icon"><Shield size={20} /></div>
            BPOMate
          </div>
          <nav className="top-nav" style={{ marginLeft: '2rem' }}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it Works</a>
            <a href="#database" className="nav-link">Database</a>
          </nav>
        </div>
        <div className="header-right">
          <button className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => setScreen('login')}>Log In</button>
          <button className="btn-primary" onClick={() => setScreen('login')}>Request Demo</button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="pulse-badge" style={{ marginBottom: '2rem', display: 'inline-flex', background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
              <div className="status-dot"></div>
              BPOM AI Engine v2.0 Live
            </div>
            <h1 className="hero-title">Global regulatory compliance <br/><span className="text-gradient">solved.</span></h1>
            <p className="hero-subtitle">Automate BPOM and SNI compliance mapping with our proprietary AI engine. Save your R&D and QA teams hundreds of hours reading through PDFs.</p>
            <div className="hero-actions">
              <button className="btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }} onClick={() => setScreen('login')}>Get Started <ArrowRight size={20}/></button>
              <button className="btn-outline" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', background: 'white' }}>View Documentation</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>CONFIDENCE MATCH</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--taxwire-accent)', lineHeight: 1 }}>98%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>SNI 3141.1:2011 (Dairy)</div>
            </div>
            <div className="floating-card card-2">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <CheckCircle size={24} color="var(--taxwire-accent)"/>
                <span style={{ fontWeight: 700 }}>Regulation Found</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dark-muted)' }}>PerKa BPOM No. 21/2016 verified against product specs.</div>
            </div>
          </div>
        </section>

        <section className="trusted-section">
          <p>TRUSTED BY INNOVATIVE FOOD & BEVERAGE BRANDS NATIONWIDE</p>
          <div className="logo-strip">
            <div className="mock-logo">Danone</div>
            <div className="mock-logo">Indofood</div>
            <div className="mock-logo">Nestlé</div>
            <div className="mock-logo">Unilever</div>
            <div className="mock-logo">Mayora</div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="feature-grid">
            <div className="feature-text">
              <h2 className="section-title">Stop manual searches. <br/>Start building.</h2>
              <p className="section-desc">BPOMate replaces outdated regulatory binders with a living, intelligent database. Just type your product description and let our AI map the exact SNI standards and BPOM regulations you need to comply with.</p>
              
              <div className="feature-list">
                <div className="feature-item">
                  <div className="f-icon"><Zap size={20}/></div>
                  <div>
                    <h4>Instant AI Mapping</h4>
                    <p>NLP engine matches your query to 60+ distinct regulatory categories.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="f-icon"><Database size={20}/></div>
                  <div>
                    <h4>Always Up-to-Date</h4>
                    <p>Powered by a live PostgreSQL database reflecting the latest BPOM rules.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="f-icon"><FileText size={20}/></div>
                  <div>
                    <h4>Automated Reporting</h4>
                    <p>Generate PDF parameter sheets instantly for your laboratory.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="feature-image">
              <div className="mock-dashboard">
                 <div className="mock-header"></div>
                 <div className="mock-body">
                    <div className="mock-sidebar"></div>
                    <div className="mock-content">
                       <div className="mock-row"></div>
                       <div className="mock-row half"></div>
                       <div className="mock-row"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="global-footer">
        <div className="footer-content">
          <div className="brand" style={{ color: 'var(--taxwire-dark)' }}>
             <Shield size={20} color="var(--taxwire-accent)"/> BPOMate
          </div>
          <div className="footer-links">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
"""

if "function LandingPage" not in content:
    content = content.replace("export default function App() {", landing_page_code + "\nexport default function App() {")

# 2. Update initial screen state
content = content.replace("const [screen, setScreen] = useState('login');", "const [screen, setScreen] = useState('landing');")

# 3. Add to render logic
app_return = """  return (
    <>
      <div id="toast-wrap"></div>
      {screen === 'landing' && <LandingPage setScreen={setScreen} />}
      {screen === 'login' && <AuthScreen setScreen={setScreen} setUser={setUser} />}
      {screen === 'app' && (
"""
content = content.replace("  return (\n    <>\n      <div id=\"toast-wrap\"></div>\n      {screen === 'login' ? (\n        <AuthScreen setScreen={setScreen} setUser={setUser} />\n      ) : (", app_return)
content = content.replace("        <AuthScreen setScreen={setScreen} setUser={setUser} />\n      ) : (", "")

# Fix the closing brace for screen === 'app'
end_replace = """      )}
    </>
  );"""
# We need to replace the last `      )}\n    </>\n  );` to close screen === 'app' properly.
content = content.replace("      )}\n    </>\n  );", end_replace)

# Replace the specific block safely
import re
content = re.sub(r'\{screen === \'login\' \? \(\s*<AuthScreen[^\>]+>\s*\) : \(', r"{screen === 'landing' && <LandingPage setScreen={setScreen} />}\n      {screen === 'login' && <AuthScreen setScreen={setScreen} setUser={setUser} />}\n      {screen === 'app' && (", content)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("LandingPage added to App.jsx.")
