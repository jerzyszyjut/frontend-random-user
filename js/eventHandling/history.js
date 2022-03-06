import { sortByLastName, sortByRegisterDate } from '../history.js';
import HistoryService from '../services/history.service.js';

if (!HistoryService.isUsersHistoryEmpty()) {
  const lastNameButton = document.getElementById('header_last_name');
  const registerDateButton = document.getElementById('header_register_date');

  lastNameButton.addEventListener('click', sortByLastName);
  registerDateButton.addEventListener('click', sortByRegisterDate);
}
