let users;
let user;

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if (user) {
        window.location.href ='summary.html';
    } else {
        document.getElementById('msgBox').innerHTML = `Login leider nicht erfolgreich.`;
    }
}

function guestLogin(){
let user = users[1]; // USER 1 Muss ein Testuser sein
window.location.href ='summary.html';
}

function onload() {
    init();
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

    if (msg) {
        let msgBox = document.getElementById('msgBox');
        msgBox.innerHTML = `${msg}`;
    } else {
        //display none
    }
}

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}
