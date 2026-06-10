/* ═══════════════════════════════════════════════════════════
   8. DRAW MANAGER
═══════════════════════════════════════════════════════════ */
const Draw = (() => {
  let _map, _drawn, _pending, _handler, _active=false;
  const BAR=()=>document.getElementById('draw-bar');
  const TXT=()=>document.getElementById('draw-indicator-text');

  function init(m){
    _map=m; _drawn=new L.FeatureGroup().addTo(_map);
    _map.on(L.Draw.Event.CREATED, e=>{
      _drawn.clearLayers(); _drawn.addLayer(e.layer);
      _pending=e.layer; stop(); Modal.openAdd(App.state.activeLayer, e.layer);
    });
    _map.on('click', e=>{
      if(!_active||App.state.activeLayer!=='spbu'&&App.state.activeLayer!=='warga'&&App.state.activeLayer!=='rumahIbadah') return;
      const mk=L.marker(e.latlng);
      _drawn.clearLayers(); _drawn.addLayer(mk);
      _pending=mk; stop(); Modal.openAdd(App.state.activeLayer, mk);
    });
    document.getElementById('btn-cancel').addEventListener('click', cancel);
  }

  function start(ln){
    _active=true;
    const msgs={spbu:'Klik peta untuk menandai lokasi SPBU',jalan:'Klik titik-titik ruas jalan — klik ganda untuk selesai',parsil:'Klik titik-titik batas kavling — klik ganda untuk selesai',warga:'Klik peta untuk menandai lokasi rumah warga miskin',rumahIbadah:'Klik peta untuk menandai lokasi rumah ibadah'};
    document.getElementById('draw-text').textContent=msgs[ln]||'Mode gambar aktif';
    BAR().classList.remove('hidden');
    if(ln==='jalan'){ _handler=new L.Draw.Polyline(_map,{shapeOptions:{color:'#f0a030',weight:4}}); _handler.enable(); }
    else if(ln==='parsil'){ _handler=new L.Draw.Polygon(_map,{shapeOptions:{color:'#9b7bfa',weight:2,fillOpacity:.2}}); _handler.enable(); }
  }

  function stop(){ _active=false; BAR().classList.add('hidden'); if(_handler){_handler.disable();_handler=null;} }
  function cancel(){ stop(); _drawn.clearLayers(); _pending=null; }
  function clearPending(){ _drawn.clearLayers(); _pending=null; }

  return {init, start, stop, cancel, clearPending};
})();
