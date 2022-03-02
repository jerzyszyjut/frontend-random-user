const BASE_URL = 'https://randomuser.me/api/';

let currentUser = {};
let previousUsers = [];

function parseLocationAddress(location) {
    const stringLocation = `${location.street.number} ${location.street.name}, ${location.city} ${location.postcode}, ${location.state}, ${location.country}`;
    return stringLocation;
}

function displayCurrentUser() {
    const profilePicture = document.getElementById('profile-picture');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const registerDate = document.getElementById('register-date');
    const nationality = document.getElementById('nationality');
    const locationAddress = document.getElementById('location-address');

    profilePicture.src = currentUser.picture.large;
    firstName.textContent = currentUser.name.first;
    lastName.textContent = currentUser.name.last;
    const formatedDate = new Date(currentUser.dob.date).toLocaleString('en-GB', { timeZone: 'UTC' })
    registerDate.textContent = formatedDate;
    nationality.textContent = currentUser.nat;
    locationAddress.textContent = parseLocationAddress(currentUser.location);
}

function archiveCurrentUser() {
    previousUsers.push(currentUser);
    if (previousUsers.length > 10) {
        previousUsers.splice(0, 1);
    }
    console.log(previousUsers);
}

async function getUser() {
    try {
        await fetch(BASE_URL).then(response => {
            return response.json();
        })
            .then(responseData => {
                currentUser = responseData.results[0];
            });
    }
    catch (err) {
        console.error('There was an error with API connection', err);
    }
};

async function generateUser() {
    archiveCurrentUser();
    await getUser();
    displayCurrentUser();
}

async function generateFirstUser() {
    await getUser()
    displayCurrentUser()
}

generateFirstUser()

const button = document.getElementById('generate-button');
button.addEventListener('click', generateUser);
