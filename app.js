'use strict';
// ============================================================
// BPOMate — Application Logic v2.1
// Added Premium UI interactions & jsPDF Export Engine
// ============================================================

// ─── Auth Manager ─────────────────────────────────────────
const Auth = {
  USERS_KEY:   'bpomate_users',
  SESSION_KEY: 'bpomate_session',

  defaultUsers: [
    { id: 'u001', name: 'Admin BPOMate',    email: 'admin@bpomate.id', password: 'admin123', role: 'admin' },
    { id: 'u002', name: 'Budi Santoso',     email: 'staff@tuv.id',     password: 'staff123', role: 'user'  },
  ],

  init() {
    if (!localStorage.getItem(this.USERS_KEY)) localStorage.setItem(this.USERS_KEY, JSON.stringify(this.defaultUsers));
  },
  getUsers() { return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]'); },
  saveUsers(users) { localStorage.setItem(this.USERS_KEY, JSON.stringify(users)); },

  login(email, password) {
    const users  = this.getUsers();
    const user   = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return { ok: false, msg: 'Incorrect email or password. Please try again.' };
    const session = { id: user.id, name: user.name, email: user.email, role: user.role };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return { ok: true, user: session };
  },

  register(name, email, password, role) {
    if (!name.trim() || name.trim().length < 2) return { ok: false, msg: 'Please enter your full name.' };
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, msg: 'Please enter a valid email address.' };
    if (!password || password.length < 6) return { ok: false, msg: 'Password must be at least 6 characters.' };

    const users = this.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) return { ok: false, msg: 'Email already exists.' };
    
    const newUser = { id: 'u' + Date.now(), name: name.trim(), email: email.trim().toLowerCase(), password, role: role || 'user' };
    users.push(newUser);
    this.saveUsers(users);
    
    const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return { ok: true, user: session };
  },

  getSession() { try { return JSON.parse(localStorage.getItem(this.SESSION_KEY)); } catch { return null; } },
  logout() { localStorage.removeItem(this.SESSION_KEY); },
  isAdmin() { const s = this.getSession(); return s && s.role === 'admin'; }
};

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
      for (const kw of (cat.keywords.high   || [])) { if (text.includes(kw)) score += 10; }
      for (const kw of (cat.keywords.medium || [])) { if (text.includes(kw)) score += 5;  }
      for (const kw of (cat.keywords.low    || [])) { if (text.includes(kw)) score += 2;  }
      scores[cat.id] = score;
    }

    const ranked = Object.entries(scores).sort(([,a],[,b]) => b - a).filter(([,s]) => s > 0);
    if (!ranked.length) return null;

    const [[topId, topScore], [, secondScore] = [null, 0]] = ranked;
    const conf  = this._confidence(topScore, secondScore);
    const level = conf >= 82 ? 'high' : conf >= 58 ? 'medium' : 'low';

    // MULTI-CATEGORY COMPOSITE DETECTION
    // If other categories score within 75% of the top score, merge them!
    const validMatches = ranked.filter(([,score]) => score >= topScore * 0.75);
    
    let topCategory;
    if (validMatches.length > 1) {
      const firstCat = this.db.categories.find(c => c.id === validMatches[0][0]);
      let compositeParams = [];
      let compositeRegs = [];
      let names = [];
      
      validMatches.forEach(([id]) => {
         const cat = this.db.categories.find(c => c.id === id);
         names.push(cat.name);
         cat.regulations.forEach(r => { if(!compositeRegs.find(x => x.code === r.code)) compositeRegs.push(r); });
         cat.parameters.forEach(p => { if(!compositeParams.find(x => x.name === p.name)) compositeParams.push(p); });
      });

      topCategory = {
        id: validMatches.map(([id]) => id).join('_'),
        name: names.join(' + '),
        description: 'Composite classification spanning multiple BPOM regulatory categories.',
        icon: firstCat.icon,
        color: firstCat.color,
        colorLight: firstCat.colorLight,
        active: true,
        keywords: {},
        regulations: compositeRegs,
        parameters: compositeParams
      };
    } else {
      topCategory = this.db.categories.find(c => c.id === topId);
    }

    return {
      topCategory,
      confidence: conf,
      level,
      alternatives: ranked.slice(validMatches.length, validMatches.length + 3).map(([id]) => this.db.categories.find(c => c.id === id)).filter(Boolean)
    };
  }

  _confidence(top, second) {
    if (!top) return 0;
    const base   = Math.min(top * 3.8, 100);
    const margin = second > 0 ? (top - second) / top : 1;
    return Math.min(Math.round(base * (0.6 + 0.4 * margin)), 99);
  }
}

// ─── Storage (History) ─────────────────────────────────────
const History = {
  KEY: 'bpomate_history',
  save(entry) {
    const all = this.getAll();
    all.unshift(entry);
    try { localStorage.setItem(this.KEY, JSON.stringify(all.slice(0, 300))); } catch {}
  },
  getAll() { try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch { return []; } },
  clear() { localStorage.removeItem(this.KEY); },
  seed() {
    if (this.getAll().length) return;
    const entries = [
      { id:'h1', ts: ago(3,'d'), query:'Chocolate biscuit with vanilla cream filling, baked, 200g', categoryId:'confectionery', categoryName:'Confectionery & Bakery Products', confidence:94, level:'high', paramCount:19, status:'validated', user:'Budi Santoso' },
      { id:'h2', ts: ago(2,'d'), query:'Fresh orange and mango juice blend, no preservatives, bottled 250ml', categoryId:'beverages', categoryName:'Non-Alcoholic Beverages', confidence:91, level:'high', paramCount:17, status:'validated', user:'Admin BPOMate' },
      { id:'h3', ts: ago(1,'d'), query:'Vitamin C supplement capsule 500mg with zinc, for adults, 30 capsules', categoryId:'supplements', categoryName:'Dietary & Food Supplements', confidence:87, level:'high', paramCount:17, status:'pending', user:'Budi Santoso' },
    ];
    try { localStorage.setItem(this.KEY, JSON.stringify(entries)); } catch {}
  }
};

function ago(n, unit) {
  const ms = unit === 'd' ? 86400000 : 3600000;
  return new Date(Date.now() - n * ms).toISOString();
}

// ─── Toast System ──────────────────────────────────────────
const Toast = {
  show(msg, type = 'info') {
    const wrap = document.getElementById('toast-wrap');
    const el   = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span>${msg}</span>`;
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
};

// ─── Global state ──────────────────────────────────────────
const nlp = new NLPEngine(BPOM_DB);
let currentPage = 'dashboard';
let currentResult = null;
let examples = [];
let sidebarOpen = false;

// ─── PDF Export Engine (using jsPDF) ───────────────────────
function exportReportPDF() {
  if (!currentResult) return;
  const { result, query, ts } = currentResult;
  const cat = result.topCategory;

  // Initialize jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Brand Header
  doc.setFillColor(37, 99, 235); // var(--primary)
  doc.rect(0, 0, 210, 24, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text("BPOMate", 14, 16);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text("Regulatory Intelligence Report", 210 - 14, 15, { align: 'right' });
  
  // Document Meta
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.text(`Generated: ${fmtDate(ts)}`, 14, 34);
  doc.text(`System ID: ${currentResult.id}`, 210 - 14, 34, { align: 'right' });
  
  // Product Description block
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text("PRODUCT DESCRIPTION", 14, 46);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const splittedQuery = doc.splitTextToSize(query, 182);
  doc.text(splittedQuery, 14, 52);
  
  let currentY = 52 + (splittedQuery.length * 5) + 10;
  
  // Classification block
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text("AI CLASSIFICATION", 14, currentY);
  
  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Category: ${cat.name} (${cat.id})`, 14, currentY);
  doc.text(`Confidence: ${result.confidence}% (${result.level.toUpperCase()})`, 210 - 14, currentY, { align: 'right' });
  
  currentY += 16;
  
  // Applicable Regulations
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text("BPOM REGULATIONS & STANDARDS", 14, currentY);
  currentY += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  cat.regulations.forEach(r => {
    doc.text(`• [${r.code}]  ${r.title}`, 14, currentY);
    currentY += 5;
  });
  
  currentY += 8;

  // Parameters Table using AutoTable plugin
  const tableData = cat.parameters.map((p, i) => [
    (i + 1).toString(),
    p.name,
    p.group,
    `${p.limit} ${p.unit}`,
    p.method,
    p.type.toUpperCase()
  ]);

  doc.autoTable({
    startY: currentY,
    head: [['#', 'Test Parameter', 'Group', 'Limit / Unit', 'Method', 'Type']],
    body: tableData,
    theme: 'grid',
    headStyles: { 
      fillColor: [244, 244, 245], // var(--surface-hover)
      textColor: [50, 50, 50],
      fontStyle: 'bold',
      lineColor: [228, 228, 231],
      lineWidth: 0.1
    },
    styles: { 
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 4,
      lineColor: [228, 228, 231],
      lineWidth: 0.1
    },
    columnStyles: {
      0: { cellWidth: 10 },
      5: { fontStyle: 'bold' } // Type column
    },
    margin: { left: 14, right: 14 }
  });

  // Footer Disclaimer
  const finalY = doc.lastAutoTable.finalY + 10;
  if (finalY < 280) {
    doc.setFillColor(254, 243, 199); // yellow light
    doc.rect(14, finalY, 182, 14, 'F');
    doc.setTextColor(146, 64, 14); // yellow text
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text("DISCLAIMER: For decision support only. Final validation by a certified expert is required.", 18, finalY + 8);
  }

  // Save the PDF
  doc.save(`BPOMate_${cat.id}_${Date.now()}.pdf`);
  Toast.show('PDF Report Generated Successfully', 'success');
}

// ─── Screen routing ────────────────────────────────────────
function showScreen(name) {
  ['login', 'register'].forEach(s => {
    document.getElementById(`screen-${s}`).classList.toggle('hidden', s !== name);
  });
  document.getElementById('app-shell').classList.remove('visible');
  clearAuthAlert('login-alert');
  clearAuthAlert('register-alert');
}

function showApp() {
  document.getElementById('screen-login').classList.add('hidden');
  document.getElementById('screen-register').classList.add('hidden');
  document.getElementById('app-shell').classList.add('visible');
  setupUserUI();
  navigate('dashboard');
}

function clearAuthAlert(id) {
  const el = document.getElementById(id);
  if (el) { el.className = 'auth-alert'; el.textContent = ''; }
}

function showAuthAlert(id, msg, type = 'danger') {
  const el = document.getElementById(id);
  if (el) { el.className = `auth-alert ${type}`; el.textContent = msg; }
}

// ─── Auth Handlers ─────────────────────────────────────────
function handleLogin() {
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) { showAuthAlert('login-alert', 'Please enter email and password.'); return; }

  const result = Auth.login(email, password);
  if (!result.ok) { showAuthAlert('login-alert', result.msg); return; }

  Toast.show(`Welcome back, ${result.user.name}`, 'success');
  showApp();
}

function handleRegister() {
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const role     = document.querySelector('input[name="role"]:checked')?.value || 'user';

  const result = Auth.register(name, email, password, role);
  if (!result.ok) { showAuthAlert('register-alert', result.msg); return; }

  Toast.show(`Account created. Welcome, ${result.user.name}`, 'success');
  showApp();
}

function quickLogin(role) {
  const creds = role === 'admin' ? { email: 'admin@bpomate.id', password: 'admin123' } : { email: 'staff@tuv.id', password: 'staff123' };
  document.getElementById('login-email').value    = creds.email;
  document.getElementById('login-password').value = creds.password;
  handleLogin();
}

function handleLogout() {
  Auth.logout();
  currentResult = null;
  showScreen('login');
  Toast.show('You have been securely signed out.', 'info');
}

function selectRole(role) {
  document.getElementById('role-card-user').classList.toggle('selected', role === 'user');
  document.getElementById('role-card-admin').classList.toggle('selected', role === 'admin');
}

function setupUserUI() {
  const user = Auth.getSession();
  if (!user) return;
  document.getElementById('sidebar-user-name').textContent = user.name;
  document.getElementById('sidebar-user-role').textContent = user.role === 'admin' ? 'System Admin' : 'Staff Member';
  document.getElementById('user-avatar-initials').textContent = user.name.slice(0, 2).toUpperCase();
  document.getElementById('admin-nav-group').style.display = user.role === 'admin' ? '' : 'none';
  const dbCountEl = document.getElementById('nav-db-count');
  if (dbCountEl) dbCountEl.textContent = BPOM_DB.categories.filter(c => c.active).length;
}

// ─── Page Navigation ───────────────────────────────────────
function navigate(page) {
  if (page === 'admin' && !Auth.isAdmin()) { Toast.show('Admin access required.', 'error'); return; }

  // Clear active states
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));

  // Trigger DOM reflow to restart CSS animations
  const pageEl = document.getElementById(`page-${page}`);
  if (pageEl) {
    pageEl.classList.remove('active');
    void pageEl.offsetWidth; // Reflow
    pageEl.classList.add('active');
  }
  document.getElementById(`nav-${page}`)?.classList.add('active');

  const titles = { dashboard: 'Dashboard', history: 'Audit Log', database: 'Regulatory DB', admin: 'Admin Panel' };
  document.getElementById('breadcrumb-current').textContent = titles[page] || page;
  currentPage = page;
  closeSidebar();

  switch (page) {
    case 'dashboard': renderDashboard(); break;
    case 'history':   renderHistory();   break;
    case 'database':  renderDatabase();  break;
    case 'admin':     renderAdmin();     break;
  }
}

// ─── Dashboard Logic ───────────────────────────────────────
function renderDashboard() {
  const page = document.getElementById('page-dashboard');

  examples = [
    { label: '🍫 Chocolate Biscuit', text: 'Chocolate biscuit with vanilla cream filling, baked, 200g per box' },
    { label: '🧃 Orange Juice', text: 'Fresh orange and mango juice blend, no preservatives, 250ml' },
    { label: '💊 Vit C Capsule', text: 'Vitamin C supplement 500mg with zinc, for adults, 30 capsules' },
    { label: '🍜 Instant Noodles', text: 'Instant fried noodles with chicken flavor seasoning, 85g' },
  ];

  const user = Auth.getSession();
  const hist = History.getAll();

  page.innerHTML = `
    <div class="page-title-block animate-up" style="--stagger: 1">
      <h1 class="page-title">Analysis Dashboard</h1>
      <p class="page-subtitle">Submit a product description to the NLP engine for instant BPOM requirement matching.</p>
    </div>

    <div class="stats-row animate-up" style="--stagger: 2">
      ${[
        { l: 'My Queries', v: hist.filter(h => h.user === user?.name).length || 0, s: 'Total run by you' },
        { l: 'System Validated', v: hist.filter(h => h.status === 'validated').length, s: 'By experts' },
        { l: 'Active Categories', v: BPOM_DB.categories.filter(c => c.active).length, s: 'BPOM groups' },
        { l: 'Mapped Parameters', v: BPOM_DB.categories.reduce((a,c) => a + c.parameters.length, 0), s: 'Across DB' },
      ].map(st => `
        <div class="stat-card">
          <div class="stat-label">${st.l}</div>
          <div class="stat-value">${st.v}</div>
          <div class="stat-sub">${st.s}</div>
        </div>
      `).join('')}
    </div>

    <div class="dash-grid animate-up" style="--stagger: 3">
      <!-- Input Panel -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/></svg>
            Product Input
          </div>
        </div>
        <div class="card-body">
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:16px;">
            Describe the product type, ingredients, processing method, and packaging.
          </p>

          <div class="form-group" style="position:relative">
            <textarea id="query-input" class="form-control query-field" placeholder="e.g. Chocolate milk biscuit with cream filling..." maxlength="800"></textarea>
            <div class="char-count"><span id="char-count">0</span> / 800</div>
          </div>

          <div class="examples-title">Quick Fill Samples</div>
          <div class="chip-row">
            ${examples.map((ex, i) => `<button class="chip" onclick="fillExample(${i})">${ex.label}</button>`).join('')}
          </div>

          <button class="btn-primary analyze-btn" id="analyze-btn" onclick="runAnalysis()">
            <span class="btn-text">Run AI Analysis</span>
            <div class="btn-spinner"></div>
            <svg class="btn-icon-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </button>
        </div>
      </div>

      <!-- Results Panel -->
      <div class="card" style="min-height: 500px;">
        <div id="placeholder-state" class="placeholder-state">
           <div class="placeholder-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"/><path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"/></svg>
           </div>
           <div class="placeholder-title">Awaiting Input</div>
           <div class="placeholder-desc">Enter a product description to automatically generate mapping requirements.</div>
        </div>

        <div id="pipeline-wrap" class="pipeline-wrap">
          <div class="pipeline-header">Processing Engine Engine</div>
          <div id="pipeline-steps">
            ${[
              { n:1, label:'NLP Parsing', desc:'Tokenizing text features' },
              { n:2, label:'Category Matching', desc:'Scoring across BPOM models' },
              { n:3, label:'Fetching DB', desc:'Pulling regulatory standards' },
              { n:4, label:'Compilation', desc:'Structuring final constraints' }
            ].map(s => `
              <div class="step-row" id="step-${s.n}">
                <div class="step-num">${s.n}</div>
                <div style="flex:1">
                  <div class="step-label">${s.label}</div>
                  <div class="step-desc">${s.desc}</div>
                </div>
                <div class="step-status" id="step-status-${s.n}">—</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div id="result-shown" class="result-shown"></div>
      </div>
    </div>
  `;

  document.getElementById('query-input').addEventListener('input', e => {
    document.getElementById('char-count').textContent = e.target.value.length;
  });

  if (currentResult) {
    document.getElementById('placeholder-state').style.display = 'none';
    const rs = document.getElementById('result-shown');
    rs.innerHTML = buildResultHTML(currentResult);
    rs.classList.add('show');
  }
}

function fillExample(i) {
  const ta = document.getElementById('query-input');
  ta.value = examples[i].text;
  document.getElementById('char-count').textContent = ta.value.length;
  ta.focus();
}

async function runAnalysis() {
  const ta    = document.getElementById('query-input');
  const query = ta?.value.trim() || '';
  if (query.length < 8) { Toast.show('Please enter a longer product description.', 'error'); ta?.focus(); return; }

  const btn = document.getElementById('analyze-btn');
  btn.classList.add('loading');
  
  document.getElementById('placeholder-state').style.display = 'none';
  document.getElementById('result-shown').classList.remove('show');
  document.getElementById('pipeline-wrap').classList.add('show');

  await new Promise(resolve => {
    const timings = [0, 400, 800, 1200];
    const dones   = [350, 750, 1150, 1550];
    for (let i = 1; i <= 4; i++) {
      const el  = document.getElementById(`step-${i}`);
      const sta = document.getElementById(`step-status-${i}`);
      setTimeout(() => { el.classList.add('active'); sta.textContent = 'Active'; }, timings[i-1]);
      setTimeout(() => { el.classList.remove('active'); el.classList.add('done'); sta.textContent = '✓'; }, dones[i-1]);
    }
    setTimeout(resolve, 1700);
  });

  const result = nlp.classify(query);
  document.getElementById('pipeline-wrap').classList.remove('show');

  if (!result) {
    const ph = document.getElementById('placeholder-state');
    ph.style.display = 'flex';
    ph.innerHTML = `
      <div class="placeholder-icon" style="background:#FEE2E2; border-color:#FCA5A5; color:#DC2626">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      </div>
      <div class="placeholder-title">No Match Found</div>
      <div class="placeholder-desc">We couldn't map this to a BPOM category. Try refining the description.</div>
    `;
    btn.classList.remove('loading');
    return;
  }

  currentResult = { query, result, ts: new Date().toISOString(), id: 'q' + Date.now() };

  const user = Auth.getSession();
  History.save({
    id:           currentResult.id,
    ts:           currentResult.ts,
    query,
    categoryId:   result.topCategory.id,
    categoryName: result.topCategory.name,
    confidence:   result.confidence,
    level:        result.level,
    paramCount:   result.topCategory.parameters.length,
    status:       'pending',
    user:         user?.name || 'Automated'
  });

  const rs  = document.getElementById('result-shown');
  rs.innerHTML = buildResultHTML(currentResult);
  rs.classList.add('show');

  btn.classList.remove('loading');
  Toast.show(`Success: Mapped to "${result.topCategory.name}"`, 'success');
}

function buildResultHTML(data) {
  const { result, query, ts } = data;
  const cat    = result.topCategory;
  const params = cat.parameters;
  const confCls= result.level;

  let groups = {};
  params.forEach(p => { if(!groups[p.group]) groups[p.group] = []; groups[p.group].push(p); });

  const altsHtml = result.alternatives && result.alternatives.length > 0 
    ? `<div class="params-header-row" style="margin-top:-10px; margin-bottom:10px;"><div style="font-size:0.85rem; font-weight:500; color:var(--text-muted)">Also detected: <span style="color:var(--text-main)">${result.alternatives.map(a => a.name).join(', ')}</span> (Please refine query if this is incorrect)</div></div>` 
    : '';

  return `
    <div class="result-top">
      <div class="result-cat-block">
        <div class="cat-emoji-wrap">${catEmoji(cat.id)}</div>
        <div>
          <div class="result-cat-name">${cat.name}</div>
          <div style="display:flex; gap:8px;">
            <span class="badge ${confCls === 'high' ? 'badge-green' : confCls === 'medium' ? 'badge-amber' : 'badge-red'}">
              ${confCls === 'high' ? '✓ High Confidence' : confCls === 'medium' ? '⚠ Moderate Confidence' : '⚡ Low Confidence'}
            </span>
            <span class="badge badge-blue">BPOM RI</span>
          </div>
        </div>
      </div>
      <div class="conf-block conf-${confCls}">
        <div class="conf-pct">${result.confidence}%</div>
        <div class="conf-label">Engine Confidence</div>
        <div class="conf-bar-wrap"><div class="conf-bar" style="width:${result.confidence}%"></div></div>
      </div>
    </div>

    <!-- Actions Row -->
    <div class="result-actions-row">
      <button class="btn-primary btn-sm" onclick="exportReportPDF()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polygon points="9 15 12 18 15 15"/></svg>
        Download PDF
      </button>
      <button class="btn-outline btn-sm" onclick="copyParams()">
        Copy List
      </button>
    </div>

    <div class="meta-row">
      <div class="meta-cell">
        <div class="meta-cell-label">Timestamp</div>
        <div class="meta-cell-val">${fmtDate(ts)}</div>
      </div>
      <div class="meta-cell">
        <div class="meta-cell-label">Data Refs</div>
        <div class="meta-cell-val">${cat.regulations.length} documents</div>
      </div>
      <div class="meta-cell">
        <div class="meta-cell-label">Parameters</div>
        <div class="meta-cell-val">${params.length} constraints</div>
      </div>
    </div>

    ${altsHtml}

    <div class="params-header-row">
      <div style="font-size:0.9rem; font-weight:700">Detailed Constraints</div>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr><th style="width:40px">#</th><th>Parameter</th><th>Limit / Unit</th><th>Method</th><th>Type</th></tr>
        </thead>
        <tbody>
          ${Object.entries(groups).map(([g, ps]) => `
            <tr class="group-row"><td colspan="5">${g}</td></tr>
            ${ps.map((p, i) => `
              <tr>
                <td style="color:var(--text-subtlest)">${i+1}</td>
                <td class="td-primary">${p.name}</td>
                <td class="td-mono">${p.limit} <span style="color:var(--text-muted);font-size:0.75rem">${p.unit}</span></td>
                <td style="color:var(--text-muted)">${p.method}</td>
                <td><span class="badge ${p.type === 'mandatory' ? 'badge-green' : 'badge-amber'}">${p.type}</span></td>
              </tr>
            `).join('')}
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function copyParams() {
  if (!currentResult) return;
  const lines = currentResult.result.topCategory.parameters.map((p, i) => `${i+1}. ${p.name} | ${p.limit} ${p.unit} | ${p.type}`);
  navigator.clipboard.writeText(lines.join('\n'))
    .then(() => Toast.show('Copied to clipboard', 'success'))
    .catch(() => Toast.show('Copy failed', 'error'));
}

// ─── History ───────────────────────────────────────────────
function renderHistory() {
  const page = document.getElementById('page-history');
  page.innerHTML = `
    <div class="page-title-block animate-up" style="--stagger: 1">
      <h1 class="page-title">Audit Log</h1>
      <p class="page-subtitle">Complete history of all AI mapping transactions across the team.</p>
    </div>
    <div class="toolbar-row animate-up" style="--stagger: 2">
      <div class="search-box">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" class="form-control" id="hist-s" placeholder="Search product descriptions..." oninput="drawHist()"/>
      </div>
    </div>
    <div class="card animate-up" style="--stagger: 3">
      <div id="hist-slot"></div>
    </div>
  `;
  drawHist();
}

function drawHist() {
  const slot = document.getElementById('hist-slot');
  if(!slot) return;
  const s = document.getElementById('hist-s')?.value.toLowerCase() || '';
  let all = History.getAll();
  if (s) all = all.filter(h => h.query.toLowerCase().includes(s) || h.categoryName.toLowerCase().includes(s));

  if (!all.length) {
    slot.innerHTML = `<div style="padding:40px; text-align:center; color:var(--text-muted)">No audit logs found.</div>`; return;
  }

  slot.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Timestamp</th><th>Query</th><th>Category</th><th>Score</th><th>Owner</th></tr></thead>
        <tbody>
          ${all.map(h => `
            <tr style="cursor:pointer" onclick="alert('Query Details: \\n' + '${h.query.replace(/'/g, "\\'")}')">
              <td style="color:var(--text-muted); white-space:nowrap">${fmtDate(h.ts)}</td>
              <td class="td-primary"><div style="max-width:280px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">${h.query}</div></td>
              <td>${h.categoryName}</td>
              <td><span class="badge ${h.level==='high'?'badge-green':h.level==='medium'?'badge-amber':'badge-red'}">${h.confidence}%</span></td>
              <td style="font-size:0.8rem; color:var(--text-muted)">${h.user}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ─── Database ──────────────────────────────────────────────
function renderDatabase() {
  const page = document.getElementById('page-database');
  page.innerHTML = `
    <div class="page-title-block animate-up" style="--stagger: 1">
      <h1 class="page-title">Regulatory DB</h1>
      <p class="page-subtitle">The ground-truth BPOM categories driving the AI matching engine.</p>
    </div>
    <div class="cat-grid animate-up" style="--stagger: 2" id="db-grid"></div>
  `;
  
  const grid = document.getElementById('db-grid');
  grid.innerHTML = BPOM_DB.categories.map((c, i) => `
    <div class="cat-card" style="--stagger: ${i+2}" onclick="openCatModal('${c.id}')">
      <div class="cat-card-head">
        <div class="cat-emoji">${catEmoji(c.id)}</div>
        <div class="cat-name">${c.name}</div>
        <div class="cat-desc">${c.description.substring(0,80)}...</div>
      </div>
      <div class="cat-card-foot">
        <div>${c.parameters.length} params mapped</div>
        <span class="badge ${c.active?'badge-green':'badge-grey'}" style="margin-left:auto">${c.active?'Active':'Draft'}</span>
      </div>
    </div>
  `).join('');
}

function openCatModal(id) {
  const c = BPOM_DB.categories.find(x => x.id === id);
  if(!c) return;
  document.getElementById('modal-title').innerHTML = `${catEmoji(c.id)} &nbsp;${c.name}`;
  document.getElementById('modal-content').innerHTML = `
    <p style="color:var(--text-muted); margin-bottom: 24px; font-size:0.95rem; line-height:1.6">${c.description}</p>
    <div style="font-weight:700; margin-bottom:12px; font-size:0.9rem">Test Parameters (${c.parameters.length})</div>
    <div class="table-wrap" style="border:1px solid var(--border); border-radius:var(--radius-md)">
      <table>
        <thead><tr><th>Parameter</th><th>Limit</th><th>Type</th></tr></thead>
        <tbody>
          ${c.parameters.map(p => `
            <tr>
              <td class="td-primary">${p.name}</td>
              <td class="td-mono">${p.limit} <span style="color:var(--text-muted)">${p.unit}</span></td>
              <td><span class="badge ${p.type==='mandatory'?'badge-green':'badge-amber'}">${p.type}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('show');
}
function closeModal() { document.getElementById('modal-overlay').classList.remove('show'); }

// ─── Admin Panel ───────────────────────────────────────────
function renderAdmin() {
  const page = document.getElementById('page-admin');
  page.innerHTML = `
    <div class="page-title-block animate-up" style="--stagger: 1">
      <h1 class="page-title">Admin Controller</h1>
      <p class="page-subtitle">System configuration, users, and mapping toggle rules.</p>
    </div>
    
    <div class="dash-grid animate-up" style="--stagger: 2">
      <div class="card">
        <div class="card-header"><div class="card-title">Registered Users</div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Role</th></tr></thead>
            <tbody>
              ${Auth.getUsers().map(u => `<tr><td class="td-primary">${u.name}</td><td><span class="badge ${u.role==='admin'?'badge-blue':'badge-grey'}">${u.role}</span></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header"><div class="card-title">Category Toggles</div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Category Engine Model</th><th>Status</th></tr></thead>
            <tbody>
              ${BPOM_DB.categories.map(c => `
                <tr>
                  <td class="td-primary">${c.name}</td>
                  <td>
                    <label class="toggle-switch">
                      <input type="checkbox" ${c.active?'checked':''} onchange="Toast.show('${c.name} updated', 'info')">
                      <div class="toggle-track"></div>
                    </label>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ─── Utilities ─────────────────────────────────────────────
function catEmoji(id) {
  const map = {
    confectionery:'🍫', dairy:'🥛', beverages:'🧃', snack_foods:'🍿',
    processed_meat:'🍖', instant_noodles:'🍜', sauces_condiments:'🫙',
    supplements:'💊', infant_formula:'🍼', cooking_oils:'🫒',
    seafood:'🦐', spices_seasonings:'🌶️', canned_foods:'🥫',
    frozen_foods:'🧊', fermented_foods:'🫘', cereal_grains:'🌾',
    ready_to_eat:'🥡', traditional_snacks:'🍢'
  };
  return map[id] || '🧪';
}
function fmtDate(iso) {
  const d = new Date(iso); return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) + ' ' + d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}

// ─── Sidebar Mobile ────────────────────────────────────────
function toggleSidebar() { sidebarOpen = !sidebarOpen; document.getElementById('sidebar').classList.toggle('open', sidebarOpen); }
function closeSidebar() { sidebarOpen = false; document.getElementById('sidebar').classList.remove('open'); }

// ─── Canvas Particle Network ───────────────────────────────
function initCanvasParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, mouse = { x: -9999, y: -9999 };
  const PARTICLE_COUNT = 90;
  const MAX_DIST = 140;
  const MOUSE_DIST = 180;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update + draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Mouse repulsion
      const mx = p.x - mouse.x, my = p.y - mouse.y;
      const md = Math.sqrt(mx * mx + my * my);
      if (md < MOUSE_DIST) {
        const force = (MOUSE_DIST - md) / MOUSE_DIST * 0.015;
        p.vx += (mx / md) * force;
        p.vy += (my / md) * force;
        p.vx *= 0.98;
        p.vy *= 0.98;
      }
      // Speed clamp
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0.8) { p.vx = (p.vx / speed) * 0.8; p.vy = (p.vy / speed) * 0.8; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
      ctx.fill();
    }

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          grad.addColorStop(0, `rgba(124, 58, 237, ${alpha})`);
          grad.addColorStop(1, `rgba(6, 182, 212, ${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  resize();
  createParticles();
  draw();
}

// ─── Custom Cursor ─────────────────────────────────────────
function initCursor() {
  const cursor   = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');
  if (!cursor || !follower) return;

  let fx = 0, fy = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });

  (function animateCursor() {
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    fx = fx + (cx - fx) * 0.12;
    fy = fy + (cy - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.querySelectorAll('a, button, .chip, .cat-card, .role-card, .nav-link, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('expanded'); follower.classList.add('expanded'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('expanded'); follower.classList.remove('expanded'); });
  });
}

// ─── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Auth.init(); History.seed();

  // Launch global effects
  initCanvasParticles();
  initCursor();

  document.querySelectorAll('[data-page]').forEach(el => el.addEventListener('click', () => navigate(el.dataset.page)));
  document.getElementById('modal-overlay').addEventListener('click', e => { if (e.target === document.getElementById('modal-overlay')) closeModal(); });
  document.addEventListener('click', e => { if (window.innerWidth <= 768 && sidebarOpen && !document.getElementById('sidebar').contains(e.target)) closeSidebar(); });

  if (Auth.getSession()) showApp(); else showScreen('login');
});

