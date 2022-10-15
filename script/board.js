async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}
let todoContent;
let todoFooter;

/**
 * render all tasks card content
 */
function renderTasks() {
  setTimeout(() => {
    todoContent = document.getElementById('todoContent');
    todoContent.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
      let task = allTasks[i];
      todoContent.innerHTML += taskCardHTML(task, i);
      renderTaskFooter(task, i);
    }
  }, 500);
}

/**
 * reder tasks cards footer content
 */
function renderTaskFooter(task, i) {
  todoFooter = document.getElementById(`boxFooter${i}`);
  for (let j = 0; j < task['assigned'].length; j++) {
    let assigend = task['assigned'][j];
    let firstLetter = assigend.charAt(0);
    let secondLetter = assigend.split(' ').pop()[0];
    let restAssigendLength = task['assigned'].splice(1).length;
    todoFooter.innerHTML += TaskCardFooterHTML(firstLetter, secondLetter, restAssigendLength);
    console.log(assigend);
  }
}

/**
 * to show Addtask form
 */
function showInputsForm() {
  document.getElementById('form').classList.remove('d-none');
}

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

/**
 * click function on the cards to show popup
 */
function showTaskPopup(i) {
  document.getElementById('taskPopup').classList.remove('d-none');
  document.getElementById('categoryPopup').innerHTML = allTasks[i].category;
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

function urgentPriority(i) {
  document.getElementById(
    'prio'
  ).innerHTML = `<div class="prio-container-popup"><b>Priority:</b> <span id="prio-status">${allTasks[i].prio} <img id="prio-icon" src="/assets/img/Prio_alta.png"></span></div>`;
  document.getElementById('prio-status').style.background = 'red';
}

function mediumPriority(i) {
  document.getElementById(
    'prio'
  ).innerHTML = `<div class="prio-container-popup"><b>Priority:</b> <span id="prio-status">${allTasks[i].prio} <img id="prio-icon" src="/assets/img/Prio media.png"></span></div>`;
  document.getElementById('prio-status').style.background = 'orange';
}

function lowPriority(i) {
  document.getElementById(
    'prio'
  ).innerHTML = `<div class="prio-container-popup"><b>Priority:</b> <span id="prio-status">${allTasks[i].prio} <img id="prio-icon" src="/assets/img/Prio baja.png"></span></div>`;
  document.getElementById('prio-status').style.background = 'green';
}

function cancelTaskPopup() {
  document.getElementById('taskPopup').classList.add('d-none');
}

function taskCardHTML(task, i) {
  return /*html*/ `
  <div class="todo-content" onclick="showTaskPopup(${i})">
          <span class="category${i}">${task.category}</span>
          <h3>${task.title}</h3>
          <p>${task.description}</p>

          <!-- todo -->
          <div class="progress-bar-container">
            <progress id="file" value="32" max="100">32%</progress>
            <label class="label" for="file">Done1/2</label>
          </div>

          <div class="box-footer" id ="boxFooter${i}">
          

           
          </div>
        </div>
  `;
}

function TaskCardFooterHTML(firstLetter, secondLetter, restAssigendLength) {
  return /*html*/ `
  <div class="footer-circels">
        <span>${firstLetter}${secondLetter}</span>
        <span>${restAssigendLength}</span>
      </div>

      <div class="footer-images-container">
        <img src="./assets/img/arrow-down.png" alt="arrow-up" />
        <img src="./assets/img/arrow-down.png" alt="arrow-up" />
      </div>
  `;
}
