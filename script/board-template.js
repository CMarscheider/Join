/**
 * Generates HTML markup for a task card.
 * @param {object} taskCategory - The category of the task.
 * @param {object} task - The task object containing title and description properties.
 * @param {number} i - The index value of the task.
 * @param {number} ProgressbarValue - The progress value of the task.
 * @param {number} fulfillment - The fulfillment value of the task.
 * @returns {string} - The HTML markup for the task card.
 */

function TaskCard(taskCategory, task, i, ProgressbarValue, fulfillment) {
  return /*html*/ `
      <div class="todo-content" onclick="showOpenTaskPopup(${i})" draggable="true" ondragstart="startDragging(${i})">
              <span class="category${i}" id="category${i}">${task.category.name}</span>
              <h3>${task.title}</h3>
              <p>${task.description}</p>
    
             
              <div class="progress-bar-container" id ="progress-bar-container${i}">
              <progress class="progressbar" id="progressbar${i}" value="${ProgressbarValue}" max="100"></progress>
               
              </div>
    
              <div class="box-footer" id ="footer${i}">
              
               
              </div>
            </div>
      `;
}

/**
 * Generates HTML markup for the footer section of a task card.
 * @param {string} firstLetter - The first letter of the assigned user's name.
 * @param {string} secondLetter - The second letter of the assigned user's name.
 * @param {number} restAssigendLength - The count of additional assigned users.
 * @param {boolean} printTask - Indicates whether the task should be printed.
 * @param {number} i - The index value of the task.
 * @returns {string} - The HTML markup for the footer section of the task card.
 */

function footerTemplate(firstLetter, secondLetter, restAssigendLength, printTask, i) {
  return /*html*/ `
      <div class="footer-circels">
            <span id="firstLettersContainer${i}">${firstLetter}${secondLetter}</span>
            <span id="restLength${i}">+${restAssigendLength}</span>
          </div>

          <div class="footer-images-container">            
            <img src="" id="prioIcon${i}">
          </div>
      `;
}

/**
 * Generates HTML markup for the content section of a task popup.
 * @param {number} i - The index value of the task.
 * @returns {string} - The HTML markup for the content section of the task popup.
 */

function createTaskContentHTML(i) {
  return /*html*/ `
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
      <b>Assigned To:</b>
    </div>
  </div>
  <div class="boardCategoryBtn">
    <button id="popupstatusopen" onclick="moveTo('open', '${i}')" class="workplace">Todo</button>
    <button id="popupstatusinprogress" onclick="moveTo('inProgress', '${i}')" class="workplace">In Progress</button>
    <button id="popupstatusawaitingfeedback" onclick="moveTo('awaitingFeedback', '${i}')" class="workplace">Awaiting Feedback</button>
    <button id="popupstatusdone" onclick="moveTo('done', '${i}')" class="workplace">Done</button>
  </div>
  <div id="btnHolder"></div>
  `;
}

/**
 * Generates HTML markup for the content section of the task edit popup.
 * @param {number} i - The index value of the task.
 * @returns {string} - The HTML markup for the content section of the task edit popup.
 */

function editTaskContent(i) {
  return /*html*/ `
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
          <div class="button-container">
            <button type="button" id="urgentButtonEdit" onclick="checkPriority('urgent'), changeButtons('urgent', true)">
              <b id="urgentTextEdit">Urgent</b>
              <img id="urgentImgEdit" src="./assets/img/highprio.svg" alt="" />
            </button>
            <button type="button" id="mediumButtonEdit" onclick="checkPriority('medium'), changeButtons('medium', true)">
              <b id="mediumTextEdit">Medium</b>
              <img id="mediumImgEdit" src="./assets/img/mediumprio.svg" alt="" />
            </button>
            <button type="button" id="lowButtonEdit" onclick="checkPriority('low'), changeButtons('low', true)">
              <b id="lowTextEdit">Low</b>
              <img id="lowImgEdit" src="./assets/img/lowprio.svg" alt="" />
            </button>
          </div>
        </div>
  <span>Assigned to</span>
  <div class="multiselect">
            <div class="selectBox" onclick="showCheckboxes('editCheckBoxes', ${i})">
              <select>
                <option>Select contacts to assign</option>
              </select>
              <div class="overSelect hover"></div>
            </div>
            <div id="editCheckBoxes">
            </div>
            <div class ="usercontainer" id="users">
              
            </div>
          </div>
          <div id="btnHolder" onclick="pushEditTask(${i})">
            <div class="saveBtn">
              <p>Ok</p>  
          <img  src="./assets/img/done.png" alt="save" >
        </div>
      </div>
  `;
}

/**
 * Generates HTML markup for the assigned user content in the task edit popup.
 * @param {number} j - The index value of the assigned user.
 * @param {string} assignedUser - The name of the assigned user.
 * @param {string} secondLetter - The second letter of the assigned user's name.
 * @returns {string} - The HTML markup for the assigned user content.
 */

function assigendContentHTML(j, assignedUser, secondLetter) {
  return /*html*/ `
  <div class="assigned-box"> 
   <span id="firstLetterAssigned${j}">${assignedUser[0].toUpperCase()} ${secondLetter.toUpperCase()}</span>
   <span>${assignedUser}</span>
 </div>
   `;
}

/**
 * Generates HTML markup for the priority content in the task edit popup.
 * @param {Array} allTasks - An array of all tasks.
 * @param {number} i - The index value of the task.
 * @returns {string} - The HTML markup for the priority content.
 */

function prioContentHTML(allTasks, i) {
  return /*html*/ `<div class="prio-container-popup"><b>Priority:</b> <span id="prio-status">${allTasks[i].prio} <img id="prioIcon${i}" src="./assets/img/Prio_alta.png"></span></div>`;
}

/**
 * Generates HTML markup for the edit and delete buttons in the task card.
 * @param {number} i - The index value of the task.
 * @returns {string} - The HTML markup for the edit and delete buttons.
 */

function editTaskButton(i) {
  return /*html*/ `
  <img class="editButton" src="./assets/img/todo.png" alt="edit" onclick="editTask(${i})">
  <img class="editButton deletebtn" src="./assets/img/trash.png" alt="delete" onclick="deleteTask(${i})">
    `;
}
