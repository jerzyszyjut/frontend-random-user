const table = document.getElementById('history-table');

function parseUserData(userData) {
    const user = {
        first_name: userData.name.first,
        last_name: userData.name.last,
        country: userData.nat,
        register_date: new Date(userData.registered.date).toLocaleString('en-GB', { timeZone: 'UTC' })
    }

    return user;
}

function generateCell(className, value) {
    const cellElement = document.createElement('div');
    cellElement.setAttribute('class', `cell ${className}`);
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

function generateHeader() {
    const values = {
        first_name: 'First name',
        last_name: 'Last name',
        country: 'Country',
        register_date: 'Register date'
    };

    const header = generateRow(values);
    header.setAttribute('class', 'row header');

    return header;
};

function generateTable(users) {
    users.reverse();

    const tableElement = document.createElement('div');
    tableElement.setAttribute('class', 'table');

    tableElement.appendChild(generateHeader());

    for (const user in users) {
        const formatedUserData = parseUserData(users[user]);
        const rowElement = generateRow(formatedUserData);
        tableElement.appendChild(rowElement);
    }

    return tableElement;
}

function generateInformation() {
    const infoElement = document.createElement('div');
    infoElement.setAttribute('class', 'info');
    const infoText = 'Nothing to see here yet. Generate users on home page!';
    infoElement.appendChild(document.createTextNode(infoText)); return infoElement;
}

function displayHistoryContent() {
    let element;
    if (localStorage.length == 0) {
        element = generateInformation()
    }
    else {
        const users = JSON.parse(localStorage.getItem('usersHistory'));
        element = generateTable(users);
    }

    table.appendChild(element);
}

displayHistoryContent()
