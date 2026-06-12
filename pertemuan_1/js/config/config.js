/* ═══════════════════════════════════════════════════════════
   4. LAYER CONFIG (atribut + warna per layer)
   ── Ini adalah "kontrak data" antara programmer & client ──
═══════════════════════════════════════════════════════════ */
const CFG = {
  spbu: {
    label:'Data SPBU', sub:'Stasiun Bahan Bakar Umum', icon:'⛽', drawType:'point',
    color: r => r.buka24?'#34d47e':'#f05c5c',
    badge: r => r.buka24?{t:'24 Jam',c:'badge-green'}:{t:'Tutup',c:'badge-red'},
    legend:[{l:'Buka 24 Jam',clr:'#34d47e',sym:'c'},{l:'Tidak 24 Jam',clr:'#f05c5c',sym:'c'}],
  },
  jalan: {
    label:'Data Jalan', sub:'Ruas jalan berdasarkan status', icon:'🛣️', drawType:'polyline',
    statuses:['Nasional','Provinsi','Kabupaten','Desa'],
    colors:{'Nasional':'#f05c5c','Provinsi':'#f0a030','Kabupaten':'#5b9cf6','Desa':'#34d47e'},
    badgeClass:{'Nasional':'badge-red','Provinsi':'badge-amber','Kabupaten':'badge-accent','Desa':'badge-green'},
    kondisi:['Baik','Sedang','Rusak Ringan','Rusak Berat'],
    color: r => ({'Nasional':'#f05c5c','Provinsi':'#f0a030','Kabupaten':'#5b9cf6','Desa':'#34d47e'}[r.status]||'#888'),
    badge: r => ({t:r.status, c:{'Nasional':'badge-red','Provinsi':'badge-amber','Kabupaten':'badge-accent','Desa':'badge-green'}[r.status]||'badge-accent'}),
    legend:[{l:'Nasional',clr:'#f05c5c',sym:'l'},{l:'Provinsi',clr:'#f0a030',sym:'l'},{l:'Kabupaten',clr:'#5b9cf6',sym:'l'},{l:'Desa',clr:'#34d47e',sym:'l'}],
  },
  parsil: {
    label:'Data Parsil Tanah', sub:'Persil kavling berdasarkan kepemilikan', icon:'🏗️', drawType:'polygon',
    statuses:['SHM','HGB','HGU','HP','Belum Bersertifikat'],
    colors:{'SHM':'#34d47e','HGB':'#5b9cf6','HGU':'#f0a030','HP':'#9b7bfa','Belum Bersertifikat':'#f05c5c'},
    badgeClass:{'SHM':'badge-green','HGB':'badge-accent','HGU':'badge-amber','HP':'badge-purple','Belum Bersertifikat':'badge-red'},
    color: r => ({'SHM':'#34d47e','HGB':'#5b9cf6','HGU':'#f0a030','HP':'#9b7bfa','Belum Bersertifikat':'#f05c5c'}[r.status]||'#888'),
    badge: r => ({t:r.status,c:{'SHM':'badge-green','HGB':'badge-accent','HGU':'badge-amber','HP':'badge-purple','Belum Bersertifikat':'badge-red'}[r.status]||'badge-accent'}),
    legend:[{l:'SHM',clr:'#34d47e',sym:'p'},{l:'HGB',clr:'#5b9cf6',sym:'p'},{l:'HGU',clr:'#f0a030',sym:'p'},{l:'HP',clr:'#9b7bfa',sym:'p'},{l:'Belum Sertifikat',clr:'#f05c5c',sym:'p'}],
  },
  warga: {
    label:'Data Warga & Bansos', sub:'Keluarga rentan & sasaran distribusi bansos', icon:'👨‍👩‍👧', drawType:'point',
    tingkat:['Sangat Miskin','Miskin','Hampir Miskin','Rentan'],
    colors:{'Sangat Miskin':'#f05c5c','Miskin':'#f0a030','Hampir Miskin':'#f0c040','Rentan':'#5b9cf6'},
    badgeClass:{'Sangat Miskin':'badge-red','Miskin':'badge-orange','Hampir Miskin':'badge-amber','Rentan':'badge-accent'},
    color: r => ({'Sangat Miskin':'#f05c5c','Miskin':'#f0a030','Hampir Miskin':'#f0c040','Rentan':'#5b9cf6'}[r.tingkat_kemiskinan]||'#888'),
    badge: r => ({t:r.tingkat_kemiskinan,c:{'Sangat Miskin':'badge-red','Miskin':'badge-orange','Hampir Miskin':'badge-amber','Rentan':'badge-accent'}[r.tingkat_kemiskinan]||'badge-accent'}),
    legend:[{l:'Sangat Miskin',clr:'#f05c5c',sym:'c'},{l:'Miskin',clr:'#f0a030',sym:'c'},{l:'Hampir Miskin',clr:'#f0c040',sym:'c'},{l:'Rentan',clr:'#5b9cf6',sym:'c'}],
    bantuan:['PKH','BPNT/Sembako','BLT Dana Desa','BLT BBM','PIP/KIP','KIS/BPJS','Zakat/Infaq RI','Bansos Pemda','Belum Ada'],
    kondisiRumah:['Permanen','Semi Permanen','Tidak Layak Huni','Menumpang'],
    pekerjaan:['Buruh Harian','Petani/Nelayan','Pedagang Kecil','PNS/TNI/Polri','Pensiunan','Tidak Bekerja','Lainnya'],
    statusPenerimaan:['Aktif Menerima','Belum Menerima','Proses Verifikasi','Pernah Menerima'],
    sumberPendapatan:['Buruh Harian','Pedagang Kecil','Petani/Nelayan','PNS/TNI/Polri','Pensiunan','Tidak Bekerja','Lainnya'],
    jenisPenyakit:['Hipertensi','Diabetes','TBC','Jantung','Stroke','Kanker','Gangguan Jiwa','Disabilitas','Tidak Ada'],
    tingkatPendidikan:['Tidak Sekolah','SD/Sederajat','SMP/Sederajat','SMA/Sederajat','D3/S1','S2/S3'],
  },
  rumahIbadah: {
    label:'Rumah Ibadah', sub:'Masjid, Gereja, Pura, Vihara, Klenteng', icon:'🕌', drawType:'point',
    jenis:['Masjid','Musholla','Gereja Kristen','Gereja Katolik','Pura','Vihara','Klenteng'],
    colors:{'Masjid':'#2ec4b6','Musholla':'#2ec4b6','Gereja Kristen':'#5b9cf6','Gereja Katolik':'#5b9cf6','Pura':'#f0a030','Vihara':'#9b7bfa','Klenteng':'#f07840'},
    badgeClass:{'Masjid':'badge-teal','Musholla':'badge-teal','Gereja Kristen':'badge-accent','Gereja Katolik':'badge-accent','Pura':'badge-amber','Vihara':'badge-purple','Klenteng':'badge-orange'},
    color: r => ({'Masjid':'#2ec4b6','Musholla':'#2ec4b6','Gereja Kristen':'#5b9cf6','Gereja Katolik':'#5b9cf6','Pura':'#f0a030','Vihara':'#9b7bfa','Klenteng':'#f07840'}[r.jenis]||'#888'),
    badge: r => ({t:r.jenis,c:({'Masjid':'badge-teal','Musholla':'badge-teal','Gereja Kristen':'badge-accent','Gereja Katolik':'badge-accent','Pura':'badge-amber','Vihara':'badge-purple','Klenteng':'badge-orange'}[r.jenis]||'badge-teal')}),
    legend:[{l:'Masjid/Musholla',clr:'#2ec4b6',sym:'c'},{l:'Gereja',clr:'#5b9cf6',sym:'c'},{l:'Pura',clr:'#f0a030',sym:'c'},{l:'Vihara/Klenteng',clr:'#9b7bfa',sym:'c'}],
    coverageRadius: 300,
  },
};
