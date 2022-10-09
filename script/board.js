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
      console.log(task.title);
      console.log(task.description);
      console.log(task.category);
      console.log(task.date);
      console.log(task.prio);

      todoContent.innerHTML += /*html*/ `
      <div class="todo-content">
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
      todoContent.innerHTML += /*html*/ `
      <div class="todo-content">
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
  }
}
