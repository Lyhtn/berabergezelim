// js/local-admin.js
const LOCAL_QA_KEY = 'bg_local_qa';

function loadDB() {
  try { return JSON.parse(localStorage.getItem(LOCAL_QA_KEY) || '{}'); } catch (e) { return {}; }
}

function saveDB(db) {
  try { localStorage.setItem(LOCAL_QA_KEY, JSON.stringify(db)); } catch (e) {}
}

function render() {
  const tbody = document.querySelector('#qa-table tbody');
  tbody.innerHTML = '';
  const db = loadDB();
  for (const [k, v] of Object.entries(db)) {
    const tr = document.createElement('tr');
    const a = (v && v.a) ? v.a : '';
    const cat = (v && v.category) ? v.category : '';
    const created = (v && v.createdAt) ? v.createdAt : '';
    tr.innerHTML = `<td style="vertical-align:top;"><pre>${k}</pre></td><td><pre>${escapeHtml(a)}</pre></td><td>${escapeHtml(cat)}</td><td>${escapeHtml(created)}</td><td><button class="del">Sil</button></td>`;
    tr.querySelector('.del').addEventListener('click', () => {
      if (!confirm('Bu girişi silmek istiyor musunuz?')) return;
      const db2 = loadDB(); delete db2[k]; saveDB(db2); render();
    });
    tbody.appendChild(tr);
  }
}

function escapeHtml(s){ return (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

document.getElementById('btn-refresh').addEventListener('click', render);
document.getElementById('btn-clear').addEventListener('click', () => {
  if (!confirm('Tüm local QA verisini silmek istiyor musunuz?')) return;
  saveDB({}); render();
});

document.getElementById('btn-export').addEventListener('click', () => {
  const db = loadDB();
  const blob = new Blob([JSON.stringify(db, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'local_qa_export.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

document.getElementById('btn-import').addEventListener('click', () => document.getElementById('importFile').click());
document.getElementById('importFile').addEventListener('change', (e) => {
  const f = e.target.files && e.target.files[0]; if (!f) return;
  const rdr = new FileReader(); rdr.onload = () => {
    try {
      const parsed = JSON.parse(rdr.result);
      if (typeof parsed !== 'object') throw new Error('Invalid');
      const db = loadDB();
      for (const [k,v] of Object.entries(parsed)) db[k] = v;
      saveDB(db); render();
      alert('Import tamamlandı.');
    } catch (err) { alert('Import başarısız: ' + (err.message||err)); }
  }; rdr.readAsText(f);
});

// initial render
render();
