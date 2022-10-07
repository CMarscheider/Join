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


function openSignUp() {
    window.location.href = 'register.html';

}