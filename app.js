import operate from './operations.js';

let firstNumber = '';
let secondNumber = '';
let currentOperation = '';

const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const opButtons = document.querySelector('.operator');
function buttonPress() {
    if (this.className == 'number') {
        if (!(currentOperation || secondNumber)) {
            firstNumber += this.textContent;
            display.textContent = firstNumber;
        }
        else if (currentOperation && firstNumber) {
            secondNumber += this.textContent;
            display.textContent = secondNumber;
        }
    }
    else if (this.className == 'operator' && firstNumber) {
        deselectButton();
        currentOperation = this.textContent;
        this.setAttribute('id', 'selected');
    }
    else if (this.className == 'operator equals' && secondNumber) {
        deselectButton();
        firstNumber = String(operate(firstNumber, secondNumber, currentOperation));
        display.textContent = firstNumber;
        secondNumber = currentOperation = '';
    }
    else if (this.textContent == 'Clear') {
        clear();
    }
}
function clear() {
    if (secondNumber) {
        secondNumber = display.textContent = '';
    }
    else {
        firstNumber  = display.textContent = currentOperation = '';
        deselectButton();
    }

}
function deselectButton() {
    if (document.getElementById('selected')) {
        document.getElementById('selected').removeAttribute('id');
    }
}
buttons.forEach(button => button.addEventListener('click', buttonPress));
const body = document.querySelector('body');

const showVars = document.createElement('button');
body.appendChild(showVars);
showVars.textContent = "SHOW VARIABLES";
showVars.addEventListener('click', () => console.log(firstNumber, secondNumber, currentOperation));