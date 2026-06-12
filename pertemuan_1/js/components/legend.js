/* ═══════════════════════════════════════════════════════════
   10. LEGEND
═══════════════════════════════════════════════════════════ */
function renderLegend(ln){
  const el=document.getElementById('legend-items');
  const rows=CFG[ln].legend||[];
  el.innerHTML=rows.map(r=>{
    let sym='';
    if(r.sym==='c') sym=`<span class="leg-c" style="background:${r.clr}"></span>`;
    else if(r.sym==='l') sym=`<span class="leg-l" style="background:${r.clr}"></span>`;
    else sym=`<span class="leg-p" style="border-color:${r.clr};background:${r.clr}33"></span>`;
    return `<div class="legend-row">${sym}<span>${r.l}</span></div>`;
  }).join('');
  // Add radius note for rumahIbadah and bansos
  if(ln==='rumahIbadah'||ln==='warga'){
    el.innerHTML+=`<div class="legend-radius"><span class="leg-radius-sym"></span>Radius Hub 300m</div>`;
  }
}
