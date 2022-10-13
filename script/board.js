async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}
let todoContent;
let todoFooter;

function renderTasks() {
  setTimeout(() => {
    todoContent = document.getElementById('todoContent');
    todoContent.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
      let task = allTasks[i];
      todoContent.innerHTML += taskCardHTML(task, i);

      todoFooter = document.getElementById('boxFooter');

      for (let j = 0; j < task['assigned'].length; j++) {
        let assigend = task['assigned'][j];
        let firstLetter = assigend.charAt(0);
        let secondLetter = assigend.split(' ').pop()[0];

        console.log(firstLetter, secondLetter);

        //Todo: render card footer
      }
    }
  }, 500);
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

function showTaskPopup(i) {
  document.getElementById('taskPopup').classList.remove('d-none');
  document.getElementById('categoryPopup').innerHTML = allTasks[i].category;
  document.getElementById('titlePopup').innerHTML = allTasks[i].title;
  document.getElementById('descriptionPopup').innerHTML = allTasks[i].description;
  document.getElementById('datePopup').innerHTML = `<b>Due Date:</b> ${allTasks[i].date}`;
}

function cancelTaskPopup() {
  document.getElementById('taskPopup').classList.add('d-none');
}

function taskCardHTML(task, i) {
  return /*html*/ `
  <div class="todo-content" onclick="showTaskPopup(${i})">
          <span class="category">${task.category}</span>
          <h3>${task.title}</h3>
          <p>${task.description}</p>


          <!-- todo -->
          <div class="progress-bar-container">
            <progress id="file" value="32" max="100">32%</progress>
            <label class="label" for="file">Done1/2</label>
          </div>

          <div class="box-footer" id ="boxFooter">
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
