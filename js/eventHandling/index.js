import { hideAddress, generateUser } from '../index.js';

const checkbox = document.getElementById('hide-address-checkbox');
const button = document.getElementById('generate-button');

checkbox.addEventListener('click', hideAddress);
button.addEventListener('click', generateUser);
