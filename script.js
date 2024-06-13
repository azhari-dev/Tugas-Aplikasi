const form = document.querySelector('#form'); //mengambil id form (tag form)
const namaTim = document.querySelector('#namaTim'); //mengambil id namaTim (inputan nama tim)
const nama = document.querySelector('#nama'); //mengambil id nama (inputan nama kapten)
const email = document.querySelector('#mail'); //mengambil id mail (inputan email)
const wa = document.querySelector('#wa'); //mengambil id wa (inutan no. whatsapp)
const gender = document.querySelector('#gender'); //mengambil id gender (samping class="dif-column")
const setuju = document.querySelector('#setuju'); //mengambil id setuju (samping class="valid-column")

// fungsi untuk menampilkan error
const setError = function (element, message) {
    const inputControl = element.parentElement; // inputControl mengambil parent dari parameter element
    const errorDisplay = inputControl.querySelector('.textError'); // errorDisplay mengambil class textError untuk nantinya ditambahkan teks errornya

    // menambahkan element img dan message pada class textError
    errorDisplay.innerHTML = '<img src="aset/warning.png"></img>' + message;
    inputControl.classList.add('error'); // menambahkan class error 
    inputControl.classList.remove('success'); // menghapus class success 
    return true
}

// fungsi ketika inputan sudah memenuhi syarat
const setSuccess = function (element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.textError');

    // karena inputan sudah benar, maka class textError hanya diberi string kosong
    errorDisplay.innerHTML = '';
    inputControl.classList.add('success'); // menambahkan class success
    inputControl.classList.remove('error'); // menghapus class error
    return true
}

// fungsi numCheck untuk mengecek karakter per karakter untuk nantinya dipanggil untuk validasi inputan yang berupa angka, alpha, alphanumerik.
const numCheck = function (number, alpha, elementValue) {
    let count = 0
    // perulangan untuk mengecek
    for (let i = 0; i < elementValue.length; i++) {
        // method includes berfungsi sebagai apakah argument pada method includes ada pada number?
        if (number.includes(elementValue[i])) {
            count += 1;
        }
    }
    let temp = 0
    for (let j = 0; j < elementValue.length; j++) {
        if (alpha.includes(elementValue[j])) {
            temp += 1
        }
    }
    if (count == elementValue.length) { //semua elementValue 
        return 'only number'
    } else if (count >= 1 && temp >= 1) {
        return true
    } else {
        return false
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    let countError = 0;
    const kosong = 'Masukan tidak boleh kosong';
    // method trim() berfungsi untuk menghapus karakter spasi dari awal dan akhir string
    const namaTimValue = namaTim.value.trim();
    const namaValue = nama.value.trim();
    const emailValue = email.value.trim();
    const waValue = wa.value.trim();
    const kelamin = document.getElementsByName('gender');
    const persetujuan = document.querySelector('#persetujuan');
    const number = '1234567890';
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const validEmail = /^((\w|\d)\.*){5,31}(\w|\d)(?=@)\@([a-z]+\.)+[a-z]+$/g;
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
    if (namaTimValue === '') {
        setError(namaTim, kosong);
        countError += 1
    } else if (!(numCheck(number, alpha, namaTimValue))) {
        setError(namaTim, 'Masukan setidaknya mengandung 1 angka');
        countError += 1
    } else if (numCheck(number, alpha, namaTimValue) == 'only number') {
        setError(namaTim, 'Masukan setidaknya mengandung 1 huruf');
        countError += 1
    } else {
        setSuccess(namaTim);
    }
    
    // validasi untuk inputan nama kapten
    if (namaValue === '') {
        setError(nama, kosong);
        countError += 1
    } else if (numCheck(number, alpha, namaValue)) {
        setError(nama, 'Masukan tidak boleh mengandung angka')
        countError += 1
    } else {
        setSuccess(nama)
    }
    
    // validasi untuk inputan email
    if (emailValue === '') {
        setError(email, kosong);
        countError += 1
    } else if (validEmail.test(emailValue)) {
        setSuccess(email);
    } else {
        setError(email, 'Email tidak valid')
        countError += 1
    }
    
    // validasi untuk inputan no. whatsapp
    if (waValue === '') {
        setError(wa, kosong);
        countError += 1
    } else if (waValue.length < 11 || waValue.length > 13) {
        setError(wa, 'Jumlah karakter harus lebih dari 11 dan kurang dari 13')
        countError += 1
    } else if (numCheck(number, alpha, waValue) == 'only number') {
        setSuccess(wa)
    } else {
        setError(wa, 'Karakter harus berupa angka')
        countError += 1
    }
    
    // validasi untuk inputan gender
    if ((kelamin[0].checked == false) && (kelamin[1].checked == false)) {
        setError(gender, 'Wajib pilih salah satu')
        countError += 1
    } else {
        setSuccess(gender)
    }
    
    // validasi untuk inputan checkbox persetujuan
    if (persetujuan.checked == false) {
        setError(setuju, 'Pastikan anda telah membaca dan menyetujui persyaratan dari lomba kami');
        countError += 1
    } else {
        setSuccess(setuju)
    }

    if (countError != 0){
        return;
    }

    form.submit();
})



