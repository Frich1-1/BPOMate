import sys
import re

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to replace the layout from `<aside className="sidebar">...` and `<main className="main-content">` to a top nav layout.
# Let's find the `app-shell` and replace the inner content.

start_idx = content.find('<div className="app-shell" id="app-shell">')
if start_idx != -1:
    end_idx = content.rfind('</main>') + len('</main>')
    
    if end_idx != -1:
        new_layout = """<div className="app-shell" id="app-shell">
        <header className="global-header">
          <div className="header-left">
            <div className="brand">
              <div className="brand-icon"><Shield size={20} /></div>
              BPOMate
            </div>
            <nav className="top-nav">
              <button className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePage('dashboard')}>Dashboard</button>
              <button className={`nav-link ${activePage === 'history' ? 'active' : ''}`} onClick={() => setActivePage('history')}>Audit Log</button>
              <button className={`nav-link ${activePage === 'database' ? 'active' : ''}`} onClick={() => setActivePage('database')}>Regulatory DB</button>
              {user?.role === 'admin' && (
                <button className={`nav-link ${activePage === 'admin' ? 'active' : ''}`} onClick={() => setActivePage('admin')}>Admin</button>
              )}
            </nav>
          </div>
          
          <div className="header-right">
            <div className="status-pill pulse-badge">
              <div className="status-dot"></div>
              System Online
            </div>
            <div className="user-controls">
              <div className="user-avatar" title={user?.name}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button className="btn-logout" onClick={() => setScreen('login')}>Sign out</button>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="page-body">
            {loadingDb ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', flexDirection: 'column', gap: '16px', color: 'var(--text-dark-muted)' }}>
                <Loader2 className="spinner" size={40} />
                <p style={{ fontWeight: 600 }}>Loading PostgreSQL database...</p>
              </div>
            ) : (
              <div className="page active">
                {activePage === 'dashboard' && <DashboardPage user={user} toast={toast} db={dbData} />}
                {activePage === 'history' && <HistoryPage />}
                {activePage === 'database' && <DatabasePage db={dbData} />}
                {activePage === 'admin' && <AdminPage toast={toast} db={dbData} onToggleCategory={handleToggleCategory} />}
              </div>
            )}
          </div>
        </main>"""
        
        content = content[:start_idx] + new_layout + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('App.jsx layout updated successfully.')
