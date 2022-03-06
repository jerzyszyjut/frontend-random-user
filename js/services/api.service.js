export default class APIService {
  static BASE_URL = 'https://randomuser.me/api/';

  static async getUser(queryString) {
    let user;
    const url = `${APIService.BASE_URL}${queryString}`;
    await fetch(url).then((response) => response.json())
      .then((responseData) => {
        user = responseData.results[0];
      });
    return user;
  }
}
