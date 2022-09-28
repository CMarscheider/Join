setURL('https://gruppe-318.developerakademie.net/smallest_backend_ever');

async function addUser() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    users.push({email: email.value, password: password.value});
     await backend.setItem('users', JSON.stringify(users));
}