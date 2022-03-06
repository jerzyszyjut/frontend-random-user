import displayHistoryContent from './ui/history.js';
import HistoryService from './services/history.service.js';

let users;
export const filters = {
  lastName: null,
  registerDate: null,
};

function switchFilters(type) {
  switch (type) {
    case 'registerDate':
      if (filters.registerDate === null) {
        filters.registerDate = true;
        filters.lastName = null;
      } else {
        filters.registerDate = !filters.registerDate;
      }
      break;

    case 'lastName':
      if (filters.lastName === null) {
        filters.lastName = true;
        filters.registerDate = null;
      } else {
        filters.lastName = !filters.lastName;
      }
      break;

    default:
      break;
  }
}

export function sortByLastName() {
  switchFilters('lastName');
  const value = filters.lastName ? 1 : -1;
  users.sort((a, b) => {
    if (a.last_name < b.last_name) {
      return value * -1;
    }
    if (a.last_name > b.last_name) {
      return value;
    }
    return 0;
  });
  displayHistoryContent(users, filters);
}

export function sortByRegisterDate() {
  switchFilters('registerDate');
  const value = filters.registerDate ? 1 : -1;
  users.sort((a, b) => (new Date(b.register_date) - new Date(a.register_date)) * value);
  displayHistoryContent(users, filters);
}

users = HistoryService.getUsersHistory();
displayHistoryContent(users, filters);
