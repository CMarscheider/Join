let allTasks = [];
let prio;
/* loadAllTasks(); */
var expanded = false;
let temporaryAssigned = [];
let temporarySubTasks = [];
let allSubtasks = [];
let subTaskCounter = 0;
let categorys = ["Sales", "Backoffice"];


async function addTask() {
  let title = document.getElementById('title');
  let description = document.getElementById('description');
  /* let category = document.getElementById('category'); */
  let date = document.getElementById('date');
  checkBoxes();

  /* let subtask = document.getElementById('subtask').value; */


  allTasks.push({
    title: title.value,
    description: description.value,
    category: category.value,
    assigned: temporaryAssigned,
    date: date.value,
    prio: prio,
    subtasks : temporarySubTasks,
  });
  await backend.setItem('allTasks', JSON.stringify(allTasks));

  /* RESET FELDER */
  subTaskCounter = 0;
  document.getElementById('subtaskList').innerHTML = ``;

  /* GEPFUSCHTE LÖSUNG; SEITE WIRD NEU GELADEN: NACH EINEM ADDTASK KANN MAN KEINEN 2. HINZUFÜGEN. */
  window.location.href = 'addtask.html';

}


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
    console.log(temporarySubTasks);

  }
}

/* ////////////////////////////////////////////////// */

function checkPriority(priority) {
  prio = priority;
}

// Assigned to function
function showCheckboxes() {
  var checkboxes = document.getElementById('checkboxes');
  if (!expanded) {
    checkboxes.style.display = 'block';
    expanded = true;
    createAssignetToSelection();
  } else {
    checkboxes.style.display = 'none';
    expanded = false;
  }
}

/* OPEN SUBTASKFIELD */

function openSubtask() {
  document.getElementById('acceptButton').classList.remove('d-none');
  /*  document.getElementsByClassName('cross').style.transform = 'rotate(20deg)';  PLUS ZU X DREHEN*/
}

/* DISABLE AND ENABLE SUBTASKBTN */

function checkInputValue() {
  let subtask = document.getElementById('subtask').value;
  let acceptButton = document.getElementById('acceptButton');

  if (subtask === "") {
    acceptButton.disabled = true;
  } else {
    acceptButton.disabled = false;
  }
}

/* CREATE SUBTASK */

function createSubtask() {
  let subtask = document.getElementById('subtask').value;

  allSubtasks.push(subtask);

  document.getElementById('subtaskList').innerHTML += /*html*/`
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

function createAssignetToSelection() {
  document.getElementById('checkboxes').innerHTML = ``;

  for (let i = 0; i < users.length; i++) {
    const contact = users[i];

    let contactName = contact['name'];

    document.getElementById('checkboxes').innerHTML += /*html*/`
    <div class="flex">
              <label for="checkbox${i}">${contactName}</label>
              <input type="checkbox" id="checkbox${i}" />
              </div>
              `
  }
}



/* CATEGORYS /////////////////////////////////*/



function openCategorys() {
  document.getElementById('acceptButton').classList.remove('d-none');
  /*  document.getElementsByClassName('cross').style.transform = 'rotate(20deg)';  PLUS ZU X DREHEN*/
}



function createCategory() {
  let subtask = document.getElementById('subtask').value;

  allSubtasks.push(subtask);

  document.getElementById('subtaskList').innerHTML += /*html*/`
    <div class="checkbox-container">
    <input type="checkbox" id="subTask${subTaskCounter}" />
      <label id = "subTaskValue${subTaskCounter}" for="subTask${subTaskCounter}">${subtask}</label>
    </div>
  `;
  document.getElementById('subtask').value = ``;
  checkInputValue();
  subTaskCounter++;

}

function showCategorys() {
  renderCategorys();
  var categorys = document.getElementById('categorys');
  if (!expanded) {
    categorys.style.display = 'block';
    expanded = true;
    createAssignetToSelection();
  } else {
    categorys.style.display = 'none';
    expanded = false;
  }
}

function renderCategorys(){
let categorySection = document.getElementById('categorys');

categorySection.innerHTML = "";

}