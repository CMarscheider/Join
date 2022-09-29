setURL('https://gruppe-318.developerakademie.net/smallest_backend_ever');


async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}



async function addUser() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let name = document.getElementById('name');

    users.push({email: email.value, password: password.value, name: name.value});
     await backend.setItem('users', JSON.stringify(users));
}