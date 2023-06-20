
/**
* Performs initialization tasks and handles the onload event.
* Retrieves any query parameters from the URL, specifically the 'msg' parameter.
* If a message is present in the 'msg' parameter, it displays the message in the msgBox element.
*/

function onload() {
  init();
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get('msg');

  if (msg) {
    let msgBox = document.getElementById('msgBox');
    msgBox.classList.remove('d-none');
    msgBox.innerHTML = `${msg}`;
  } 
}

/**
* Redirects the user to the 'register.html' page.
*/

function openSignUp() {
  window.location.href = 'register.html';
}

/**
* Resets the value of the email input field for password reset.
* Displays the 'msgBox-forgot-password' element by adding the 'msgBox' class and removing the 'd-none' class.
*/

function resendPassword() {
  document.getElementById('email-pw-forgot').value = '';
  document.getElementById('msgBox-forgot-password').classList.add('msgBox');
  document.getElementById('msgBox-forgot-password').classList.remove('d-none');
}

/**
* Redirects the user to the 'forgot-password.html' page.
*/

function openResetPassword() {
  window.location.href = 'forgot-password.html';
}

/**
* Resets the user's password by comparing the values of the password input fields.
* If the passwords match, it resets the input field values, displays a success message in the 'msgText' element.
* If the passwords do not match, it displays an error message in the 'msgText' element.
* Finally, it shows the 'msgBox-reset-password' element by adding the 'msgBox' class and removing the 'd-none' class.
*/

function resetPassword() {
  let password_1 = document.getElementById('email-reset-pw').value;
  let password_2 = document.getElementById('email-reset-pw1').value;
  if (password_1 == password_2) {
    document.getElementById('email-reset-pw').value = '';
    document.getElementById('email-reset-pw1').value = '';
    document.getElementById('msgText').innerText = 'You reset your password';
  } else {
    document.getElementById('msgText').innerText = 'The passwords do not match';
  /*   document.getElementById('msgBox-reset-password').classList.add('msgBox'); */
  }
  document.getElementById('msgBox-reset-password').classList.add('msgBox');
  document.getElementById('msgBox-reset-password').classList.remove('d-none');
}

/**
* Redirects the user to the 'login.html' page.
*/

function goBacK() {
  window.location.href = 'login.html';
}
