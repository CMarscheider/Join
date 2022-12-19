function onload() {
    init();
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

    if (msg) {
        let msgBox = document.getElementById('msgBox');
        msgBox.classList.remove('d-none');
        msgBox.innerHTML = `${msg}`;
    } else {
        //display none
    }
}


function openSignUp() {
    window.location.href = 'register.html';
}

function resendPassword() {
    document.getElementById('email-pw-forgot').value = "";
    document.getElementById('msgBox-forgot-password').classList.add('msgBox');
}

function openResetPassword() {
    window.location.href = 'forgot-password.html';
}

function resetPassword() {

    let password_1 = document.getElementById('email-reset-pw').value;
    let password_2 = document.getElementById('email-reset-pw1').value;

    if (password_1 == password_2) {
        password_1 = "";
        password_2 = "";
        document.getElementById('msgBox-reset-password').classList.add('msgBox');

    } else {

        document.getElementById('msgBox-reset-password').innerText == "The passwords do not match"
        document.getElementById('msgBox-reset-password').classList.add('msgBox');

    }
}

