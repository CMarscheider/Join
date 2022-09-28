
setURL('https://gruppe-318.developerakademie.net/smallest_backend_ever');

let users = [];

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


async function addUser() {
let username = document.getElementById('setUsername');
    username = username.value;
    users.push(username);
    await backend.setItem('users', JSON.stringify(users));

    printUser();
}

function printUser(){

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        document.getElementById('users').innerHTML +=`${user}`;
    }
}

function clear(){
    document.getElementById('users').innerHTML =``;
    init();
}