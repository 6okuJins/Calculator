import operate from './operations.js';

let firstNumber = '';
let secondNumber = '';
let currentOperation = '';

const buttons = document.querySelectorAll('button');

function buttonPress() {
    console.log(this.textContent);
}

buttons.forEach(button => button.addEventListener('click', buttonPress));