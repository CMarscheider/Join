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
