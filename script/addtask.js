let allTasks = [];
let prio;
/* loadAllTasks(); */
var expanded = false;
let categoryExanded = false;
let temporaryAssigned = [];
let temporarySubTasks = [];
let allSubtasks = [];
let subTaskCounter = 0;
let category;
let categorys = [
  {
    name: "Sales",
    color: "red"
  },
  {
    name: "Backoffice",
    color: "lightblue"
  },
];


async function addTask() {
  let title = document.getElementById('title');
  let description = document.getElementById('description');
  /* let category = document.getElementById('category'); */
  let date = document.getElementById('date');
  checkBoxes();

  /* let subtask = document.getElementById('subtask').value; */


  allTasks.push({
    title: title.value,
    description: description.value,
    category: category,
    assigned: temporaryAssigned,
    date: date.value,
    prio: prio,
    subtasks: temporarySubTasks,
  });
  await backend.setItem('allTasks', JSON.stringify(allTasks));

  /* RESET FELDER */
  subTaskCounter = 0;
  document.getElementById('subtaskList').innerHTML = ``;

  /* GEPFUSCHTE LÖSUNG; SEITE WIRD NEU GELADEN: NACH EINEM ADDTASK KANN MAN KEINEN 2. HINZUFÜGEN. */
  window.location.href = 'addtask.html';

}


function checkBoxes() {
  temporaryAssigned = [];
  temporarySubTasks = [];
  for (let i = 0; i < users.length; i++) {
    const checkbox = document.getElementById('checkbox' + i);
    if (checkbox.checked) {
      temporaryAssigned.push(users[i]['name']);
    }
  }

  for (let i = 0; i < allSubtasks.length; i++) {
    const checkboxSubtask = document.getElementById('subTask' + i);
    let content = document.getElementById('subTaskValue' + i).innerText;
    if (checkboxSubtask.checked) {
      temporarySubTasks.push(content);
    }
    console.log(temporarySubTasks);

  }
}

/* ////////////////////////////////////////////////// */

function checkPriority(priority) {
  prio = priority;
}

// Assigned to function
function showCheckboxes() {
  var checkboxes = document.getElementById('checkboxes');
  if (!expanded) {
    checkboxes.style.display = 'block';
    expanded = true;
    createAssignetToSelection();
  } else {
    checkboxes.style.display = 'none';
    expanded = false;
  }
}

/* OPEN SUBTASKFIELD */

function openInputfield(inputID) {
  /* ANDERE FELDER IN DIESE FUNKTION EINFÜGEN */
  document.getElementById(inputID).classList.remove('d-none');
  /*  document.getElementsByClassName('cross').style.transform = 'rotate(20deg)';  PLUS ZU X DREHEN*/
}

/* DISABLE AND ENABLE SUBTASKBTN */

function checkInputValue() {
  let subtask = document.getElementById('subtask').value;
  let acceptButton = document.getElementById('acceptButton');

  if (subtask === "") {
    acceptButton.disabled = true;
  } else {
    acceptButton.disabled = false;
  }
}

/* CREATE SUBTASK */

function createSubtask() {
  let subtask = document.getElementById('subtask').value;

  allSubtasks.push(subtask);

  document.getElementById('subtaskList').innerHTML += /*html*/`
    <div class="checkbox-container">
    <input type="checkbox" id="subTask${subTaskCounter}" />
      <label id = "subTaskValue${subTaskCounter}" for="subTask${subTaskCounter}">${subtask}</label>
    </div>
  `;
  document.getElementById('subtask').value = ``;
  checkInputValue();
  subTaskCounter++;

}


// This functions changes the colors of the Prio-Buttons

function changeColorofUrgentButton() {
  document.getElementById('urgentButton').classList.add('urgentButtonBackground');
  document.getElementById('mediumButton').classList.remove('mediumButtonBackground');
  document.getElementById('lowButton').classList.remove('lowButtonBackground');
  document.getElementById('urgentImg').classList.add('prio-img-white');
  document.getElementById('mediumImg').classList.remove('prio-img-white');
  document.getElementById('lowImg').classList.remove('prio-img-white');
  document.getElementById('urgentText').classList.add('white-text');
  document.getElementById('mediumText').classList.remove('white-text');
  document.getElementById('lowText').classList.remove('white-text');

}

function changeColorofMediumButton() {
  document.getElementById('urgentButton').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButton').classList.add('mediumButtonBackground');
  document.getElementById('lowButton').classList.remove('lowButtonBackground');
  document.getElementById('urgentImg').classList.remove('prio-img-white');
  document.getElementById('mediumImg').classList.add('prio-img-white');
  document.getElementById('lowImg').classList.remove('prio-img-white');
  document.getElementById('urgentText').classList.remove('white-text');
  document.getElementById('mediumText').classList.add('white-text');
  document.getElementById('lowText').classList.remove('white-text');

}

function changeColorofLowButton() {
  document.getElementById('urgentButton').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButton').classList.remove('mediumButtonBackground');
  document.getElementById('lowButton').classList.add('lowButtonBackground');
  document.getElementById('urgentImg').classList.remove('prio-img-white');
  document.getElementById('mediumImg').classList.remove('prio-img-white');
  document.getElementById('lowImg').classList.add('prio-img-white');
  document.getElementById('urgentText').classList.remove('white-text');
  document.getElementById('mediumText').classList.remove('white-text');
  document.getElementById('lowText').classList.add('white-text');
}

function createAssignetToSelection() {
  document.getElementById('checkboxes').innerHTML = ``;

  for (let i = 0; i < users.length; i++) {
    const contact = users[i];

    let contactName = contact['name'];

    document.getElementById('checkboxes').innerHTML += /*html*/`
    <div class="flex">
              <label for="checkbox${i}">${contactName}</label>
              <input type="checkbox" id="checkbox${i}" />
              </div>
              `
  }
}



/* CATEGORYS /////////////////////////////////*/



function openCategorys() {
  document.getElementById('acceptButton').classList.remove('d-none');
  /*  document.getElementsByClassName('cross').style.transform = 'rotate(20deg)';  PLUS ZU X DREHEN*/
}



function createCategory() {
  let subtask = document.getElementById('subtask').value;

  allSubtasks.push(subtask);

  document.getElementById('subtaskList').innerHTML += /*html*/`
    <div class="checkbox-container">
    <input type="checkbox" id="subTask${subTaskCounter}" />
      <label id = "subTaskValue${subTaskCounter}" for="subTask${subTaskCounter}">${subtask}</label>
    </div>
  `;
  document.getElementById('subtask').value = ``;
  checkInputValue();
  subTaskCounter++;

}

function showCategorys() {
  renderCategorys();
  var categorys = document.getElementById('categorys');
  if (!categoryExanded) {
    categorys.style.display = 'block';
    categoryExanded = true;
    renderCategorys();
  } else {
    categorys.style.display = 'none';
    categoryExanded = false;
  }
}



function renderCategorys() {
  document.getElementById('categorys').innerHTML = /*html*/`     
  <div class="flex" onclick="createNewCategory()">
    <div class="category-list">
      <p>New Category</p> 
    </div>
  </div>`;

  for (let i = 0; i < categorys.length; i++) {
    const category = categorys[i];
    let categoryName = category['name'];

    document.getElementById('categorys').innerHTML += /*html*/`
    <div class="flex" onclick="selectCategory(${i})">
      <div class="category-list">
        <p>${categoryName}</p> <div class="colors" style="background-color:${category['color']};">
      </div>
    </div>
    `;
  }
}

function selectCategory(i){
  let category = categorys[i];
  document.getElementById('displayCategory').innerHTML = /*html*/`
      <div class="flex" onclick="selectCategory(${i})">
      <div class="category-list">
        <p>${category['name']}</p> <div class="colors" style="background-color:${category['color']};">
      </div>
    </div>
  `;
  showCategorys();
}

function createNewCategory(){
document.getElementById('test').classList.remove('d-none');
document.getElementById('categorie').classList.add('d-none');
} /* FUNKTION NOCH NICHT FERTIG: NUR EIN TEST */