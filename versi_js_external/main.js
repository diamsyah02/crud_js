/* Created By Diamsyah M Dida */

// function/fungsi ketika browser di load
function firstLoad(){
    // jalankan function/fungsi menampilkan data tabungan
    tampilkanDataTabungan();
}

// function/fungsi untuk menampilakan data tabungan
function tampilkanDataTabungan(){
    // hide/sembunyikan form edit tabungan
    document.getElementById('form_edit').style.display = 'none';

    // kosongkan form tambah tabungan
    document.getElementById('nama_penabung').value = '';
    document.getElementById('nominal_menabung').value = 0;
    document.getElementById('tanggal_menabung').value = '';

    // ambil data tabungan di local storage lalu parse & masukkan ke variable dataTabungan
    var dataTabungan = JSON.parse(localStorage.getItem('tabungan'));

    // buat variable isTabungan kasih nilai string kosong
    var isTabungan = '';

    // buat variable kutip kasih nilai kutip satu(');
    var kutip = "'";

    // jika data tabungan di local storage tidak ada
    if (dataTabungan === null || dataTabungan.length === 0) {

        // hide/sembunyikan tabel untuk menampilkan data tabungan
        document.getElementById('table_tabungan').style.display = 'none';
        document.getElementById('tabungan').innerHTML = isTabungan;

    // jika data tabungan di local storage ada
    } else {

        // show/tampilkan tabel untuk menampilkan data tabungan
        document.getElementById('table_tabungan').style.display = 'block';

        // looping data tabungan yang ada di local storage
        dataTabungan.forEach(function (data, index) {

            // variable isTabungan di isi nilai
            isTabungan += '<tr>' +
                '<td>' + data.id + '</td>' +
                '<td>' + data.namaPenabung + '</td>' +
                '<td>Rp ' + Number(data.nominalMenabung).toLocaleString('ID') + '</td>' +
                '<td>' + data.tanggalMenabung + '</td>' +
                '<td>' +
                '<a class="btn btn-danger text-light" onclick="hapusData(' + kutip + Number(index) + kutip + ')">Hapus</a>&nbsp;' +
                '<a class="btn btn-warning text-light" onclick="editData(' + kutip + Number(index) + kutip + ')">Edit</a>' +
                '</td>' +
                '</tr>';
        });

        // suntikan atau masukkan variable isTabungan ke dalam tag html dengan properti id="tabungan"
        document.getElementById('tabungan').innerHTML = isTabungan;
    }
}

// function/fungsi untuk menyimpan data tabungan ke local storage
function simpanData(){
    // semua inputan pada form menabung masukkan pada variable nama, nominal, tanggal
    // data inputan di tangkap menggunakan properti id pada tag <input>
    var nama = document.getElementById('nama_penabung').value;
    var nominal = document.getElementById('nominal_menabung').value;
    var tanggal = document.getElementById('tanggal_menabung').value;

    // jika form tambah tabungan tidak semua di isi
    if(!nama || !nominal || nominal == 0 || !tanggal){
        alert('Form tambah tabungan harus di isi semua');

    // jika form tambah tabungan di isi semua
    }else{

        // ambil data tabungan di local storage lalu parse & masukkan ke variable dataTabungan
        var dataTabungan = JSON.parse(localStorage.getItem('tabungan'));

        // buat variable id
        var id;

        // jika data tabungan di local storage tidak ada
        if(dataTabungan === null || dataTabungan.length === 0){

            // variable id di isi dengan angka 1
            id = 1;

            // buat variable array dengan isi data id, namaPenabung, nominalMenabung, tanggalMenabung
            // ke 4 data itu akan menjadi field-field di local storage
            // yang pernah main database (DBMS) kaya MySQL dll pasti paham field-field yang saya maksud
            var data = {
                'id': id,
                'namaPenabung': nama,
                'nominalMenabung': nominal,
                'tanggalMenabung': tanggal
            };
            
            // push variable data ke dalam variable dataTabungan
            dataTabungan = [data];

            // simpan data tabungan ke dalam local storage
            localStorage.setItem('tabungan', JSON.stringify(dataTabungan));

            // jalankan function/fungsi menampilkan data tabungan
            tampilkanDataTabungan();

        // jika data tabungan di local storage ada
        }else{

            // variable id di isi dengan jumlah data tabungan + 1 (di tambah satu) 
            id = dataTabungan.length+1;

            // buat variable array dengan isi data id, namaPenabung, nominalMenabung, tanggalMenabung
            // ke 4 data itu akan menjadi field-field di local storage
            // yang pernah main database (DBMS) kaya MySQL dll pasti paham field-field yang saya maksud
            var data = {
                'id': id,
                'namaPenabung': nama,
                'nominalMenabung': nominal,
                'tanggalMenabung': tanggal
            };

            // looping data tabungan
            for (let i = 0; i < dataTabungan.length; i++) {
                // tambahkan / gabungkan data tabungan baru dengan data tabungan yang sudah ada 
                dataTabungan.push(data);

                // hentikan looping
                break;
            }

            // simpan data tabungan ke dalam local storage
            localStorage.setItem('tabungan', JSON.stringify(dataTabungan));

            // jalankan function/fungsi menampilkan data tabungan
            tampilkanDataTabungan();
        }
    }
}

// function/fungsi untuk me-reset data tabungan di local storage
function resetData(){
    // reset data tabungan di local storage
    localStorage.removeItem('tabungan');

    // jalankan function/fungsi menampilkan data tabungan
    tampilkanDataTabungan();
}

// function/fungsi hapus salah satu data tabungan
function hapusData(item){
    // ambil data tabungan di local storage lalu parse & masukkan ke variable dataTabungan
    var dataTabungan = JSON.parse(localStorage.getItem('tabungan'));

    // jika parameter i lebih dari -1
    if (item > -1) {

        // hapus salah satu data tabungan yang index nya sesuai dengan nilai parameter item
        dataTabungan.splice(item, 1);

        // simpan data tabungan ke dalam local storage
        localStorage.setItem('tabungan', JSON.stringify(dataTabungan));

        // jalankan function/fungsi menampilkan data tabungan
        tampilkanDataTabungan();
    }
}

// function/fungsi edit salah satu data tabungan
function editData(item){
    // show/tampilkan form edit tabungan
    document.getElementById('form_edit').style.display = 'block';

    // ambil data tabungan di local storage lalu parse & masukkan ke variable dataTabungan
    var dataTabungan = JSON.parse(localStorage.getItem('tabungan'));

    // buat variable data dengan nilai data tabungan yang index nya sama dengan parameter item
    var data = dataTabungan[item];

    // suntikan atau masukkan data tabungan yang index nya sama dengan parameter item ke dalam form edit tabungan
    // sesuaikan dengan inputan pada form edit tabungan
    document.getElementById('id_penabung').value = data.id;
    document.getElementById('nama_penabung2').value = data.namaPenabung;
    document.getElementById('nominal_menabung2').value = data.nominalMenabung;
    document.getElementById('tanggal_menabung2').value = data.tanggalMenabung;     
}

// function/fungsi untuk meng-update salah satu data tabungan yang di edit
function updateData(){
    // semua inputan pada form edit tabungan masukkan pada variable nama, nominal, tanggal
    // data inputan di tangkap menggunakan properti id pada tag <input>
    var id = document.getElementById('id_penabung').value;
    var nama = document.getElementById('nama_penabung2').value;
    var nominal = document.getElementById('nominal_menabung2').value;
    var tanggal = document.getElementById('tanggal_menabung2').value;

    // jika form edit tabungan tidak semua di isi
    if(!nama || !nominal || nominal == 0 || !tanggal){
        alert('Form tambah tabungan harus di isi semua');

    // jika form edit tabungan di isi semua
    }else{

        // ambil data tabungan di local storage lalu parse & masukkan ke variable dataTabungan
        var dataTabungan = JSON.parse(localStorage.getItem('tabungan'));

        // cari data tabungan yang index nya sama dengan id data tabungan yang di edit
        // lalu sesuaikan field apa saja yang mau di update
        // di sini meng-update field-field namaPenabung, nominalMenabung, tanggalMenabung
        dataTabungan.find(data => data.id == id).namaPenabung = nama;
        dataTabungan.find(data => data.id == id).nominalMenabung = nominal;
        dataTabungan.find(data => data.id == id).tanggalMenabung = tanggal;

        // simpan data tabungan ke dalam local storage
        localStorage.setItem('tabungan', JSON.stringify(dataTabungan));

        // jalankan function/fungsi menampilkan data tabungan
        tampilkanDataTabungan();
    }
}