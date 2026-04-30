import sys
import re

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

intro_screen_code = """
function IntroScreen({ setScreen }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 3500);
    const t3 = setTimeout(() => setStep(3), 5500);
    const t4 = setTimeout(() => setStep(4), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="intro-screen">
      <div className="intro-content">
        <div className={`intro-line ${step >= 1 ? 'visible' : ''}`}>
          <Shield size={32} color="var(--taxwire-accent)" style={{ marginBottom: '1rem' }} />
          <h1>What is BPOMate?</h1>
        </div>
        <div className={`intro-line ${step >= 2 ? 'visible' : ''}`}>
          <p>An intelligent regulatory compliance engine designed for the Indonesian F&B industry.</p>
        </div>
        <div className={`intro-line ${step >= 3 ? 'visible' : ''}`}>
          <p>Instantly map your product formulations against BPOM regulations and SNI parameters using NLP.</p>
        </div>
        <div className={`intro-line ${step >= 4 ? 'visible' : ''}`} style={{ marginTop: '3rem' }}>
          <button className="btn-primary intro-btn" onClick={() => setScreen('landing')}>
            Click Here to Start <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
"""

if "function IntroScreen" not in content:
    content = content.replace("function LandingPage({ setScreen }) {", intro_screen_code + "\nfunction LandingPage({ setScreen }) {")

# Change initial screen to 'intro'
content = content.replace("const [screen, setScreen] = useState('landing');", "const [screen, setScreen] = useState('intro');")

# Add intro to render logic
content = re.sub(r'(\{screen === \'landing\' && <LandingPage setScreen=\{setScreen\} />\})', r"{screen === 'intro' && <IntroScreen setScreen={setScreen} />}\n      \1", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("IntroScreen added to App.jsx.")
