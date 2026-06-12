/* ═══════════════════════════════════════════════════════════
   12. DASHBOARD ANALITIK
═══════════════════════════════════════════════════════════ */
const Dashboard = {
  toggle(){
    document.getElementById('dash-panel').classList.toggle('hidden');
    if(!document.getElementById('dash-panel').classList.contains('hidden')) this.render();
  },
  render(){
    const db=Store.allDb();
    const warga=db.warga||[], ri=db.rumahIbadah||[], jalan=db.jalan||[], parsil=db.parsil||[];
    const totalWarga=warga.reduce((s,r)=>s+(parseInt(r.jml_anggota)||1),0);
    const miskinBerat=warga.filter(r=>r.tingkat_kemiskinan==='Sangat Miskin'||r.tingkat_kemiskinan==='Miskin').length;
    const blmBansos=warga.filter(r=>r.bansos==='Belum Ada').length;
    const blmSertif=parsil.filter(r=>r.status==='Belum Bersertifikat').length;
    const jalanRusak=jalan.filter(r=>r.kondisi==='Rusak Berat'||r.kondisi==='Rusak Ringan').length;
    const totalRI=ri.length;

    // Radius coverage for Warga layer
    let coveredKK=0, uncoveredKK=0;
    const coverageHubs = ri.map(hub=>({ ...hub, count:0 }));
    warga.forEach(b => {
      if(!b.lat) return;
      let nearestDist=Infinity, nearestHub=null;
      ri.forEach(hub=>{
        if(!hub.lat) return;
        const d=L.latLng(b.lat,b.lng).distanceTo(L.latLng(hub.lat,hub.lng));
        if(d<nearestDist){nearestDist=d;nearestHub=hub;}
      });
      if(nearestHub && nearestDist<=(parseFloat(nearestHub.radius)||300)){
        coveredKK++;
        const h = coverageHubs.find(h=>h.id===nearestHub.id);
        if(h) h.count++;
      } else {
        uncoveredKK++;
      }
    });

    // tingkat kemiskinan breakdown
    const tkBreak={};
    CFG.warga.tingkat.forEach(t=>{ tkBreak[t]=warga.filter(r=>r.tingkat_kemiskinan===t).length; });
    const maxTK=Math.max(...Object.values(tkBreak),1);

    // bansos breakdown
    const bansosBreak={};
    CFG.warga.bantuan.forEach(b=>{ const c=warga.filter(r=>r.bansos===b).length; if(c>0) bansosBreak[b]=c; });

    // jalan status breakdown
    const jalanBreak={};
    CFG.jalan.statuses.forEach(s=>{ jalanBreak[s]=jalan.filter(r=>r.status===s).length; });

    document.getElementById('dash-body').innerHTML=`
    <div class="dash-tab-bar">
      <div class="dash-tab active" onclick="Dashboard.switchTab('ringkasan')">Ringkasan Utama</div>
      <div class="dash-tab" onclick="Dashboard.switchTab('distribusi')">Distribusi Bansos</div>
    </div>

    <!-- TAB RINGKASAN -->
    <div id="dash-panel-ringkasan">
      <div class="stat-grid">
        <div class="stat-card c-red"><div class="sc-val">${H.fmNum(warga.length)}</div><div class="sc-label">KK Warga Miskin Terdata</div><div class="sc-sub">${H.fmNum(totalWarga)} jiwa total</div></div>
        <div class="stat-card c-amber"><div class="sc-val">${H.fmNum(miskinBerat)}</div><div class="sc-label">Miskin & Sangat Miskin</div><div class="sc-sub">${warga.length?Math.round(miskinBerat/warga.length*100):0}% dari total KK</div></div>
        <div class="stat-card c-accent"><div class="sc-val">${H.fmNum(blmBansos)}</div><div class="sc-label">KK Belum Terima Bansos</div><div class="sc-sub">Perlu intervensi segera</div></div>
        <div class="stat-card c-teal"><div class="sc-val">${H.fmNum(totalRI)}</div><div class="sc-label">Rumah Ibadah Aktif</div><div class="sc-sub">Agen lapangan terdaftar</div></div>
        <div class="stat-card c-purple"><div class="sc-val">${H.fmNum(blmSertif)}</div><div class="sc-label">Parsil Belum Bersertifikat</div><div class="sc-sub">Kandidat program PTSL</div></div>
        <div class="stat-card c-green"><div class="sc-val">${H.fmNum(jalanRusak)}</div><div class="sc-label">Ruas Jalan Rusak</div><div class="sc-sub">Dari ${H.fmNum(jalan.length)} ruas terdata</div></div>
      </div>

    <div class="dash-sect">
      <div class="dash-sect-title">Sebaran Tingkat Kemiskinan</div>
      <table class="risk-table"><thead><tr><th>Kategori</th><th>Jumlah KK</th><th>Proporsi</th></tr></thead><tbody>
      ${CFG.warga.tingkat.map(t=>{
        const n=tkBreak[t]||0, pct=warga.length?Math.round(n/warga.length*100):0;
        const clr={'Sangat Miskin':'#f05c5c','Miskin':'#f0a030','Hampir Miskin':'#f0c040','Rentan':'#5b9cf6'}[t];
        return \`<tr><td>\${t}</td><td>\${H.fmNum(n)} KK</td><td><div class="risk-bar-wrap"><div class="risk-bar"><div class="risk-bar-fill" style="width:\${Math.round(n/maxTK*100)}%;background:\${clr}"></div></div>\${pct}%</div></td></tr>\`;
      }).join('')}
      </tbody></table>
    </div>

    <div class="dash-sect">
      <div class="dash-sect-title">Penerima Program Bantuan Sosial</div>
      ${Object.entries(bansosBreak).length?Object.entries(bansosBreak).sort((a,b)=>b[1]-a[1]).map(([b,n])=>`
        <div class="prog-row"><span class="prog-name">${b}</span><span class="prog-count">${n} KK</span></div>`).join('')
      :'<div style="color:var(--text4);font-size:12px">Belum ada data warga tercatat.</div>'}
    </div>

    <div class="dash-sect">
      <div class="dash-sect-title">Status Ruas Jalan</div>
      <table class="risk-table"><thead><tr><th>Status</th><th>Jumlah Ruas</th><th>Total Panjang</th></tr></thead><tbody>
      ${CFG.jalan.statuses.map(s=>{
        const ruas=jalan.filter(r=>r.status===s);
        const pj=ruas.reduce((t,r)=>t+(r.panjang||0),0);
        return \`<tr><td><span class="badge \${CFG.jalan.badgeClass[s]}">\${s}</span></td><td>\${ruas.length} ruas</td><td>\${H.fmDist(pj)}</td></tr>\`;
      }).join('')}
      </tbody></table>
    </div>

    <div class="dash-sect">
      <div class="dash-sect-title">Rekomendasi Intervensi Kebijakan</div>
      <div class="intervensi-grid">
        <div class="intervensi-card"><div class="ic-label">🏠 Prioritas Bansos</div>
          <div class="ic-val">${H.fmNum(blmBansos)} KK</div>
          <div class="ic-sub">Warga belum menerima bantuan apapun</div></div>
        <div class="intervensi-card"><div class="ic-label">📜 Prioritas PTSL</div>
          <div class="ic-val">${H.fmNum(blmSertif)} Parsil</div>
          <div class="ic-sub">Lahan tanpa sertifikat, akses kredit terbatas</div></div>
        <div class="intervensi-card"><div class="ic-label">🛣️ Prioritas Perbaikan Jalan</div>
          <div class="ic-val">${H.fmNum(jalanRusak)} Ruas</div>
          <div class="ic-sub">Jalan rusak ringan-berat perlu perbaikan</div></div>
        <div class="intervensi-card"><div class="ic-label">🕌 Coverage Rumah Ibadah</div>
          <div class="ic-val">${H.fmNum(totalRI)} RI Aktif</div>
          <div class="ic-sub">Total dana sosial: Rp ${H.fmNum(ri.reduce((t,r)=>t+(parseInt(r.dana_sosial)||0),0))}</div></div>
      </div>
    </div>
    </div>

    <!-- TAB DISTRIBUSI BANSOS -->
    <div id="dash-panel-distribusi" style="display:none">
      <div class="coverage-grid">
        <div class="coverage-card">
          <div class="cc-icon green">✓</div>
          <div class="cc-info">
            <div class="cc-val">${coveredKK} KK</div>
            <div class="cc-label">Terjangkau Hub (≤300m)</div>
          </div>
        </div>
        <div class="coverage-card">
          <div class="cc-icon red">✕</div>
          <div class="cc-info">
            <div class="cc-val">${uncoveredKK} KK</div>
            <div class="cc-label">Di Luar Jangkauan Hub</div>
          </div>
        </div>
        <div class="coverage-card" style="grid-column:1/3;padding:16px">
          <div class="cc-icon teal" style="width:40px;height:40px">🕌</div>
          <div class="cc-info">
            <div class="cc-val">${totalRI} Rumah Ibadah</div>
            <div class="cc-label">Agen Distribusi Lapangan Terdaftar</div>
          </div>
        </div>
      </div>

      <div class="dash-sect">
        <div class="dash-sect-title">Beban Distribusi per Rumah Ibadah</div>
        <table class="hub-table">
          <thead><tr><th>Nama Hub</th><th>Kapasitas</th><th>Beban KK</th></tr></thead>
          <tbody>
          ${coverageHubs.sort((a,b)=>b.count-a.count).map(h=>{
            const clr=CFG.rumahIbadah.color(h);
            const max = Math.max(...coverageHubs.map(x=>x.count), 1);
            const pct = Math.round(h.count/max*100);
            return \`<tr>
              <td><div class="hub-name-cell"><span class="hub-dot" style="background:\${clr}"></span>\${H.esc(h.nama)}</div></td>
              <td>\${h.jml_binaan||'-'} KK</td>
              <td>
                <div class="hub-count-bar">
                  <div class="hub-bar"><div class="hub-bar-fill" style="width:\${pct}%;background:\${pct>80?'var(--amber)':clr}"></div></div>
                  <span>\${h.count} KK</span>
                </div>
              </td>
            </tr>\`;
          }).join('')}
          </tbody>
        </table>
        ${coverageHubs.length===0?'<div style="text-align:center;color:var(--text4);font-size:11px;padding:20px">Belum ada data Rumah Ibadah.</div>':''}
      </div>
    </div>`;
  },

  switchTab(tabId){
    document.querySelectorAll('.dash-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('[id^="dash-panel-"]').forEach(p=>p.style.display='none');
    
    if(tabId === 'ringkasan'){
      document.querySelectorAll('.dash-tab')[0].classList.add('active');
      document.getElementById('dash-panel-ringkasan').style.display='block';
    } else {
      document.querySelectorAll('.dash-tab')[1].classList.add('active');
      document.getElementById('dash-panel-distribusi').style.display='block';
    }
  }
};
