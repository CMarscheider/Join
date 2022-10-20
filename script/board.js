async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}
let todoContent;
let todoFooter;
let currentDraggedElement;

/**
 * render all tasks card content
 */
function renderTasks() {
  setTimeout(() => {
    todoContent = document.getElementById('todoContent');
    todoContent.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
      task = allTasks[i];
      todoContent.innerHTML += taskCardHTML(task, i);
      renderTaskFooter(task, i);
      renderCategoryColor(i);
    }
  }, 500);
}

function renderCategoryColor(i) {
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
