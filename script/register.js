setURL('https://christian-marscheider.developerakademie.net/Join/smallest_backend_ever');


/**
* Adds a new user by retrieving the email, password, name, and phone input values.
* Pushes a new user object to the 'users' array.
* Stores the updated 'users' array in the backend.
* Redirects to the login page with a success message as a query parameter.
*/

async function addUser() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let name = document.getElementById('name');
  let phone = document.getElementById('phone');

  users.push({ email: email.value, password: password.value, name: name.value, phone: phone.value });
  await backend.setItem('users', JSON.stringify(users));
  window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
}

/**
* Redirects to the login page.
*/

function openLogin() {
  window.location.href = 'login.html';
}
