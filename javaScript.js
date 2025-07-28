// Variables for calculator state
let NumberOne = '';
let NumberTwo = '';
let Operator = null;
let RESULT = null;

let operatorCount = 0; // tracks operator button presses since last result

// Display max characters allowed (20 digits + decimal)
const MAX_DISPLAY_LENGTH = 20;

// Math Operator functions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}


// Operate: takes two numbers and an operator, returns the result or an error string
function OPERATE(n1, n2, op) {
  operatorCount = 0; // reset operator count 

  let num1 = parseFloat(n1);
  let num2 = parseFloat(n2);

  if (isNaN(num1) || isNaN(num2)) {
    return 'ERROR';
  }

  if (op === '/' && num2 === 0) {
    return 'DIVIDE BY ZERO ERROR';
  }

  let res;
  switch (op) {
    case '+':
      res = add(num1, num2);
      break;
    case '-':
      res = subtract(num1, num2);
      break;
    case '*':
      res = multiply(num1, num2);
      break;
    case '/':
      res = divide(num1, num2);
      break;
    default:
      return 'ERROR';
  }

  // Format result to fit display with rounding if necessary
  let resStr = res.toString();

  // Handle large results/exponentials that can't fit in 20 chars
  if (resStr.length > MAX_DISPLAY_LENGTH) {
    // Attempt to toPrecision to reduce length
    // Leave room for decimal point and sign
    let precision = MAX_DISPLAY_LENGTH;
    resStr = res.toPrecision(precision);

    // Check if fits after toPrecision, else ERROR
    if (resStr.length > MAX_DISPLAY_LENGTH) {
      return 'ERROR';
    }
  }

  // Remove trailing zeros in decimals (e.g. 2.5000 => 2.5)
  if (resStr.indexOf('.') !== -1) {
    resStr = parseFloat(resStr).toString();
  }

  // Still enforce max length after cleanup
  if (resStr.length > MAX_DISPLAY_LENGTH) {
    return 'ERROR';
  }

  return resStr;
}
console.log('OPERATE(10,5, "+")');
console.log(OPERATE(10,5, "+"));
console.log('OPERATE(10,5, "-")');
console.log(OPERATE(10,5, "-"));
console.log('OPERATE(10,5, "*")');
console.log(OPERATE(10,5, "*"));
console.log('OPERATE(10,5, "/")');
console.log(OPERATE(10,5, "/"));
