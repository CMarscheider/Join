async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}
let currentDraggedElement;
let currentCategory;
let taskCategory;
/**
 * call all render functions for tasks uin board
 */
function renderTasks() {
  setTimeout(() => {
    startRendering();
  }, 300);
}

function resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent){
  openTasksContent.innerHTML="";
  inProgressTasksContent.innerHTML="";
  awaitingFeedbackContent.innerHTML="";
  doneTasksContent.innerHTML="";
}

function startRendering() {
  let openTasksContent = document.getElementById('todoOpenContent');
  let inProgressTasksContent = document.getElementById('todoInProgressContent');
  let awaitingFeedbackContent = document.getElementById('todoAwaitingFeedbackContent');
  let doneTasksContent = document.getElementById('todoDoneContent');
resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent);
console.log(inProgressTasksContent);
  for (let i = 0; i < allTasks.length; i++) {
    const printTask = allTasks[i];
    if (printTask['status'] == "open") {
      taskCategory = "open";
      openTasksContent.innerHTML +=  TaskCard(taskCategory, printTask, i);
    } else if (printTask['status'] == "inProgress") {
      taskCategory = "inProgress";
      inProgressTasksContent.innerHTML += TaskCard(taskCategory, printTask, i);
    } else if (printTask['status'] == "awaitingFeedback") {
      taskCategory = "awaitingFeedback";
      awaitingFeedbackContent.innerHTML += TaskCard(taskCategory, printTask, i);
    } else {
      taskCategory = "done";
      doneTasksContent.innerHTML += TaskCard(taskCategory, printTask, i);
    }
    
      renderFooter(taskCategory, i, printTask);
      styleCategory(printTask, i);
  }

}

function renderFooter(taskCategory, i, printTask) {
  let footer = document.getElementById(`footer${i}`);
  console.log(footer);

  for (let j = 0; j < printTask['assigned'].length; j++) {
    let assigend = printTask['assigned'][j];
    let firstLetter = assigend.charAt(0);
    let secondLetter = assigend.split(' ')[1].charAt(0);
    let restAssigendLength = printTask['assigned'].splice(1).length;
    footer.innerHTML += footerTemplate(firstLetter, secondLetter, restAssigendLength, j);
  }
}

function styleCategory(printTask, b) {
  let cat = document.getElementById(`category${b}`);

  cat.style.backgroundColor = printTask.category.color;
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

function closeInputsForm() {
  document.getElementById('form').classList.add('d-none');
}

// TODO: close input form

function searchContent(value) {
  let todoContent = document.getElementById('todoOpenContent');
  todoContent.innerHTML = '';
  for (let i = 0; i < allTasks.length; i++) {
    let task = allTasks[i];
    if (task.title.includes(value)) {
      todoContent.innerHTML += openTaskCard(task, i);
      styleCategory(task, i);
    }
  }
}

function showOpenTaskPopup(i) {
  document.getElementById('taskPopup').classList.remove('d-none');
  document.getElementById('categoryPopup').innerHTML = allTasks[i].title;
  document.getElementById('categoryPopup').style.background = allTasks[i].category.color;
  document.getElementById('titlePopup').innerHTML = allTasks[i].title;
  document.getElementById('descriptionPopup').innerHTML = allTasks[i].description;
  document.getElementById('datePopup').innerHTML = `<b>Due Date:</b> ${allTasks[i].date}`;

  document.getElementById('prio').innerHTML = `<div class="prio-container-popup"><b>Priority:</b> <span id="prio-status">${allTasks[i].prio} <img id="prio-icon" src="/assets/img/Prio_alta.png"></span></div>`;
  if (allTasks[i].prio === 'urgent') {
    document.getElementById('prio-status').style.background = 'red';
  }
  if (allTasks[i].prio === 'medium') {
    document.getElementById('prio-status').style.background = 'orange';
  }
  if (allTasks[i].prio === 'low') {
    document.getElementById('prio-status').style.background = 'green';
  }
  document.getElementById('assigendTo').innerHTML = allTasks[i].assigned;
}

function cancelTaskPopup() {
  document.getElementById('taskPopup').classList.add('d-none');
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
  renderTasks();
}
