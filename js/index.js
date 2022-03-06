import TokenService from './services/history.service.js';
import APIService from './services/api.service.js';
import { hideAddressContainer, hideInfo, showUserContainer, displayUser } from './ui/index.js';

const parameters = ['name', 'picture', 'nat', 'registered', 'location'];

let isAddressHidden = false;

function parseLocationAddress(location) {
    const stringLocation = `${location.street.number} ${location.street.name}, ${location.city} ${location.postcode}, ${location.state}, ${location.country}`;
    return stringLocation;
}

function parseUserForHistory(user) {
    const parsedUser = {
        first_name: user.name.first,
        last_name: user.name.last,
        country: user.nat,
        register_date: user.registered.date
    }

    return parsedUser;
}

function parseUserForDisplay(user) {
    let locationAddress;
    if (user.location) {
        locationAddress = parseLocationAddress(user.location);
    }
    else {
        locationAddress = 'Not fetched'
    }

    const parsedUser = {
        profile_picture: user.picture.large,
        first_name: user.name.first,
        last_name: user.name.last,
        register_date: new Date(user.registered.date).toLocaleString('en-GB', { timeZone: 'UTC' }),
        nationality: user.nat,
        location_address: locationAddress,
    }

    return parsedUser;
}

function parseParamentersToQueryString() {
    let query = '?inc=';
    for (const parameter in parameters) {
        query += parameters[parameter];
        query += ','
    }
    return query;
}

function addUserToLocalStorage(user) {
    user = parseUserForHistory(user);
    TokenService.addUserToUsersHistory(user);
}

function hideInfoAndShowUserContent() {
    hideInfo();
    showUserContainer();
}

export function hideAddress() {
    isAddressHidden = !isAddressHidden;

    hideAddressContainer(isAddressHidden);
    if (isAddressHidden) {
        parameters.pop();
    }
    else {
        parameters.push('location');
    }
}

export async function generateUser() {
    const user = await APIService.getUser(parseParamentersToQueryString());
    addUserToLocalStorage(user);
    hideInfoAndShowUserContent();
    displayUser(parseUserForDisplay(user));
}
