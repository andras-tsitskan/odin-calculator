"use strict";

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

//

const displayValueField = document.querySelector(".js-display");

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

function updateDisplayValueField() {
  displayValueField.textContent = displayValue;
}

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

let operator;
const operatorButtons = [...document.querySelectorAll(".operator-btn")];

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => console.log("click"));
});

//

const addBtn = document.querySelector(".js-add-btn");

addBtn.addEventListener("click", addBtnEvent);

function addBtnEvent() {
  operator = "add";
  num1 = displayValue;
  displayValue = 0;
}

//

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
