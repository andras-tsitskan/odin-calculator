"use strict";

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
  return b === 0 ? "error" : a / b;
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

let displayValue = 0;

const displayValueField = document.querySelector(".js-display");

function updateDisplayValue(number) {
  if (number === ".") {
    displayValue += number;
  } else if (displayValue === 0) {
    displayValue = number;
  } else {
    displayValue += number;
  }

  displayValueField.textContent = displayValue;
}

const numberButtons = [...document.querySelectorAll(".number-btn")];

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    updateDisplayValue(e.target.textContent);
  });
});
