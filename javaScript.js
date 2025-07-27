// Variables for calculator state
let NumberOne = '';
let NumberTwo = '';
let Operator = null;
let RESULT = null;

let operatorCount = 0; // tracks operator button presses since last result

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
console.log("add(5,6)");
console.log(add(5,6));

console.log("subtract(15,6)");
console.log(subtract(15,6));

console.log("multiply(5,6)");
console.log(multiply(5,6));

console.log("divide(30,6)");
console.log(divide(30,6));
