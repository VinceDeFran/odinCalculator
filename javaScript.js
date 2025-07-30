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



// Display Variables
const display = document.getElementById('display');
const equationDisplay = document.getElementById('equation');
const MAX_DIGITS = 20; // Max digits allowed per number (20)


// Clear all
function CLEAR() {
  NumberOne = '';
  NumberTwo = '';
  Operator = null;
  RESULT = null;
  operatorCount = 0;
  updateDisplay('0');
  updateEquation('');
}


//  DISPLAY FUNCTIONS  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Update the main display with the current value
function updateDisplay(value) {
  display.textContent = value;
}

// Update the equation sub-display
function updateEquation(value) {
  equationDisplay.textContent = value;
}

// Append digit to current number
function appendDigit(digit) {
  // If last operation was complete and user starts typing a new number, reset equation sub-display
  if (RESULT !== null && Operator === null) {
    // Starting new equation
    CLEAR();
  }

  if (!Operator) {
    // Working on NumberOne
    if (NumberOne.length >= MAX_DIGITS) {
      displayError();
      return;
    }
    NumberOne += digit;

    if (countDecimals(NumberOne) > 1) {
      displayError();
      return;
    }
    updateDisplay(NumberOne);
    updateEquation(NumberOne);
  } else {
    // Working on NumberTwo
    if (NumberTwo.length >= MAX_DIGITS) {
      displayError();
      return;
    }
    NumberTwo += digit;

    if (countDecimals(NumberTwo) > 1) {
      displayError();
      return;
    }

    updateDisplay(NumberTwo);
    updateEquation(`${NumberOne} ${Operator} ${NumberTwo}`);
  }
}
 

// Count decimals in a number string
function countDecimals(numStr) {
  return (numStr.split('.').length - 1);
}
//  DISPLAY FUNCTIONS  //////////////////////////////////////////////////////////////////


// EVENT LISTENERS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Event Listeners Setup
function setupListeners() {
  // Digits
  document.querySelectorAll('.btn.digit').forEach(button => {
    button.addEventListener('click', () => {
      appendDigit(button.dataset.digit);
    });
  });

  // Operators
  document.querySelectorAll('.btn.operator').forEach(button => {
    if (button.id === 'clear') {
      button.addEventListener('click', () => {
        CLEAR();
      });
    }  else if (button.id === 'backspace') {
      button.addEventListener('click', () => {
        handleBackspace();
      });
    }else {
      button.addEventListener('click', () => {
        handleOperator(button.dataset.operator);
      });
    }
  });


  // Equals
  const equalsButton = document.getElementById('equals');

  equalsButton.addEventListener('click', () => {
    handleEquals();
  });
}
// EVENT LISTENERS //////////////////////////////////////////////////


// Handle operator input
function handleOperator(op) {
  // Ignore if no NumberOne yet, or display error if operator pressed before a new number is entered
  if (NumberOne === '') {
    displayError();
    return;
  }

  // Ignore multiple consecutive operator presses
  if (operatorCount > 0 && !NumberTwo) {
    return;
  }

  // If NumberTwo exists, perform intermediate calculation before continuing
  if (Operator && NumberTwo) {
    // Calculate RESULT
    let res = OPERATE(NumberOne, NumberTwo, Operator);
    if (res === 'ERROR' || res === 'DIVIDE BY ZERO ERROR') {
      displayError(res);
      return;
    }
    RESULT = res;
    NumberOne = RESULT;
    NumberTwo = '';
    Operator = op;

    updateDisplay(RESULT);
    // Update equation sub-display using RESULT as first number (not equal sign yet)
    updateEquation(`${RESULT} ${Operator}`);

  } else {
    Operator = op;
    updateEquation(`${NumberOne} ${Operator}`);
  }

  operatorCount++;
}


// Handle equals button press
function handleEquals() {
  // Ignore multiple equals presses in a row
  if (RESULT !== null && !NumberTwo && !Operator) {
    return;
  }

  if (NumberOne === '' || Operator === null || NumberTwo === '') {
    displayError();
    return;
  }

  // Check for multiple decimals for both numbers
  if (countDecimals(NumberOne) > 1 || countDecimals(NumberTwo) > 1) {
    displayError();
    return;
  }

  // Check digit length limits for input numbers
  if (NumberOne.replace('.', '').length > MAX_DIGITS || NumberTwo.replace('.', '').length > MAX_DIGITS) {
    displayError();
    return;
  }

  let res = OPERATE(NumberOne, NumberTwo, Operator);

  if (res === 'ERROR' || res === 'DIVIDE BY ZERO ERROR') {
    displayError(res);
    return;
  }

  RESULT = res;
  updateDisplay(RESULT);
  updateEquation(`${NumberOne} ${Operator} ${NumberTwo} =`);
  
  // After equals, prepare for next input by resetting Operator and NumberTwo
  NumberOne = RESULT.toString();
  NumberTwo = '';
  Operator = null;
  operatorCount = 0;
}


// Generic display error handler
function displayError(message='ERROR') {
  RESULT = null;
  NumberOne = '';
  NumberTwo = '';
  Operator = null;
  operatorCount = 0;
  updateDisplay(message);
  updateEquation('');
}

// DECIMAL POINT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const decimalButton = document.getElementById('decimal');

  decimalButton.addEventListener('click', () => {
    appendDecimal();
  });
  
// Handle decimal point input
function appendDecimal() {
  // Prevent multiple decimals consecutively also
  let currentNumber = Operator ? NumberTwo : NumberOne;

  if (currentNumber.includes('.')) {
    // ignore multiple decimals in same number
    return;
  }

  if (RESULT !== null && Operator === null) {
    // New input after result means clear
    CLEAR();
  }

  if (!Operator) {
    NumberOne = currentNumber === '' ? '0.' : currentNumber + '.';
    updateDisplay(NumberOne);
    updateEquation(NumberOne);
  } else {
    NumberTwo = currentNumber === '' ? '0.' : currentNumber + '.';
    updateDisplay(NumberTwo);
    updateEquation(`${NumberOne} ${Operator} ${NumberTwo}`);
  }
}
//  DECIMAL POINT ////////////////////////////////////////////////// */


// BACKSPACE FUNCTION  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function handleBackspace() {
  // Backspace only affects the current number digits and decimal point

  // If RESULT is just shown and no Operator is set, start fresh
  if (RESULT !== null && Operator === null) {
    CLEAR();
    return;
  }

  if (Operator === null) {
    // Editing NumberOne
    if (NumberOne.length > 0) {
      NumberOne = NumberOne.slice(0, -1);
      if (NumberOne === '') {
        updateDisplay('0');
        updateEquation('');
      } else {
        updateDisplay(NumberOne);
        updateEquation(NumberOne);
      }
    }
  } else {
    // Editing NumberTwo if it exists
    if (NumberTwo.length > 0) {
      NumberTwo = NumberTwo.slice(0, -1);
      if (NumberTwo === '') {
        updateDisplay('0');
        updateEquation(`${NumberOne} ${Operator}`);
      } else {
        updateDisplay(NumberTwo);
        updateEquation(`${NumberOne} ${Operator} ${NumberTwo}`);
      }
    }
  }
}
// BACKSPACE FUNCTION  //////////////////////////////////////////////////


// Initialize calculator
function init() {
  CLEAR();
  setupListeners();
}

init();

  //  EOF