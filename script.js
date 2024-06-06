const form = document.querySelector('#form');
const namaTim = document.querySelector('#namaTim');
const nama = document.querySelector('#nama');
const email = document.querySelector('#mail');
const wa = document.querySelector('#wa');
const gender = document.querySelector('#gender');
const setuju = document.querySelector('#setuju');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    inputValidation();
});

const setError = function (element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.textError');

    errorDisplay.innerHTML = '<img src="aset/warning.png"></img>' + message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = function (element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.textError');

    errorDisplay.innerHTML = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const numCheck = function (number, alpha, elementValue) {
    let count = 0
    for (let i = 0; i < elementValue.length; i++) {
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

const inputValidation = function () {
    const kosong = 'Masukan tidak boleh kosong';
    const namaTimValue = namaTim.value.trim();
    const namaValue = nama.value.trim();
    const emailValue = email.value.trim();
    const waValue = wa.value.trim();
    const kelamin = document.getElementsByName('gender');
    const persetujuan = document.querySelector('#persetujuan');
    const number = '1234567890';
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const hah = /^((\w|\d)\.*){5,31}(\w|\d)(?=@)\@([a-z]+\.)+[a-z]+$/g;

    if (namaTimValue === '') {
        // setError(namaTim, 'Masukan tidak boleh kosong');
        setError(namaTim, kosong);
    } else if (!(numCheck(number, alpha, namaTimValue))) {
        setError(namaTim, 'Masukan setidaknya mengandung 1 angka');
    } else if (numCheck(number, alpha, namaTimValue) == 'only number') {
        setError(namaTim, 'Masukan setidaknya mengandung 1 huruf');
    } else {
        setSuccess(namaTim);
    }

    if (namaValue === '') {
        setError(nama, kosong);
    } else if (numCheck(number, alpha, namaValue)) {
        setError(nama, 'Masukan tidak boleh mengandung angka')
    } else {
        setSuccess(nama)
    }

    if (emailValue === '') {
        setError(email, kosong);
    } else if (hah.test(emailValue)) {
        setSuccess(email);
    } else {
        setError(email, 'Email tidak valid')
    }

    if (waValue === '') {
        setError(wa, kosong);
    } else if (waValue.length < 11 || waValue.length > 13) {
        setError(wa, 'Jumlah karakter harus lebih dari 11 dan kurang dari 13')
    } else if (numCheck(number, alpha, waValue) == 'only number') {
        setSuccess(wa)
    } else {
        setError(wa, 'Karakter harus berupa angka')
    }

    if ((kelamin[0].checked == false) && (kelamin[1].checked == false)) {
        setError(gender, 'Wajib pilih salah satu')
    } else {
        setSuccess(gender)
    }

    if (persetujuan.checked == false) {
        setError(setuju, 'Pastikan anda telah membaca dan menyetujui persyaratan dari lomba kami');
    } else {
        setSuccess(setuju)
    }

}
