let allTasks = [];
let prio;
/* loadAllTasks(); */
var expandedAddTask = false;
var expandedEditTask = false;
let categoryExanded = false;
let temporaryAssigned = [];
let temporarySubTasks = [];
let allSubtasks = [];
let subTaskCounter = 0;
let category;
let currentColor;
let allCategorys = [];


function checkAllInputs() {
  checkBoxes();

  if (temporaryAssigned.length == 0) {
    alert('Kein Mitarbeiter ausgewählt');
  } else {
    if (!prio) {
      alert('Keine Priorität ausgewählt');
    } else {
      if (!category) {
        alert('Keine Kategorie ausgewählt');
      } else {
        addTask();
      }
    }
  }
}

async function addTask() {
  let title = document.getElementById('title');
  let description = document.getElementById('description');
  let date = document.getElementById('date');

  allTasks.push({
    title: title.value,
    description: description.value,
    category: category,
    status: 'open',
    assigned: temporaryAssigned,
    date: date.value,
    prio: prio,
    subtasks: temporarySubTasks,
  });
  await backend.setItem('allTasks', JSON.stringify(allTasks));

  /* RESET FELDER */
  subTaskCounter = 0;
  document.getElementById('subtaskList').innerHTML = ``;



  /* SEITE WIRD NEU GELADEN */
  window.location.href = 'board.html';
}

/* verhindert  neu laden der seite TEST*/
setTimeout(() => {
  if (window.location.href.indexOf("addtask") > -1) {
    var form = document.getElementById("myForm");
    function handleForm(event) { event.preventDefault(); };
    form.addEventListener('submit', handleForm);
  }
}, 5000);


function checkBoxes() {
  temporaryAssigned = [];
  temporarySubTasks = [];
  for (let i = 0; i < users.length; i++) {
    const checkbox = document.getElementById('checkbox' + i);
    if (checkbox.checked) {
      temporaryAssigned.push(users[i]['name']);
    }
  }

  for (let i = 0; i < allSubtasks.length; i++) {
    const checkboxSubtask = document.getElementById('subTask' + i);
    let content = document.getElementById('subTaskValue' + i).innerText;
    if (checkboxSubtask.checked) {
      temporarySubTasks.push(content);
    }
  }
}

/* ////////////////////////////////////////////////// */

function checkPriority(priority) {
  prio = priority;
}

// Assigned to function
function showCheckboxes(checkboxid) {
  var checkboxes = document.getElementById(checkboxid);
  if (checkboxid == "checkboxes") {
    currentExpandedCheck = expandedAddTask;
  } else {
    currentExpandedCheck = expandedEditTask;
  }

  if (!currentExpandedCheck) {
    checkboxes.style.display = 'block';
    currentExpandedCheck = true;
    createAssignedToSelection(checkboxid);
  } else {
    checkboxes.style.display = 'none';
    currentExpandedCheck = false;
  }

  if (checkboxid == "checkboxes") {
    expandedAddTask = currentExpandedCheck;
  } else {
    expandedEditTask = currentExpandedCheck;
  }

}

/* OPEN SUBTASKFIELD */

function openInputfield(inputID) {
  /* ANDERE FELDER IN DIESE FUNKTION EINFÜGEN */
  console.log('Start');
  document.getElementById(inputID).classList.remove('d-none');
  /*  document.getElementsByClassName('cross').style.transform = 'rotate(20deg)';  PLUS ZU X DREHEN*/
}

/* DISABLE AND ENABLE SUBTASKBTN */

function checkInputValue() {
  let subtask = document.getElementById('subtask').value;
  let acceptButton = document.getElementById('acceptButton');

  if (subtask === '') {
    acceptButton.disabled = true;
  } else {
    acceptButton.disabled = false;
  }
}

/* CREATE SUBTASK */

function createSubtask() {
  let subtask = document.getElementById('subtask').value;

  allSubtasks.push(subtask);

  document.getElementById('subtaskList').innerHTML += /*html*/ `
    <div class="checkbox-container">
    <input type="checkbox" id="subTask${subTaskCounter}" />
      <label id = "subTaskValue${subTaskCounter}" for="subTask${subTaskCounter}">${subtask}</label>
    </div>
  `;
  document.getElementById('subtask').value = ``;
  checkInputValue();
  subTaskCounter++;
}

// This functions changes the colors of the Prio-Buttons

function changeColorofUrgentButton() {
  document.getElementById('urgentButton').classList.add('urgentButtonBackground');
  document.getElementById('mediumButton').classList.remove('mediumButtonBackground');
  document.getElementById('lowButton').classList.remove('lowButtonBackground');
  document.getElementById('urgentImg').classList.add('prio-img-white');
  document.getElementById('mediumImg').classList.remove('prio-img-white');
  document.getElementById('lowImg').classList.remove('prio-img-white');
  document.getElementById('urgentText').classList.add('white-text');
  document.getElementById('mediumText').classList.remove('white-text');
  document.getElementById('lowText').classList.remove('white-text');
}

function changeColorofMediumButton() {
  document.getElementById('urgentButton').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButton').classList.add('mediumButtonBackground');
  document.getElementById('lowButton').classList.remove('lowButtonBackground');
  document.getElementById('urgentImg').classList.remove('prio-img-white');
  document.getElementById('mediumImg').classList.add('prio-img-white');
  document.getElementById('lowImg').classList.remove('prio-img-white');
  document.getElementById('urgentText').classList.remove('white-text');
  document.getElementById('mediumText').classList.add('white-text');
  document.getElementById('lowText').classList.remove('white-text');
}

function changeColorofLowButton() {
  document.getElementById('urgentButton').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButton').classList.remove('mediumButtonBackground');
  document.getElementById('lowButton').classList.add('lowButtonBackground');
  document.getElementById('urgentImg').classList.remove('prio-img-white');
  document.getElementById('mediumImg').classList.remove('prio-img-white');
  document.getElementById('lowImg').classList.add('prio-img-white');
  document.getElementById('urgentText').classList.remove('white-text');
  document.getElementById('mediumText').classList.remove('white-text');
  document.getElementById('lowText').classList.add('white-text');
}

function createAssignedToSelection(checkboxid) {
  document.getElementById(checkboxid).innerHTML = ``;

  for (let i = 0; i < users.length; i++) {
    const contactName = users[i]['name'];

    splitName(contactName);
    let restFirstName = splittedName[0].slice(1);
    let restLastName = splittedName[1].slice(1);

    document.getElementById(checkboxid).innerHTML += /*html*/ `
    <div class="flex">
        <label for="checkbox${i}">
            ${splittedName[0].charAt(0).toUpperCase()}${restFirstName}
            ${splittedName[1].charAt(0).toUpperCase()}${restLastName}
            <input type="checkbox" id="checkbox${i}" onchange="createUserIcons('${contactName}')" />
        </label>  
    </div>
  `;
  }
}

function createUserIcons(contactName) {
  generateRandomColor();
  splitName(contactName);
  let usercontainer = document.getElementById('users');
  if (!document.getElementById(contactName)) {
    usercontainer.innerHTML += /*html*/ `
    <div class="contactIcon" id="${contactName}">
        <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
    </div>
`;
    let icon = document.getElementById(`${contactName}`);
    icon.style.backgroundColor = color;
  } else {
    if (!document.getElementById(contactName).classList.contains('d-none')) {
      document.getElementById(contactName).classList.add('d-none');
    } else {
      document.getElementById(contactName).classList.remove('d-none');
    }
  }
}

/* CATEGORYS /////////////////////////////////*/

function openCategorys() {
  document.getElementById('acceptButton').classList.remove('d-none');
  /*  document.getElementsByClassName('cross').style.transform = 'rotate(20deg)';  PLUS ZU X DREHEN*/
}

function showCategorys() {
  renderCategorys();
  let categorys = document.getElementById('categorys');
  if (!categoryExanded) {
    categorys.style.display = 'block';
    categorys.classList.add('category-open');
    categoryExanded = true;
    renderCategorys();
  } else {
    categorys.style.display = 'none';
    categoryExanded = false;
    categorys.classList.remove('category-open');

  }
}

function renderCategorys() {
  document.getElementById('categorys').innerHTML = /*html*/ `     
  <div class="flex" onclick="openCategoryInput()">
    <div class="category-list">
      <p>New Category</p> 
    </div>
  </div>`;

  for (let i = 0; i < allCategorys.length; i++) {
    const category = allCategorys[i];
    let categoryName = category['name'];

    document.getElementById('categorys').innerHTML += /*html*/ `
    <div class="flex" onclick="selectCategory(${i})">
      <div class="category-list">
        <p>${categoryName}</p> <div class="color" style="background-color:${category['color']};">
      </div>
    </div>
    `;
  }
}

function selectCategory(i) {
  category = allCategorys[i];
  document.getElementById('displayCategory').innerHTML = /*html*/ `
      <div class="flex" onclick="selectCategory(${i})">
      <div class="category-list">
        <p>${category['name']}</p> <div class="color" style="background-color:${category['color']};">
      </div>
    </div>
  `;
  showCategorys();
}

function openCategoryInput() {
  document.getElementById('openCategoryInput').classList.remove('d-none');
  document.getElementById('categoryDropdown').classList.add('d-none');
  document.getElementById('color').classList.remove('d-none');
}

function closeCategoryInput() {
  document.getElementById('openCategoryInput').classList.add('d-none');
  document.getElementById('categoryDropdown').classList.remove('d-none');
  document.getElementById('color').classList.add('d-none');
  pickColor('transparent');
  color = 'transparent';
  document.getElementById('inputCategory').value = ``;
}

function pickColor(color) {
  currentColor = color;
  document.getElementById('inputFieldColor').style.backgroundColor = currentColor;
}

async function createNewCategory() {
  let name = document.getElementById('inputCategory').value;

  if (!name) {
    alert('Keinen Kategorienamen eingegeben.');
  } else {
    if (currentColor == 'transparent') {
      alert('Keine Farbe für die Kategorie gewählt.');
    } else {
      allCategorys.push({
        name: name,
        color: currentColor,
      });
      await backend.setItem('allCategorys', JSON.stringify(allCategorys));
      closeCategoryInput();
      renderCategorys();
      selectCategory(allCategorys.length - 1);
    }
  }
}
