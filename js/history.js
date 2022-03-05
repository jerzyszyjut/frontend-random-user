const outerTable = document.getElementById('history-table');
const table = document.getElementById('table');
let lastNameButton = document.getElementById('header_last_name');
let registerDateButton = document.getElementById('header_register_date');

let users;
let filters = {
    lastName: null,
    registerDate: null
};

function removeChilds(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function compareLastNames(a, b) {
    const value = filters.lastName ? 1 : -1;
    if (a.last_name < b.last_name) {
        return value * -1;
    }
    if (a.last_name > b.last_name) {
        return value;
    }
    return 0;
}

function generateCell(className, value) {
    const cellElement = document.createElement('div');
    cellElement.setAttribute('class', `cell ${className}`);
    if (className === 'register_date') {
        value = new Date(value).toLocaleString('en-GB', { timeZone: 'UTC' })
    }
    cellElement.appendChild(document.createTextNode(value));
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
        const formatedUserData = users[user];
        const rowElement = generateRow(formatedUserData);
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

function getUsers() {
    if (localStorage.length != 0) {
        users = JSON.parse(localStorage.getItem('usersHistory'));
        users.reverse();
    }
}

function displayHistoryContent() {
    removeChilds(table);
    let element;
    if (localStorage.length == 0) {
        outerTable.removeChild(outerTable.childNodes[1]);
        element = generateInformation();
    }
    else {
        element = generateTable(users);
    }
    table.appendChild(element);
    lastNameButton = document.getElementById('header_last_name');
    registerDateButton = document.getElementById('header_register_date');
}

function updateIcons() {
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
    }
}

function switchFilters(type) {
    switch (type) {
        case 'registerDate':
            if (filters.registerDate === null) {
                filters.registerDate = true;
                filters.lastName = null;
            }
            else {
                filters.registerDate = !filters.registerDate;
            }
            break;

        case 'lastName':
            if (filters.lastName === null) {
                filters.lastName = true;
                filters.registerDate = null;
            }
            else {
                filters.lastName = !filters.lastName;
            }
            break;
    }
}

function sortByLastName() {
    switchFilters('lastName');
    users.sort(compareLastNames);
    updateIcons();
    displayHistoryContent();
}


function sortByRegisterDate() {
    switchFilters('registerDate');
    const value = filters.registerDate ? 1 : -1;
    users.sort(function (a, b) {
        return (new Date(b.register_date) - new Date(a.register_date)) * value;
    });
    updateIcons();
    displayHistoryContent();
}

getUsers();
displayHistoryContent();

lastNameButton.addEventListener('click', sortByLastName);
registerDateButton.addEventListener('click', sortByRegisterDate);
