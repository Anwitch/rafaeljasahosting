/* ═══════════════════════════════════════════════════════════
   14. APP ROOT
═══════════════════════════════════════════════════════════ */
const App = {
  state:{ activeLayer:'spbu' },
  _groups:{},

  init(){
    // Map
    this._map=L.map('map',{zoomControl:false}).setView([-0.056031,109.348641],13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxZoom:19
    }).addTo(this._map);
    L.control.zoom({position:'topright'}).addTo(this._map);
    ['spbu','jalan','parsil','warga','rumahIbadah'].forEach(k=>{
      this._groups[k]=L.layerGroup().addTo(this._map);
    });

    // Expose map for Draw
    App.map={
      instance: this._map,
      zoomTo:(ln,id)=>{
        const r=Store.find(ln,id); if(!r) return;
        if(r.lat!=null) this._map.setView([r.lat,r.lng],17);
        else if(r.coords?.length) try{this._map.fitBounds(L.latLngBounds(r.coords),{padding:[40,40]})}catch{}
        highlightCard(id);
      }
    };

    Draw.init(this._map);

    // Nav
    document.getElementById('nav-pills').addEventListener('click',e=>{
      const pill=e.target.closest('.nav-pill'); if(!pill) return;
      Draw.cancel();
      this.state.activeLayer=pill.dataset.layer;
      document.querySelectorAll('.nav-pill').forEach(p=>p.classList.remove('active'));
      pill.classList.add('active');
      renderSidebar(this.state.activeLayer);
      renderLegend(this.state.activeLayer);
    });

    // Add btn
    document.getElementById('btn-add').addEventListener('click',()=>Draw.start(this.state.activeLayer));

    // Modal
    document.getElementById('modal-save').addEventListener('click', Modal.submit);
    document.getElementById('modal-cancel').addEventListener('click', Modal.close);
    document.getElementById('modal-close').addEventListener('click', Modal.close);
    document.getElementById('modal-ov').addEventListener('click',e=>{ if(e.target===e.currentTarget) Modal.close(); });

    this.refresh();
  },

  crud:{
    edit(ln,id){ App.state.activeLayer=ln; Modal.openEdit(ln,id); },
    delete(ln,id){
      if(!confirm('Yakin hapus data ini?')) return;
      Store.remove(ln,id); App._map.closePopup();
      App.refresh(); Toast.info('Data dihapus');
    },
  },

  refresh(){
    renderMap(); renderSidebar(this.state.activeLayer);
    renderLegend(this.state.activeLayer); updateBadges();
  },
};

document.addEventListener('DOMContentLoaded',()=>App.init());
