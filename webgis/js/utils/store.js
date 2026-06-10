/* ═══════════════════════════════════════════════════════════
   2. STORAGE
═══════════════════════════════════════════════════════════ */
const Store = (() => {
  const KEYS = { spbu:'wg2_spbu', jalan:'wg2_jalan', parsil:'wg2_parsil', warga:'wg2_warga', rumahIbadah:'wg2_ri' };
  const _r = k => { try{ return JSON.parse(localStorage.getItem(k)||'[]') }catch{return[]} };
  const _w = (k,d) => { try{ localStorage.setItem(k,JSON.stringify(d)) }catch{} };
  let db = Object.fromEntries(Object.entries(KEYS).map(([k,v])=>[k,_r(v)]));
  return {
    all: ln => db[ln]||[],
    find:(ln,id) => (db[ln]||[]).find(r=>r.id===id)||null,
    add:(ln,rec) => { db[ln].push(rec); _w(KEYS[ln],db[ln]); },
    update:(ln,id,patch) => {
      const i=db[ln].findIndex(r=>r.id===id); if(i<0)return;
      db[ln][i]={...db[ln][i],...patch}; _w(KEYS[ln],db[ln]);
    },
    remove:(ln,id) => { db[ln]=db[ln].filter(r=>r.id!==id); _w(KEYS[ln],db[ln]); },
    allDb: () => db,
  };
})();
