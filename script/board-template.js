function TaskCard(taskCategory, task, i) {
  return /*html*/ `
      <div class="todo-content" onclick="showOpenTaskPopup(${i})" draggable="true" ondragstart="startDragging(${i})">
              <span class="category${i}" id="category${i}">${task.category.name}</span>
              <h3>${task.title}</h3>
              <p>${task.description}</p>
    
              <!-- todo -->
              <div class="progress-bar-container">
                <progress id="file" value="32" max="100">32%</progress>
                <label class="label" for="file">Done1/2</label>
              </div>
    
              <div class="box-footer" id ="footer${i}">
              
               
              </div>
            </div>
      `;
      
}

function footerTemplate(firstLetter, secondLetter, restAssigendLength, j) {
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