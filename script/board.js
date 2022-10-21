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
  }, 300);
}

function renderOpenTasks() {
  let openTasks = allTasks.filter((t) => t.status === 'open');
  let openTasksContent = document.getElementById('todoOpenContent');
  openTasksContent.innerHTML = '';
  for (let i = 0; i < openTasks.length; i++) {
    task = openTasks[i];
    openTasksContent.innerHTML += openTaskCard(task, i);
    renderOpenTaskFooter(task, i);
    styleCategory(i);
  }
}

function renderOpenTaskFooter(task, i) {
  let todoFooter = document.getElementById(`openTaskFooter${i}`);
  for (let j = 0; j < task['assigned'].length; j++) {
    let assigend = task['assigned'][j];
    let firstLetter = assigend.charAt(0);
    let secondLetter = assigend.split(' ').pop()[0];
    let restAssigendLength = task['assigned'].splice(1).length;
    todoFooter.innerHTML += openTaskCardFooter(firstLetter, secondLetter, restAssigendLength);
  }
}

function renderInProgressTasks() {
  let inProgressTasks = allTasks.filter((t) => t.status === 'inProgress');
  let inProgressTasksContent = document.getElementById('todoInProgressContent');
  inProgressTasksContent.innerHTML = '';
  for (let i = 0; i < inProgressTasks.length; i++) {
    let inProgressTask = inProgressTasks[i];
    inProgressTasksContent.innerHTML += inProgressTaskCard(inProgressTask, i);
    renderInProgressTaskFooter(i);
    styleCategory(i);
  }
}

function renderInProgressTaskFooter(i) {
  let todoInProgressFooter = document.getElementById(`inProgressFooter${i}`);
  for (let j = 0; j < task['assigned'].length; j++) {
    let assigend = task['assigned'][j];
    let firstLetter = assigend.charAt(0);
    let secondLetter = assigend.split(' ').pop()[0];
    let restAssigendLength = task['assigned'].splice(1).length;
    todoInProgressFooter.innerHTML += inProgressTaskCardFooter(firstLetter, secondLetter, restAssigendLength);
  }
}

function renderAwaitingFeedbackTasks() {
  let awaitingFeedback = allTasks.filter((t) => t.status === 'awaitingFeedback');
  let awaitingFeedbackContent = document.getElementById('todoAwaitingFeedbackContent');
  for (let i = 0; i < awaitingFeedback.length; i++) {
    let awaitingFeedbackTask = awaitingFeedback[i];

    awaitingFeedbackContent.innerHTML += awaitingFeedBackTaskCard(awaitingFeedbackTask, i);
    renderAwaitingFeedbackTaskFooter(i);
    styleCategory(i);
  }
}

function renderAwaitingFeedbackTaskFooter(i) {
  let todoAwaitingFeedbackFooter = document.getElementById(`awaitingFeedbackFooter${i}`);
  for (let j = 0; j < task['assigned'].length; j++) {
    let assigend = task['assigned'][j];
    let firstLetter = assigend.charAt(0);
    let secondLetter = assigend.split(' ').pop()[0];
    let restAssigendLength = task['assigned'].splice(1).length;
    todoAwaitingFeedbackFooter.innerHTML += awaitingFeedbackFooter(firstLetter, secondLetter, restAssigendLength);
  }
}

function styleCategory(i) {
  let cardCat = document.getElementsByClassName(`category${i}`);
  for (let k = 0; k < cardCat.length; k++) {
    const cat = cardCat[k];
    cat.style.backgroundColor = task.category.color;
    cat.style.color = '#fff';
    cat.style.width = '90px';
    cat.style.textAlign = 'center';
    cat.style.padding = '5px';
    cat.style.borderRadius = '8px';
  }
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
