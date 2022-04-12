let add = (x, y) => x + y;
let subtract = (x, y) => x - y;
let multiply = (x, y) => x * y;
let divide = (x, y) => x / y;

function operate(x, y, operator) {
    return operator == '+' ? add(x,y)
        : operator == '-' ? subtract(x,y)
        : operator == '*' ? multiply(x,y)
        : operator == '/' ? divide(x,y)
        : false;
}