let contacts = [
    {
        "name": "Klaus Müller",
        "mail": "klaus@gmx.de",
        "phone": "+4917674633948",
        "projects": ""
    },
    {
        "name": "Annegret Piepmatz",
        "mail": "anne@web.de",
        "phone": "+4917674374913",
        "projects": ""
    },
    {
        "name": "Jochen Kramer",
        "mail": "jochen12@t-online.de",
        "phone": "+839400364",
        "projects": ""
    },
    {
        "name": "Karin Ritter",
        "mail": "ritter123@t-online.de",
        "phone": "+8394394800364",
        "projects": ""
    },
];

let letters = [];
let splittedName = [];

/**
 * This functin is used to initialize the webpage
 * 
 */

async function init() {
    await includeHTML();

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

function sortContacts() {
    contacts.sort(function (a, b) {
        let x = a.name.toUpperCase();
        let y = b.name.toUpperCase();
        return x == y ? 0 : x > y ? 1 : -1;
    });
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
        renderContacts(name, contact, phone, firstLetter);

    }
}

function splitName(name){
    splittedName = [];
    splittedName = name.split(" ");
}

function renderContacts(name, contact, phone, firstLetter){
document.getElementById(`${firstLetter}`).innerHTML +=/*html*/`
<div><span>${name}</span></div>
`
splittedName
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
        <span>${firstletter}</span>
        </div>`
    }
}

/* function renderContent(filter) {
    document.getElementById('content').innerHTML = ``;
    for (let i = 0; i < bundeslaender.length; i++) {
        const bundesland = bundeslaender[i];
        let name = bundesland['name'];
        let population = bundesland['population'];

        let url = bundesland['url'];
        let firstLetter = name.charAt(0);
        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
        if (!filter || filter == firstLetter) {
            cardTemplate(name, population, url, i);
        }

    }
    renderLetters();
} */
