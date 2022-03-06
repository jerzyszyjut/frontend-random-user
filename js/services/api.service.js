export default class APIService {
    static BASE_URL = 'https://randomuser.me/api/'

    static async getUser(queryString) {
        try {
            let user;
            const url = `${APIService.BASE_URL}${queryString}`;
            await fetch(url).then(response => {
                return response.json();
            })
                .then(responseData => {
                    user = responseData.results[0];
                });
            return user;
        }
        catch (err) {
            console.error('There was an error with API connection', err);
        }
    };
}
