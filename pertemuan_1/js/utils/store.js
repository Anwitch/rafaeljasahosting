/* ═══════════════════════════════════════════════════════════
   2. STORAGE (MySQL API Version)
═══════════════════════════════════════════════════════════ */
const Store = (() => {
  const API_URL = '../api/index.php';
  
  let db = {
    spbu: [],
    jalan: [],
    parsil: [],
    warga: [],
    rumahIbadah: []
  };

  const request = async (action, payload = {}) => {
    try {
      const res = await fetch(`${API_URL}?action=${action}`, {
        method: action === 'alldb' ? 'GET' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: action === 'alldb' ? null : JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  };

  return {
    load: async () => {
      try {
        const data = await request('alldb');
        if (data) db = { ...db, ...data };
      } catch (e) {
        console.error("Gagal load data dari server", e);
      }
    },
    all: ln => db[ln]||[],
    find: (ln,id) => (db[ln]||[]).find(r=>r.id===id)||null,
    add: async (ln,rec) => { 
      db[ln].push(rec); 
      await request('add', { layer: ln, data: rec });
    },
    update: async (ln,id,patch) => {
      const i=db[ln].findIndex(r=>r.id===id); if(i<0)return;
      db[ln][i]={...db[ln][i],...patch}; 
      await request('update', { layer: ln, id: id, patch: patch });
    },
    remove: async (ln,id) => { 
      db[ln]=db[ln].filter(r=>r.id!==id); 
      await request('remove', { layer: ln, id: id });
    },
    allDb: () => db,
  };
})();
