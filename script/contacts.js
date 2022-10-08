let letters = [];
let splittedName = [];

function sortContacts() {
    contacts.sort(function (a, b) {
        let x = a.name.toUpperCase();
        let y = b.name.toUpperCase();
        return x == y ? 0 : x > y ? 1 : -1;
    });
    console.log(contacts);
    renderContactList();
}

function renderContactList() {
    let contactlist = document.getElementById('contactlist');
    contactlist.innerHTML = "";

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let mail = contact['mail'];
        let phone = contact['phone'];
        let name = contact['name'];
        let firstLetter = name.charAt(0);
        checkForLetters(firstLetter);
        printLetters(firstLetter, contactlist);
        splitName(name);
        renderContacts(name, mail, firstLetter);

    }
}

function splitName(name) {
    splittedName = [];
    splittedName = name.split(" ");
}

function renderContacts(name, mail, firstLetter) {
    document.getElementById(`${firstLetter}`).innerHTML +=/*html*/`
<div class="singleContact">
    <div class="contactIcon">
        <span>${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}</span>
    </div>
<div class="contactText">
    <span>${name}</span>
    <span class="mail smallText">${mail}</span>
</div>
</div>
`
}


function checkForLetters(firstLetter) {
    if (!letters.includes(firstLetter)) {
        letters.push(firstLetter);
    }
}

function printLetters(firstletter, contactlist) {
    if (!document.getElementById(`${firstletter}`)) {
        contactlist.innerHTML +=/*html*/`
        <div class="letters" id="${firstletter}">
        <span class="headletter">${firstletter}</span>
        </div>`
    }
}