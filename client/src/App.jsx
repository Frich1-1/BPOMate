import { useState, useEffect, useRef } from 'react';
import { Settings, Shield, Server, ArrowRight, User, Zap, Database, Clock, LayoutDashboard } from 'lucide-react';
import BPOM_DB from './regulations.js';

// ─── BPOM_DB is imported directly as an ES module ───────────

// ─── NLP Engine ────────────────────────────────────────────
class NLPEngine {
  constructor(db) { this.db = db; }
  classify(rawText) {
    if (!rawText || rawText.trim().length < 5) return null;
    const text = rawText.toLowerCase().replace(/[^a-z0-9\s\-\/]/g, ' ').replace(/\s+/g, ' ').trim();
    const scores = {};
    for (const cat of this.db.categories) {
      if (!cat.active) continue;
      let score = 0;
      for (const kw of (cat.keywords.high || [])) { if (text.includes(kw)) score += 10; }
      for (const kw of (cat.keywords.medium || [])) { if (text.includes(kw)) score += 5; }
      for (const kw of (cat.keywords.low || [])) { if (text.includes(kw)) score += 2; }
      scores[cat.id] = score;
    }
    const ranked = Object.entries(scores).sort(([, a], [, b]) => b - a).filter(([, s]) => s > 0);
    if (!ranked.length) return null;
    const [[topId, topScore], [, secondScore] = [null, 0]] = ranked;
    const conf = this._confidence(topScore, secondScore);
    const level = conf >= 82 ? 'high' : conf >= 58 ? 'medium' : 'low';
    const validMatches = ranked.filter(([, score]) => score >= topScore * 0.75);
    let topCategory;
    if (validMatches.length > 1) {
      const firstCat = this.db.categories.find(c => c.id === validMatches[0][0]);
      let compositeParams = [], compositeRegs = [], names = [];
      validMatches.forEach(([id]) => {
        const cat = this.db.categories.find(c => c.id === id);
        names.push(cat.name);
        cat.regulations.forEach(r => { if (!compositeRegs.find(x => x.code === r.code)) compositeRegs.push(r); });
        cat.parameters.forEach(p => { if (!compositeParams.find(x => x.name === p.name)) compositeParams.push(p); });
      });
      topCategory = {
        id: validMatches.map(([id]) => id).join('_'),
        name: names.join(' + '),
        description: 'Composite classification spanning multiple BPOM regulatory categories.',
        icon: firstCat.icon, color: firstCat.color, colorLight: firstCat.colorLight,
        active: true, keywords: {}, regulations: compositeRegs, parameters: compositeParams
      };
    } else {
      topCategory = this.db.categories.find(c => c.id === topId);
    }
    return {
      topCategory, confidence: conf, level,
      alternatives: ranked.slice(validMatches.length, validMatches.length + 3)
        .map(([id]) => this.db.categories.find(c => c.id === id)).filter(Boolean)
    };
  }
  _confidence(top, second) {
    if (!top) return 0;
    const base = Math.min(top * 3.8, 100);
    const margin = second > 0 ? (top - second) / top : 1;
    return Math.min(Math.round(base * (0.6 + 0.4 * margin)), 99);
  }
}

// ─── Helpers ───────────────────────────────────────────────
const CATEGORY_EMOJI = {
  confectionery: '🍫', dairy: '🥛', beverages: '🧃', snack_foods: '🍿',
  processed_meat: '🍖', instant_noodles: '🍜', sauces_condiments: '🫙',
  supplements: '💊', infant_formula: '🍼', cooking_oils: '🫒',
  seafood: '🦐', spices_seasonings: '🌶️', canned_foods: '🥫',
  frozen_foods: '🧊', fermented_foods: '🫘', cereal_grains: '🌾',
  ready_to_eat: '🥡', traditional_snacks: '🍢'
};
const catEmoji = (id) => {
  const base = id.split('_').slice(0, 2).join('_');
  return CATEGORY_EMOJI[id] || CATEGORY_EMOJI[base] || '🧪';
};
const fmtDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
const ago = (n, unit) => {
  const ms = unit === 'd' ? 86400000 : 3600000;
  return new Date(Date.now() - n * ms).toISOString();
};

// ─── History (localStorage) ────────────────────────────────
const History = {
  KEY: 'bpomate_history',
  save(entry) {
    const all = this.getAll(); all.unshift(entry);
    try { localStorage.setItem(this.KEY, JSON.stringify(all.slice(0, 300))); } catch { }
  },
  getAll() { try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch { return []; } },
  clear() { localStorage.removeItem(this.KEY); },
  seed() {
    if (this.getAll().length) return;
    const entries = [
      { id: 'h1', ts: ago(3, 'd'), query: 'Chocolate biscuit with vanilla cream filling, baked, 200g', categoryId: 'confectionery', categoryName: 'Confectionery & Bakery Products', confidence: 94, level: 'high', paramCount: 19, status: 'validated', user: 'Budi Santoso' },
      { id: 'h2', ts: ago(2, 'd'), query: 'Fresh orange and mango juice blend, no preservatives, bottled 250ml', categoryId: 'beverages', categoryName: 'Non-Alcoholic Beverages', confidence: 91, level: 'high', paramCount: 17, status: 'validated', user: 'Admin BPOMate' },
      { id: 'h3', ts: ago(1, 'd'), query: 'Vitamin C supplement capsule 500mg with zinc, for adults, 30 capsules', categoryId: 'supplements', categoryName: 'Dietary & Food Supplements', confidence: 87, level: 'high', paramCount: 17, status: 'pending', user: 'Budi Santoso' },
    ];
    try { localStorage.setItem(this.KEY, JSON.stringify(entries)); } catch { }
  }
};

const EXAMPLES = [
  { label: '🍫 Chocolate Biscuit', text: 'Chocolate biscuit with vanilla cream filling, baked, 200g per box' },
  { label: '🧃 Orange Juice', text: 'Fresh orange and mango juice blend, no preservatives, 250ml' },
  { label: '💊 Vit C Capsule', text: 'Vitamin C supplement 500mg with zinc, for adults, 30 capsules' },
  { label: '🍜 Instant Noodles', text: 'Instant fried noodles with chicken flavor seasoning, 85g' },
];

// ─── Toast ─────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type = 'info') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  };
  return { toasts, show };
}

function ToastWrap({ toasts }) {
  return (
    <div id="toast-wrap" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`} style={{ animation: 'fadeUp 0.3s ease' }}>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Modal ─────────────────────────────────────────────────
function Modal({ cat, onClose }) {
  if (!cat) return null;
  return (
    <div className="modal-overlay show" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-title">{catEmoji(cat.id)}&nbsp;&nbsp;{cat.name}</div>
          <button className="btn-icon" onClick={onClose}>✖</button>
        </div>
        <div className="modal-body">
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.6' }}>{cat.description}</p>
          <div style={{ fontWeight: 700, marginBottom: '12px', fontSize: '0.9rem' }}>Test Parameters ({cat.parameters.length})</div>
          <div className="table-wrap" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <table>
              <thead><tr><th>Parameter</th><th>Limit</th><th>Type</th></tr></thead>
              <tbody>
                {cat.parameters.map((p, i) => (
                  <tr key={i}>
                    <td className="td-primary">{p.name}</td>
                    <td className="td-mono">{p.limit} <span style={{ color: 'var(--text-muted)' }}>{p.unit}</span></td>
                    <td><span className={`badge ${p.type === 'mandatory' ? 'badge-green' : 'badge-amber'}`}>{p.type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Page ────────────────────────────────────────
function DashboardPage({ user, toast }) {
  const db = BPOM_DB;
  const nlp = db ? new NLPEngine(db) : null;
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [pipeStep, setPipeStep] = useState(0); // 0=hidden, 1-4=active step
  const hist = History.getAll();

  const stats = [
    { l: 'My Queries', v: hist.filter(h => h.user === user?.name).length || 0, s: 'Total run by you' },
    { l: 'System Validated', v: hist.filter(h => h.status === 'validated').length, s: 'By experts' },
    { l: 'Active Categories', v: db ? db.categories.filter(c => c.active).length : 0, s: 'BPOM groups' },
    { l: 'Mapped Parameters', v: db ? db.categories.reduce((a, c) => a + c.parameters.length, 0) : 0, s: 'Across DB' },
  ];

  const runAnalysis = async () => {
    if (!nlp) { toast('Database not loaded', 'error'); return; }
    if (query.trim().length < 8) { toast('Please enter a longer product description.', 'error'); return; }
    setAnalyzing(true); setResult(null);
    for (let i = 1; i <= 4; i++) {
      setPipeStep(i);
      await new Promise(r => setTimeout(r, 420));
    }
    const res = nlp.classify(query);
    setPipeStep(0); setAnalyzing(false);
    if (!res) { toast('No BPOM category match found. Try refining the description.', 'error'); return; }
    const entry = {
      id: 'q' + Date.now(), ts: new Date().toISOString(), query,
      categoryId: res.topCategory.id, categoryName: res.topCategory.name,
      confidence: res.confidence, level: res.level,
      paramCount: res.topCategory.parameters.length, status: 'pending', user: user?.name || 'Automated'
    };
    History.save(entry);
    setResult({ query, result: res, ts: entry.ts, id: entry.id });
    toast(`Mapped to "${res.topCategory.name}"`, 'success');
  };

  const copyParams = () => {
    if (!result) return;
    const lines = result.result.topCategory.parameters.map((p, i) => `${i + 1}. ${p.name} | ${p.limit} ${p.unit} | ${p.type}`);
    navigator.clipboard.writeText(lines.join('\n'))
      .then(() => toast('Copied to clipboard', 'success'))
      .catch(() => toast('Copy failed', 'error'));
  };

  const pipeSteps = [
    { n: 1, label: 'NLP Parsing', desc: 'Tokenizing text features' },
    { n: 2, label: 'Category Matching', desc: 'Scoring across BPOM models' },
    { n: 3, label: 'Fetching DB', desc: 'Pulling regulatory standards' },
    { n: 4, label: 'Compilation', desc: 'Structuring final constraints' },
  ];

  return (
    <div>
      <div className="page-title-block animate-up" style={{ '--stagger': 1 }}>
        <h1 className="page-title">Analysis Dashboard</h1>
        <p className="page-subtitle">Submit a product description to the NLP engine for instant BPOM requirement matching.</p>
      </div>

      <div className="stats-row animate-up" style={{ '--stagger': 2 }}>
        {stats.map((st, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{st.l}</div>
            <div className="stat-value">{st.v}</div>
            <div className="stat-sub">{st.s}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid animate-up" style={{ '--stagger': 3 }}>
        {/* Input Panel */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Zap size={16} /> Product Input
            </div>
          </div>
          <div className="card-body">
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Describe the product type, ingredients, processing method, and packaging.
            </p>
            <div className="form-group" style={{ position: 'relative' }}>
              <textarea
                className="form-control query-field"
                placeholder="e.g. Chocolate milk biscuit with cream filling..."
                maxLength={800}
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <div className="char-count"><span>{query.length}</span> / 800</div>
            </div>
            <div className="examples-title">Quick Fill Samples</div>
            <div className="chip-row">
              {EXAMPLES.map((ex, i) => (
                <button key={i} className="chip" onClick={() => setQuery(ex.text)}>{ex.label}</button>
              ))}
            </div>
            <button className={`btn-primary analyze-btn${analyzing ? ' loading' : ''}`} onClick={runAnalysis} disabled={analyzing}>
              <span className="btn-text">Run AI Analysis</span>
              <div className="btn-spinner"></div>
              <svg className="btn-icon-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="card" style={{ minHeight: '500px' }}>
          {!analyzing && !result && (
            <div className="placeholder-state">
              <div className="placeholder-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" /><path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" /></svg>
              </div>
              <div className="placeholder-title">Awaiting Input</div>
              <div className="placeholder-desc">Enter a product description to automatically generate mapping requirements.</div>
            </div>
          )}

          {analyzing && (
            <div className="pipeline-wrap show">
              <div className="pipeline-header">Processing Engine</div>
              <div>
                {pipeSteps.map(s => (
                  <div key={s.n} className={`step-row ${pipeStep === s.n ? 'active' : ''} ${pipeStep > s.n ? 'done' : ''}`}>
                    <div className="step-num">{s.n}</div>
                    <div style={{ flex: 1 }}>
                      <div className="step-label">{s.label}</div>
                      <div className="step-desc">{s.desc}</div>
                    </div>
                    <div className="step-status">{pipeStep > s.n ? '✓' : pipeStep === s.n ? 'Active' : '—'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result && !analyzing && (
            <div className="result-shown show">
              <ResultCard result={result} onCopy={copyParams} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ result, onCopy }) {
  const { result: res, query, ts } = result;
  const cat = res.topCategory;
  const confCls = res.level;

  const groups = {};
  cat.parameters.forEach(p => {
    if (!groups[p.group]) groups[p.group] = [];
    groups[p.group].push(p);
  });

  return (
    <>
      <div className="result-top">
        <div className="result-cat-block">
          <div className="cat-emoji-wrap">{catEmoji(cat.id)}</div>
          <div>
            <div className="result-cat-name">{cat.name}</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className={`badge ${confCls === 'high' ? 'badge-green' : confCls === 'medium' ? 'badge-amber' : 'badge-red'}`}>
                {confCls === 'high' ? '✓ High Confidence' : confCls === 'medium' ? '⚠ Moderate Confidence' : '⚡ Low Confidence'}
              </span>
              <span className="badge badge-blue">BPOM RI</span>
            </div>
          </div>
        </div>
        <div className={`conf-block conf-${confCls}`}>
          <div className="conf-pct">{res.confidence}%</div>
          <div className="conf-label">Engine Confidence</div>
          <div className="conf-bar-wrap"><div className="conf-bar" style={{ width: `${res.confidence}%` }}></div></div>
        </div>
      </div>

      <div className="result-actions-row">
        <button className="btn-outline btn-sm" onClick={onCopy}>Copy List</button>
      </div>

      <div className="meta-row">
        <div className="meta-cell"><div className="meta-cell-label">Timestamp</div><div className="meta-cell-val">{fmtDate(ts)}</div></div>
        <div className="meta-cell"><div className="meta-cell-label">Data Refs</div><div className="meta-cell-val">{cat.regulations.length} documents</div></div>
        <div className="meta-cell"><div className="meta-cell-label">Parameters</div><div className="meta-cell-val">{cat.parameters.length} constraints</div></div>
      </div>

      {res.alternatives?.length > 0 && (
        <div className="params-header-row" style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            Also detected: <span style={{ color: 'var(--text-main)' }}>{res.alternatives.map(a => a.name).join(', ')}</span>
          </div>
        </div>
      )}

      <div className="params-header-row">
        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Detailed Constraints</div>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th style={{ width: '40px' }}>#</th><th>Parameter</th><th>Limit / Unit</th><th>Method</th><th>Type</th></tr></thead>
          <tbody>
            {Object.entries(groups).map(([g, ps]) => (
              <>
                <tr key={`g-${g}`} className="group-row"><td colSpan={5}>{g}</td></tr>
                {ps.map((p, i) => (
                  <tr key={`${g}-${i}`}>
                    <td style={{ color: 'var(--text-subtlest)' }}>{i + 1}</td>
                    <td className="td-primary">{p.name}</td>
                    <td className="td-mono">{p.limit} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{p.unit}</span></td>
                    <td style={{ color: 'var(--text-muted)' }}>{p.method}</td>
                    <td><span className={`badge ${p.type === 'mandatory' ? 'badge-green' : 'badge-amber'}`}>{p.type}</span></td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ─── History Page ──────────────────────────────────────────
function HistoryPage() {
  const [search, setSearch] = useState('');
  const all = History.getAll();
  const filtered = search
    ? all.filter(h => h.query.toLowerCase().includes(search.toLowerCase()) || h.categoryName.toLowerCase().includes(search.toLowerCase()))
    : all;

  return (
    <div>
      <div className="page-title-block animate-up" style={{ '--stagger': 1 }}>
        <h1 className="page-title">Audit Log</h1>
        <p className="page-subtitle">Complete history of all AI mapping transactions across the team.</p>
      </div>
      <div className="toolbar-row animate-up" style={{ '--stagger': 2 }}>
        <div className="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input type="text" className="form-control" placeholder="Search product descriptions..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="card animate-up" style={{ '--stagger': 3 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No audit logs found.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Timestamp</th><th>Query</th><th>Category</th><th>Score</th><th>Owner</th></tr></thead>
              <tbody>
                {filtered.map(h => (
                  <tr key={h.id}>
                    <td style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{fmtDate(h.ts)}</td>
                    <td className="td-primary"><div style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.query}</div></td>
                    <td>{h.categoryName}</td>
                    <td><span className={`badge ${h.level === 'high' ? 'badge-green' : h.level === 'medium' ? 'badge-amber' : 'badge-red'}`}>{h.confidence}%</span></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{h.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Database Page ─────────────────────────────────────────
function DatabasePage() {
  const db = BPOM_DB;
  const [modalCat, setModalCat] = useState(null);
  if (!db) return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Database not loaded.</div>;

  return (
    <div>
      <div className="page-title-block animate-up" style={{ '--stagger': 1 }}>
        <h1 className="page-title">Regulatory DB</h1>
        <p className="page-subtitle">The ground-truth BPOM categories driving the AI matching engine.</p>
      </div>
      <div className="cat-grid animate-up" style={{ '--stagger': 2 }}>
        {db.categories.map((c, i) => (
          <div key={c.id} className="cat-card" style={{ '--stagger': i + 2 }} onClick={() => setModalCat(c)}>
            <div className="cat-card-head">
              <div className="cat-emoji">{catEmoji(c.id)}</div>
              <div className="cat-name">{c.name}</div>
              <div className="cat-desc">{c.description.substring(0, 80)}...</div>
            </div>
            <div className="cat-card-foot">
              <div>{c.parameters.length} params mapped</div>
              <span className={`badge ${c.active ? 'badge-green' : 'badge-grey'}`} style={{ marginLeft: 'auto' }}>{c.active ? 'Active' : 'Draft'}</span>
            </div>
          </div>
        ))}
      </div>
      <Modal cat={modalCat} onClose={() => setModalCat(null)} />
    </div>
  );
}

// ─── Admin Page ────────────────────────────────────────────
function AdminPage({ toast }) {
  const db = BPOM_DB;
  const users = [
    { name: 'Admin BPOMate', role: 'admin' },
    { name: 'Budi Santoso', role: 'user' },
  ];

  return (
    <div>
      <div className="page-title-block animate-up" style={{ '--stagger': 1 }}>
        <h1 className="page-title">Admin Controller</h1>
        <p className="page-subtitle">System configuration, users, and mapping toggle rules.</p>
      </div>
      <div className="dash-grid animate-up" style={{ '--stagger': 2 }}>
        <div className="card">
          <div className="card-header"><div className="card-title">Registered Users</div></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Role</th></tr></thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i}>
                    <td className="td-primary">{u.name}</td>
                    <td><span className={`badge ${u.role === 'admin' ? 'badge-blue' : 'badge-grey'}`}>{u.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Category Toggles</div></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Category Engine Model</th><th>Status</th></tr></thead>
              <tbody>
                {(db?.categories || []).map((c, i) => (
                  <tr key={i}>
                    <td className="td-primary">{c.name}</td>
                    <td>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked={c.active} onChange={() => toast(`${c.name} updated`, 'info')} />
                        <div className="toggle-track"></div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('login');
  const [activePage, setActivePage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const { toasts, show: toast } = useToast();

  // Seed history once
  useEffect(() => { History.seed(); }, []);

  // Custom cursor
  useEffect(() => {
    const cursor = document.createElement('div'); cursor.className = 'cursor';
    const follower = document.createElement('div'); follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    const onMove = (e) => {
      cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
      follower.style.left = e.clientX + 'px'; follower.style.top = e.clientY + 'px';
    };
    const onOver = (e) => {
      if (e.target.closest('button,a,[role="button"],.chip,.cat-card,.nav-link')) {
        cursor.classList.add('expanded'); follower.classList.add('expanded');
      }
    };
    const onOut = (e) => {
      if (e.target.closest('button,a,[role="button"],.chip,.cat-card,.nav-link')) {
        cursor.classList.remove('expanded'); follower.classList.remove('expanded');
      }
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cursor.remove(); follower.remove();
    };
  }, []);

  const handleLogin = (role) => {
    setUser({ name: role === 'admin' ? 'Admin BPOMate' : 'Budi Santoso', role });
    setScreen('app');
    setActivePage('dashboard');
  };

  // ── Login Screen ──
  if (screen === 'login') {
    return (
      <>
        <div id="screen-login" className="auth-screen">
          <div className="auth-brand-panel">
            <div className="glow glow-1"></div>
            <div className="glow glow-2"></div>
            <div className="auth-brand-content">
              <div className="auth-logo animate-up">
                <div className="auth-logo-icon"><Server /></div>
                <div className="auth-logo-name">BPOMate</div>
              </div>
              <div className="brand-text-block animate-up" style={{ '--stagger': 2 }}>
                <div className="auth-brand-headline">Regulatory<br /><span className="text-gradient">Intelligence,</span><br />Automated<span className="cursor-blink">|</span></div>
              </div>
            </div>
          </div>
          <div className="auth-form-panel">
            <div className="auth-form-inner animate-up" style={{ '--stagger': 1 }}>
              <h1 className="auth-form-title">Welcome back</h1>
              <p className="auth-form-sub">Enter your details to access your dashboard.</p>
              <div className="demo-buttons" style={{ marginTop: '30px' }}>
                <button className="btn-outline w-full" onClick={() => handleLogin('admin')}>
                  <span className="emoji">🔐</span> Admin Demo
                </button>
                <button className="btn-outline w-full" onClick={() => handleLogin('user')}>
                  <span className="emoji">👤</span> Staff Demo
                </button>
              </div>
              <div className="auth-switch" style={{ marginTop: '20px' }}>
                Don't have an account? <a style={{ cursor: 'pointer' }} onClick={() => setScreen('register')}>Sign up</a>
              </div>
            </div>
          </div>
        </div>
        <ToastWrap toasts={toasts} />
      </>
    );
  }

  // ── Register Screen ──
  if (screen === 'register') {
    return (
      <>
        <div id="screen-register" className="auth-screen">
          <div className="auth-brand-panel">
            <div className="glow glow-1"></div>
            <div className="auth-brand-content">
              <div className="auth-logo animate-up">
                <div className="auth-logo-icon"><Server /></div>
                <div className="auth-logo-name">BPOMate</div>
              </div>
            </div>
          </div>
          <div className="auth-form-panel">
            <div className="auth-form-inner animate-up">
              <h1 className="auth-form-title">Create Account</h1>
              <button className="btn-primary w-full btn-lg" onClick={() => setScreen('login')}>Back to Login</button>
            </div>
          </div>
        </div>
        <ToastWrap toasts={toasts} />
      </>
    );
  }

  // ── App Shell ──
  const PAGE_ICONS = { dashboard: <LayoutDashboard size={15} />, history: <Clock size={15} />, database: <Database size={15} />, admin: <Settings size={15} /> };
  const PAGE_LABELS = { dashboard: 'Dashboard', history: 'Audit Log', database: 'Regulatory DB', admin: 'Admin Panel' };

  return (
    <>
      <div className="app-shell" id="app-shell">
        <aside className="sidebar" id="sidebar">
          <div className="sidebar-brand">
            <div className="brand-icon"><Shield /></div>
            <div className="brand-name">BPOMate</div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-group-label">Analysis</div>
            <div className="nav-items-container">
              <button className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePage('dashboard')}><LayoutDashboard size={15} /> Dashboard</button>
              <button className={`nav-link ${activePage === 'history' ? 'active' : ''}`} onClick={() => setActivePage('history')}><Clock size={15} /> Audit Log</button>
            </div>
            <div className="nav-group-label">Knowledge</div>
            <div className="nav-items-container">
              <button className={`nav-link ${activePage === 'database' ? 'active' : ''}`} onClick={() => setActivePage('database')}>
                <Database size={15} /> Regulatory DB
              </button>
            </div>
            {user?.role === 'admin' && (
              <div id="admin-nav-group">
                <div className="nav-group-label">System</div>
                <div className="nav-items-container">
                  <button className={`nav-link ${activePage === 'admin' ? 'active' : ''}`} onClick={() => setActivePage('admin')}>
                    <Settings size={15} /> Admin Panel
                  </button>
                </div>
              </div>
            )}
          </nav>
          <div className="sidebar-user">
            <div className="user-avatar"><User size={16} /></div>
            <div className="user-info">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
            <button className="btn-icon" onClick={() => setScreen('login')} title="Sign out">✖</button>
          </div>
        </aside>

        <main className="main-content">
          <div className="top-header">
            <div className="header-breadcrumb">
              <span className="breadcrumb-parent">BPOMate</span>
              <ArrowRight size={12} style={{ margin: '0 8px' }} />
              <span className="breadcrumb-current">{PAGE_LABELS[activePage]}</span>
            </div>
            <div className="header-right">
              <div className="status-pill pulse-badge">
                <div className="status-dot"></div>
                System Online
              </div>
            </div>
          </div>
          <div className="page-body">
            <div className="page active" style={{ padding: '2rem' }}>
              {activePage === 'dashboard' && <DashboardPage user={user} toast={toast} />}
              {activePage === 'history' && <HistoryPage />}
              {activePage === 'database' && <DatabasePage />}
              {activePage === 'admin' && <AdminPage toast={toast} />}
            </div>
          </div>
        </main>
      </div>
      <ToastWrap toasts={toasts} />
    </>
  );
}