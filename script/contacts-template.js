/**
 * Generates HTML markup for a contact entry.
 * @param {string} mail - The email address of the contact.
 * @param {string} name - The full name of the contact.
 * @param {string} color - The background color of the contact icon.
 * @param {string[]} splittedName - An array containing the first and last name of the contact.
 * @param {number} i - The index of the contact.
 * @param {string} id - The ID of the contact icon element.
 * @returns {string} - The HTML markup for the contact entry.
 */

function contactsHTML(mail, name, color, splittedName, i, id) {
  return /*html*/ `
    <div class="singleContact" onclick="openContact('${mail}', '${name}', '${color}', ${i})">
        <div class="contactIcon" id="${id}">
            <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
        </div>
        <div class="contactText">
            <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[0].slice(1)} ${splittedName[1].charAt(0).toUpperCase()}${splittedName[1].slice(1)}</span>
            <span class="mail smallText">${mail}</span>
        </div>
</div>
`;
}

/**
 * Generates HTML markup for displaying contact details.
 * @param {string[]} splittedName - An array containing the first and last name of the contact.
 * @param {string} mail - The email address of the contact.
 * @returns {string} - The HTML markup for displaying contact details.
 */

function openContactHTML(splittedName, mail) {
  return /*html*/ `<div class="infocontainer" id="infocontainer">
    <div class="photo" id ="photo">
        <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
    </div>
    <div class="name-and-button">
        <h2>${splittedName[0].charAt(0).toUpperCase()}${splittedName[0].slice(1)} ${splittedName[1].charAt(0).toUpperCase()}${splittedName[1].slice(1)}</h2>
        <p onclick="showInputsForm()">+ Add Task</p>
    </div>
</div>
<div class="mail-and-phone">
    <h3>Email</h3>
    <p class="mail">${mail}</p>
    <h3>Phone</h3>
    <p>018475633948</p>
</div>
    `;
}
