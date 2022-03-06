const outerTable = document.getElementById('history-table');
const table = document.getElementById('table');

function updateIcons(filters) {
  const lastNameSortIcon = document.getElementById('last-name-sort-icon');
  const registerNameSortIcon = document.getElementById('register-date-sort-icon');
  switch (filters.lastName) {
    case null:
      lastNameSortIcon.setAttribute('class', 'fa-solid fa-sort');
      break;
    case true:
      lastNameSortIcon.setAttribute('class', 'fa-solid fa-sort-up');
      break;
    case false:
      lastNameSortIcon.setAttribute('class', 'fa-solid fa-sort-down');
      break;
    default:
      break;
  }
  switch (filters.registerDate) {
    case null:
      registerNameSortIcon.setAttribute('class', 'fa-solid fa-sort');
      break;
    case true:
      registerNameSortIcon.setAttribute('class', 'fa-solid fa-sort-up');
      break;
    case false:
      registerNameSortIcon.setAttribute('class', 'fa-solid fa-sort-down');
      break;
    default:
      break;
  }
}

function generateCell(className, value) {
  const cellElement = document.createElement('div');
  cellElement.setAttribute('class', `cell ${className}`);
  let date = value;
  if (className === 'register_date') {
    date = new Date(value).toLocaleString('en-GB', { timeZone: 'UTC' });
  }
  cellElement.appendChild(document.createTextNode(date));
  return cellElement;
}

function generateRow(object) {
  const rowElement = document.createElement('div');
  rowElement.setAttribute('class', 'row');
  for (const key in object) {
    const cell = generateCell(key, object[key]);
    rowElement.appendChild(cell);
  }
  return rowElement;
}

function generateTable(users) {
  const rows = document.createElement('div');
  rows.setAttribute('class', 'rows');

  for (const user in users) {
    const rowElement = generateRow(users[user]);
    rows.appendChild(rowElement);
  }
  return rows;
}

function generateInformation() {
  const infoElement = document.createElement('div');
  infoElement.setAttribute('class', 'info');
  const infoText = 'Nothing to see here yet. Generate users on home page!';
  infoElement.appendChild(document.createTextNode(infoText)); return infoElement;
}

function removeChilds(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

function generatehistoryTableContent(users) {
  let content;
  let type;
  if (localStorage.length === 0) {
    content = generateInformation();
    type = 'info';
  } else {
    content = generateTable(users);
    type = 'table';
  }
  return { content, type };
}

export default function displayHistoryContent(users, filters) {
  removeChilds(table);
  updateIcons(filters);
  const { content, type } = generatehistoryTableContent(users);
  if (type === 'info') {
    outerTable.removeChild(outerTable.childNodes[1]);
  }
  table.appendChild(content);
}
