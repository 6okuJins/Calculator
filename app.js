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
            mainDisplay.textContent = round(firstNumber);
        }
        else if (currentOperation && (firstNumber != 0)) {
            if (secondNumber == 0) secondNumber = '';
            secondNumber += this.textContent;
            mainDisplay.textContent = round(secondNumber);
        }
    }
    else if (this.className == 'operator' && (firstNumber != 0)) {
        deselectButton();
        currentOperation = this.textContent;
        this.setAttribute('id', 'selected');
        secondDisplay.textContent = `${round(firstNumber)} ${currentOperation}`;
    }
    else if (this.className == 'operator equals' && secondNumber) {
        deselectButton();
        secondDisplay.textContent = `${round(firstNumber)} ${currentOperation} ${round(secondNumber)} =`;
        firstNumber = String(operate(firstNumber, secondNumber, currentOperation));
        mainDisplay.textContent = round(firstNumber);
        secondNumber = currentOperation = '';
    }
    else if (this.textContent == 'Clear') {
        clear();
    }
    else if (this.textContent == "%") {
        if (secondNumber && secondNumber != "0") {
            secondNumber = mainDisplay.textContent = operate(secondNumber, '100', '÷');
        }
        else if (firstNumber && firstNumber != "0" && !currentOperation) {
            firstNumber = mainDisplay.textContent = operate(firstNumber, '100', '÷');
        }
    }
    else if (this.textContent == "+/-") {
        if (secondNumber && secondNumber != "0") {
            secondNumber = mainDisplay.textContent = operate('0', secondNumber, '-');
        }
        else if (firstNumber && firstNumber != "0" && !currentOperation) {
            firstNumber = mainDisplay.textContent = operate('0', firstNumber, '-');
        }
    }
    else if (this.textContent == '.') {
        if (secondNumber && secondNumber != "0" && !(secondNumber.includes("."))) {
            secondNumber += this.textContent;
        }
        else if (firstNumber && firstNumber != "0" && !(firstNumber.includes("."))) {
            firstNumber += this.textContent;
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
const round = (n) => String(Math.round(n * 100) / 100);

buttons.forEach(button => button.addEventListener('click', buttonPress));
const body = document.querySelector('body');

const showVars = document.createElement('button');
body.appendChild(showVars);
showVars.textContent = "SHOW VARIABLES";
showVars.addEventListener('click', () => console.log(firstNumber, secondNumber, currentOperation));