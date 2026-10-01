let currentDraggedElement;
let currentCategory;
let taskCategory;
let printTask;
let ProgressbarValue;
let label;
let fulfillment;
let assigendEdit;
let taskIsOpen = false;

/**
 * Shows the inputs form for creating a new task.
 * @param {string} status - The status of the task.
 * The status can be one of the following values: "open", "inProgress", "awaitingFeedback", "done".
 */

function showInputsForm(status) {
  document.getElementById("form-board").classList.remove("d-none");
  document.getElementById("form-board").classList.add("scale-in-center");
  window.scrollTo(0, 0);

  taskStatus = status;
  checkUserBox(status);
}

/**
 * Closes the inputs form and clears the users container.
 */
function closeInputsForm() {
  document.getElementById("form-board").classList.add("d-none");
  document.getElementById("users").innerHTML = "";
}

/**
 * Resets the content of all task sections.
 * @param {HTMLElement} openTasksContent - The element representing the open tasks section.
 * @param {HTMLElement} inProgressTasksContent - The element representing the in-progress tasks section.
 * @param {HTMLElement} awaitingFeedbackContent - The element representing the awaiting feedback tasks section.
 * @param {HTMLElement} doneTasksContent - The element representing the done tasks section.
 */
function resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent) {
  openTasksContent.innerHTML = "";
  inProgressTasksContent.innerHTML = "";
  awaitingFeedbackContent.innerHTML = "";
  doneTasksContent.innerHTML = "";
}

/**
 * The `startRendering` function is responsible for initiating the rendering process for the task sections.
 * It retrieves the necessary content elements for the open tasks, in-progress tasks, awaiting feedback tasks, and done tasks.
 * Then, it resets the content of all task sections using the `resetAllTasks` function.
 * Finally, it calls the `renderTaskSection` function to populate the sections with tasks.
 */
function startRendering() {
  let openTasksContent = document.getElementById("todoOpenContent");
  let inProgressTasksContent = document.getElementById("todoInProgressContent");
  let awaitingFeedbackContent = document.getElementById("todoAwaitingFeedbackContent");
  let doneTasksContent = document.getElementById("todoDoneContent");
  resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent);
  renderTaskSection(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent);
}

/**
 * Renders the task sections with tasks by iterating over allTasks array.
 * Updates the progress bar value and label element for each task.
 * Applies styling to the task category and renders the task footer.
 * @param {HTMLElement} openTasksContent - Element for open tasks content.
 * @param {HTMLElement} inProgressTasksContent - Element for in-progress tasks content.
 * @param {HTMLElement} awaitingFeedbackContent - Element for awaiting feedback tasks content.
 * @param {HTMLElement} doneTasksContent - Element for done tasks content.
 */

function renderTaskSection(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent) {
  for (let i = 0; i < allTasks.length; i++) {
    printTask = allTasks[i];
    checkProgressStatus(taskCategory, printTask, i, doneTasksContent, awaitingFeedbackContent, inProgressTasksContent, openTasksContent, ProgressbarValue, label, fulfillment);
    renderFooter(i, printTask);
    styleCategory(printTask, i);
    ProgressbarValue = document.getElementById(`progressbar${i}`).value;
    label = document.getElementById(`label${i}`);
  }
}

/**
 * Checks the task category and updates the progress status based on the category.
 * Renders the task card in the corresponding task section based on the category.
 * @param {string} taskCategory - The category of the task.
 * @param {object} printTask - The task object to be rendered.
 * @param {number} i - The index of the task.
 * @param {HTMLElement} doneTasksContent - Element for done tasks content.
 * @param {HTMLElement} awaitingFeedbackContent - Element for awaiting feedback tasks content.
 * @param {HTMLElement} inProgressTasksContent - Element for in-progress tasks content.
 * @param {HTMLElement} openTasksContent - Element for open tasks content.
 * @param {number} ProgressbarValue - The value of the progress bar.
 * @param {object} fulfillment - The fulfillment of the task.
 */

async function checkProgressStatus(taskCategory, printTask, i, doneTasksContent, awaitingFeedbackContent, inProgressTasksContent, openTasksContent, ProgressbarValue, fulfillment) {
  taskCategory = printTask["status"];
  if (taskCategory == "open") {
    ProgressbarValue = 0;
    openTasksContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  } else if (taskCategory == "inProgress") {
    ProgressbarValue = 33.33;
    inProgressTasksContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  } else if (taskCategory == "awaitingFeedback") {
    ProgressbarValue = 66.66;
    awaitingFeedbackContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  } else {
    ProgressbarValue = 100;
    doneTasksContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  }
}

/**
 * Renders the footer section of a task card.
 * Retrieves the necessary data from the task object and updates the footer content.
 * Checks the task priority and updates the styling accordingly.
 * @param {number} i - The index of the task.
 * @param {object} printTask - The task object.
 */

function renderFooter(i, printTask) {
  let footer = document.getElementById(`footer${i}`);
  let assigend = printTask["assigned"][0];
  let firstLetter = assigend.charAt(0);
  let secondLetter = assigend.split(" ")[1].charAt(0);
  let restAssigendLength = printTask["assigned"].length - 1;

  footer.innerHTML += footerTemplate(firstLetter, secondLetter, restAssigendLength, printTask, i);
  checkTaskPrio(printTask, i);
  
  if (restAssigendLength == 0) {
    document.getElementById(`restLength${i}`).classList.add("d-none");
  }
}


/**
 * Checks the task priority and updates the priority icon accordingly.
 * @param {object} printTask - The task object.
 * @param {number} i - The index of the task.
 */

function checkTaskPrio(printTask, i) {
  let img = document.getElementById(`prioIcon${i}`);
  if (printTask.prio == "urgent") {
    img.src = "./assets/img/Prio_alta.png";
  } else if (printTask.prio == "medium") {
    img.src = "./assets/img/Prio_media.png";
  } else {
    img.src = "./assets/img/Prio_baja.png";
  }
}

/**
 * Styles the category element of a task based on the task's category color.
 * @param {object} printTask - The task object.
 * @param {number} taskindex - The index of the task.
 */

function styleCategory(printTask, taskindex) {
  let cat = document.getElementById(`category${taskindex}`);
  cat.style.backgroundColor = printTask.category.color;
  cat.style.color = "#fff";
  cat.style.maxWidth = "170px";
  cat.style.textAlign = "center";
  cat.style.padding = "5px";
  cat.style.borderRadius = "8px";
  cat.style.whiteSpace = "nowrap";
  cat.style.textTransform = "uppercase";
}

/**
 * Displays the popup for an opend task with the corresponding task details.
 * @param {number} i - The index of the task.
 */

function showOpenTaskPopup(i) {
  taskIsOpen = true;
  editContent(i);
  checkPriorityPopup(allTasks, i);
  checkStatusPopup(allTasks, i);
  createAssignedUser(i);
  printTask = allTasks[i];
  checkTaskPrio(printTask, i);
}

/**
 * Creates the assigned user section in the task popup.
 * @param {number} i - The index of the task.
 */

function createAssignedUser(i) {
  let assigendToContent = document.getElementById("assigendToContainer");
  for (let j = 0; j < allTasks[i].assigned.length; j++) {
    const assignedUser = allTasks[i].assigned[j];
    let secondLetter = assignedUser.split(" ")[1].charAt(0);
    assigendToContent.innerHTML += assigendContentHTML(j, assignedUser, secondLetter);
    styleAssignedCircles(j);
  }
}

/**
 * Updates the task popup content for editing a specific task.
 * Modifies the HTML content of the task popup to display the details of the task for editing.
 * It sets the appropriate values for the category, title, description, due date, priority, and buttons.
 * The task details are retrieved from the `allTasks` array based on the provided task index (`i`).
 * @param {number} i - The index of the task to be edited.
 */

function editContent(i) {
  document.getElementById("taskPopup").innerHTML = createTaskContentHTML(i);
  document.getElementById("popUpBackground").classList.add("popUpBackground");
  document.getElementById("taskPopup").classList.remove("d-none");
  document.getElementById("categoryPopup").innerHTML = allTasks[i].category.name;
  document.getElementById("categoryPopup").style.background = allTasks[i].category.color;
  document.getElementById("titlePopup").innerHTML = allTasks[i].title;
  document.getElementById("descriptionPopup").innerHTML = allTasks[i].description;
  document.getElementById("datePopup").innerHTML = `<b>Due Date:</b> ${allTasks[i].date}`;
  document.getElementById("prio").innerHTML = prioContentHTML(allTasks, i);
  document.getElementById("btnHolder").innerHTML = editTaskButton(i);
}

/**
 * Updates the status indicator in the task popup based on the task's status.
 *
 * @param {Array} allTasks - The array containing all tasks.
 * @param {number} i - The index of the task to update the status indicator.
 */

function checkStatusPopup(allTasks, i) {
  let statusElements = {
    open: "popupstatusopen",
    awaitingFeedback: "popupstatusawaitingfeedback",
    inProgress: "popupstatusinprogress",
    done: "popupstatusdone"
  };
  let taskStatus = allTasks[i].status;

  for (let status in statusElements) {
    let elementId = statusElements[status];
    let element = document.getElementById(elementId);
    element.style.background = taskStatus === status ? "#50aadf" : "";
  }
}

/**
 * Handles the editing of a task.
 * @param {number} i - The index of the task to edit.
 */

function editTask(i) {
  let popup = document.getElementById("taskPopup");
  popup.innerHTML = editTaskContent(i);
  document.getElementById("editTitle").value = allTasks[i]["title"];
  document.getElementById("editDescription").value = allTasks[i]["description"];
  document.getElementById("editDate").value = allTasks[i]["date"];
  prio = allTasks[i]["prio"];
  setPrioColor(i);
  showCheckboxes("editCheckBoxes", i);
}

/**
 * Updates the edited task with the new input values and saves the changes.
 * @param {number} i - The index of the task to update.
 */

async function pushEditTask(i) {
  let taskInputTitle = document.getElementById("editTitle").value;
  let dueDate = document.getElementById("editDate").value;
  let description = document.getElementById("editDescription").value;
  allTasks[i].title = taskInputTitle;
  allTasks[i].description = description;
  allTasks[i].date = dueDate;
  allTasks[i].prio = prio;
  if (temporaryAssigned.length > 0) {
    allTasks[i].assigned = temporaryAssigned;
    await backend.setItem("allTasks", JSON.stringify(allTasks));
    window.location.reload();
  } else {
    showNoEmployee();
  }
}

/**
 * Sets the color of the priority buttons based on the priority value of the task.
 * @param {number} i - The index of the task to update the priority buttons for.
 */

async function setPrioColor(i) {
  await changeButtons(allTasks[i]["prio"], true);
}

/**
 * Styles the assigned user circles.
 * @param {number} j - The index of the assigned user circle to style.
 */

function styleAssignedCircles(j) {
  let assigendCircels = document.getElementById(`firstLetterAssigned${j}`);
  assigendCircels.style.backgroundColor = "hsla(" + Math.random() * 360 + ", 100%, 50%, 1)";
  assigendCircels.style.padding = "10px";
  assigendCircels.style.borderRadius = "50%";
  assigendCircels.style.minWidth = "30px";
  assigendCircels.style.minHeight = "30px";
  assigendCircels.style.textAlign = "center";
  assigendCircels.style.color = "#fff";
  assigendCircels.style.display = "grid";
  assigendCircels.style.placeContent = "center";
}

/**
 * Generates a random color in hexadecimal format.
 * @returns {string} A randomly generated color in hexadecimal format.
 */

function getRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}

/**
 * Cancels the task popup by removing the background overlay and hiding the task popup.
 */

function cancelTaskPopup() {
  document.getElementById("popUpBackground").classList.remove("popUpBackground");
  document.getElementById("taskPopup").classList.add("d-none");
}

/**
 * Checks and sets the priority color in the task popup based on the task's priority level.
 * @param {Array} allTasks - The array of all tasks.
 * @param {number} i - The index of the current task.
 */

function checkPriorityPopup(allTasks, i) {
  const priorityElement = document.getElementById("prio-status");
  const priority = allTasks[i].prio;
  priorityElement.style.background = priority === "urgent" ? "red" : priority === "medium" ? "orange" : priority === "low" ? "green" : "";
}

/**
* Starts the dragging process for a given element.
* @param {number} id - The ID of the element being dragged.
*/

function startDragging(id) {
  currentDraggedElement = id;
  currentCategory = allTasks[currentDraggedElement]["status"];
}

/**
 * Allows dropping of draggable elements by preventing the default behavior of the drop event.
 */

function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Moves a task to the specified category.
 * If a task is currently being dragged (identified by currentDraggedElement),
 * its status will be updated accordingly. Otherwise, the status of the task at index i will be updated.
 * @param {string} category - The category to move the task to.
 * @param {number} i - The index of the task to move.
 * @returns {Promise<void>} - A promise that resolves once the task has been moved and the UI is updated.
 */

async function moveTo(category, i) {
  if (currentDraggedElement == undefined) {
    allTasks[i]["status"] = category;
    await backend.setItem("allTasks", JSON.stringify(allTasks));
    cancelTaskPopup();
  } else {
    allTasks[currentDraggedElement]["status"] = category;
    await backend.setItem("allTasks", JSON.stringify(allTasks));
  }
  startRendering();
  currentDraggedElement = undefined;
}

function searchTasks(value) {
  value = value.toLowerCase();
  let openTasksContent = document.getElementById("todoOpenContent");
  let inProgressTasksContent = document.getElementById("todoInProgressContent");
  let awaitingFeedbackContent = document.getElementById("todoAwaitingFeedbackContent");
  let doneTasksContent = document.getElementById("todoDoneContent");
  resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent);
  loopAllTasks(value, openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent);
}

/**
 * Searches tasks based on the specified value and updates the UI accordingly.
 * @param {string} value - The search value to match against task titles.
 * @returns {void} - This function does not return a value.
 */

function loopAllTasks(value, openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent) {
  for (let i = 0; i < allTasks.length; i++) {
    const searchTask = allTasks[i];
    if (searchTask.title.toLowerCase().includes(value)) {
      checkProgressStatus(taskCategory, searchTask, i, doneTasksContent, awaitingFeedbackContent, inProgressTasksContent, openTasksContent);
      renderFooter(i, searchTask);
      styleCategory(searchTask, i);
    }
  }
}

/**
 * Deletes a task at the specified index from the task list and updates the UI.
 * @param {number} i - The index of the task to delete.
 * @returns {void} - This function does not return a value.
 */

function deleteTask(i) {
  allTasks.splice(i, 1);
  saveToLocalstorage();
  startRendering();
  cancelTaskPopup();
}

/**
 * Saves the task list to the local storage.
 * @returns {Promise<void>} - A promise that resolves when the task list is saved to the local storage.
 */

async function saveToLocalstorage() {
  await backend.setItem("allTasks", JSON.stringify(allTasks));
}
