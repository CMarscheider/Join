/* async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
} */

let currentDraggedElement;
let currentCategory;
let taskCategory;
let printTask;
let ProgressbarValue;
let label;
let fulfillment;

function showInputsForm() {
  document.getElementById('form').classList.remove('d-none');
}

function closeInputsForm() {
  document.getElementById('form').classList.add('d-none');
}

function resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent) {
  openTasksContent.innerHTML = '';
  inProgressTasksContent.innerHTML = '';
  awaitingFeedbackContent.innerHTML = '';
  doneTasksContent.innerHTML = '';
}

function startRendering() {
  let openTasksContent = document.getElementById('todoOpenContent');
  let inProgressTasksContent = document.getElementById('todoInProgressContent');
  let awaitingFeedbackContent = document.getElementById('todoAwaitingFeedbackContent');
  let doneTasksContent = document.getElementById('todoDoneContent');
  resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent);
  for (let i = 0; i < allTasks.length; i++) {
    printTask = allTasks[i];

    checkProgressStatus(taskCategory, printTask, i, doneTasksContent, awaitingFeedbackContent, inProgressTasksContent, openTasksContent, ProgressbarValue, label, fulfillment);
    renderFooter(taskCategory, i, printTask);
    styleCategory(printTask, i);
    ProgressbarValue = document.getElementById(`progressbar${i}`).value;
    label = document.getElementById(`label${i}`);
  }
}

function checkProgressStatus(taskCategory, printTask, i, doneTasksContent, awaitingFeedbackContent, inProgressTasksContent, openTasksContent, ProgressbarValue, fulfillment) {
  if (printTask['status'] == 'open') {
    taskCategory = 'open';
    ProgressbarValue = 0;
    fulfillment = 0;
    openTasksContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  } else if (printTask['status'] == 'inProgress') {
    taskCategory = 'inProgress';
    ProgressbarValue = 33.33;
    fulfillment = 1;
    inProgressTasksContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  } else if (printTask['status'] == 'awaitingFeedback') {
    taskCategory = 'awaitingFeedback';
    ProgressbarValue = 66.66;
    fulfillment = 2;
    awaitingFeedbackContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  } else {
    taskCategory = 'done';
    ProgressbarValue = 100;
    fulfillment = 3;
    doneTasksContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  }
}

function renderFooter(taskCategory, i, printTask) {
  let footer = document.getElementById(`footer${i}`);
  let assigend = printTask['assigned'][0];
  let firstLetter = assigend.charAt(0);
  let secondLetter = assigend.split(' ')[1].charAt(0);
  let restAssigendLength = printTask['assigned'].length - 1;
  footer.innerHTML += footerTemplate(firstLetter, secondLetter, restAssigendLength, printTask, i);
  checkTaskPrio(printTask, i);
  if (restAssigendLength == 0) {
    document.getElementById(`restLength${i}`).classList.add('d-none');
  }
}

function checkTaskPrio(printTask, i) {
  let img = document.getElementById(`prioIcon${i}`);
  if (printTask.prio == 'urgent') {
    img.src = './assets/img/Prio_alta.png';
  } else if (printTask.prio == 'medium') {
    img.src = './assets/img/Prio_media.png';
  } else {
    img.src = './assets/img/Prio_baja.png';
  }
}

function styleCategory(printTask, b) {
  let cat = document.getElementById(`category${b}`);
  cat.style.backgroundColor = printTask.category.color;
  cat.style.color = '#fff';
  cat.style.minWidth = '50px';
  cat.style.textAlign = 'center';
  cat.style.padding = '5px';
  cat.style.borderRadius = '8px';
  cat.style.whiteSpace = 'nowrap';
  cat.style.textTransform = 'uppercase';
}

function showOpenTaskPopup(i) {
  document.getElementById('taskPopup').classList.remove('d-none');
  document.getElementById('categoryPopup').innerHTML = allTasks[i].category.name;
  document.getElementById('categoryPopup').style.background = allTasks[i].category.color;
  document.getElementById('titlePopup').innerHTML = allTasks[i].title;
  document.getElementById('descriptionPopup').innerHTML = allTasks[i].description;
  document.getElementById('datePopup').innerHTML = `<b>Due Date:</b> ${allTasks[i].date}`;
  document.getElementById(
    'prio'
  ).innerHTML = `<div class="prio-container-popup"><b>Priority:</b> <span id="prio-status">${allTasks[i].prio} <img id="prio-icon" src="./assets/img/Prio_alta.png"></span></div>`;
  checkPriorityPopup(allTasks, i);

  let assigendToContent = document.getElementById('assigendToContainer');
  assigendToContent.innerHTML = '';
  for (let j = 0; j < allTasks[i].assigned.length; j++) {
    const assignedUser = allTasks[i].assigned[j];
    assigendToContent.innerHTML += /*html*/ `
   <div class="assigned-box"> 
    <span id="firstLetterAssigned${j}">${assignedUser[0].toUpperCase()}</span>
    <span>${assignedUser}</span>
  </div>
    `;
    styleAssignedCircles(j);
  }
}

function styleAssignedCircles(j) {
  let assigendCircels = document.getElementById(`firstLetterAssigned${j}`);
  assigendCircels.style.backgroundColor = 'hsla(' + Math.random() * 360 + ', 100%, 50%, 1)';
  assigendCircels.style.padding = '10px';
  assigendCircels.style.borderRadius = '50%';
  assigendCircels.style.minWidth = '20px';
  assigendCircels.style.minHeight = '20px';
  assigendCircels.style.textAlign = 'center';
}

function cancelTaskPopup() {
  document.getElementById('taskPopup').classList.add('d-none');
}

function checkPriorityPopup(allTasks, i) {
  if (allTasks[i].prio === 'urgent') {
    document.getElementById('prio-status').style.background = 'red';
  }
  if (allTasks[i].prio === 'medium') {
    document.getElementById('prio-status').style.background = 'orange';
  }
  if (allTasks[i].prio === 'low') {
    document.getElementById('prio-status').style.background = 'green';
  }
}

//Drag and Drop
function startDragging(id) {
  currentDraggedElement = id;
  currentCategory = allTasks[currentDraggedElement]['status'];
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category) {
  allTasks[currentDraggedElement]['status'] = category;
  await backend.setItem('allTasks', JSON.stringify(allTasks));
  startRendering();
}

function searchTasks(value) {
  value = value.toLowerCase();
  let openTasksContent = document.getElementById('todoOpenContent');
  let inProgressTasksContent = document.getElementById('todoInProgressContent');
  let awaitingFeedbackContent = document.getElementById('todoAwaitingFeedbackContent');
  let doneTasksContent = document.getElementById('todoDoneContent');
  resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent);
  for (let i = 0; i < allTasks.length; i++) {
    const searchTask = allTasks[i];
    if (searchTask.title.toLowerCase().includes(value)) {
      checkProgressStatus(taskCategory, searchTask, i, doneTasksContent, awaitingFeedbackContent, inProgressTasksContent, openTasksContent);
      renderFooter(taskCategory, i, searchTask);
      styleCategory(searchTask, i);
    }
  }
}
