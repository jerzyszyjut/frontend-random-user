const BASE_URL = 'https://randomuser.me/api/';

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
    const formatedDate = new Date(user.dob.date).toLocaleString('en-GB', { timeZone: 'UTC' })
    registerDate.textContent = formatedDate;
    nationality.textContent = user.nat;
    locationAddress.textContent = parseLocationAddress(user.location);
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
        console.log(users)
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
        await fetch(BASE_URL).then(response => {
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

async function generateUser() {
    const user = await getUser();
    addUserToLocalStorage(user);
    displayUser(user);
}

const button = document.getElementById('generate-button');
button.addEventListener('click', generateUser);
