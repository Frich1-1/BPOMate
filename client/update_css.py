import sys
import re

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\index.css'
with open(file_path, 'r', encoding='utf-8') as f:
    css = f.read()

new_css = """@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  /* Modern Taxwire Palette */
  --taxwire-dark: #022c1b;
  --taxwire-green: #06402B;
  --taxwire-green-hover: #085238;
  --taxwire-light-green: #E8F5EE;
  --taxwire-accent: #11BA70;
  --taxwire-accent-hover: #0E9B5D;

  --bg-dark: #06402B;
  --bg-light: #f8fafc;
  --bg-surface: #ffffff;
  --bg-elevated: #ffffff;

  --text-dark: #0f172a;
  --text-dark-muted: #64748b;
  --text-light: #ffffff;
  --text-light-muted: #94a3b8;

  --border-dark: rgba(255,255,255,0.1);
  --border-light: #e2e8f0;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --header-h: 76px;
  --shadow-sm: 0 2px 4px rgba(2, 44, 27, 0.04);
  --shadow-md: 0 8px 24px rgba(2, 44, 27, 0.08);
  --shadow-float: 0 20px 40px rgba(2, 44, 27, 0.12);
  
  --transition-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg-light);
  color: var(--text-dark);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Auth Screens */
.auth-screen { display: flex; min-height: 100vh; background: var(--bg-dark); }
.auth-brand-panel { flex: 1.2; display: flex; flex-direction: column; justify-content: center; padding: 80px; color: var(--text-light); background: linear-gradient(145deg, var(--taxwire-dark), var(--taxwire-green)); position: relative; overflow: hidden; }
.auth-brand-panel::after { content: ''; position: absolute; width: 800px; height: 800px; border-radius: 50%; background: radial-gradient(circle, rgba(17,186,112,0.15) 0%, transparent 60%); top: -200px; right: -200px; pointer-events: none; }
.auth-logo { font-size: 2rem; font-weight: 800; margin-bottom: 3rem; display: flex; align-items: center; gap: 0.75rem; position: relative; z-index: 1; }
.auth-logo-icon { width: 44px; height: 44px; background: var(--taxwire-accent); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(17,186,112,0.3); }
.auth-brand-headline { font-size: 4rem; font-weight: 800; line-height: 1.05; margin-bottom: 1.5rem; letter-spacing: -0.03em; position: relative; z-index: 1; }
.auth-brand-sub { font-size: 1.25rem; color: var(--text-light-muted); max-width: 480px; line-height: 1.6; position: relative; z-index: 1; }

.auth-form-panel { width: 520px; background: var(--bg-surface); padding: 60px; display: flex; align-items: center; justify-content: center; box-shadow: -20px 0 40px rgba(0,0,0,0.1); position: relative; z-index: 10; border-radius: 32px 0 0 32px; }
.auth-form-inner { width: 100%; max-width: 380px; }
.auth-form-title { font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-dark); letter-spacing: -0.02em; }
.auth-form-sub { color: var(--text-dark-muted); margin-bottom: 2.5rem; font-size: 1.05rem; }

/* Forms & Inputs */
.form-control { width: 100%; padding: 1rem 1.25rem; border: 1.5px solid var(--border-light); border-radius: var(--radius-md); font-family: inherit; font-size: 1rem; margin-bottom: 1.25rem; transition: all 0.3s var(--transition-smooth); background: var(--bg-light); color: var(--text-dark); }
.form-control:hover { border-color: #cbd5e1; }
.form-control:focus { outline: none; border-color: var(--taxwire-accent); box-shadow: 0 0 0 4px rgba(17, 186, 112, 0.15); background: var(--bg-surface); }
textarea.form-control { resize: vertical; min-height: 140px; }

/* Buttons */
.btn-primary { width: 100%; padding: 1rem 1.5rem; background: var(--taxwire-accent); color: white; border: none; border-radius: var(--radius-md); font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: all 0.3s var(--transition-bounce); display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 12px rgba(17, 186, 112, 0.3); }
.btn-primary:hover { background: var(--taxwire-accent-hover); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(17, 186, 112, 0.4); }
.btn-primary:active { transform: translateY(0); }

.btn-outline { padding: 0.75rem 1.25rem; background: transparent; color: var(--text-dark); border: 1.5px solid var(--border-light); border-radius: var(--radius-full); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.3s var(--transition-smooth); display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; }
.btn-outline:hover { background: var(--bg-light); border-color: var(--taxwire-dark); color: var(--taxwire-dark); transform: translateY(-1px); }

.btn-icon { width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: var(--radius-md); color: var(--text-dark-muted); cursor: pointer; transition: 0.2s; }
.btn-icon:hover { background: var(--taxwire-light-green); color: var(--taxwire-accent); }
.btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }

/* Role Cards */
.role-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2.5rem; }
.role-card { border: 2px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; cursor: pointer; transition: all 0.3s var(--transition-bounce); background: var(--bg-surface); }
.role-card:hover { border-color: #cbd5e1; transform: translateY(-3px); box-shadow: var(--shadow-sm); }
.role-card.selected { border-color: var(--taxwire-accent); background: var(--taxwire-light-green); transform: translateY(-3px); box-shadow: 0 8px 20px rgba(17, 186, 112, 0.15); }
.role-card-icon { font-size: 1.75rem; margin-bottom: 0.75rem; display: inline-block; transition: transform 0.3s var(--transition-bounce); }
.role-card.selected .role-card-icon { transform: scale(1.1); }
.role-card-name { font-weight: 700; margin-bottom: 0.25rem; font-size: 1.05rem; }
.role-card-desc { font-size: 0.8rem; color: var(--text-dark-muted); line-height: 1.4; }

/* Layout - Top Navigation Redesign */
.app-shell { display: flex; flex-direction: column; min-height: 100vh; background: var(--bg-light); }

.global-header { height: var(--header-h); background: var(--taxwire-dark); border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
.header-left { display: flex; align-items: center; gap: 3rem; }
.brand { display: flex; align-items: center; gap: 0.75rem; font-weight: 800; font-size: 1.25rem; color: var(--text-light); letter-spacing: -0.02em; }
.brand-icon { width: 36px; height: 36px; background: var(--taxwire-accent); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 12px rgba(17,186,112,0.4); }

.top-nav { display: flex; align-items: center; gap: 0.5rem; }
.nav-link { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.25rem; color: rgba(255,255,255,0.7); text-decoration: none; border-radius: var(--radius-full); font-weight: 600; font-size: 0.9rem; cursor: pointer; border: none; background: transparent; transition: all 0.3s var(--transition-smooth); }
.nav-link:hover { color: var(--text-light); background: rgba(255,255,255,0.1); }
.nav-link.active { color: var(--taxwire-dark); background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

.header-right { display: flex; align-items: center; gap: 1.5rem; }
.pulse-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1rem; background: rgba(17, 186, 112, 0.15); color: var(--taxwire-accent); border: 1px solid rgba(17, 186, 112, 0.3); border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--taxwire-accent); box-shadow: 0 0 10px var(--taxwire-accent); animation: pulse 2s infinite; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

.user-controls { display: flex; align-items: center; gap: 1rem; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 1.5rem; }
.user-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--taxwire-light-green); color: var(--taxwire-green); font-weight: 700; display: flex; align-items: center; justify-content: center; }
.btn-logout { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.5rem 1rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
.btn-logout:hover { background: rgba(255,255,255,0.1); border-color: white; }

.main-content { flex: 1; display: flex; flex-direction: column; width: 100%; max-width: 1400px; margin: 0 auto; padding: 3rem 2rem; animation: slideUp 0.5s var(--transition-bounce); }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* Dashboard Components */
.page-title-block { margin-bottom: 2.5rem; }
.page-title { font-size: 2.5rem; font-weight: 800; color: var(--text-dark); margin-bottom: 0.5rem; letter-spacing: -0.03em; }
.page-subtitle { color: var(--text-dark-muted); font-size: 1.1rem; max-width: 600px; }

.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
.stat-card { background: var(--bg-surface); padding: 1.75rem; border-radius: var(--radius-lg); border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); transition: all 0.3s var(--transition-bounce); cursor: default; }
.stat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--taxwire-accent); }
.stat-label { font-size: 0.8rem; color: var(--text-dark-muted); font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
.stat-value { font-size: 2.5rem; font-weight: 800; color: var(--taxwire-dark); line-height: 1; margin-bottom: 0.25rem; letter-spacing: -0.02em; }
.stat-sub { font-size: 0.875rem; color: var(--taxwire-accent); font-weight: 600; }

.dash-grid { display: grid; grid-template-columns: 460px 1fr; gap: 2rem; align-items: start; }
.card { background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); overflow: hidden; transition: box-shadow 0.3s; }
.card:hover { box-shadow: var(--shadow-md); }
.card-header { padding: 1.5rem 1.75rem; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); }
.card-title { font-weight: 700; font-size: 1.1rem; color: var(--text-dark); display: flex; align-items: center; gap: 0.5rem; }
.card-body { padding: 1.75rem; }

/* Interactive Chips */
.examples-title { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-dark-muted); margin: 1.5rem 0 0.75rem; letter-spacing: 0.05em; }
.chip-row { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.5rem; }
.chip { background: var(--bg-light); border: 1.5px solid var(--border-light); padding: 0.6rem 1.2rem; border-radius: var(--radius-full); font-size: 0.9rem; color: var(--text-dark); cursor: pointer; transition: all 0.2s var(--transition-smooth); font-weight: 600; }
.chip:hover { border-color: var(--taxwire-accent); color: var(--taxwire-dark); background: var(--taxwire-light-green); transform: scale(1.02); }
.chip:active { transform: scale(0.98); }

/* Placeholder */
.placeholder-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 2rem; text-align: center; min-height: 480px; }
.placeholder-icon { width: 72px; height: 72px; background: var(--taxwire-light-green); color: var(--taxwire-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; font-size: 2rem; box-shadow: 0 0 0 10px rgba(17,186,112,0.1); animation: bounce 3s infinite ease-in-out; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.placeholder-title { font-size: 1.5rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem; }
.placeholder-desc { font-size: 1rem; color: var(--text-dark-muted); max-width: 320px; line-height: 1.5; }

/* Results */
.result-shown { animation: slideInRight 0.5s var(--transition-bounce); }
@keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

.result-top { background: linear-gradient(135deg, var(--taxwire-dark), var(--taxwire-green)); color: white; padding: 2.5rem; display: flex; justify-content: space-between; align-items: center; }
.result-cat-block { display: flex; align-items: center; gap: 1.5rem; }
.cat-emoji-wrap { width: 64px; height: 64px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 0 8px 16px rgba(0,0,0,0.2); }
.result-cat-name { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
.conf-block { text-align: right; }
.conf-pct { font-size: 3.5rem; font-weight: 800; color: var(--taxwire-accent); line-height: 1; margin-bottom: 0.25rem; letter-spacing: -0.03em; }
.conf-label { font-size: 0.8rem; text-transform: uppercase; color: rgba(255,255,255,0.8); font-weight: 700; letter-spacing: 0.05em; }

.meta-row { display: grid; grid-template-columns: repeat(3, 1fr); background: var(--taxwire-dark); color: white; padding: 0 2.5rem 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
.meta-cell { padding: 1.5rem 0; border-right: 1px solid rgba(255,255,255,0.1); padding-right: 2rem; padding-left: 2rem; }
.meta-cell:first-child { padding-left: 0; }
.meta-cell:last-child { border-right: none; padding-right: 0; }
.meta-cell-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--taxwire-accent); margin-bottom: 0.5rem; letter-spacing: 0.05em; }
.meta-cell-val { font-size: 1.1rem; font-weight: 600; color: white; }

.result-actions-row { padding: 1.25rem 2.5rem; display: flex; gap: 1rem; border-bottom: 1px solid var(--border-light); background: var(--bg-light); }

/* Tables */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; text-align: left; }
th { background: var(--bg-light); color: var(--text-dark-muted); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 1rem 1.5rem; border-bottom: 2px solid var(--border-light); letter-spacing: 0.05em; }
td { padding: 1.25rem 1.5rem; font-size: 0.95rem; border-bottom: 1px solid var(--border-light); color: var(--text-dark); transition: background 0.2s; }
tr:hover td { background: var(--bg-light); }
tr:last-child td { border-bottom: none; }
.td-primary { font-weight: 600; color: var(--text-dark); }
.td-mono { font-family: monospace; color: var(--taxwire-green); font-size: 0.95rem; font-weight: 600; background: var(--taxwire-light-green); padding: 0.2rem 0.5rem; border-radius: 4px; }

.group-row td { background: var(--bg-light); color: var(--taxwire-dark); font-weight: 800; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.75rem 1.5rem; border-left: 4px solid var(--taxwire-accent); }

/* Badges */
.badge { display: inline-flex; align-items: center; padding: 0.35rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; white-space: nowrap; text-transform: uppercase; letter-spacing: 0.05em; }
.badge-green { background: #dcfce7; color: #166534; }
.badge-amber { background: #fef3c7; color: #92400e; }
.badge-red { background: #fee2e2; color: #991b1b; }
.badge-blue { background: #dbeafe; color: #1e40af; }
.badge-grey { background: var(--bg-light); color: var(--text-dark-muted); border: 1px solid var(--border-light); }

/* Database Grid */
.toolbar-row { display: flex; gap: 1rem; margin-bottom: 2rem; }
.search-box { position: relative; flex: 1; max-width: 480px; }
.search-box svg { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: var(--text-dark-muted); }
.search-box input { padding-left: 3rem; border-radius: var(--radius-full); }

.cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
.cat-card { background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 1.75rem; transition: all 0.3s var(--transition-bounce); cursor: pointer; display: flex; flex-direction: column; box-shadow: var(--shadow-sm); }
.cat-card:hover { border-color: var(--taxwire-accent); box-shadow: var(--shadow-float); transform: translateY(-6px); }
.cat-card-head { flex: 1; }
.cat-emoji { width: 56px; height: 56px; background: var(--taxwire-light-green); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; margin-bottom: 1.25rem; transition: transform 0.3s var(--transition-bounce); }
.cat-card:hover .cat-emoji { transform: scale(1.1) rotate(5deg); }
.cat-name { font-size: 1.25rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem; }
.cat-desc { font-size: 0.95rem; color: var(--text-dark-muted); line-height: 1.5; margin-bottom: 1.5rem; }
.cat-card-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid var(--border-light); font-size: 0.9rem; color: var(--text-dark-muted); font-weight: 600; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(2, 44, 27, 0.6); backdrop-filter: blur(8px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 2rem; opacity: 0; pointer-events: none; transition: 0.3s; }
.modal-overlay.show { opacity: 1; pointer-events: auto; }
.modal-box { background: var(--bg-surface); border-radius: var(--radius-xl); width: 100%; max-width: 860px; max-height: 85vh; display: flex; flex-direction: column; box-shadow: var(--shadow-float); transform: scale(0.95) translateY(20px); transition: all 0.4s var(--transition-bounce); }
.modal-overlay.show .modal-box { transform: scale(1) translateY(0); }
.modal-header { padding: 1.75rem 2rem; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; }
.modal-title { font-size: 1.5rem; font-weight: 800; display: flex; align-items: center; gap: 0.75rem; }
.modal-body { padding: 2rem; overflow-y: auto; }

/* Pipeline Animation */
.pipeline-wrap { padding: 2rem; display: none; }
.pipeline-wrap.show { display: block; }
.pipeline-header { font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: var(--text-dark-muted); margin-bottom: 1.5rem; letter-spacing: 0.05em; text-align: center; }
.step-row { display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem; border: 2px solid var(--border-light); border-radius: var(--radius-md); margin-bottom: 1rem; opacity: 0.5; transition: all 0.4s var(--transition-bounce); background: var(--bg-light); transform: scale(0.98); }
.step-row.active { opacity: 1; border-color: var(--taxwire-accent); background: var(--taxwire-light-green); transform: scale(1.02); box-shadow: 0 8px 24px rgba(17,186,112,0.15); }
.step-row.done { opacity: 1; border-color: var(--taxwire-green); background: var(--bg-surface); transform: scale(1); }
.step-num { width: 36px; height: 36px; background: var(--bg-light); border: 2px solid var(--border-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; color: var(--text-dark-muted); transition: all 0.3s; }
.step-row.active .step-num { background: var(--taxwire-accent); color: white; border-color: var(--taxwire-accent); box-shadow: 0 0 0 6px rgba(17,186,112,0.2); }
.step-row.done .step-num { background: var(--taxwire-green); color: white; border-color: var(--taxwire-green); }
.step-label { font-weight: 700; font-size: 1.05rem; }
.step-desc { font-size: 0.85rem; color: var(--text-dark-muted); }

/* Toasts */
#toast-wrap { position: fixed; bottom: 2rem; right: 2rem; z-index: 1000; display: flex; flex-direction: column; gap: 0.75rem; }
.toast { background: var(--taxwire-dark); color: white; padding: 1rem 1.5rem; border-radius: var(--radius-md); font-weight: 600; font-size: 0.95rem; box-shadow: var(--shadow-md); display: flex; align-items: center; gap: 0.75rem; animation: slideInUp 0.4s var(--transition-bounce); border-left: 4px solid var(--taxwire-accent); }
.toast.success { border-left-color: var(--taxwire-accent); }
.toast.error { border-left-color: #ef4444; }
.toast.info { border-left-color: #3b82f6; }
@keyframes slideInUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

/* Toggles */
.toggle-switch { position: relative; width: 48px; height: 26px; display: inline-block; }
.toggle-switch input { display: none; }
.toggle-track { position: absolute; inset: 0; background: var(--border-light); border-radius: var(--radius-full); cursor: pointer; transition: 0.3s var(--transition-bounce); }
.toggle-track::before { content: ''; position: absolute; width: 22px; height: 22px; border-radius: 50%; background: white; top: 2px; left: 2px; transition: 0.3s var(--transition-bounce); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.toggle-switch input:checked + .toggle-track { background: var(--taxwire-accent); }
.toggle-switch input:checked + .toggle-track::before { transform: translateX(22px); }
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_css)

print('CSS updated successfully.')
