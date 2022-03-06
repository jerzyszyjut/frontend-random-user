export default class HistoryService {
  static USERS_HISTORY = 'usersHistory';

  static getUsersHistory() {
    if (localStorage.length === 0) {
      return false;
    }
    const usersHistory = localStorage.getItem(HistoryService.USERS_HISTORY);
    return JSON.parse(usersHistory);
  }

  static addUserToUsersHistory(user) {
    if (HistoryService.isUsersHistoryEmpty()) {
      let users = [];
      users.push(user);
      users = JSON.stringify(users);
      localStorage.setItem(HistoryService.USERS_HISTORY, users);
    } else {
      let users = localStorage.getItem(HistoryService.USERS_HISTORY);
      users = JSON.parse(users);
      users.push(user);
      if (HistoryService.hasReachedUsersHistoryLimit()) {
        users.splice(0, 1);
      }
      users = JSON.stringify(users);
      localStorage.setItem(HistoryService.USERS_HISTORY, users);
    }
  }

  static isUsersHistoryEmpty() {
    if (localStorage.length === 0) {
      return true;
    }
    return false;
  }

  static hasReachedUsersHistoryLimit() {
    let users = localStorage.getItem(HistoryService.USERS_HISTORY);
    users = JSON.parse(users);
    if (users.length > 9) {
      return true;
    }
    return false;
  }
}
