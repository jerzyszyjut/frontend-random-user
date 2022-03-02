const BASE_URL = 'https://randomuser.me/api/';

const button = document.getElementById('generate-button');

const getUser = () => {
    fetch(BASE_URL).then(response => {
        return response.json();
    })
        .then(responseData => {
            console.log(responseData.results[0]);
        });
};

button.addEventListener('click', getUser);
