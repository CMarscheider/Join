let allTasks = [];
let prio;
var expandedAddTask = false;
var expandedEditTask = false;
let categoryExanded = false;
let temporaryAssigned = [];
let temporarySubTasks = [];
let allSubtasks = [];
let subTaskCounter = 0;
let category;
let currentColor;
let allCategorys = [];
let box;
let addTaskButton;
let addTaskbackgroundClass;
let addTaskImg;
let addTaskText;
let taskStatus;

/**
 * Validates the input fields before submitting the form.
 * The form will not be sent if the checkboxes do not have a value selected.
 * It checks if employees are selected, priority is chosen, and a category is selected.
 * If any of the validation fails, it displays an error message and prevents form submission.
 * If the task status is not selected, it defaults to "open".
 * If all inputs are valid, it adds the task.
 */
function checkAllInputs() {
  renderCheckboxes();
  checkPage();

  if (temporaryAssigned.length === 0) {
    showNoEmployee();
    return;
  }

  if (!prio) {
    showNoPrio();
    return;
  }

  if (!category) {
    showNoCategory();
    return;
  }

  taskStatus = taskStatus || "open";
  addTask();
}

/**
 * Determines the appropriate message box element based on the current page URL.
 */

function checkPage() {
  if (window.location.href.indexOf("addtask") > -1) {
    box = document.getElementById("msgBoxAddTask");
  } else if (window.location.href.indexOf("board") > -1) {
    box = document.getElementById("msgBoxBoard");
  }
}

/**
 * Displays an error message for no category selection.
 */

function showNoCategory() {
  box.innerHTML = "No category selected";
  box.classList.remove("d-none");
}

/**
 * Displays an error message for no priority selection.
 */

function showNoPrio() {
  box.innerHTML = "No priority selected";
  box.classList.remove("d-none");
}

/**
 * Displays an error message for no employee selection.
 */

function showNoEmployee() {
  box.innerHTML = "No employee selected";
  box.classList.remove("d-none");
}

/**
 * Adds a task to the list of tasks.
 * Retrieves input values from the form fields and stores them as a new task object.
 * Updates the backend storage with the updated list of tasks.
 * Resets the form fields to their default values.
 */

async function addTask() {
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let date = document.getElementById("date");

  allTasks.push({
    title: title.value,
    description: description.value,
    category: category,
    status: taskStatus,
    assigned: temporaryAssigned,
    date: date.value,
    prio: prio,
    subtasks: temporarySubTasks,
  });
  await backend.setItem("allTasks", JSON.stringify(allTasks));
  resetAddTask();
}

/**
 * Resets the form for adding a task.
 * Clears the task status, resets the subtask counter,
 * clears the subtask list, and redirects to the board page.
 */

function resetAddTask() {
  taskStatus = undefined;
  subTaskCounter = 0;
  document.getElementById("subtaskList").innerHTML = ``;
  window.location.href = "board.html";
}

/**
 * Sets a timeout of 5 seconds to perform an action if the current page is the addtask page.
 * If the current page is the addtask page, it adds an event listener to prevent form submission.
 * This ensures that the form submission is handled separately and doesn't reload the page.
 */
setTimeout(() => {
  if (window.location.href.indexOf("addtask") > -1) {
    var form = document.getElementById("myForm");
    function handleForm(event) {
      event.preventDefault();
    }
    form.addEventListener("submit", handleForm);
  }
}, 5000);

/**
 * Updates the list of temporary assigned employees based on the checkbox selection.
 * If the contact name is not already included in temporaryAssigned and is not null, it is added.
 * If the contact name is already included in temporaryAssigned and is not null, it is removed.
 * @param {string} contactname - The name of the contact to be added or removed.
 */

function checkBoxes(contactname) {
  if (!temporaryAssigned.includes(contactname) && contactname !== null) {
    temporaryAssigned.push(contactname);
  } else {
    const index = temporaryAssigned.indexOf(contactname);
    if (index !== -1 && contactname !== null) {
      temporaryAssigned.splice(index, 1);
    }
  }
}

/**
 * Renders checkboxes and updates the list of temporary subtasks based on the checkbox selection.
 * Iterates through allSubtasks and retrieves the checkbox element and content for each subtask.
 * If the checkbox is checked, the corresponding subtask content is added to temporarySubTasks.
 */

function renderCheckboxes() {
  for (let i = 0; i < allSubtasks.length; i++) {
    const checkboxSubtask = document.getElementById("subTask" + i);
    let content = document.getElementById("subTaskValue" + i).innerText;
    if (checkboxSubtask.checked) {
      temporarySubTasks.push(content);
    }
  }
}

/**
 * Sets the priority value for the task.
 */

function checkPriority(priority) {
  prio = priority;
}

/**
 * Toggles the display of checkboxes and performs related actions.
 * 
 * @param {string} checkboxid - The ID of the checkboxes.
 * @param {number} i - An index value.
 * @returns {Promise<void>}
 */

async function showCheckboxes(checkboxid, i) {
  let checkboxes = document.getElementById(checkboxid);
  let currentExpandedCheck = checkboxid === "checkboxes" ? expandedAddTask : expandedEditTask;

  if (!currentExpandedCheck) {
    checkboxes.style.display = "block";
    currentExpandedCheck = true;
    createAssignedToSelection(checkboxid);
    if (checkboxid !== "checkboxes") checkBoxInputs(i);
  } else {
    checkboxes.style.display = "none";
    currentExpandedCheck = false;
  }

  if (checkboxid === "checkboxes") expandedAddTask = currentExpandedCheck;
  else expandedEditTask = currentExpandedCheck;
}



/**
* Updates the checkbox inputs for a given task based on the assigned users.
* @param {number} task - The index of the task.
* @returns {void} - This function does not return a value.
*/

function checkBoxInputs(task) {
  temporaryAssigned = allTasks[task].assigned;
  for (let i = 0; i < temporaryAssigned.length; i++) {
    const name = temporaryAssigned[i]
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    getAssignedUsers(name);
  }
}


/**
* Marks the checkboxes corresponding to the assigned user as checked and creates user icons.
* @param {string} name - The name of the assigned user.
* @returns {void} - This function performs actions but does not return a value.
*/

function getAssignedUsers(name) {
  for (let checkboxnumber = 0; checkboxnumber < users.length; checkboxnumber++) {
    let labelElement = document.querySelector('label[for="checkbox' + checkboxnumber + '"]');
    let labelValue = labelElement.textContent.trim();
    let parts = labelValue.split(/\s+/);
    let formattedValue = parts[0] + " " + parts[1];
    if (formattedValue == name) {
      document.getElementById("checkbox" + checkboxnumber).checked = true;
      createUserIcons(name);
      break;
    }
  }
}

/**
* Open up the form to add a task.
* @param {string} inputID - The ID of the input field to be opened.
* @returns {void} - This function does not return a value.
*/

function openInputfield(inputID) {
  document.getElementById(inputID).classList.remove("d-none");
}

/**
 * Checks the value of the "subtask" input field and enables or disables the "acceptButton" based on the presence of a value.
 * @returns {void} This function does not return a value.
 */

function checkInputValue() {
  let subtask = document.getElementById("subtask").value;
  let acceptButton = document.getElementById("acceptButton");
  if (subtask === "") {
    acceptButton.disabled = true;
  } else {
    acceptButton.disabled = false;
  }
}


/**
 * Creates a subtask based on the value entered in the "subtask" input field.
 * The subtask is added to the list of all subtasks and displayed as a checkbox in the "subtaskList" element.
 * The "subtask" input field is cleared after adding the subtask.
 * The "checkInputValue" function is called to update the state of the "acceptButton" based on the presence of a value in the "subtask" input field.
 * The subTaskCounter is incremented to maintain a unique identifier for the subtask checkbox.
 *
 * @returns {void} This function does not return a value.
 */

function createSubtask() {
  let subtask = document.getElementById("subtask").value;
  allSubtasks.push(subtask);
  document.getElementById("subtaskList").innerHTML += subtaskCheckboxesHTML(subTaskCounter, subtask);
  document.getElementById("subtask").value = ``;
  checkInputValue();
  subTaskCounter++;
}

/**
 * Changes the buttons based on the selected button and update the UI.
 * @param {string} button - The selected button.
 * @param {boolean} edit - Indicates if it's in edit mode.
 * @returns {Promise<void>} - A Promise that resolves when the UI update is complete.
 */

async function changeButtons(button, edit) {
  let [disableButton1, disableButton2] = [];

  if (button === "urgent") {
    [disableButton1, disableButton2] = await disableMediumAndLow();
  } else if (button === "medium") {
    [disableButton1, disableButton2] = await disableUrgentAndLow();
  } else {
    [disableButton1, disableButton2] = await disableMediumAndUrgent();
  }

  await highlightButton(button, edit);
  await delightOtherButtons(disableButton1, disableButton2, edit);
}

/**
 * Disables the "Medium" and "Low" buttons.
 * @returns {Promise<string[]>} - A Promise that resolves to an array containing the disabled button names.
 */

async function disableMediumAndLow() {
  return ["medium", "low"];
}

/**
 * Disables the "Medium" and "Urgent" buttons.
 * @returns {Promise<string[]>} - A Promise that resolves to an array containing the disabled button names.
 */

async function disableMediumAndUrgent() {
  return ["medium", "urgent"];
}

/**
 * Disables the "Urgent" and "Low" buttons.
 * @returns {Promise<string[]>} - A Promise that resolves to an array containing the disabled button names.
 */

async function disableUrgentAndLow() {
  return ["urgent", "low"];
}

/**
 * Changes the IDs and classes of elements based on the provided ID and edit flag.
 * @param {string} id - The base ID value.
 * @param {boolean} edit - A flag indicating whether it's an edit operation.
 * @returns {void} - This function does not return a value.
 */

async function changeIDandClasses(id, edit) {
  addTaskButton = id + "Button";
  addTaskbackgroundClass = id + "ButtonBackground";
  addTaskImg = id + "Img";
  addTaskText = id + "Text";

  if (edit) {
    addTaskButton += "Edit";
    addTaskImg += "Edit";
    addTaskText += "Edit";
  }
}

/**
 * Highlights the specified button element by modifying its classes.
 * @param {string} button - The button identifier.
 * @param {boolean} edit - A flag indicating whether it's an edit operation.
 * @returns {void} - This function does not return a value.
 */

async function highlightButton(button, edit) {
  await changeIDandClasses(button, edit);
  document.getElementById(`${addTaskButton}`).classList.add(`${addTaskbackgroundClass}`);
  document.getElementById(`${addTaskImg}`).classList.add("prio-img-white");
  document.getElementById(`${addTaskText}`).classList.add("white-text");
}

/**
 * Modifies the classes of other buttons to revert their highlighted state.
 * 
 * @param {string} disableButton1 - The first button to disable.
 * @param {string} disableButton2 - The second button to disable.
 * @param {boolean} edit - A flag indicating whether it's an edit operation.
 * @returns {void} - This function does not return a value.
 */

async function delightOtherButtons(disableButton1, disableButton2, edit) {
  for (let i = 1; i < 3; i++) {
    let disableButton = i === 1 ? disableButton1 : disableButton2;
    await changeIDandClasses(disableButton, edit);

    document.getElementById(`${addTaskButton}`).classList.remove(`${addTaskbackgroundClass}`);
    document.getElementById(`${addTaskImg}`).classList.remove("prio-img-white");
    document.getElementById(`${addTaskText}`).classList.remove("white-text");
  }
}

/**
* Populates the assigned-to selection checkboxes for a given checkbox container.
* @param {string} checkboxid - The ID of the checkbox container element.
* @returns {void} - This function does not return a value.
*/

function createAssignedToSelection(checkboxid) {
  document.getElementById(checkboxid).innerHTML = ``;
  for (let i = 0; i < users.length; i++) {
    const contactName = users[i]["name"];
    splitName(contactName);
    let restFirstName = splittedName[0].slice(1);
    let restLastName = splittedName[1].slice(1);

    document.getElementById(checkboxid).innerHTML += checkboxesTaskHTML(i, splittedName, restFirstName, restLastName, contactName);
  }
}

/**
 * Generates user icons for a given contact name and adds them to the "users" container.
 * If an icon for the contact name already exists, it toggles the visibility of the existing icon.
 * @param {string} contactName - The name of the contact.
 * @returns {void} - This function does not return a value.
 */
function createUserIcons(contactName) {
  generateRandomColor();
  splitName(contactName);
  let formattedName = formatContactName(contactName);
  let userContainer = document.getElementById("users");
  let existingIcon = document.getElementById(formattedName);

  if (!existingIcon) {
    let iconText = returnIconText(formattedName);
    userContainer.innerHTML += iconText;
    let newIcon = document.getElementById(formattedName);
    newIcon.style.backgroundColor = color;
  } else {
    showAndHideUserIcons(formattedName);
  }
}

/**
 * Formats the contact name by capitalizing the first letter of each word.
 * @param {string} contactName - The name of the contact.
 * @returns {string} - The formatted contact name.
 */
function formatContactName(contactName) {
  return contactName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

/**
 * Toggles the visibility of the user icons for the given contact name.
 * @param {string} contactName - The name of the contact.
 * @returns {void} - This function does not return a value.
 */

function showAndHideUserIcons(contactName) {
  const userIcon = document.getElementById(contactName);

  if (!userIcon.classList.contains("d-none")) {
    userIcon.classList.add("d-none");
  } else {
    userIcon.classList.remove("d-none");
  }
}

/**
 * Returns the HTML code for a contact icon with the provided contact name.
 * @param {string} contactName - The name of the contact.
 * @returns {string} - The HTML code for the contact icon.
 */

function returnIconText(contactName) {
  return /*html*/ `
  <div class="contactIcon" id="${contactName}">
    <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
  </div>`;
}

/**
 * Opens the category section by removing the "d-none" class from the accept button element.
 * @returns {void} - This function does not return a value.
 */

function openCategorys() {
  document.getElementById("acceptButton").classList.remove("d-none");
}

/**
 * Shows or hides the category section based on its current visibility state.
 * @returns {void} - This function does not return a value.
 */

function showCategorys() {
  renderCategorys();
  let categorys = document.getElementById("categorys");
  if (!categoryExanded) {
    categorys.style.display = "block";
    categorys.classList.add("category-open");
    categoryExanded = true;
    renderCategorys();
  } else {
    categorys.style.display = "none";
    categoryExanded = false;
    categorys.classList.remove("category-open");
  }
}

/**
 * Renders the category section by generating and inserting the HTML content.
 * @returns {void} - This function does not return a value.
 */

function renderCategorys() {
  document.getElementById("categorys").innerHTML = categoryListHTML();
  for (let i = 0; i < allCategorys.length; i++) {
    const category = allCategorys[i];
    let categoryName = category["name"];
    document.getElementById("categorys").innerHTML += categoryContentHTML(i, category, categoryName);
  }
}

/**
 * Selects a category and updates the displayed category information.
 * @param {number} i - The index of the category in the allCategorys array.
 * @returns {void} - This function does not return a value.
 */

function selectCategory(i) {
  category = allCategorys[i];
  document.getElementById("displayCategory").innerHTML = taskCategoryHTML(i, category);
  showCategorys();
}

/**
 * Opens the category input section and hides the category dropdown.
 * @returns {void} - This function does not return a value.
 */

function openCategoryInput() {
  document.getElementById("openCategoryInput").classList.remove("d-none");
  document.getElementById("categoryDropdown").classList.add("d-none");
  document.getElementById("color").classList.remove("d-none");
}

/**
 * Closes the category input section and shows the category dropdown.
 * Resets the color, input value, and color picker to their default states.
 * @returns {void} - This function does not return a value.
 */

function closeCategoryInput() {
  document.getElementById("openCategoryInput").classList.add("d-none");
  document.getElementById("categoryDropdown").classList.remove("d-none");
  document.getElementById("color").classList.add("d-none");
  pickColor("transparent");
  color = "transparent";
  document.getElementById("inputCategory").value = ``;
}

/**
 * Picks a color and updates the color preview.
 * @param {string} color - The color value to be picked.
 * @returns {void} - This function does not return a value.
 */

function pickColor(color) {
  currentColor = color;
  document.getElementById("inputFieldColor").style.backgroundColor = currentColor;
}

/**
 * Creates a new category with the provided name and color.
 * Saves the new category to the backend storage and updates the category section.
 * Selects the new category.
 * @returns {void} - This function does not return a value.
 */
async function createNewCategory() {
  let name = document.getElementById("inputCategory").value;

  if (!name) {
    alert("Keinen Kategorienamen eingegeben.");
  } else {
    if (currentColor === "transparent" || !currentColor) {
      alert("Keine Farbe für die Kategorie gewählt.");
    } else {
      allCategorys.push({ name: name, color: currentColor });
      await backend.setItem("allCategorys", JSON.stringify(allCategorys));
      closeCategoryInput();
      renderCategorys();
      selectCategory(allCategorys.length - 1);
    }
  }
}

/**
 * Clears the form fields and resets the priority buttons.
 * @returns {void} - This function does not return a value.
 */

function clearForm() {
  title.value = "";
  description.value = "";
  date.value = "";
  resetPrioBtns();
}

/**
 * Resets the priority buttons and associated elements to their default state.
 * Removes CSS classes responsible for button background, image color, and text color.
 * @returns {void} - This function does not return a value.
 */

function resetPrioBtns() {
  document.getElementById("mediumButton").classList.remove("mediumButtonBackground");
  document.getElementById("lowButton").classList.remove("lowButtonBackground");
  document.getElementById("urgentButton").classList.remove("urgentButtonBackground");
  document.getElementById("urgentImg").classList.remove("prio-img-white");
  document.getElementById("mediumImg").classList.remove("prio-img-white");
  document.getElementById("lowImg").classList.remove("prio-img-white");
  document.getElementById("urgentText").classList.remove("white-text");
  document.getElementById("mediumText").classList.remove("white-text");
  document.getElementById("lowText").classList.remove("white-text");
}
