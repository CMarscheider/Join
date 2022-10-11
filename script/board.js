async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}
let todoContent;
function renderTasks() {
  setTimeout(() => {
    todoContent = document.getElementById('todoContent');
    todoContent.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
      const task = allTasks[i];
      todoContent.innerHTML += taskCardHTML(task);
    }
  }, 300);
}

function showInputsForm() {
  document.getElementById('form').classList.remove('d-none');
}

function searchContent(value) {
  todoContent.innerHTML = '';
  for (let i = 0; i < allTasks.length; i++) {
    let task = allTasks[i];
    if (task.title.includes(value)) {
      todoContent = document.getElementById('todoContent');
      todoContent.innerHTML += taskCardHTML(task);
    }
  }
}

function showTaskPopup() {
  document.getElementById('taskPopup').classList.remove('d-none');
}

function cancelTaskPopup() {
  document.getElementById('taskPopup').classList.add('d-none');
}

function taskCardHTML(task) {
  return /*html*/ `
  <div class="todo-content" onclick="showTaskPopup()">
          <span class="category">${task.category}</span>
          <h3>${task.title}</h3>
          <p>${task.description}</p>


          <!-- todo -->
          <div class="progress-bar-container">
            <progress id="file" value="32" max="100">32%</progress>
            <label class="label" for="file">Done1/2</label>
          </div>

          <div class="box-footer">
            <div class="footer-circels">
              <span>AS</span>
              <span>DE</span>
              <span>+2</span>
            </div>

            <div class="footer-images-container">
              <img src="./assets/img/arrow-down.png" alt="arrow-up" />
              <img src="./assets/img/arrow-down.png" alt="arrow-up" />
            </div>
          </div>
        </div>
  `;
}
