let letters = [];
let splittedName = [];
let contacts;
let contactsOpenForMobile = false;

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
        let id = "contactIcon" + i;
        checkForLetters(firstLetter, contactlist);
        splitName(name);
        generateRandomColor();
        renderContacts(name, mail, firstLetter, i, id);

    }
}

function splitName(name) {
    splittedName = [];
    if (name.includes(" ")) {
        splittedName = name.split(" ");
    } else {
        splittedName = name;
    }
}

function renderContacts(name, mail, firstLetter, i, id) {



    document.getElementById(`${firstLetter.toUpperCase()}`).innerHTML +=/*html*/`
    <div class="singleContact" onclick="openContact('${mail}', '${name}', '${color}')">
        <div class="contactIcon" id="${id}">
            <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
        </div>
        <div class="contactText">
            <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[0].slice(1)} ${splittedName[1].charAt(0).toUpperCase()}${splittedName[1].slice(1)}</span>
            <span class="mail smallText">${mail}</span>
        </div>
</div>
`;

    let icon = document.getElementById(`${id}`);
    icon.style.backgroundColor = color;
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

function openContact(mail, name, backgroundColor) {

    if (window.innerWidth < 620) {
        document.getElementById("contactlist").style.display = "none";
        document.getElementById("contactinfo").style.width = "100%";
        document.getElementById("contactinfo").classList.remove('d-none');
        document.getElementById("backarrow").style.display = "block";
        contactsOpenForMobile = true;
    }



    splitName(name);
    document.getElementById('displaycontactinfos').innerHTML =/*html*/`

    <div class="infocontainer" id="infocontainer">
    <div class="photo" id ="photo">
        <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
    </div>
    <div class="name-and-button">
        <h2>${splittedName[0].charAt(0).toUpperCase()}${splittedName[0].slice(1)} ${splittedName[1].charAt(0).toUpperCase()}${splittedName[1].slice(1)}</h2>
        <p onclick="showInputsForm()">+ Add Task</p>
    </div>

</div>
<!-- <div class="edit">
    <p>Contact Information</p>
    <div class="editbutton">
        <img src="./assets/img/editbutton.png" alt="edit">
        <p>Edit Contact</p>
    </div>
</div> -->
<div class="mail-and-phone">
    <h3>Email</h3>
    <p class="mail">${mail}</p>
    <h3>Phone</h3>
    <p>018475633948</p>
</div>

<div class="addcontact">
    <div class="contactbutton">
        <p>NEW CONTACT</p>
        <img src="./assets/img/contactlogo.png" alt="">
    </div>
</div>
    `;

    document.getElementById('photo').style.backgroundColor = backgroundColor;
}


function handleWindowResize() {

    if (window.location.href.indexOf("contacts") > -1) {
        if (!contactsOpenForMobile) {
            if (window.innerWidth < 620) {
                /*       // blende das erste Fenster ein
                      document.getElementById("first-window").style.display = "block"; */
                // blende das zweite Fenster aus
                if (!document.getElementById("contactinfo").classList.contains('d-none')) {
                    document.getElementById("contactinfo").classList.add('d-none')
                }

                document.getElementById("contactlist").style.width = "100%";
            } else {
                /*       // blende das erste Fenster aus
                      document.getElementById("first-window").style.display = "none"; */
                // blende das zweite Fenster ein
                if (document.getElementById("contactinfo").classList.contains('d-none')) {
                    document.getElementById("contactinfo").classList.remove('d-none')
                }
                document.getElementById("contactlist").style.width = "40%";

            }
        } else {
            location.reload();
        }
    }
}

// füge den Event-Handler dem window-Objekt hinzu
window.addEventListener("resize", handleWindowResize);

function backToContactList() {
    if (window.innerWidth < 620) {
        document.getElementById("contactlist").style.display = "block";
        document.getElementById("contactlist").style.width = "100%";
        document.getElementById("contactinfo").style.display = "none";
        document.getElementById("backarrow").style.display = "none";
        contactsOpenForMobile = true;
        handleWindowResize();
    }
    else {
        contactsOpenForMobile = false;
        handleWindowResize();
    }
}