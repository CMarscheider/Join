<<<<<<< HEAD
const { arrow } = require('@popperjs/core');

let users;
=======
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
>>>>>>> 9e19f4799c9abe5a2f4049ceb926b9ffb87b241d

async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}

console.log(users);

init();
