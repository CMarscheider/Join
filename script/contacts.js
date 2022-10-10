let letters = [];
let splittedName = [];
let contacts;

/* users in contacts pushen */

async function sortContacts() {
    await init();
    users.sort(function (a, b) {
        let x = a.name.toUpperCase();
        let y = b.name.toUpperCase();
        return x == y ? 0 : x > y ? 1 : -1;
    });
    console.log(users);
    renderContactList();
}

function renderContactList() {
    let contactlist = document.getElementById('contactlist');
    contactlist.innerHTML = "";

    for (let i = 0; i < users.length; i++) {
        const contact = users[i];
        let mail = contact['email'];
        let phone = contact['phone'];
        let name = contact['name'];
        let firstLetter = name.charAt(0);
        checkForLetters(firstLetter, contactlist);
        splitName(name);
        renderContacts(name, mail, firstLetter);

    }
}

function splitName(name) {
    splittedName = [];
    if (name.includes(" ")) {
    splittedName = name.split(" ");
    } else{
        splittedName = name;
    }
}

function renderContacts(name, mail, firstLetter) {
    document.getElementById(`${firstLetter.toUpperCase()}`).innerHTML +=/*html*/`
<div class="singleContact" onclick="openContact(${mail}, ${name})">
    <div class="contactIcon">
        <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
    </div>
<div class="contactText">
    <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[0].slice(1)} ${splittedName[1].charAt(0).toUpperCase()}${splittedName[1].slice(1)}</span>
    <span class="mail smallText">${mail}</span>
</div>
</div>
`
}




function checkForLetters(firstLetter, contactlist) {
    firstLetter = firstLetter.toUpperCase();
    if (!letters.includes(firstLetter)) {
        letters.push(firstLetter);
        printLetters(firstLetter, contactlist);
    }
}

function printLetters(firstLetter, contactlist) {
    if (!document.getElementById(`${firstLetter}`)) {
        contactlist.innerHTML +=/*html*/`
        <div class="letters" id="${firstLetter}">
        <span class="headletter">${firstLetter}</span>
        </div>`
    }
}

function openContact(mail, name){
    splitName(name);
    document.getElementById('displaycontactinfos').innerHTML=/*html*/`
    <div class="infocontainer" id="infocontainer">
    <div class="photo">
        <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
    </div>
    <div class="name-and-button">
        <h2>${splittedName[0].charAt(0).toUpperCase()}${splittedName[0].slice(1)} ${splittedName[1].charAt(0).toUpperCase()}${splittedName[1].slice(1)}</h2>
        <p>+ Add Task</p>
    </div>

</div>
<div class="edit">
    <p>Contact Information</p>
    <div class="editbutton">
        <img src="./assets/img/editbutton.png" alt="edit">
        <p>Edit Contact</p>
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