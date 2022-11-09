function TaskCard(taskCategory, task, i, ProgressbarValue) {
  return /*html*/ `
      <div class="todo-content" onclick="showOpenTaskPopup(${i})" draggable="true" ondragstart="startDragging(${i})">
              <span class="category${i}" id="category${i}">${task.category.name}</span>
              <h3>${task.title}</h3>
              <p>${task.description}</p>
    
              <!-- todo -->
              <div class="progress-bar-container" id ="progress-bar-container${i}">
              <progress class="progressbar" id="progressbar${i}" value="${ProgressbarValue}" max="100"></progress>
                <label id="label${i}">Done1/2</label>
              </div>
    
              <div class="box-footer" id ="footer${i}">
              
               
              </div>
            </div>
      `;
}

function footerTemplate(firstLetter, secondLetter, restAssigendLength, printTask, i) {
  return /*html*/ `
      <div class="footer-circels">
            <span id="firstLettersContainer${i}">${firstLetter}${secondLetter}</span>
            <span id="restLength${i}">${restAssigendLength}</span>
          </div>

          <div class="footer-images-container">            
            <img src="" id="prioIcon${i}">
          </div>
      `;
}
