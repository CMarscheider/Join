async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}
let currentDraggedElement;

/**
 * render all tasks card content
 */
function renderTasks() {
  setTimeout(() => {
    renderOpenTasks();
    renderInProgressTasks();
    renderInProgressTasks();
    renderAwaitingFeedbackTasks();
    renderDoneTasks();
  }, 300);
}

function renderOpenTasks() {
  let openTasksContent = document.getElementById('todoOpenContent');
  let openTasks = allTasks.filter((t) => t.status === 'open');
  openTasksContent.innerHTML = '';
  for (let i = 0; i < openTasks.length; i++) {
    task = openTasks[i];
    openTasksContent.innerHTML += openTaskCard(task, i);
    renderOpenTaskFooter(task, i);
    styleCategory(task, i);
  }
}

function renderOpenTaskFooter(task, j) {
  let todoFooter = document.getElementById(`openTaskFooter${j}`);
  for (let j = 0; j < task['assigned'].length; j++) {
    let assigend = task['assigned'][j];
    let firstLetter = assigend.charAt(0);
    let secondLetter = assigend.split(' ')[1].charAt(0);
    let restAssigendLength = task['assigned'].splice(1).length;
    todoFooter.innerHTML += openTaskCardFooter(firstLetter, secondLetter, restAssigendLength);
  }
}

function renderInProgressTasks() {
  let inProgressTasksContent = document.getElementById('todoInProgressContent');
  let inProgressTasks = allTasks.filter((t) => t.status === 'inProgress');
  inProgressTasksContent.innerHTML = '';
  for (let i = 0; i < inProgressTasks.length; i++) {
    let inProgressTask = inProgressTasks[i];
    inProgressTasksContent.innerHTML += inProgressTaskCard(inProgressTask, i);
    renderInProgressTaskFooter(inProgressTask, i);
    styleCategoryProgress(inProgressTask, i);
  }
}

function renderInProgressTaskFooter(task, j) {
  let todoInProgressFooter = document.getElementById(`inProgressFooter${j}`);
  for (let j = 0; j < task['assigned'].length; j++) {
    let assigend = task['assigned'][j];
    let firstLetter = assigend.charAt(0);
    let secondLetter = assigend.split(' ')[1].charAt(0);
    let restAssigendLength = task['assigned'].splice(1).length;
    todoInProgressFooter.innerHTML += inProgressTaskCardFooter(firstLetter, secondLetter, restAssigendLength);
  }
}

function renderAwaitingFeedbackTasks() {
  let awaitingFeedbackContent = document.getElementById('todoAwaitingFeedbackContent');
  let awaitingFeedback = allTasks.filter((t) => t.status === 'awaitingFeedback');
  for (let i = 0; i < awaitingFeedback.length; i++) {
    let awaitingFeedbackTask = awaitingFeedback[i];

    awaitingFeedbackContent.innerHTML += awaitingFeedBackTaskCard(awaitingFeedbackTask, i);
    renderAwaitingFeedbackTaskFooter(i);
    styleCategoryAwaiting(awaitingFeedbackTask, i);
  }
}

function renderAwaitingFeedbackTaskFooter(j) {
  let todoAwaitingFeedbackFooter = document.getElementById(`awaitingFeedbackFooter${j}`);
  for (let j = 0; j < task['assigned'].length; j++) {
    let assigend = task['assigned'][j];
    let firstLetter = assigend.charAt(0);
    let secondLetter = assigend.split(' ')[1].charAt(0);
    let restAssigendLength = task['assigned'].splice(1).length;
    todoAwaitingFeedbackFooter.innerHTML += awaitingFeedbackFooter(firstLetter, secondLetter, restAssigendLength);
  }
}

function renderDoneTasks() {
  let doneTasksContent = document.getElementById('todoDoneContent');
  let doneTasks = allTasks.filter((t) => t.status === 'done');
  for (let i = 0; i < doneTasks.length; i++) {
    let doneTask = doneTasks[i];
    doneTasksContent.innerHTML += doneTaskCard(doneTask, i);
    styleCategory(i);
    styleCategoryDone(doneTask, i);
  }
}

// function renderDoneTasksFooter() {
//   let todoDoneFooter = document.getElementById(`doneFooter${i}`);
// }

function styleCategory(openTask, k) {
  let cardCat = document.getElementById(`category${k}`);
  const cat = cardCat;
  cardCat.style.backgroundColor = openTask.category.color;
  cat.style.color = '#fff';
  cat.style.width = '90px';
  cat.style.textAlign = 'center';
  cat.style.padding = '5px';
  cat.style.borderRadius = '8px';
  cat.style.whiteSpace = 'nowrap';
}

function styleCategoryProgress(inProgressTask, z) {
  let cardCat = document.getElementById(`categoryProgress${z}`);
  const cat = cardCat;
  cardCat.style.backgroundColor = inProgressTask.category.color;
  cat.style.color = '#fff';
  cat.style.width = '90px';
  cat.style.textAlign = 'center';
  cat.style.padding = '5px';
  cat.style.borderRadius = '8px';
  cat.style.whiteSpace = 'nowrap';
}

function styleCategoryAwaiting(awaitingFeedbackTask, a) {
  let cardCat = document.getElementById(`categoryAwaiting${a}`);
  const cat = cardCat;
  cardCat.style.backgroundColor = awaitingFeedbackTask.category.color;
  cat.style.color = '#fff';
  cat.style.width = '90px';
  cat.style.textAlign = 'center';
  cat.style.padding = '5px';
  cat.style.borderRadius = '8px';
  cat.style.whiteSpace = 'nowrap';
}

function styleCategoryDone(doneTask, b) {
  let cardCat = document.getElementById(`categoryDone${b}`);
  const cat = cardCat;
  cardCat.style.backgroundColor = doneTask.category.color;
  cat.style.color = '#fff';
  cat.style.width = '90px';
  cat.style.textAlign = 'center';
  cat.style.padding = '5px';
  cat.style.borderRadius = '8px';
  cat.style.whiteSpace = 'nowrap';
}

function showInputsForm() {
  document.getElementById('form').classList.remove('d-none');
}

// TODO: close input form

function searchContent(value) {
  todoContent.innerHTML = '';
  for (let i = 0; i < allTasks.length; i++) {
    let task = allTasks[i];
    if (task.title.includes(value)) {
      todoContent = document.getElementById('todoContent');
      todoContent.innerHTML += taskCardHTML(task, i);
    }
  }
}

function showTaskPopup(i) {
  document.getElementById('taskPopup').classList.remove('d-none');
  document.getElementById('categoryPopup').innerHTML = allTasks[i].category.name;
  document.getElementById('categoryPopup').style.background = allTasks[i].category.color;
  document.getElementById('titlePopup').innerHTML = allTasks[i].title;
  document.getElementById('descriptionPopup').innerHTML = allTasks[i].description;
  document.getElementById('datePopup').innerHTML = `<b>Due Date:</b> ${allTasks[i].date}`;
  if (allTasks[i].prio === 'urgent') {
    urgentPriority(i);
  }
  if (allTasks[i].prio === 'medium') {
    mediumPriority(i);
  }
  if (allTasks[i].prio === 'low') {
    lowPriority(i);
  }
  document.getElementById('assigendTo').innerHTML = allTasks[i].assigned;
}

//Drag and Drop
function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  allTasks[currentDraggedElement]['status'] = category;
}
//Drag and Drop
