let allTasks = [];
let prio;
/* loadAllTasks(); */
var expanded = false;
let temporaryAssigned = [];

async function addTask() {
  let title = document.getElementById('title');
  let description = document.getElementById('description');
  let category = document.getElementById('category');
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
  });
  await backend.setItem('allTasks', JSON.stringify(allTasks));
}


function checkBoxes() {
  for (let i = 0; i < users.length; i++) {
    const checkbox = document.getElementById('checkbox' + i);
    if (checkbox.checked) {
      temporaryAssigned.push(users[i]['name']);
    }
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
              </div>`


  }
}