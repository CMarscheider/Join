function openTaskCard(task, i) {
  return /*html*/ `
      <div class="todo-content" onclick="showOpenTaskPopup(${task})" draggable="true" ondragstart="startDragging(${i})">
              <span class="category${i}" id="category${i}">${task.category.name}</span>
              <h3>${task.title}</h3>
              <p>${task.description}</p>
    
              <!-- todo -->
              <div class="progress-bar-container">
                <progress id="file" value="32" max="100">32%</progress>
                <label class="label" for="file">Done1/2</label>
              </div>
    
              <div class="box-footer" id ="openTaskFooter${i}">
              
               
              </div>
            </div>
      `;
}

function openTaskCardFooter(firstLetter, secondLetter, restAssigendLength, j) {
  return /*html*/ `
      <div class="footer-circels">
            <span id="firstLettersContainer">${firstLetter}${secondLetter}</span>
            <span id="restLength${j}A">${restAssigendLength}</span>
          </div>

          <div class="footer-images-container">
            <img src="./assets/img/arrow-down.png" alt="arrow-up" />
            <img src="./assets/img/arrow-down.png" alt="arrow-up" />
          </div>
      `;
}

function inProgressTaskCard(inProgressTask, i) {
  return /*html*/ `
  <div class="todo-content"  draggable="true" ondragstart="startDragging(${i})">
           <span class="category${i}" id="categoryProgress${i}">${inProgressTask.category.name}</span>
           <h3>${inProgressTask.title}</h3>
           <p>${inProgressTask.description}</p>
 
           <!-- todo -->
           <div class="progress-bar-container">
             <progress id="file" value="32" max="100">32%</progress>
             <label class="label" for="file">Done1/2</label>
           </div>
           <div class="box-footer" id ="inProgressFooter${i}">      
           </div>
         </div>
 `;
}

function inProgressTaskCardFooter(firstLetter, secondLetter, restAssigendLength, j) {
  return /*html*/ `
  <div class="footer-circels">
          <span id="firstLettersContainer">${firstLetter}${secondLetter}</span>
          <span id="restLengt">${restAssigendLength}</span>
        </div>
  
        <div class="footer-images-container">
          <img src="./assets/img/arrow-down.png" alt="arrow-up" />
          <img src="./assets/img/arrow-down.png" alt="arrow-up" />
        </div>
  `;
}

function awaitingFeedBackTaskCard(awaitingFeedbackTask, i) {
  return /*html*/ `
  <div class="todo-content" draggable="true" ondragstart="startDragging(${i})">
           <span class="category${i}" id="categoryAwaiting${i}">${awaitingFeedbackTask.category.name}</span>
           <h3>${awaitingFeedbackTask.title}</h3>
           <p>${awaitingFeedbackTask.description}</p>
 
           <!-- todo -->
           <div class="progress-bar-container">
             <progress id="file" value="32" max="100">32%</progress>
             <label class="label" for="file">Done1/2</label>
           </div>
           <div class="box-footer" id ="awaitingFeedbackFooter${i}">      
           </div>
         </div>
 `;
}

function awaitingFeedbackFooter(firstLetter, secondLetter, restAssigendLength, j) {
  return /*html*/ `
  <div class="footer-circels">
          <span id="firstLettersContainer">${firstLetter}${secondLetter}</span>
          <span id="restLenght">${restAssigendLength}</span>
        </div>
  
        <div class="footer-images-container">
          <img src="./assets/img/arrow-down.png" alt="arrow-up" />
          <img src="./assets/img/arrow-down.png" alt="arrow-up" />
        </div>
  `;
}

function doneTaskCard(doneTask, i) {
  return /*html*/ `
  <div class="todo-content" draggable="true" ondragstart="startDragging(${i})">
           <span class="category${i}" id="categoryDone${i}">${doneTask.category.name}</span>
           <h3>${doneTask.title}</h3>
           <p>${doneTask.description}</p>
 
           <!-- todo -->
           <div class="progress-bar-container">
             <progress id="file" value="32" max="100">32%</progress>
             <label class="label" for="file">Done1/2</label>
           </div>
           <div class="box-footer" id ="doneFooter${i}">      
           </div>
         </div>
 `;
}

function doneFooter(firstLetter, secondLetter, restAssigendLength, j) {
  return /*html*/ `
  <div class="footer-circels">
          <span id="firstLettersContainer">${firstLetter}${secondLetter}</span>
          <span id="restLength">${restAssigendLength}</span>
        </div>
  
        <div class="footer-images-container">
          <img src="./assets/img/arrow-down.png" alt="arrow-up" />
          <img src="./assets/img/arrow-down.png" alt="arrow-up" />
        </div>
  `;
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
  ).innerHTML = 65`<div class="prio-container-popup"><b>Priority:</b> <span id="prio-status">${allTasks[i].prio} <img id="prio-icon" src="/assets/img/Prio media.png"></span></div>`;
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
