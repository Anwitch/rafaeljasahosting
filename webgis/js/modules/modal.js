/* ═══════════════════════════════════════════════════════════
   9. MODAL MANAGER
═══════════════════════════════════════════════════════════ */
const Modal = (() => {
  let _ln=null, _editId=null, _geo=null;
  const ov=()=>document.getElementById('modal-ov');

  function openAdd(ln, leafletLayer){
    _ln=ln; _editId=null; _geo=leafletLayer;
    const cfg=CFG[ln];
    document.getElementById('modal-icon').textContent=cfg.icon;
    document.getElementById('modal-title').textContent='Tambah '+cfg.label;
    document.getElementById('modal-sub').textContent='Isi atribut data baru';
    let html='';
    if(ln==='spbu') html=Forms.spbu(null, leafletLayer.getLatLng());
    else if(ln==='jalan') html=Forms.jalan(null, H.geoLen(leafletLayer.getLatLngs()));
    else if(ln==='parsil') html=Forms.parsil(null, H.geoArea(leafletLayer.getLatLngs()[0]));
    else if(ln==='warga') html=Forms.warga(null, leafletLayer.getLatLng());
    else if(ln==='rumahIbadah') html=Forms.rumahIbadah(null, leafletLayer.getLatLng());
    document.getElementById('modal-body').innerHTML=html;
    _bindRadio(); _bindFormTabs(); _bindHistBtn(); ov().classList.remove('hidden');
    setTimeout(()=>document.getElementById('f-nama')?.focus(),60);
  }

  function openEdit(ln, id){
    _ln=ln; _editId=id; _geo=null;
    const rec=Store.find(ln,id); if(!rec) return;
    const cfg=CFG[ln];
    document.getElementById('modal-icon').textContent=cfg.icon;
    document.getElementById('modal-title').textContent='Edit '+cfg.label;
    document.getElementById('modal-sub').textContent=H.esc(rec.nama);
    let html='';
    if(ln==='spbu') html=Forms.spbu(rec,null);
    else if(ln==='jalan') html=Forms.jalan(rec,null);
    else if(ln==='parsil') html=Forms.parsil(rec,null);
    else if(ln==='warga') html=Forms.warga(rec,null);
    else if(ln==='rumahIbadah') html=Forms.rumahIbadah(rec,null);
    document.getElementById('modal-body').innerHTML=html;
    _bindRadio(); _bindFormTabs(); _bindHistBtn(); ov().classList.remove('hidden');
    setTimeout(()=>document.getElementById('f-nama')?.focus(),60);
  }

  function close(){ ov().classList.add('hidden'); Draw.clearPending(); }

  function submit(){
    const data=Forms.readAll(_ln); if(!data) return;
    if(_editId){
      data.updatedAt=H.today();
      Store.update(_ln,_editId,data);
      Toast.success('Data berhasil diperbarui');
    } else {
      const geo=_geo;
      if(_ln==='spbu'||_ln==='warga'||_ln==='rumahIbadah'){
        const ll=geo.getLatLng(); data.lat=ll.lat; data.lng=ll.lng;
      } else if(_ln==='jalan'){
        data.coords=geo.getLatLngs().map(l=>[l.lat,l.lng]);
      } else if(_ln==='parsil'){
        data.coords=geo.getLatLngs()[0].map(l=>[l.lat,l.lng]);
      }
      data.id=H.uid(); data.createdAt=H.today(); data.updatedAt=H.today();
      Store.add(_ln,data);
      Toast.success('Data berhasil disimpan');
    }
    close(); App.refresh();
  }

  function _bindRadio(){
    document.querySelectorAll('.ropt').forEach(el=>{
      el.addEventListener('click',()=>{
        const parent=el.closest('.rtoggle'); if(!parent) return;
        parent.querySelectorAll('.ropt').forEach(r=>r.classList.remove('yes','no'));
        const v=el.dataset.v; el.classList.add(v==='true'?'yes':'no');
        const inp=el.querySelector('input'); if(inp) inp.checked=true;
      });
    });
    // Bind penyakit checkboxes
    document.querySelectorAll('.penyakit-check input').forEach(inp=>{
      inp.addEventListener('change', e=>{
        if(e.target.checked) e.target.parentElement.classList.add('checked');
        else e.target.parentElement.classList.remove('checked');
      });
    });
  }

  function _bindFormTabs(){
    const tabs=document.querySelectorAll('.form-tab');
    if(!tabs.length) return;
    tabs.forEach(tab=>{
      tab.addEventListener('click',()=>{
        tabs.forEach(t=>t.classList.remove('active'));
        document.querySelectorAll('.form-section-panel').forEach(p=>p.classList.remove('active'));
        tab.classList.add('active');
        const panelId='panel-'+tab.dataset.panel;
        document.getElementById(panelId)?.classList.add('active');
      });
    });
  }

  function _bindHistBtn(){
    const btn=document.getElementById('btn-add-hist');
    if(!btn) return;
    btn.addEventListener('click',()=>{
      const tbody=document.getElementById('hist-tbody');
      if(!tbody) return;
      const tr=document.createElement('tr');
      tr.innerHTML=`
        <td><input class="finput hist-program" style="padding:3px 6px;font-size:10px" placeholder="cth: PKH"/></td>
        <td><input class="finput hist-tahun" style="padding:3px 6px;font-size:10px;width:70px" type="number" min="2000" max="2030" placeholder="${new Date().getFullYear()}"/></td>
        <td><select class="finput hist-status" style="padding:3px 6px;font-size:10px">
          <option>Aktif</option><option>Berhenti</option><option>Dalam Proses</option>
        </select></td>
        <td><input class="finput hist-nominal" style="padding:3px 6px;font-size:10px" type="number" placeholder="Rp"/></td>
        <td><button class="btn-del-row" type="button" onclick="this.closest('tr').remove()">✕</button></td>`;
      tbody.appendChild(tr);
    });
  }

  return {openAdd, openEdit, close, submit};
})();
