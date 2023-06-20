let users;
let user;
let color;

/**
* Initializes the application by including HTML templates, downloading data from the server,
* retrieving user data and tasks from storage, and performing page-specific actions.
*/

async function init() {
  await includeHTML();
  await downloadFromServer();
  users = JSON.parse(backend.getItem("users")) || [];
  user = localStorage.getItem("user");
  user = JSON.parse(user);
  allTasks = JSON.parse(backend.getItem("allTasks")) || [];
  allCategorys = JSON.parse(backend.getItem("allCategorys")) || [];

  if (window.location.href.indexOf("board") > -1) {
    startRendering();
  }
  highlightNavBar();
}

/**
* Asynchronously includes HTML templates(header and navbar) by fetching the specified files and replacing the content
* of the elements with the "w3-include-html" attribute.
*/

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
* Performs the login functionality by retrieving the email and password input values.
* Finds a user with matching email and password from the list of users.
* If a user is found, it redirects to the "summary.html" page and stores the user object in local storage.
* If no user is found, it displays an error message in the "msgBox" element.
*/

function login() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  user = users.find((u) => u.email == email.value && u.password == password.value);
  if (user) {
    window.location.href = "summary.html";
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    document.getElementById("msgBox").innerHTML = `Login leider nicht erfolgreich.`;
  }
}

/**
* Performs a guest login by selecting the first user from the list of users.
* Stores the user object in local storage.
* Redirects to the "summary.html" page.
*/

function guestLogin() {
  let user = users[0]; 
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "summary.html";
}

/**
* Generates a random color in hexadecimal format.
*/

function generateRandomColor() {
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    color = randomColor;
}

/**
* Header logout button.
*/

let menuIsOpen = false;


/**
* Handles the click event on an image element.
* If the context menu is open, it closes the menu by setting the display property to "none".
* If the context menu is closed, it opens the menu by setting the display property to "block".
*/

function onImageClick() {
  if (menuIsOpen) {
    document.getElementById("context-menu").style.display = "none";
    menuIsOpen = false;
  } else {
    document.getElementById("context-menu").style.display = "block";
    menuIsOpen = true;
  }
}


/**
* Logs out the current user by redirecting to the login page, clearing the user variable,
* and clearing the user data from local storage.
*/

function logOutUser() {
  window.location.href = "./login.html";
  user = undefined;
  localStorage.clear();
}

/**
* Redirects the user to the "summary.html" page.
*/

function forwardingToSummary() {
  window.location.href = "./summary.html";
}


/**
* Highlights the corresponding navigation element in the navigation bar based on the current page URL.
*/

function highlightNavBar() {
  let currentURL = window.location.href;
  if (currentURL.includes("summary")) {
    document.getElementById("navSummary").classList.add("clicked");
  } else if (currentURL.includes("board")) {
    document.getElementById("navBoard").classList.add("clicked");
  } else if (currentURL.includes("addtask")) {
    document.getElementById("navAddtask").classList.add("clicked");
  } else if (currentURL.includes("contacts")) {
    document.getElementById("navContacts").classList.add("clicked");
  } 
}

/**
* Changes the current location based on the specified location parameter.
* @param {string} location - The desired location to navigate to.
*/

function changeLocation(location) {
  if (location == "legal-notice") {
    window.location.href = "legal.html";
  } else if (location == "help") {
    window.location.href = "help.html";
  }
}
