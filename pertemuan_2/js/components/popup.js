/* ═══════════════════════════════════════════════════════════
   6. POPUP BUILDERS
═══════════════════════════════════════════════════════════ */
const Popup = {
  _row:(k,v)=>`<div class="popup-row"><span class="popup-k">${k}</span><span class="popup-v">${H.esc(v||'-')}</span></div>`,
  _sect:t=>`<div class="popup-section">${t}</div>`,
  _acts:(ln,id)=>`<div class="popup-acts"><button class="bsm bsm-edit" onclick="App.crud.edit('${ln}','${id}')">Edit</button><button class="bsm bsm-del" onclick="App.crud.delete('${ln}','${id}')">Hapus</button></div>`,

  spbu(r){ const cfg=CFG.spbu,clr=cfg.color(r),bdg=cfg.badge(r);
    return `<div class="popup-wrap"><div class="popup-title"><span class="popup-sym" style="background:${clr}"></span>${H.esc(r.nama)}</div>
    <span class="badge ${bdg.c}">${bdg.t}</span>
    ${this._sect('Operasional')}
    ${this._row('No. WA',r.wa)}${this._row('Jenis BBM',r.jenis_bbm)}${this._row('Harga BBM',r.harga_bbm)}${this._row('Akses Disabilitas',r.disabilitas)}
    ${r.catatan?this._row('Catatan',r.catatan):''}
    ${this._acts('spbu',r.id)}</div>`; },

  jalan(r){ const cfg=CFG.jalan,bdg=cfg.badge(r);
    return `<div class="popup-wrap"><div class="popup-title">🛣️ ${H.esc(r.nama)}</div>
    <span class="badge ${bdg.c}">${bdg.t}</span>
    ${this._sect('Spesifikasi')}
    ${this._row('Panjang',H.fmDist(r.panjang))}${this._row('Lebar',r.lebar?(r.lebar+' m'):'-')}${this._row('Kondisi',r.kondisi)}${this._row('Perbaikan Terakhir',r.tahun_perbaikan||'-')}
    ${this._sect('Dampak Sosial')}
    ${this._row('Angkutan Umum',r.angkutan)}${this._row('Akses ke',r.akses_publik)}
    ${r.catatan?this._row('Catatan',r.catatan):''}
    ${this._acts('jalan',r.id)}</div>`; },

  parsil(r){ const cfg=CFG.parsil,bdg=cfg.badge(r);
    return `<div class="popup-wrap"><div class="popup-title">🏗️ ${H.esc(r.nama)}</div>
    <span class="badge ${bdg.c}">${bdg.t}</span>
    ${this._sect('Data Hukum')}
    ${this._row('NIB',r.nib||'-')}${this._row('Status Sengketa',r.sengketa)}${this._row('Penggunaan',r.penggunaan)}
    ${this._sect('Penilaian')}
    ${this._row('Luas',H.fmArea(r.luas))}${this._row('NJOP/m²',r.njop?'Rp '+parseInt(r.njop).toLocaleString('id-ID'):'-')}
    ${r.catatan?this._row('Catatan',r.catatan):''}
    ${this._acts('parsil',r.id)}</div>`; },

  warga(r){ const cfg=CFG.warga,clr=cfg.color(r),bdg=cfg.badge(r);
    const ri=Store.all('rumahIbadah');
    let nearestRI=null, nearestDist=Infinity;
    ri.forEach(hub=>{
      if(hub.lat==null||r.lat==null) return;
      const d=L.latLng(r.lat,r.lng).distanceTo(L.latLng(hub.lat,hub.lng));
      if(d<nearestDist){nearestDist=d;nearestRI=hub;}
    });
    const radius=nearestRI?(parseFloat(nearestRI.radius)||300):300;
    const covered=nearestRI&&nearestDist<=radius;
    const coverageHtml=nearestRI
      ?`<div class="coverage-badge ${covered?'covered':'uncovered'}">
          <svg viewBox="0 0 24 24"><path d="${covered?'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z':'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'}"/></svg>
          ${covered?'Terjangkau Hub: '+H.esc(nearestRI.nama)+' ('+Math.round(nearestDist)+' m)':'Tidak Terjangkau ('+Math.round(nearestDist)+' m dari RI)'}
        </div>`
      :'<div class="coverage-badge uncovered">Belum ada Rumah Ibadah Hub</div>';
    const histHtml=r.history_bansos?.length
      ?r.history_bansos.map(h=>`<div style="font-size:10px;padding:3px 0;border-bottom:1px solid var(--border0);display:flex;justify-content:space-between"><span>${H.esc(h.program)} (${h.tahun||'-'})</span><span class="status-${(h.status||'').toLowerCase().replace(' ','')}" style="font-weight:700">${H.esc(h.status)}</span></div>`).join('')
      :'<div style="font-size:10px;color:var(--text4)">Belum ada riwayat bansos</div>';
    return `<div class="popup-wrap"><div class="popup-title"><span class="popup-sym" style="background:${clr}"></span>${H.esc(r.nama)}</div>
    <span class="badge ${bdg.c}">${bdg.t}</span>
    ${coverageHtml}
    ${this._sect('Data Keluarga')}
    ${this._row('NIK',r.nik||'-')}${this._row('No. KK',r.no_kk||'-')}${this._row('Jml Anggota',r.jml_anggota+' jiwa')}
    ${this._sect('Ekonomi')}
    ${this._row('Pekerjaan KK',r.pekerjaan)}${this._row('Pendapatan/Bln',r.pendapatan?'Rp '+parseInt(r.pendapatan).toLocaleString('id-ID'):'-')}${this._row('Kondisi Rumah',r.kondisi_rumah)}
    ${this._sect('Fasilitas')}
    ${this._row('Air Bersih',r.air_bersih)}${this._row('Listrik',r.listrik)}
    ${this._sect('Bansos')}
    ${this._row('Bansos Saat Ini',r.bansos)}${this._row('Hub RI',r.hub_ri||'-')}
    <div style="margin-top:2px">${histHtml}</div>
    ${r.catatan?this._row('Rekomendasi',r.catatan):''}
    ${this._acts('warga',r.id)}</div>`; },

  rumahIbadah(r){ const cfg=CFG.rumahIbadah,clr=cfg.color(r),bdg=cfg.badge(r);
    return `<div class="popup-wrap"><div class="popup-title"><span class="popup-sym" style="background:${clr}"></span>${H.esc(r.nama)}</div>
    <span class="badge ${bdg.c}">${bdg.t}</span>
    ${this._sect('Kontak')}
    ${this._row('Ketua/Imam',r.ketua||'-')}${this._row('No. WA',r.wa||'-')}
    ${this._sect('Kapasitas & Binaan')}
    ${this._row('Kapasitas',r.kapasitas?r.kapasitas+' orang':'-')}${this._row('Radius Binaan',(r.radius||300)+' m')}${this._row('Warga Binaan',r.jml_binaan?r.jml_binaan+' KK':'-')}
    ${this._sect('Program Sosial')}
    ${this._row('Program Aktif',r.program)}${this._row('Dana Sosial/Bln',r.dana_sosial?'Rp '+parseInt(r.dana_sosial).toLocaleString('id-ID'):'-')}
    ${r.catatan?this._row('Catatan',r.catatan):''}
    ${this._acts('rumahIbadah',r.id)}</div>`; },
};
