'use strict';
/* ═══════════════════════════════════════════════════════════
   1. HELPERS
═══════════════════════════════════════════════════════════ */
const H = {
  uid: () => Math.random().toString(36).slice(2,9) + Date.now().toString(36),
  esc: s => String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])),
  fmDist: m => m==null?'-': m>=1000? (m/1000).toFixed(2)+' km': Math.round(m).toLocaleString('id-ID')+' m',
  fmArea: m => m==null?'-': m>=10000? (m/10000).toFixed(4)+' ha': Math.round(m).toLocaleString('id-ID')+' m²',
  fmNum:  n => (n||0).toLocaleString('id-ID'),
  today:  () => new Date().toISOString().slice(0,10),
  geoLen: lls => { let t=0; for(let i=0;i<lls.length-1;i++) t+=lls[i].distanceTo(lls[i+1]); return Math.round(t); },
  geoArea: lls => {
    const R=6371008.8; let a=0,n=lls.length;
    for(let i=0;i<n;i++){const j=(i+1)%n,φ1=lls[i].lat*Math.PI/180,φ2=lls[j].lat*Math.PI/180,dλ=(lls[j].lng-lls[i].lng)*Math.PI/180;a+=dλ*(2+Math.sin(φ1)+Math.sin(φ2));}
    return Math.round(Math.abs(a*R*R/2));
  },
};
