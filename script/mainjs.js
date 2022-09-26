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
]


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

