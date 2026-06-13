/* ═══════════════════════════════════════════════════════════
   13. MAP RENDER
═══════════════════════════════════════════════════════════ */
function renderMap(){
  const db=Store.allDb();
  // SPBU
  if (App._groups.spbu) {
    App._groups.spbu.clearLayers();
    db.spbu.forEach(r=>{
      const m=L.circleMarker([r.lat,r.lng],{radius:9,fillColor:CFG.spbu.color(r),color:'#fff',weight:2,fillOpacity:1});
      m.bindPopup(Popup.spbu(r),{maxWidth:320});
      m.on('click',()=>highlightCard(r.id));
      App._groups.spbu.addLayer(m);
    });
  }
  // Warga
  if (App._groups.warga) {
    App._groups.warga.clearLayers();
    db.warga.forEach(r=>{
      const clr=CFG.warga.color(r);
      // Check if in any RI radius
      const inRadius=db.rumahIbadah.some(hub=>{
        if(!hub.lat) return false;
        const d=L.latLng(r.lat,r.lng).distanceTo(L.latLng(hub.lat,hub.lng));
        return d<=(parseFloat(hub.radius)||300);
      });
      const iconHtml=`<div style="width:22px;height:22px;background:${clr};border:2px solid #fff;border-radius:50%;
        display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.4);
        font-size:11px;line-height:1">👨‍👩‍👧</div>${inRadius?'':'<div style="position:absolute;top:-4px;right:-4px;width:10px;height:10px;background:#f05c5c;border-radius:50%;border:1px solid #fff"></div>'}`;
      const icon=L.divIcon({html:`<div style="position:relative">${iconHtml}</div>`,className:'',iconSize:[22,22],iconAnchor:[11,11]});
      const m=L.marker([r.lat,r.lng],{icon});
      m.bindPopup(Popup.warga(r),{maxWidth:360});
      m.on('click',()=>highlightCard(r.id));
      App._groups.warga.addLayer(m);
    });
  }
  // Rumah Ibadah
  if (App._groups.rumahIbadah) {
    App._groups.rumahIbadah.clearLayers();
    db.rumahIbadah.forEach(r=>{
      const clr=CFG.rumahIbadah.color(r);
      const m=L.circleMarker([r.lat,r.lng],{radius:10,fillColor:clr,color:'#fff',weight:2.5,fillOpacity:1});
      m.bindPopup(Popup.rumahIbadah(r),{maxWidth:320});
      m.on('click',()=>highlightCard(r.id));
      App._groups.rumahIbadah.addLayer(m);
      // Always draw radius 300m coverage circle
      const radiusM=parseFloat(r.radius)||300;
      const ring=L.circle([r.lat,r.lng],{radius:radiusM,color:clr,weight:1.5,fillColor:clr,fillOpacity:.06,dashArray:'6 4'});
      App._groups.rumahIbadah.addLayer(ring);
    });
  }
  // Jalan
  if (App._groups.jalan) {
    App._groups.jalan.clearLayers();
    db.jalan.forEach(r=>{
      const l=L.polyline(r.coords,{color:CFG.jalan.color(r),weight:4,opacity:.9});
      l.bindPopup(Popup.jalan(r),{maxWidth:300});
      l.on('click',()=>highlightCard(r.id));
      App._groups.jalan.addLayer(l);
    });
  }
  // Parsil
  if (App._groups.parsil) {
    App._groups.parsil.clearLayers();
    db.parsil.forEach(r=>{
      const clr=CFG.parsil.color(r);
      const p=L.polygon(r.coords,{color:clr,weight:2,fillColor:clr,fillOpacity:.2});
      p.bindPopup(Popup.parsil(r),{maxWidth:300});
      p.on('click',()=>highlightCard(r.id));
      App._groups.parsil.addLayer(p);
    });
  }
}
