import operate from './operations.js';

let firstNumber = '';
let secondNumber = '';
let currentOperation = '';

const buttons = document.querySelectorAll('button');
const mainDisplay = document.querySelector('#main-display');
const opButtons = document.querySelector('.operator');
const secondDisplay = document.querySelector('#second-display');
function buttonPress() {
    if (this.className == 'number') {
        if (!(currentOperation || secondNumber)) {
            firstNumber += this.textContent;
            mainDisplay.textContent = firstNumber;
        }
        else if (currentOperation && firstNumber) {
            secondNumber += this.textContent;
            mainDisplay.textContent = secondNumber;
        }
    }
    else if (this.className == 'operator' && firstNumber) {
        deselectButton();
        currentOperation = this.textContent;
        this.setAttribute('id', 'selected');
        secondDisplay.textContent = `${firstNumber} ${currentOperation}`;
    }
    else if (this.className == 'operator equals' && secondNumber) {
        deselectButton();
        secondDisplay.textContent = `${firstNumber} ${currentOperation} ${secondNumber} =`;
        firstNumber = String(operate(firstNumber, secondNumber, currentOperation));
        mainDisplay.textContent = firstNumber;
        secondNumber = currentOperation = '';
    }
    else if (this.textContent == 'Clear') {
        clear();
    }
}
function clear() {
    if (secondNumber) {
        secondNumber = mainDisplay.textContent = '';
    }
    else {
        firstNumber  = mainDisplay.textContent = secondDisplay.textContent = currentOperation = '';
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