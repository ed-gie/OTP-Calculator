"use strict";

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "You can't divide by 0 idiot!";
    }
    else {
        return num1 / num2;
    }
}

let firstNumber = null;
let secondNumber = null;
let op = "";
let readyForSecondNumber = false;
let resultDisplayed = false;

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
        default:
            return "ERROR";
    }
}

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const controls = document.querySelector(".controls");
const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");

buttons.addEventListener("click", (e) => {
    if (!isNaN(e.target.textContent)) {
        if (resultDisplayed === true) {
            display.textContent = "";
            resultDisplayed = false;
        }
        if (readyForSecondNumber === false) {
            display.textContent += e.target.textContent;
        }
        else {
            display.textContent += e.target.textContent;
        }
    }
    else if (e.target.textContent === "AC") {
        display.textContent = "";
        document.querySelectorAll(".operator").forEach(btn => btn.style.border = "");
    }
    else if (e.target.textContent === "⌫") {
        display.textContent = display.textContent.slice(0, -1);
    }
    else if (e.target.classList.contains("operator")) {
        firstNumber = display.textContent;
        op = e.target.textContent;
        readyForSecondNumber = true;
        e.target.style.border = "4px solid green";
        display.textContent = "";
    }
    else if (e.target.textContent === "=") {
        secondNumber = display.textContent;
        display.textContent = operate(Number(firstNumber), Number(secondNumber), op);
        firstNumber = display.textContent;
        readyForSecondNumber = false;
        document.querySelectorAll(".operator").forEach(btn => btn.style.border = "");
        resultDisplayed = true;
    }
})