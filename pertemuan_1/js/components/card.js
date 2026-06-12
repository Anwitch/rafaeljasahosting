/* ═══════════════════════════════════════════════════════════
   7. CARD BUILDERS (sidebar)
═══════════════════════════════════════════════════════════ */
const Card = {
  _acts:(ln,id)=>`<div class="dcard-acts">
    <button class="bsm bsm-zoom" onclick="App.map.zoomTo('${ln}','${id}')">Zoom</button>
    <button class="bsm bsm-edit" onclick="App.crud.edit('${ln}','${id}')">Edit</button>
    <button class="bsm bsm-del"  onclick="App.crud.delete('${ln}','${id}')">Hapus</button></div>`,

  spbu(r){ const clr=CFG.spbu.color(r),bdg=CFG.spbu.badge(r);
    return `<div class="dcard" id="card-${r.id}">
      <div class="dcard-head" onclick="App.map.zoomTo('spbu','${r.id}')">
        <span class="dcard-sym circle" style="background:${clr}"></span>
        <span class="dcard-name">${H.esc(r.nama)}</span><span class="badge ${bdg.c}">${bdg.t}</span></div>
      <div class="dcard-attrs">
        <div class="attr"><span class="attr-k">WA</span><span class="attr-v">${H.esc(r.wa||'-')}</span></div>
        <div class="attr"><span class="attr-k">BBM</span><span class="attr-v">${H.esc(r.jenis_bbm||'-')}</span></div>
      </div>${this._acts('spbu',r.id)}</div>`; },

  jalan(r){ const clr=CFG.jalan.color(r),bdg=CFG.jalan.badge(r);
    return `<div class="dcard" id="card-${r.id}">
      <div class="dcard-head" onclick="App.map.zoomTo('jalan','${r.id}')">
        <span class="dcard-sym line" style="background:${clr}"></span>
        <span class="dcard-name">${H.esc(r.nama)}</span><span class="badge ${bdg.c}">${bdg.t}</span></div>
      <div class="dcard-attrs">
        <div class="attr"><span class="attr-k">Panjang</span><span class="attr-v">${H.fmDist(r.panjang)}</span></div>
        <div class="attr"><span class="attr-k">Kondisi</span><span class="attr-v">${H.esc(r.kondisi||'-')}</span></div>
      </div>${this._acts('jalan',r.id)}</div>`; },

  parsil(r){ const clr=CFG.parsil.color(r),bdg=CFG.parsil.badge(r);
    return `<div class="dcard" id="card-${r.id}">
      <div class="dcard-head" onclick="App.map.zoomTo('parsil','${r.id}')">
        <span class="dcard-sym poly" style="color:${clr};height:9px"></span>
        <span class="dcard-name">${H.esc(r.nama)}</span><span class="badge ${bdg.c}">${bdg.t}</span></div>
      <div class="dcard-attrs">
        <div class="attr"><span class="attr-k">Luas</span><span class="attr-v">${H.fmArea(r.luas)}</span></div>
        <div class="attr"><span class="attr-k">Sengketa</span><span class="attr-v">${H.esc(r.sengketa||'-')}</span></div>
      </div>${this._acts('parsil',r.id)}</div>`; },

  warga(r){ const clr=CFG.warga.color(r),bdg=CFG.warga.badge(r);
    const pendapatan=r.pendapatan?'Rp '+parseInt(r.pendapatan).toLocaleString('id-ID'):'-';
    const histCount=r.history_bansos?.length||0;
    return `<div class="dcard" id="card-${r.id}">
      <div class="dcard-head" onclick="App.map.zoomTo('warga','${r.id}')">
        <span class="dcard-sym circle" style="background:${clr}"></span>
        <span class="dcard-name">${H.esc(r.nama)}</span><span class="badge ${bdg.c}">${bdg.t}</span></div>
      <div class="dcard-attrs">
        <div class="attr"><span class="attr-k">Anggota</span><span class="attr-v">${r.jml_anggota||'-'} jiwa</span></div>
        <div class="attr"><span class="attr-k">Pendapatan</span><span class="attr-v">${pendapatan}</span></div>
        <div class="attr"><span class="attr-k">Bansos</span><span class="attr-v">${H.esc(r.bansos||'-')}</span></div>
        <div class="attr"><span class="attr-k">Riwayat</span><span class="attr-v">${histCount} program</span></div>
      </div>${this._acts('warga',r.id)}</div>`; },

  rumahIbadah(r){ const clr=CFG.rumahIbadah.color(r),bdg=CFG.rumahIbadah.badge(r);
    return `<div class="dcard" id="card-${r.id}">
      <div class="dcard-head" onclick="App.map.zoomTo('rumahIbadah','${r.id}')">
        <span class="dcard-sym circle" style="background:${clr}"></span>
        <span class="dcard-name">${H.esc(r.nama)}</span><span class="badge ${bdg.c}">${bdg.t}</span></div>
      <div class="dcard-attrs">
        <div class="attr"><span class="attr-k">Ketua</span><span class="attr-v">${H.esc(r.ketua||'-')}</span></div>
        <div class="attr"><span class="attr-k">Binaan</span><span class="attr-v">${r.jml_binaan||'-'} KK</span></div>
      </div>${this._acts('rumahIbadah',r.id)}</div>`; },
};
