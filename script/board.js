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
  alert('Ausgeführt');
  if (window.location.href.indexOf("board") > -1) {
    document.getElementById('form-board').classList.remove('d-none');
  } else if  
    (window.location.href.indexOf("contacts") > -1) {
    document.getElementById('form-contacts').classList.remove('d-none');
  }
}

function closeInputsForm() {
/*   document.getElementById('form').classList.add('d-none'); */

  if (window.location.href.indexOf("board") > -1) {
    document.getElementById('form-board').classList.add('d-none');
  } else if  
    (window.location.href.indexOf("contacts") > -1) {
    document.getElementById('form-contacts').classList.add('d-none');
  }
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
  cat.style.maxWidth = '170px';
  cat.style.textAlign = 'center';
  cat.style.padding = '5px';
  cat.style.borderRadius = '8px';
  cat.style.whiteSpace = 'nowrap';
  cat.style.textTransform = 'uppercase';
}

function showOpenTaskPopup(i) {
  document.getElementById('taskPopup').innerHTML = `
<div class="cancel-container">
<span class="category" id="categoryPopup"></span>
<img src="./assets/img/cancelimg.svg" onclick="cancelTaskPopup()">
</div>
<h1 id="titlePopup"></h1>
<p id="descriptionPopup"></p>
<p id="datePopup"></p>
<p id="prio"></p>

<div class="assigend-popup">
<span id="assigendCircels"></span>
<div id="assigendToContainer">
  <!-- <p id="assigendTo"></p>  -->

</div>
</div>
<div id="btnHolder"></div>
`;
  document.getElementById('popUpBackground').classList.add('popUpBackground');
  document.getElementById('taskPopup').classList.remove('d-none');
  document.getElementById('categoryPopup').innerHTML = allTasks[i].category.name;
  document.getElementById('categoryPopup').style.background = allTasks[i].category.color;
  document.getElementById('titlePopup').innerHTML = allTasks[i].title;
  document.getElementById('descriptionPopup').innerHTML = allTasks[i].description;
  document.getElementById('datePopup').innerHTML = `<b>Due Date:</b> ${allTasks[i].date}`;
  document.getElementById('prio').innerHTML = `<div class="prio-container-popup"><b>Priority:</b> <span id="prio-status">${allTasks[i].prio} <img id="prioIcon${i}" src="./assets/img/Prio_alta.png"></span></div>`;
  document.getElementById('btnHolder').innerHTML =/*html*/`
<img class="editButton" src="./assets/img/todo.png" alt="edit" onclick="editTask(${i})">
  `;
  checkPriorityPopup(allTasks, i);

  let assigendToContent = document.getElementById('assigendToContainer');
  assigendToContent.innerHTML = '';
  for (let j = 0; j < allTasks[i].assigned.length; j++) {
    const assignedUser = allTasks[i].assigned[j];
    let secondLetter = assignedUser.split(' ')[1].charAt(0);

    assigendToContent.innerHTML += /*html*/ `
   <div class="assigned-box"> 
    <span id="firstLetterAssigned${j}">${assignedUser[0].toUpperCase()} ${secondLetter.toUpperCase()}</span>
    <span>${assignedUser}</span>
  </div>
    `;
    styleAssignedCircles(j);
    printTask = allTasks[i];
    checkTaskPrio(printTask, i);

  }
}

function editTask(i) {
  let popup = document.getElementById('taskPopup');

  popup.innerHTML = /*html*/`
<div class="cancel-right">
     <img src="./assets/img/cancelimg.svg" onclick="showOpenTaskPopup(${i})">
</div>
<span>Title</span>
<input type="text" id="editTitle">
<span>Description</span>
<input type="text" id="editDescription">
<span>Due Date</span>
<input type="date" id="editDate">
<span>Prio</span>
<div class="prio-container">
        <p><b>Prio</b></p>
        <div class="button-container">
          <button type="button" id="urgentButtonEdit" onclick="checkPriority('urgent'), changeColorofUrgentButtonEdit()">
            <b id="urgentTextEdit">Urgent</b>
            <img id="urgentImgEdit" src="assets/img/highprio.svg" alt="" />
          </button>
          <button type="button" id="mediumButtonEdit" onclick="checkPriority('medium'),changeColorofMediumButtonEdit()">
            <b id="mediumTextEdit">Medium</b>
            <img id="mediumImgEdit" src="assets/img/mediumprio.svg" alt="" />
          </button>
          <button type="button" id="lowButtonEdit" onclick="checkPriority('low'),changeColorofLowButtonEdit()">
            <b id="lowTextEdit">Low</b>
            <img id="lowImgEdit" src="assets/img/lowprio.svg" alt="" />
          </button>
        </div>
      </div>
<span>Assigned to</span> <!-- IDS aus Multiselect ändern -->
<div class="multiselect">
          <div class="selectBox" onclick="showCheckboxes('editCheckBoxes')">
            <select>
              <option>Select contacts to assign</option>
            </select>
            <div class="overSelect"></div>
          </div>
          <div id="editCheckBoxes">
          </div>
          <div class ="usercontainer" id="users">
            
          </div>
        </div>
        <div id="btnHolder">
          <div class="saveBtn">
            <p>Ok</p>  
        <img  src="./assets/img/done.png" alt="save" onclick="pushEditTask(${i})">
      </div>
        
</div>
`;
  document.getElementById('editTitle').value = allTasks[i]['title'];
  document.getElementById('editDescription').value = allTasks[i]['description'];
  document.getElementById('editDate').value = allTasks[i]['date'];
  prio = allTasks[i]['prio'];
  setPrioColor(i);
}





async function pushEditTask(i) {

  let taskInputTitle = document.getElementById('editTitle').value;
  let dueDate = document.getElementById('editDate').value;
  let description = document.getElementById('editDescription').value;
  allTasks[i].title = taskInputTitle;
  allTasks[i].description = description;
  allTasks[i].date = dueDate;
  allTasks[i].prio = prio;
  /* allTasks[i].assignedTo = contactCheckedValue; */
  await backend.setItem('allTasks', JSON.stringify(allTasks));

  window.location.reload();
}



function setPrioColor(i) {
  if (allTasks[i]['prio'] == "low") {
    changeColorofLowButtonEdit();
  } else if (allTasks[i]['prio'] == "medium") {
    changeColorofMediumButtonEdit();

  } else {
    changeColorofUrgentButtonEdit();

  }
}

function changeColorofUrgentButtonEdit() {
  document.getElementById('urgentButtonEdit').classList.add('urgentButtonBackground');
  document.getElementById('mediumButtonEdit').classList.remove('mediumButtonBackground');
  document.getElementById('lowButtonEdit').classList.remove('lowButtonBackground');
  document.getElementById('urgentImgEdit').classList.add('prio-img-white');
  document.getElementById('mediumImgEdit').classList.remove('prio-img-white');
  document.getElementById('lowImgEdit').classList.remove('prio-img-white');
  document.getElementById('urgentTextEdit').classList.add('white-text');
  document.getElementById('mediumTextEdit').classList.remove('white-text');
  document.getElementById('lowTextEdit').classList.remove('white-text');
}

function changeColorofMediumButtonEdit() {
  document.getElementById('urgentButtonEdit').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButtonEdit').classList.add('mediumButtonBackground');
  document.getElementById('lowButtonEdit').classList.remove('lowButtonBackground');
  document.getElementById('urgentImgEdit').classList.remove('prio-img-white');
  document.getElementById('mediumImgEdit').classList.add('prio-img-white');
  document.getElementById('lowImgEdit').classList.remove('prio-img-white');
  document.getElementById('urgentTextEdit').classList.remove('white-text');
  document.getElementById('mediumTextEdit').classList.add('white-text');
  document.getElementById('lowTextEdit').classList.remove('white-text');
}

function changeColorofLowButtonEdit() {
  document.getElementById('urgentButtonEdit').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButtonEdit').classList.remove('mediumButtonBackground');
  document.getElementById('lowButtonEdit').classList.add('lowButtonBackground');
  document.getElementById('urgentImgEdit').classList.remove('prio-img-white');
  document.getElementById('mediumImgEdit').classList.remove('prio-img-white');
  document.getElementById('lowImgEdit').classList.add('prio-img-white');
  document.getElementById('urgentTextEdit').classList.remove('white-text');
  document.getElementById('mediumTextEdit').classList.remove('white-text');
  document.getElementById('lowTextEdit').classList.add('white-text');
}

function styleAssignedCircles(j) {
  let assigendCircels = document.getElementById(`firstLetterAssigned${j}`);
  assigendCircels.style.backgroundColor = 'hsla(' + Math.random() * 360 + ', 100%, 50%, 1)';
  assigendCircels.style.padding = '10px';
  assigendCircels.style.borderRadius = '50%';
  assigendCircels.style.minWidth = '20px';
  assigendCircels.style.minHeight = '20px';
  assigendCircels.style.textAlign = 'center';
  assigendCircels.style.color = '#E1D9D1';
}

function cancelTaskPopup() {
  document.getElementById('popUpBackground').classList.remove('popUpBackground');
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
