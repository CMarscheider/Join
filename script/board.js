let title = document.getElementById('title');
let description = document.getElementById('description');
let category = document.getElementById('category');
let assigned = document.getElementById('assigned');
let date = document.getElementById('date');
let urgent = document.getElementById('urgent');
let medium = document.getElementById('medium');
let low = document.getElementById('low');
let subTask = document.getElementById('subtask');
console.log(title, description, category, assigned, date, urgent, medium, low, subTask);

function addTask() {
  let taskFormContent = document.getElementById('taskContent');
  taskFormContent.setAttribute('style', 'display: flex !important');
}

function createTask() {
  //todo: create object
}
