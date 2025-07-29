# odinCalculator
Foundations Course, Calculator Project

REQUIREMENT

DONE        Calculator SHALL NOT use the built-in javascript eval() function.


DONE        Calculator SHALL NOT use solutions that return a new function() that evaluates a string.


DONE        Calculator SHALL have the following math functions: ADD, SUBTRACT, MULTIPLY, DIVIDE.


DONE        Calculator SHALL have an OPERATE function that takes two numbers and then calls one of the math functions to generate a RESULT.


DONE        Calculator operations SHALL consist of a number (NumberOne), an operator, and another number (NumberTwo). For example, 3 + 5. 


DONE        Calculator SHALL have dedicated variables for NumberOne, Operator, NumberTwo, and RESULT.  


DONE        Calculator SHALL have an HTML GUI with buttons for each digit, each Operator, a decimal point, and an "eguals"(=).


DONE        Calculator SHALL have a DISPLAY window in the HTML GUI that can hold twenty digits and a decimal point.


DONE        Calculator SHALL have an equalsButton Event Listener that activates the OPERATE function.


DONE        Calculator SHALL track the number of Operator (math function) buttons that have been pressed since the last result.


DONE        Calculator SHALL activate the OPERATE function if a second Operator button is pressed after NumberTwo.


DONE        Calculator SHALL reset the Operator tracking to zero before exiting the OPERATE function.


DONE        Calculator SHALL have a CLEAR function that resets the RESULT to zero.


DONE        The DISPLAY SHALL indicate the RESULT at all times with the decimal places rounded off to fit the twenty allotted digits.


DONE        The DISPLAY SHALL indicate "ERROR" if the RESULT is to large to fit in the twenty allotted digits.


DONE        The DISPLAY SHALL indicate "ERROR" if an operator is entered before a new number is entered.


DONE        The DISPLAY SHALL indicate "ERROR" if the "equals" button is pressed before the NumberOne , the Operator, and NumberTwo have been entered.


DONE        Calculator SHALL have an EQUATION sub-display on a second line of the DISPLAY window that indicates the numbers, operator, and "equals" as they are entered.


DONE        The EQUATION sub-display SHALL reset to an empty string when the CLEAR function is called.


DONE        The EQUATION sub-display SHALL reset to an empty string before displaying a new number that is entered after the last OPERATE.


DONE        The EQUATION sub-display SHALL use the RESULT as the first set of digits if a second operator is pressed after NumberTwo instead of the "equals" button.


DONE        The EQUATION sub-display SHALL be of a smaller font in order to accept up to twenty digits each for the two numbers, and also the operator and the equals symbols.


DONE        The DISPLAY SHALL indicate "ERROR" if more than twenty digits are entered for either number in the OPERATE function.


DONE        The DISPLAY SHALL indicate "DIVIDE BY ZERO ERROR" if the operator is DIVIDE and the NumberTwo is zero.


DONE        Calculator SHALL ignore multiple consecutive operator button presses.


Calculator SHALL ignore multiple consecutive decimal point button presses.


DONE        Calculator SHALL ignore multiple consecutive equals button presses.


Calculator SHALL have a backspace button.


Calculator SHALL remove one digit per each backspace button push during either NumberOne or NumberTwo entry. 


