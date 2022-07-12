"use strict";

// Main maths functions.

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function divide(a, b) {
  // return +b === 0 ? "error" : (+a / +b).toFixed(3);
  return +b === 0 ? "error" : +a / +b;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "add":
      return add(num1, num2);
    case "subtract":
      return subtract(num1, num2);
    case "multiply":
      return multiply(num1, num2);
    case "divide":
      return divide(num1, num2);
    default:
      break;
  }
}

// Global default values.

let displayValue = 0;
let num1 = null;
let num2 = null;
let operator = null;

// Update display value and its field.

function updateDisplayValue(number) {
  if (number === ".") {
    displayValue += number;
  } else if (displayValue === 0) {
    displayValue = number;
  } else {
    displayValue += number;
  }

  updateDisplayValueField();
}

const displayValueField = document.querySelector(".js-display");

function updateDisplayValueField() {
  // Normal display value show.
  if (displayValue.toString().length <= 12) {
    displayValueField.textContent = displayValue;
  } else {
    // If the number is getting too long, show as exponential.
    displayValue = +displayValue;
    displayValueField.textContent = displayValue.toExponential(2);
  }

  // If the display value has more than 3 numbers after decimal point, show only 3 numbers.
  if (displayValue.toString().includes(".")) {
    if (displayValue.toString().split(".")[1].length > 3) {
      displayValue = (+displayValue).toFixed(3);
      displayValueField.textContent = displayValue;
    }
  }
}

// Number buttons functionality.

const numberButtons = [...document.querySelectorAll(".number-btn")];

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    updateDisplayValue(e.target.textContent);
  });
});

// Change sign functionality.

const changeSignBtn = document.querySelector(".js-change-sign-btn");

changeSignBtn.addEventListener("click", changeSign);

function changeSign() {
  displayValue = +displayValue;
  displayValue = -displayValue;
  toString(displayValue);
  updateDisplayValueField();
}

// Clear all functionality.

const clearBtn = document.querySelector(".js-clear-btn");

clearBtn.addEventListener("click", clearAll);

function clearAll() {
  displayValue = 0;
  num1 = null;
  num2 = null;
  operator = null;
  updateDisplayValueField();
}

// Only one separator functionality.

const separatorBtn = document.querySelector(".js-separator-btn");

separatorBtn.addEventListener("click", separatorClicked);

function separatorClicked(e) {
  // Has to compare to a string, because includes() does not work with numbers. Alternative would be using try-catch statement.
  if (!displayValue.toString().includes(".")) {
    updateDisplayValue(e.target.textContent);
  }
}

// Get equation result functionality.

const operatorButtons = [...document.querySelectorAll(".js-operator-btn")];

operatorButtons.forEach((button) => {
  button.addEventListener("click", operatorBtnEvent);
});

function operatorBtnEvent() {
  if (operator === null) {
    operator = this.dataset.operator;
  }

  if (num1 !== null) {
    num2 = displayValue;
    let result = operate(operator, num1, num2);
    num1 = result;
    displayValue = result;
    operator = this.dataset.operator;
    updateDisplayValueField();
  } else {
    num1 = displayValue;
  }
  displayValue = 0;
}

const equalBtn = document.querySelector(".js-equal-btn");

equalBtn.addEventListener("click", equalBtnEvent);

function equalBtnEvent() {
  if (num1 !== null) {
    num2 = displayValue;
    let result = operate(operator, num1, num2);
    num1 = result;
    displayValue = result;
    updateDisplayValueField();
  }
}

//  Convert to decimal percent functionality.

const percentBtn = document.querySelector(".js-percent-btn");

percentBtn.addEventListener("click", convertToDecimalPercent);

function convertToDecimalPercent() {
  displayValue /= 100;
  updateDisplayValueField();
}

// Backspace functionality.

const backspaceBtn = document.querySelector(".js-backspace-btn");

backspaceBtn.addEventListener("click", backspace);

function backspace() {
  displayValue = displayValue.toString();
  if (displayValue == 0) {
  } else if ([...displayValue].length === 1) {
    displayValue = 0;
    updateDisplayValueField();
  } else {
    displayValue = displayValue.slice(0, -1);
    updateDisplayValueField();
  }
}

// Keyboard support.

window.addEventListener("keyup", keyPressed);

function keyPressed(e) {
  const btn = document.querySelector(`div[data-key="${e.key}"]`);
  btn.click();
  btn.classList.add("key-pressed");
}

// Keyboard animations.

const allButtons = document.querySelectorAll(".calc-btn");

allButtons.forEach((button) =>
  button.addEventListener("animationend", removeTransition)
);

function removeTransition(e) {
  e.target.classList.remove("key-pressed");
}
