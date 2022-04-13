import operate from './operations.js';

let firstNumber = '0';
let secondNumber = '';
let currentOperation = '';

const buttons = document.querySelectorAll('button');
const mainDisplay = document.querySelector('#main-display');
const opButtons = document.querySelector('.operator');
const secondDisplay = document.querySelector('#second-display');

function buttonPress() {
    if (this.className == 'number') {
        if (secondDisplay.textContent.includes('=') && !currentOperation){
            clear();
        }
        if (!(currentOperation || secondNumber)) {
            if (firstNumber == 0) firstNumber = '';
            firstNumber += this.textContent;
            mainDisplay.textContent = firstNumber;
        }
        else if (currentOperation && (firstNumber != 0)) {
            if (secondNumber == 0) secondNumber = '';
            secondNumber += this.textContent;
            mainDisplay.textContent = secondNumber;
        }
    }
    else if (this.className == 'operator' && (firstNumber != 0)) {
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
    else if (this.textContent == "%") {
        if (secondNumber && secondNumber != 0) {
            secondNumber = mainDisplay.textContent = operate(secondNumber, '100', '÷');
        }
        else if (firstNumber && firstNumber != 0 && !currentOperation) {
            firstNumber = mainDisplay.textContent = operate(firstNumber, '100', '÷');
        }
    }
    else if (this.textContent == "+/-") {
        if (secondNumber && secondNumber != 0) {
            secondNumber = mainDisplay.textContent = operate('0', secondNumber, '-');
        }
        else if (firstNumber && firstNumber != 0 && !currentOperation) {
            firstNumber = mainDisplay.textContent = operate('0', firstNumber, '-');
        }
    }
}
function clear() {
    if (secondNumber) {
        secondNumber = mainDisplay.textContent = '0';
    }
    else {
        firstNumber = mainDisplay.textContent = '0';
        secondDisplay.textContent = currentOperation = '';
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