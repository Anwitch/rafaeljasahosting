/* ═══════════════════════════════════════════════════════════
   5. FORM BUILDERS
═══════════════════════════════════════════════════════════ */
const Forms = {
  spbu(rec, latlng){
    const lat=latlng?latlng.lat.toFixed(6):(rec?.lat?.toFixed(6)||'');
    const lng=latlng?latlng.lng.toFixed(6):(rec?.lng?.toFixed(6)||'');
    const v=f=>rec?H.esc(rec[f]||''):'';
    return `
    <div class="info-box">📍 Koordinat: <strong>${lat}, ${lng}</strong></div>
    <div class="form-sect">Identitas & Operasional</div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">Nama SPBU<span class="req">*</span></label>
        <input class="finput" id="f-nama" placeholder="cth: SPBU 64.754.01" value="${v('nama')}"/></div>
      <div class="fg"><label class="flabel">No. WhatsApp</label>
        <input class="finput" id="f-wa" placeholder="081234..." value="${v('wa')}"/></div>
    </div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">Jenis BBM Tersedia</label>
        <select class="finput" id="f-jenis_bbm">
          ${['Pertalite & Pertamax','Pertalite Saja','Pertamax Series','Solar & Pertamina Dex','Semua Jenis'].map(j=>`<option ${v('jenis_bbm')===j?'selected':''}>${j}</option>`).join('')}
        </select></div>
      <div class="fg"><label class="flabel">Buka 24 Jam?</label>
        <div class="rtoggle" id="rtog">
          <label class="ropt ${rec?.buka24!==false?'yes':''}" data-v="true">
            <input type="radio" name="buka24" value="true" ${rec?.buka24!==false?'checked':''}/>✓ Ya
          </label>
          <label class="ropt ${rec?.buka24===false?'no':''}" data-v="false">
            <input type="radio" name="buka24" value="false" ${rec?.buka24===false?'checked':''}/>✗ Tidak
          </label>
        </div></div>
    </div>
    <div class="form-sect">Aksesibilitas & Sosial</div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">Pelayanan Disabilitas</label>
        <select class="finput" id="f-disabilitas">
          ${['Ada','Tidak Ada','Dalam Proses'].map(j=>`<option ${v('disabilitas')===j?'selected':''}>${j}</option>`).join('')}
        </select></div>
      <div class="fg"><label class="flabel">Harga BBM Subsidi</label>
        <select class="finput" id="f-harga_bbm">
          ${['Sesuai HET','Di Atas HET','Tidak Menjual Subsidi'].map(j=>`<option ${v('harga_bbm')===j?'selected':''}>${j}</option>`).join('')}
        </select></div>
    </div>
    <div class="form-sect">Catatan Lapangan</div>
    <div class="fg"><label class="flabel">Catatan / Keterangan Tambahan</label>
      <textarea class="finput" id="f-catatan" placeholder="Kondisi antrean, ketersediaan stok, dll...">${v('catatan')}</textarea></div>`;
  },

  jalan(rec, len){
    const pj=len??rec?.panjang??0; const v=f=>rec?H.esc(rec[f]||''):'';
    return `
    <div class="info-box">📏 Panjang terukur otomatis: <strong>${H.fmDist(pj)}</strong></div>
    <input type="hidden" id="f-panjang" value="${pj}"/>
    <div class="form-sect">Identitas Ruas Jalan</div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">Nama Ruas Jalan<span class="req">*</span></label>
        <input class="finput" id="f-nama" placeholder="cth: Jl. H. Rais A Rahman" value="${v('nama')}"/></div>
      <div class="fg"><label class="flabel">Status Jalan<span class="req">*</span></label>
        <select class="finput" id="f-status">
          ${CFG.jalan.statuses.map(s=>`<option ${v('status')===s?'selected':''}>${s}</option>`).join('')}
        </select></div>
    </div>
    <div class="form-sect">Kondisi & Infrastruktur</div>
    <div class="form-row cols3">
      <div class="fg"><label class="flabel">Kondisi Jalan</label>
        <select class="finput" id="f-kondisi">
          ${CFG.jalan.kondisi.map(k=>`<option ${v('kondisi')===k?'selected':''}>${k}</option>`).join('')}
        </select></div>
      <div class="fg"><label class="flabel">Tahun Perbaikan Terakhir</label>
        <input class="finput" id="f-tahun_perbaikan" type="number" min="2000" max="2030" placeholder="2023" value="${v('tahun_perbaikan')}"/></div>
      <div class="fg"><label class="flabel">Lebar Jalan (meter)</label>
        <input class="finput" id="f-lebar" type="number" min="1" max="50" placeholder="4" value="${v('lebar')}"/></div>
    </div>
    <div class="form-sect">Dampak Sosial-Ekonomi</div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">Dilalui Angkutan Umum</label>
        <select class="finput" id="f-angkutan">
          ${['Ya','Tidak'].map(k=>`<option ${v('angkutan')===k?'selected':''}>${k}</option>`).join('')}
        </select></div>
      <div class="fg"><label class="flabel">Akses ke Fasilitas Publik</label>
        <select class="finput" id="f-akses_publik">
          ${['Pasar','RS/Puskesmas','Sekolah','Kantor Pemerintah','Tidak Ada'].map(k=>`<option ${v('akses_publik')===k?'selected':''}>${k}</option>`).join('')}
        </select></div>
    </div>
    <div class="fg"><label class="flabel">Catatan Kondisi</label>
      <textarea class="finput" id="f-catatan" placeholder="Kondisi berlubang, banjir saat hujan, dll...">${v('catatan')}</textarea></div>`;
  },

  parsil(rec, area){
    const ls=area??rec?.luas??0; const v=f=>rec?H.esc(rec[f]||''):'';
    return `
    <div class="info-box">📐 Luas terukur otomatis: <strong>${H.fmArea(ls)}</strong></div>
    <input type="hidden" id="f-luas" value="${ls}"/>
    <div class="form-sect">Identitas Parsil</div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">Nama / ID Parsil<span class="req">*</span></label>
        <input class="finput" id="f-nama" placeholder="cth: Kavling A-01" value="${v('nama')}"/></div>
      <div class="fg"><label class="flabel">Nomor Induk Bidang (NIB)</label>
        <input class="finput" id="f-nib" placeholder="14.02.01.001" value="${v('nib')}"/></div>
    </div>
    <div class="form-sect">Status Kepemilikan</div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">Status Sertifikat<span class="req">*</span></label>
        <select class="finput" id="f-status">
          ${CFG.parsil.statuses.map(s=>`<option ${v('status')===s?'selected':''}>${s}</option>`).join('')}
        </select></div>
      <div class="fg"><label class="flabel">Sengketa / Masalah Hukum</label>
        <select class="finput" id="f-sengketa">
          ${['Tidak Ada','Ada Sengketa','Dalam Proses PTSL','Klaim Pihak Lain'].map(k=>`<option ${v('sengketa')===k?'selected':''}>${k}</option>`).join('')}
        </select></div>
    </div>
    <div class="form-sect">Penilaian & Pemanfaatan</div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">NJOP (Rp/m²)</label>
        <input class="finput" id="f-njop" type="number" placeholder="500000" value="${v('njop')}"/></div>
      <div class="fg"><label class="flabel">Penggunaan Lahan</label>
        <select class="finput" id="f-penggunaan">
          ${['Rumah Tinggal','Lahan Kosong','Pertanian','Usaha/Warung','Fasilitas Umum','Lainnya'].map(k=>`<option ${v('penggunaan')===k?'selected':''}>${k}</option>`).join('')}
        </select></div>
    </div>
    <div class="fg"><label class="flabel">Catatan Tambahan</label>
      <textarea class="finput" id="f-catatan" placeholder="Kondisi, penghuni, riwayat...">${v('catatan')}</textarea></div>`;
  },

  warga(rec, latlng){
    const lat=latlng?latlng.lat.toFixed(6):(rec?.lat?.toFixed(6)||'');
    const lng=latlng?latlng.lng.toFixed(6):(rec?.lng?.toFixed(6)||'');
    const v=f=>rec?H.esc(rec[f]||''):'';
    const c=v=>rec?.penyakit?.includes(v)?'checked':'';
    const hist=rec?.history_bansos||[];
    const ri = Store.all('rumahIbadah');
    const hubOpts = ['Belum ditugaskan', ...ri.map(r=>r.nama)].map(opt=>`<option ${v('hub_ri')===opt?'selected':''}>${opt}</option>`).join('');

    return `
    <div class="info-box warn">⚠️ Data warga bersifat sensitif. Pastikan survei akurat.</div>
    <div class="info-box">📍 Koordinat: <strong>${lat}, ${lng}</strong></div>
    <div class="form-tabs">
      <div class="form-tab active" data-panel="kk">Data KK</div>
      <div class="form-tab" data-panel="eko">Ekonomi</div>
      <div class="form-tab" data-panel="pddk">Pddk</div>
      <div class="form-tab" data-panel="kes">Kes</div>
      <div class="form-tab" data-panel="hist">Bansos</div>
    </div>

    <!-- TAB: Data KK -->
    <div class="form-section-panel active" id="panel-kk">
      <div class="form-row cols2">
        <div class="fg"><label class="flabel">Nama KK<span class="req">*</span></label>
          <input class="finput" id="f-nama" placeholder="Nama KTP" value="${v('nama')}"/></div>
        <div class="fg"><label class="flabel">NIK</label>
          <input class="finput" id="f-nik" placeholder="3471..." maxlength="16" value="${v('nik')}"/></div>
      </div>
      <div class="form-row cols2">
        <div class="fg"><label class="flabel">No. KK</label>
          <input class="finput" id="f-no_kk" value="${v('no_kk')}"/></div>
        <div class="fg"><label class="flabel">WA/HP</label>
          <input class="finput" id="f-wa" value="${v('wa')}"/></div>
      </div>
      <div class="form-row cols3">
        <div class="fg"><label class="flabel">Tingkat Kemiskinan</label>
          <select class="finput" id="f-tingkat_kemiskinan">
            ${CFG.warga.tingkat.map(t=>`<option ${v('tingkat_kemiskinan')===t?'selected':''}>${t}</option>`).join('')}
          </select></div>
        <div class="fg"><label class="flabel">Jml Anggota</label>
          <input class="finput" id="f-jml_anggota" type="number" placeholder="4" value="${v('jml_anggota')}"/></div>
        <div class="fg"><label class="flabel">Jml Lansia</label>
          <input class="finput" id="f-jml_lansia" type="number" placeholder="0" value="${v('jml_lansia')}"/></div>
      </div>
      <div class="fg"><label class="flabel">Alamat</label>
        <textarea class="finput" id="f-alamat" style="min-height:40px">${v('alamat')}</textarea></div>
      <div class="form-row cols2">
        <div class="fg"><label class="flabel">Penerima Bansos</label>
          <select class="finput" id="f-bansos">
            ${CFG.warga.bantuan.map(b=>`<option ${v('bansos')===b?'selected':''}>${b}</option>`).join('')}
          </select></div>
        <div class="fg"><label class="flabel">Hub Rumah Ibadah</label>
          <select class="finput" id="f-hub_ri">${hubOpts}</select></div>
      </div>
    </div>

    <!-- TAB: Ekonomi -->
    <div class="form-section-panel" id="panel-eko">
      <div class="form-row cols2">
        <div class="fg"><label class="flabel">Pendapatan (Rp/Bln)</label>
          <input class="finput" id="f-pendapatan" type="number" value="${v('pendapatan')}"/></div>
        <div class="fg"><label class="flabel">Pekerjaan KK</label>
          <select class="finput" id="f-pekerjaan">
            ${CFG.warga.pekerjaan.map(p=>`<option ${v('pekerjaan')===p?'selected':''}>${p}</option>`).join('')}
          </select></div>
      </div>
      <div class="form-row cols2">
        <div class="fg"><label class="flabel">Kondisi Rumah</label>
          <select class="finput" id="f-kondisi_rumah">
            ${CFG.warga.kondisiRumah.map(k=>`<option ${v('kondisi_rumah')===k?'selected':''}>${k}</option>`).join('')}
          </select></div>
        <div class="fg"><label class="flabel">Aset (Tanah/Kendaraan)</label>
          <select class="finput" id="f-kepemilikan_aset">
            ${['Tidak Ada','Motor Tua','Motor Baru','Tanah','Mobil'].map(j=>`<option ${v('kepemilikan_aset')===j?'selected':''}>${j}</option>`).join('')}
          </select></div>
      </div>
      <div class="form-row cols2">
        <div class="fg"><label class="flabel">Air Bersih</label>
          <select class="finput" id="f-air_bersih">
            ${['PDAM','Sumur','Sungai/Tadah Hujan'].map(j=>`<option ${v('air_bersih')===j?'selected':''}>${j}</option>`).join('')}
          </select></div>
        <div class="fg"><label class="flabel">Listrik</label>
          <select class="finput" id="f-listrik">
            ${['Sendiri (>900W)','Subsidi (450/900W)','Numpang/Tidak Ada'].map(j=>`<option ${v('listrik')===j?'selected':''}>${j}</option>`).join('')}
          </select></div>
      </div>
    </div>

    <!-- TAB: Pendidikan -->
    <div class="form-section-panel" id="panel-pddk">
      <div class="form-row cols2">
        <div class="fg"><label class="flabel">Pendidikan Terakhir KK</label>
          <select class="finput" id="f-pendidikan_kk">
            ${CFG.warga.tingkatPendidikan.map(j=>`<option ${v('pendidikan_kk')===j?'selected':''}>${j}</option>`).join('')}
          </select></div>
        <div class="fg"><label class="flabel">Anak Bersekolah</label>
          <input class="finput" id="f-jml_anak" type="number" placeholder="1" value="${v('jml_anak')}"/></div>
      </div>
      <div class="form-row cols2">
        <div class="fg"><label class="flabel">Anak Putus Sekolah</label>
          <input class="finput" id="f-anak_putus_sekolah" type="number" placeholder="0" value="${v('anak_putus_sekolah')}"/></div>
        <div class="fg"><label class="flabel">Penerima KIP/Beasiswa?</label>
          <select class="finput" id="f-penerima_beasiswa">
            ${['Ya','Tidak'].map(j=>`<option ${v('penerima_beasiswa')===j?'selected':''}>${j}</option>`).join('')}
          </select></div>
      </div>
    </div>

    <!-- TAB: Kesehatan -->
    <div class="form-section-panel" id="panel-kes">
      <div class="form-row cols2">
        <div class="fg"><label class="flabel">Kepesertaan BPJS</label>
          <select class="finput" id="f-bpjs">
            ${['PBI (Gratis)','Mandiri','Perusahaan','Tidak Punya BPJS'].map(j=>`<option ${v('bpjs')===j?'selected':''}>${j}</option>`).join('')}
          </select></div>
        <div class="fg"><label class="flabel">Anggota Difabel/Kronis</label>
          <input class="finput" id="f-jml_sakit_kronis" type="number" value="${v('jml_sakit_kronis')}"/></div>
      </div>
      <div class="fg"><label class="flabel">Jenis Penyakit Khusus</label>
        <div class="penyakit-grid">
          ${CFG.warga.jenisPenyakit.map(p=>`<label class="penyakit-check ${c(p)}"><input type="checkbox" name="penyakit" value="${p}" ${c(p)}/>${p}</label>`).join('')}
        </div>
      </div>
    </div>

    <!-- TAB: Riwayat Bansos -->
    <div class="form-section-panel" id="panel-hist">
      <table class="history-table">
        <thead><tr><th>Program</th><th style="width:60px">Thn</th><th>Status</th><th style="width:28px"></th></tr></thead>
        <tbody id="hist-tbody">
          ${hist.map(h=>`
            <tr>
              <td><input class="finput hist-program" style="padding:3px" value="${H.esc(h.program)}"/></td>
              <td><input class="finput hist-tahun" style="padding:3px" type="number" value="${h.tahun}"/></td>
              <td><select class="finput hist-status" style="padding:3px"><option ${h.status==='Aktif'?'selected':''}>Aktif</option><option ${h.status==='Berhenti'?'selected':''}>Berhenti</option></select></td>
              <td><button class="btn-del-row" type="button" onclick="this.closest('tr').remove()">✕</button></td>
            </tr>`).join('')}
        </tbody>
      </table>
      <button class="btn-add-row" type="button" id="btn-add-hist">+ Tambah</button>
      <div class="fg" style="margin-top:10px"><label class="flabel">Catatan / Rekomendasi</label>
        <textarea class="finput" id="f-catatan" style="min-height:50px">${v('catatan')}</textarea></div>
    </div>`;
  },

  rumahIbadah(rec, latlng){
    const lat=latlng?latlng.lat.toFixed(6):(rec?.lat?.toFixed(6)||'');
    const lng=latlng?latlng.lng.toFixed(6):(rec?.lng?.toFixed(6)||'');
    const v=f=>rec?H.esc(rec[f]||''):'';
    return `
    <div class="info-box">📍 Koordinat: <strong>${lat}, ${lng}</strong></div>
    <div class="form-sect">Identitas Rumah Ibadah</div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">Nama Rumah Ibadah<span class="req">*</span></label>
        <input class="finput" id="f-nama" placeholder="cth: Masjid Al-Ikhlas" value="${v('nama')}"/></div>
      <div class="fg"><label class="flabel">Jenis<span class="req">*</span></label>
        <select class="finput" id="f-jenis">
          ${CFG.rumahIbadah.jenis.map(j=>`<option ${v('jenis')===j?'selected':''}>${j}</option>`).join('')}
        </select></div>
    </div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">Nama Ketua / Imam / Pastor</label>
        <input class="finput" id="f-ketua" placeholder="Nama lengkap" value="${v('ketua')}"/></div>
      <div class="fg"><label class="flabel">No. WhatsApp Pengurus</label>
        <input class="finput" id="f-wa" placeholder="081..." value="${v('wa')}"/></div>
    </div>
    <div class="form-sect">Kapasitas & Jangkauan</div>
    <div class="form-row cols3">
      <div class="fg"><label class="flabel">Kapasitas Jamaah</label>
        <input class="finput" id="f-kapasitas" type="number" placeholder="200" value="${v('kapasitas')}"/></div>
      <div class="fg"><label class="flabel">Radius Wilayah Binaan (m)</label>
        <input class="finput" id="f-radius" type="number" placeholder="300" value="${v('radius')||300}"/></div>
      <div class="fg"><label class="flabel">Jml Warga Binaan</label>
        <input class="finput" id="f-jml_binaan" type="number" placeholder="150" value="${v('jml_binaan')}"/></div>
    </div>
    <div class="form-sect">Program Sosial</div>
    <div class="form-row cols2">
      <div class="fg"><label class="flabel">Program Aktif</label>
        <select class="finput" id="f-program">
          ${['Baznas/Zakat','Bantuan Sembako','Santunan Anak Yatim','Pemberdayaan UMKM','Beasiswa','Belum Ada'].map(k=>`<option ${v('program')===k?'selected':''}>${k}</option>`).join('')}
        </select></div>
      <div class="fg"><label class="flabel">Dana Sosial/Bulan (Rp)</label>
        <input class="finput" id="f-dana_sosial" type="number" placeholder="2000000" value="${v('dana_sosial')}"/></div>
    </div>
    <div class="fg"><label class="flabel">Catatan / Kebutuhan Dukungan</label>
      <textarea class="finput" id="f-catatan" placeholder="Kebutuhan data, pelatihan, dll...">${v('catatan')}</textarea></div>`;
  },

  readAll(ln){
    const g = id => document.getElementById(id)?.value?.trim();
    if(ln==='spbu'){
      const nm=g('f-nama'); if(!nm){Toast.error('Nama SPBU wajib diisi!');return null;}
      const buka=document.querySelector('input[name="buka24"]:checked')?.value!=='false';
      return {nama:nm,wa:g('f-wa'),buka24:buka,jenis_bbm:g('f-jenis_bbm'),disabilitas:g('f-disabilitas'),harga_bbm:g('f-harga_bbm'),catatan:g('f-catatan')};
    }
    if(ln==='jalan'){
      const nm=g('f-nama'); if(!nm){Toast.error('Nama jalan wajib diisi!');return null;}
      return {nama:nm,status:g('f-status'),panjang:parseFloat(g('f-panjang'))||0,kondisi:g('f-kondisi'),tahun_perbaikan:g('f-tahun_perbaikan'),lebar:g('f-lebar'),angkutan:g('f-angkutan'),akses_publik:g('f-akses_publik'),catatan:g('f-catatan')};
    }
    if(ln==='parsil'){
      const nm=g('f-nama'); if(!nm){Toast.error('Nama parsil wajib diisi!');return null;}
      return {nama:nm,status:g('f-status'),luas:parseFloat(g('f-luas'))||0,nib:g('f-nib'),sengketa:g('f-sengketa'),njop:g('f-njop'),penggunaan:g('f-penggunaan'),catatan:g('f-catatan')};
    }
    if(ln==='warga'){
      const nm=g('f-nama'); if(!nm){Toast.error('Nama KK wajib diisi!');return null;}
      const penyakit=[...document.querySelectorAll('input[name="penyakit"]:checked')].map(el=>el.value);
      const history_bansos=[];
      document.querySelectorAll('#hist-tbody tr').forEach(tr=>{
        const prog=tr.querySelector('.hist-program')?.value?.trim();
        const thn=tr.querySelector('.hist-tahun')?.value?.trim();
        const sts=tr.querySelector('.hist-status')?.value;
        if(prog) history_bansos.push({program:prog,tahun:parseInt(thn)||new Date().getFullYear(),status:sts});
      });
      return {
        nama: nm, nik: g('f-nik'), no_kk: g('f-no_kk'), wa: g('f-wa'), tingkat_kemiskinan: g('f-tingkat_kemiskinan'),
        jml_anggota: parseInt(g('f-jml_anggota'))||0, jml_lansia: parseInt(g('f-jml_lansia'))||0,
        alamat: g('f-alamat'), bansos: g('f-bansos'), hub_ri: g('f-hub_ri'),
        pendapatan: g('f-pendapatan'), pekerjaan: g('f-pekerjaan'),
        kondisi_rumah: g('f-kondisi_rumah'), kepemilikan_aset: g('f-kepemilikan_aset'),
        air_bersih: g('f-air_bersih'), listrik: g('f-listrik'),
        pendidikan_kk: g('f-pendidikan_kk'), jml_anak: parseInt(g('f-jml_anak'))||0,
        anak_putus_sekolah: parseInt(g('f-anak_putus_sekolah'))||0, penerima_beasiswa: g('f-penerima_beasiswa'),
        bpjs: g('f-bpjs'), jml_sakit_kronis: parseInt(g('f-jml_sakit_kronis'))||0,
        penyakit, history_bansos, catatan: g('f-catatan'),
      };
    }
    if(ln==='rumahIbadah'){
      const nm=g('f-nama'); if(!nm){Toast.error('Nama Rumah Ibadah wajib diisi!');return null;}
      return {
        nama: nm, jenis: g('f-jenis'), ketua: g('f-ketua'), wa: g('f-wa'),
        kapasitas: parseInt(g('f-kapasitas'))||0, radius: parseFloat(g('f-radius'))||300,
        jml_binaan: parseInt(g('f-jml_binaan'))||0, program: g('f-program'),
        dana_sosial: g('f-dana_sosial'), catatan: g('f-catatan')
      };
    }
  }
};
