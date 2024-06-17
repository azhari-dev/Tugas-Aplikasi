const form = document.querySelector('#form'); //mengambil id form (tag form)
const namaTim = document.querySelector('#namaTim'); //mengambil id namaTim (inputan nama tim)
const nama = document.querySelector('#nama'); //mengambil id nama (inputan nama kapten)
const email = document.querySelector('#mail'); //mengambil id mail (inputan email)
const wa = document.querySelector('#wa'); //mengambil id wa (inutan no. whatsapp)
const gender = document.querySelector('#gender'); //mengambil id gender (samping class="dif-column")
const kategori = document.querySelector('#kategori'); //mengambil id kategori (inputan kategori)
const alamat = document.querySelector('#alamat'); //mengambil id alamat (inputan textarea)
const setuju = document.querySelector('#setuju'); //mengambil id setuju (samping class="valid-column")

// fungsi untuk menampilkan error
const setError = function (element, message) {
    const inputControl = element.parentElement; // inputControl mengambil parent dari parameter element
    const errorDisplay = inputControl.querySelector('.textError'); // errorDisplay mengambil class textError untuk nantinya ditambahkan teks errornya

    // menambahkan element img dan message pada class textError
    errorDisplay.innerHTML = '<img src="aset/warning.png"></img>' + message;
    inputControl.classList.add('error'); // menambahkan class error 
    inputControl.classList.remove('success'); // menghapus class success 
}

// fungsi ketika inputan sudah memenuhi syarat
const setSuccess = function (element) {
    const inputControl = element.parentElement; // inputControl mengambil parent dari parameter element
    const errorDisplay = inputControl.querySelector('.textError'); // errorDisplay mengambil class textError untuk nantinya ditambahkan teks errornya

    // karena inputan sudah benar, maka class textError hanya diberi string kosong
    errorDisplay.innerHTML = '';
    inputControl.classList.add('success'); // menambahkan class success
    inputControl.classList.remove('error'); // menghapus class error
}

// fungsi numCheck untuk mengecek karakter per karakter untuk nantinya dipanggil untuk validasi inputan yang berupa angka, alpha, alphanumerik.
const numCheck = function (number, alpha, elementValue) {
    let count = 0
    // perulangan untuk mengecek apakah value pada element berupa angka atau tidak
    for (let i = 0; i < elementValue.length; i++) {
        // method includes berfungsi sebagai apakah argument pada method includes ada pada number?
        if (number.includes(elementValue[i])) {
            count += 1;
            // variable count akan di increment jika elementValue pada indeks ke-i berupa angka
        }
    }
    let temp = 0
    // perulangan untuk mengecek apakah value pada element berupa angka atau tidak
    for (let j = 0; j < elementValue.length; j++) {
        if (alpha.includes(elementValue[j]) || (elementValue[j] == " ")) {
            temp += 1
            // variable temp akan di increment jika elementValue pada indeks ke-i berupa hurug
        }
    }

    // jika pada elementValue karakter berupa angka semua
    if (count == elementValue.length) { //semua elementValue 
        return 'only number'
        // jika pada elementValue karakter berupa huruf semua
    } else if (temp == elementValue.length) {
        return 'only alpha'
        // jika elementValue digit dan huruf lebih dari 0 atau minimal ada satu digit/huruf
    } else if (count >= 1 && temp >= 1) {
        return false
        // return true
        // jika kondisi sebelumnya tidak terpenuhi
    } else {
        return true
        // return false
    }
}

// jika form disubmit maka menjalankan function
form.addEventListener('submit', function (e) {
    e.preventDefault() // mencegah aksi default dari form (mencegah form untuk berpindah halaman ketika disubmit)
    let countError = 0; // untuk menghitung jumlah error
    const kosong = 'Masukan wajib di isi';
    // method trim() berfungsi untuk menghapus karakter spasi dari awal dan akhir string
    // namaTimValue mengambil value dari inputan nama tim
    const namaTimValue = namaTim.value.trim();
    // namaValue mengambil value dari inputan nama kapten
    const namaValue = nama.value.trim();
    // emailValue mengambil value dari inputan email
    const emailValue = email.value.trim();
    // waValue mengambil value dari inputan no. whatsapp
    const waValue = wa.value.trim();
    // kelamin mengambil element yang name-nya gender
    const kelamin = document.getElementsByName('gender');
    // kategoriValue mengambil value dari inputan kategori
    const kategoriValue = kategori.value.trim();
    // alamatValue mengambil value dari inputan alamat pada textarea
    let arrKategori = ['Umum', 'SD', 'SMP', 'SMA'];
    // arrKategori untuk menampung kategori-kategori yang nantinya akan divalidasi jika tidak sesuai dengan kategori yang disediakan
    const alamatValue = alamat.value.trim();
    // persetujuan mengambil element yang ber id persetujuan
    const persetujuan = document.querySelector('#persetujuan');
    const number = '1234567890';
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const validEmail = /^((\w|\d)\.*){5,31}(\w|\d)(?=@)\@([a-z]+\.)+[a-z]{2,3}$/g;
    // /^((\w|\d)\.*){5,31}(\w|\d)(?=@)\@([a-z]+\.)+[a-z]+$
    // 1. ^((\w|\d)\.){5,31}(\w|\d)(?=@)\@ *Verifikasi bagian awal*
    // 1.1. ^(\w|\d) = harus diawali (boleh alphanumeric atau digit saja)
    // 1.2. ^((\w|\d)\.*) = harus diawali(boleh alphanumeric atau digit saja)boleh ada titik
    // 1.3. ^((\w|\d)\.) *{5,31}* = jumlah digit 1.2 (tanpa menghitung '.') dibatasi antara 5-31
    // 1.4 ^((\w|\d)\.){5,31} *(\w|\d)(?=@)* = sebelum @ harus diikuti antara alphanumeric atau digit
    // 1.5 ^((\w|\d)\.){5,31}(\w|\d)(?=@) *\@* = setelah semua itu harus ada @
    // 2. ([a-z]+\.)+[a-z]+$ = Verifikasi domain
    // 2.1. [a-z]+ = temukan setidaknya satu atau lebih a-z
    // 2.2. [a-z]+\. = temukan setidaknya satu atau lebih a-z diikuti dengan 1 titik (.)
    // 2.3. ([a-z]+\.)+ = berlakukan syarat 2.2 setidaknya 1 kali atau lebih
    // 2.4. ([a-z]+\.)+ *[a-z]+$* = akhiri dengan syarat 2.1

    // validasi untuk inputan nama tim
    // jika inputan kosong
    if (namaTimValue === '') {
        setError(namaTim, kosong);
        countError += 1
    } else if (numCheck(number, alpha, namaTimValue) == 'only number') { // jika inputan nama tim tidak terdapat digit
        setError(namaTim, 'Masukan setidaknya mengandung 1 huruf');
        countError += 1
    } else {
        setSuccess(namaTim);
    }

    // validasi untuk inputan nama kapten
    // jika inputan kosong
    if (namaValue === '') {
        setError(nama, kosong);
        countError += 1
    } else if (numCheck(number, alpha, namaValue) !== 'only alpha') { // jika inputan nama kapten terdapat digit atau karkter selain huruf
        setError(nama, 'Masukan hanya berupa huruf');
        countError += 1
    } else if (namaValue.length > 30) { // jika inputan nama kapten lebih dari 30 karakter
        setError(nama, 'Jumlah karakter tidak boleh lebih dari 30')
        countError += 1
    } else {
        setSuccess(nama)
    }

    // validasi untuk inputan email
    // jika inputan kosong
    if (emailValue === '') {
        setError(email, kosong);
        countError += 1
    } else if (validEmail.test(emailValue)) { // validasi email pada regExp jika inputan sesuai
        setSuccess(email);
    } else { // validasi email pada regExp jika inputan sesuai
        setError(email, 'Email tidak valid')
        countError += 1
    }

    // validasi untuk inputan no. whatsapp
    // jika inputan kosong
    if (waValue === '') {
        setError(wa, kosong);
        countError += 1
    } else if (waValue[0] == 0) { // jika inputan no whatsapp pada awal-awal digit terdapat digit 0
        setError(wa, 'Tidak boleh diawali dengan digit 0')
        countError += 1
    } else if (waValue.length < 10 || waValue.length > 12) { // jika inputan no. wa kurang dari 10 digit atau lebih dari 12 digit
        setError(wa, 'Jumlah digit harus lebih dari 10 dan kurang dari 12')
        countError += 1
    } else if (numCheck(number, alpha, waValue) == 'only number') { // jika inputan no. wa terdapat karakter selain angka
        setSuccess(wa)
    } else {
        setError(wa, 'Karakter harus berupa angka''Pastikan karakter berupa angka dan tidak mengandung spasi')
        countError += 1
    }

    // validasi untuk inputan gender
    // jika pilihan gender tidak dipilih sama sekali
    if ((kelamin[0].checked == false) && (kelamin[1].checked == false)) {
        setError(gender, 'Wajib pilih salah satu')
        countError += 1
    } else {
        setSuccess(gender)
    }

    // validasi untuk inputan kategori
    // jika inputan kosong
    if (kategoriValue === '') {
        setError(kategori, kosong);
        countError += 1
    } else if (arrKategori.includes(kategoriValue)) { // jika value dari kategori ada pada list kategori yang disimpan pada arrKategori
        setSuccess(kategori)
    } else {
        setError(kategori, 'Mohon mengisi sesuai dengan ketentuan kategori'); // jika kategori diisi selain dari yang telah disediakan
        countError += 1
    }

    // validasi untuk inputan alamat
    // jika inputan kosong
    if (alamatValue === '') {
        setError(alamat, kosong);
        countError += 1
    } else if (numCheck(number, alpha, alamatValue)) { // jika inputan alamat tidak mengandung angka/numerik
        setError(alamat, 'Masukan alamat dengan lengkap');
        countError += 1
    } else {
        setSuccess(alamat)
    }

    // validasi untuk inputan checkbox persetujuan
    // jika checbox tidak di checklist
    if (persetujuan.checked == false) {
        setError(setuju, 'Pastikan anda telah membaca dan menyetujui persyaratan dari lomba kami');
        countError += 1
    } else {
        setSuccess(setuju)
    }

    // jika masih ada error maka fungsi langsung berhenti
    if (countError != 0) {
        return;
    }

    // jika error sudah tidak ada maka form akan disubmit
    form.submit();
})



