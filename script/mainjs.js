let users;
let user;

/**
 * This functin is used to initialize the webpage
 * 
 */

async function init() {
    await includeHTML();
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    user = localStorage.getItem('user');
    user = JSON.parse(user);
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allCategorys = JSON.parse(backend.getItem('allCategorys')) || [];

    if (window.location.href.indexOf("board") > -1) {
        startRendering();
    }

}
/**
 * This function is used to include the header
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if (user) {
        window.location.href = 'summary.html';
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        document.getElementById('msgBox').innerHTML = `Login leider nicht erfolgreich.`;
    }
}

function guestLogin() {
    let user = users[0]; // USER 1 Muss ein Testuser sein
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'summary.html';
}


