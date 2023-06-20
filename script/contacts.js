let letters = [];
let splittedName = [];
let contacts;
let contactsOpenForMobile = false;
let openUser;

/**
 * Sorts the contacts alphabetically by name and updates the contact list.
 * @returns {Promise<void>} - A promise that resolves once the contacts are sorted and the contact list is updated.
 */

async function sortContacts() {
  await init();
  users.sort(function (a, b) {
    let x = a.name.toUpperCase();
    let y = b.name.toUpperCase();
    return x == y ? 0 : x > y ? 1 : -1;
  });
  renderContactList();
  handleWindowResize();
}

/**
 * Renders the contact list by populating the HTML with contact information.
 * @returns {Promise<void>} - A promise that resolves once the contact list is rendered.
 */

async function renderContactList() {
  let contactlist = document.getElementById("contactlist");
  contactlist.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    const contact = users[i];
    let mail = contact["email"];
    let phone = contact["phone"];
    let name = contact["name"];
    let firstLetter = name.charAt(0);
    let id = "contactIcon" + i;
    checkForLetters(firstLetter, contactlist);
    splitName(name);
    generateRandomColor();
    await renderContacts(name, mail, firstLetter, i, id);
  }
}

/**
 * Splits a name into separate words and capitalizes the first letter of each word.
 * @param {string} name - The name to be split and capitalized.
 * @returns {void} - This function does not return a value.
 */

function splitName(name) {
  splittedName = [];
  splittedName = name.split(" ");
  splittedName = splittedName.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
}

/**
 * Renders the contact information in the corresponding container based on the first letter of the name.
 * @param {string} name - The contact's name.
 * @param {string} mail - The contact's email.
 * @param {string} firstLetter - The first letter of the contact's name.
 * @param {number} i - The index of the contact.
 * @param {string} id - The ID of the contact's icon element.
 * @returns {void} - This function does not return a value.
 */

async function renderContacts(name, mail, firstLetter, i, id) {
  let container = document.getElementById(`${firstLetter.toUpperCase()}`);

  if (!container) {
    await createNewContactContainer(container, firstLetter);
  }
  let usedContainer = document.getElementById(`${firstLetter.toUpperCase()}`);
  usedContainer.innerHTML += contactsHTML(mail, name, color, splittedName, i, id);
  createIcon(id);
}

/**
 * Creates a new contact container for contacts with the given first letter.
 * @param {HTMLElement} container - The container element to be created.
 * @param {string} firstLetter - The first letter of the contacts' names.
 * @returns {void} - This function does not return a value.
 */

async function createNewContactContainer(container, firstLetter) {
  container = document.createElement("div");
  container.id = `${firstLetter.toUpperCase()}`;
  container.classList.add("letters");
  container.innerHTML = `<span class="headletter">${firstLetter}</span>`;
  document.getElementById("contactlist").appendChild(container);
}

/**
 * Creates an icon element with the specified ID and sets its background color.
 * @param {string} id - The ID of the icon element to be created.
 * @returns {void} - This function does not return a value.
 */

function createIcon(id) {
  let icon = document.getElementById(`${id}`);
  if (!icon) {
    icon = document.createElement("div");
    icon.id = `${id}`;
    document.getElementById(`${firstLetter.toUpperCase()}`).appendChild(icon);
  }
  icon.style.backgroundColor = color;
}

/**
 * Checks if a given first letter is already present in the list of letters.
 * If not, adds it to the list and prints the letter in the contact list.
 * @param {string} firstLetter - The first letter to check and add.
 * @param {HTMLElement} contactlist - The contact list element.
 * @returns {void} - This function does not return a value.
 */

function checkForLetters(firstLetter, contactlist) {
  firstLetter = firstLetter.toUpperCase();
  if (!letters.includes(firstLetter)) {
    letters.push(firstLetter);
    printLetters(firstLetter, contactlist);
  }
}

/**
 * Prints the given first letter in the contact list if it is not already present.
 * @param {string} firstLetter - The first letter to print.
 * @param {HTMLElement} contactlist - The contact list element.
 * @returns {void} - This function does not return a value.
 */

function printLetters(firstLetter, contactlist) {
  if (!document.getElementById(`${firstLetter}`)) {
    contactlist.innerHTML += /*html*/ `
        <div class="letters" id="${firstLetter}">
        <span class="headletter">${firstLetter}</span>
        </div>`;
  }
}

/**
 * Opens the contact information for the given contact.
 * @param {string} mail - The email of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} backgroundColor - The background color for the contact photo.
 * @param {number} i - The index of the contact in the list.
 * @returns {void} - This function does not return a value.
 */

function openContact(mail, name, backgroundColor, i) {
  splitName(name);
  if (window.innerWidth < 800) {
    document.getElementById("contactlist").classList.add("d-none");
    document.getElementById("contactinfo").style.width = "100%";
    document.getElementById("backarrow").style.display = "block";
    removeDNoneContactinfo();
    contactsOpenForMobile = true;
  }

  openUser = i;
  document.getElementById("displaycontactinfos").innerHTML = openContactHTML(splittedName, mail);
  document.getElementById("photo").style.backgroundColor = backgroundColor;
}

/**
 * Handles the window resize event and adjusts the contact list and contact information sections accordingly.
 * @returns {void} - This function does not return a value.
 */

function handleWindowResize() {
  if (window.location.href.indexOf("contacts") > -1) {
    if (!contactsOpenForMobile) {
      if (window.innerWidth < 800) {
        dNoneToContactinfo();
        document.getElementById("contactlist").style.width = "100%";
      } else {
        removeDNoneContactinfo();
        document.getElementById("contactlist").style.width = "40%";
      }
    } else {
      document.getElementById("contactinfo").classList.add("d-none");
      document.getElementById("contactlist").classList.remove("d-none");
    }
  }
}

/**
 * Hides the "contactinfo" element by adding the "d-none" class if it is not already present.
 * This function is used to toggle the visibility of the contact information section.
 * @returns {void} - This function does not return a value.
 */

function dNoneToContactinfo() {
  if (!document.getElementById("contactinfo").classList.contains("d-none")) {
    document.getElementById("contactinfo").classList.add("d-none");
  }
}

/**
 * Removes the "d-none" class from the "contactinfo" element to display it.
 * This function is used to show the contact information section.
 */

function removeDNoneContactinfo() {
  if (document.getElementById("contactinfo").classList.contains("d-none")) {
    document.getElementById("contactinfo").classList.remove("d-none");
  }
}

/**
Adds an event listener to the window object for the "resize" event, which triggers the "handleWindowResize" function.
This function is responsible for handling the resizing of the window and adjusting the display accordingly.
*/

window.addEventListener("resize", handleWindowResize);

/**
 * Switches the view back to the contact list.
 * If the window width is less than 800 pixels, it displays the contact list in full width and hides the contact info.
 * If the window width is greater than or equal to 800 pixels, it updates the "contactsOpenForMobile" variable and calls the "handleWindowResize" function.
 */

function backToContactList() {
  if (window.innerWidth < 800) {
    document.getElementById("contactlist").classList.remove("d-none");
    document.getElementById("contactlist").style.width = "100%";
    dNoneToContactinfo();
    document.getElementById("backarrow").style.display = "none";
    contactsOpenForMobile = true;
    handleWindowResize();
  } else {
    contactsOpenForMobile = false;
    handleWindowResize();
  }
}

/**
 * Opens the contact form popup and applying styling changes.
 */

function addNewContact() {
  document.getElementById("popUpBackgroundContacts").classList.add("popUpBackground");
  document.getElementById("taskPopupContacts").classList.remove("d-none");
}

/**
 * Asynchronously pushes a new contact to an array of users.
 * Retrieves the new contact's name, email, and phone from the respective input fields.
 * Adds the new contact object to the users array.
 * Stores the updated users array in backend storage.
 * Closes the new contact popup.
 * Sorts the contacts.
 */

async function pushContactToArray() {
  let newUserName = document.getElementById("newContactName");
  let newUserEmail = document.getElementById("newContactEmail");
  let newUserPhone = document.getElementById("newContactPhone");
  if (newUserName.value && newUserEmail.value && newUserPhone.value) {
    users.push({
      name: newUserName.value,
      email: newUserEmail.value,
      phone: newUserPhone.value,
    });
    await backend.setItem("users", JSON.stringify(users));
    closeNewContactPopUp();
    sortContacts();
  }
}

/**
 * Resets the input fields for adding a new contact by clearing the values.
 */

function resetInputsContact() {
  let newUserName = document.getElementById("newContactName");
  let newUserEmail = document.getElementById("newContactEmail");
  let newUserPhonephone = document.getElementById("newContactPhone");
  newUserName.value = "";
  newUserEmail.value = "";
  newUserPhonephone.value = "";
}

/**
 * Closes the new contact popup by resetting the input fields, removing the popup background class,
 * and adding the "d-none" class to hide the popup.
 */

function closeNewContactPopUp() {
  resetInputsContact();
  document.getElementById("popUpBackgroundContacts").classList.remove("popUpBackground");
  document.getElementById("taskPopupContacts").classList.add("d-none");
}

/**
 * Asynchronously checks or unchecks a user's checkbox based on the given status.
 * If the status is false, it shows the checkboxes, checks the specified user's checkbox,
 * creates user icons, and assigns the user temporarily.
 * @param {boolean} status - The status indicating whether the checkbox should be checked or unchecked.
 */

async function checkUserBox(status) {
  if (!status) {
    let id = "checkbox" + openUser;
    await showCheckboxes("checkboxes");
    document.getElementById(id).checked = true;
    createUserIcons(users[openUser].name);
    temporaryAssigned = [];
    temporaryAssigned.push(users[openUser].name);
  }
}
