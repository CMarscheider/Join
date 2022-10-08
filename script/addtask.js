let allTasks = [];
let prio;
/* loadAllTasks(); */
var expanded = false;

async function addTask() {
  let title = document.getElementById('title');
  let description = document.getElementById('description');
  let category = document.getElementById('category');
  let assigned = document.getElementById('assigned');
  let date = document.getElementById('date');

  /* let subtask = document.getElementById('subtask').value; */



  allTasks.push({
    title: title.value,
    description: description.value,
    category: category.value,
/*     assigned: assigned.value, */
    date: date.value,
    prio: prio,
  });
  await backend.setItem('allTasks', JSON.stringify(allTasks));
}



function checkPriority(priority) {
  prio = priority;
}

// Assigned to function
function showCheckboxes() {
  var checkboxes = document.getElementById('checkboxes');
  if (!expanded) {
    checkboxes.style.display = 'block';
    expanded = true;
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
}

function changeColorofMediumButton() {
  document.getElementById('urgentButton').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButton').classList.add('mediumButtonBackground');
  document.getElementById('lowButton').classList.remove('lowButtonBackground');
}

function changeColorofLowButton() {
  document.getElementById('urgentButton').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButton').classList.remove('mediumButtonBackground');
  document.getElementById('lowButton').classList.add('lowButtonBackground');
}

