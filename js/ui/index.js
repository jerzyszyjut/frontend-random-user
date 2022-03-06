const locationAddressContainer = document.getElementById('location-address-container');
const info = document.getElementById('info');
const userContainer = document.getElementById('user-container');

export function hideAddressContainer(isAddressHidden) {
  if (isAddressHidden) {
    locationAddressContainer.setAttribute('class', 'location-address-container hidden details-container');
  } else {
    locationAddressContainer.setAttribute('class', 'location-address-container details-container');
  }
}

export function hideInfo() {
  info.setAttribute('class', 'hidden');
}

export function showUserContainer() {
  userContainer.setAttribute('class', 'user-container');
}

export function displayUser(user) {
  const profilePicture = document.getElementById('profile-picture');
  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const registerDate = document.getElementById('register-date');
  const nationality = document.getElementById('nationality');
  const locationAddress = document.getElementById('location-address');

  profilePicture.src = user.profile_picture;
  firstName.textContent = user.first_name;
  lastName.textContent = user.last_name;
  registerDate.textContent = user.register_date;
  nationality.textContent = user.nationality;
  locationAddress.textContent = user.location_address;
}
