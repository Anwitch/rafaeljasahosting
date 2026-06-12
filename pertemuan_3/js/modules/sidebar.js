/* ═══════════════════════════════════════════════════════════
   11. SIDEBAR
═══════════════════════════════════════════════════════════ */
function renderSidebar(ln){
  const cfg=CFG[ln];
  document.getElementById('sb-title').textContent=cfg.label;
  document.getElementById('sb-sub').textContent=cfg.sub;
  const data=Store.all(ln);
  const list=document.getElementById('sb-list');
  if(!data.length){
    list.innerHTML=`<div class="empty"><svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg><p>Belum ada data.<br/>Klik <strong>Tambah</strong> untuk mulai digitasi.</p></div>`;
    return;
  }
  list.innerHTML=data.map(r=>Card[ln](r)).join('');
}

function updateBadges(){
  const db=Store.allDb();
  ['spbu','jalan','parsil','warga','rumahIbadah'].forEach(k=>{
    const el=document.getElementById('badge-'+k);
    if(el) el.textContent=db[k]?.length||0;
  });
  const total=Object.values(db).reduce((s,a)=>s+a.length,0);
  document.getElementById('total-count').textContent=total+' fitur';
}

function highlightCard(id){
  document.querySelectorAll('.dcard').forEach(c=>c.classList.remove('active'));
  const c=document.getElementById('card-'+id);
  if(c){ c.classList.add('active'); c.scrollIntoView({behavior:'smooth',block:'nearest'}); }
}
