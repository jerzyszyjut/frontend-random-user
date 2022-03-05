const BASE_URL = 'https://randomuser.me/api/';

const parameters = ['name', 'picture', 'nat', 'registered', 'location'];
const checkbox = document.getElementById('hide-address-checkbox');
const button = document.getElementById('generate-button');

let isAddressHidden = false;

function parseLocationAddress(location) {
    const stringLocation = `${location.street.number} ${location.street.name}, ${location.city} ${location.postcode}, ${location.state}, ${location.country}`;
    return stringLocation;
}

function parseUserDataForHistory(userData) {
    const user = {
        first_name: userData.name.first,
        last_name: userData.name.last,
        country: userData.nat,
        register_date: userData.registered.date
    }

    return user;
}

function parseParamentersToQueryString() {
    let query = '?inc=';
    for (const parameter in parameters) {
        query += parameters[parameter];
        query += ','
    }
    return query;
}

function displayUser(user) {
    const profilePicture = document.getElementById('profile-picture');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const registerDate = document.getElementById('register-date');
    const nationality = document.getElementById('nationality');
    const locationAddress = document.getElementById('location-address');

    profilePicture.src = user.picture.large;
    firstName.textContent = user.name.first;
    lastName.textContent = user.name.last;
    const formatedDate = new Date(user.registered.date).toLocaleString('en-GB', { timeZone: 'UTC' })
    registerDate.textContent = formatedDate;
    nationality.textContent = user.nat;
    if (user.location) {
        locationAddress.textContent = parseLocationAddress(user.location);
    }
    else {
        locationAddress.textContent = 'Not fetched'
    }
}

function addUserToLocalStorage(user) {
    user = parseUserDataForHistory(user);
    if (localStorage.length == 0) {
        const users = [];
        users.push(user);
        localStorage.setItem('usersHistory', JSON.stringify(users));
    }
    else {
        let users = JSON.parse(localStorage.getItem('usersHistory'));
        users.push(user);
        if (users.length > 10) {
            users.splice(0, 1);
        }
        localStorage.setItem('usersHistory', JSON.stringify(users));
    }
}

async function getUser() {
    try {
        let userData;
        const url = BASE_URL + parseParamentersToQueryString();
        await fetch(url).then(response => {
            return response.json();
        })
            .then(responseData => {
                userData = responseData.results[0];
            });
        return userData;
    }
    catch (err) {
        console.error('There was an error with API connection', err);
    }
};

function hideInfoAndShowUserContent() {
    const info = document.getElementById('info');
    info.setAttribute('class', 'hidden');
    const userContainer = document.getElementById('user-container');
    userContainer.setAttribute('class', 'user-container');
}

function hideAddressContainer() {
    const locationAddressContainer = document.getElementById('location-address-container');
    if (isAddressHidden) {
        locationAddressContainer.setAttribute('class', 'location-address-container hidden details-container');
    }
    else {
        locationAddressContainer.setAttribute('class', 'location-address-container details-container');
    }
}

function hideAddress() {
    isAddressHidden = !isAddressHidden;
    hideAddressContainer()
    if (isAddressHidden) {
        parameters.pop();
    }
    else {
        parameters.push('location');
    }
    console.log(parameters);
}

async function generateUser() {
    const user = await getUser();
    addUserToLocalStorage(user);
    hideInfoAndShowUserContent();
    displayUser(user);
}

checkbox.addEventListener('click', hideAddress);
button.addEventListener('click', generateUser);
