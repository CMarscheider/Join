/**
 * Generates HTML markup for a subtask checkbox element.
 * @param {number} subTaskCounter - The counter value for the subtask.
 * @param {string} subtask - The text content of the subtask.
 * @returns {string} - The HTML markup for the subtask checkbox element.
 */

function subtaskCheckboxesHTML(subTaskCounter, subtask) {
  return /*html*/ `
    <div class="checkbox-container">
    <input type="checkbox" id="subTask${subTaskCounter}" />
      <label id = "subTaskValue${subTaskCounter}" for="subTask${subTaskCounter}">${subtask}</label>
    </div>
  `;
}

/**
 * Generates HTML markup for a task checkbox element with associated labels.
 * @param {number} i - The index value for the task.
 * @param {string[]} splittedName - An array containing the first and last name split.
 * @param {string} restFirstName - The remaining characters of the first name.
 * @param {string} restLastName - The remaining characters of the last name.
 * @param {string} contactName - The name of the contact associated with the task.
 * @returns {string} - The HTML markup for the task checkbox element.
 */

function checkboxesTaskHTML(i, splittedName, restFirstName, restLastName, contactName) {
  return /*html*/ `
      <div class="flex">
          <label for="checkbox${i}" class="hover">
              ${splittedName[0].charAt(0).toUpperCase()}${restFirstName}
              ${splittedName[1].charAt(0).toUpperCase()}${restLastName}
              <input type="checkbox" id="checkbox${i}" onchange="createUserIcons('${contactName}'), checkBoxes('${contactName}')" />
          </label>
      </div>
    `;
}

/**
 * Generates HTML markup for the "New Category" section in the category list.
 * @returns {string} - The HTML markup for the "New Category" section.
 */

function categoryListHTML() {
  return /*html*/ `     
    <div class="flex hover" onclick="openCategoryInput()">
      <div class="category-list">
        <p>New Category</p> 
      </div>
    </div>`;
}

/**
 * Generates HTML markup for a category item in the category list.
 * @param {number} i - The index value of the category.
 * @param {object} category - The category object containing name and color properties.
 * @param {string} categoryName - The name of the category.
 * @returns {string} - The HTML markup for the category item.
 */

function categoryContentHTML(i, category, categoryName) {
  return /*html*/ `
    <div class="flex hover" onclick="selectCategory(${i})">
      <div class="category-list">
        <p>${categoryName}</p> <div class="color" style="background-color:${category['color']};">
      </div>
    </div>`;
}

/**
 * Generates HTML markup for a task category item.
 * @param {number} i - The index value of the category.
 * @param {object} category - The category object containing name and color properties.
 * @returns {string} - The HTML markup for the task category item.
 */


function taskCategoryHTML(i, category) {
  return /*html*/ `
  <div class="flex hover" onclick="selectCategory(${i})">
  <div class="category-list">
    <p>${category['name']}</p> <div class="color" style="background-color:${category['color']};">
  </div>
</div>`;
}
