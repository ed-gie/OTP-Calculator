"use strict";

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const controls = document.querySelector(".controls");
const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");
const operatorButtons = document.querySelectorAll(".operator")

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
        display.style.fontSize = "30px";
        return "You can't divide by 0 idiot!";
    }
    else {
        return (num1 / num2).toFixed(5);
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

buttons.addEventListener("click", (e) => {
    if (!isNaN(e.target.textContent) || (e.target.textContent === "." && !display.textContent.includes("."))) {
        if (resultDisplayed === true) {
            display.textContent = "";
            firstNumber = null;
            secondNumber = null;
            op = "";
            readyForSecondNumber = false;
            resultDisplayed = false;
        }
        if (readyForSecondNumber === false) {//input firstNumber
            display.textContent += e.target.textContent;
            firstNumber = display.textContent;
        }
        else {//input secondNumber
            if (secondNumber === null) {
                display.textContent = "";
            }
            display.textContent += e.target.textContent;
            secondNumber = display.textContent;
        }
    }
    else if (e.target.textContent === "AC") {
        display.textContent = "";
        firstNumber = null;
        secondNumber = null;
        op = "";
        readyForSecondNumber = false;
        operatorButtons.forEach(btn => btn.style.border = "");
        display.style.fontSize = "";
    }
    else if (e.target.textContent === "⌫") {
        display.textContent = display.textContent.slice(0, -1);
    }
    else if (e.target.classList.contains("operator")) {//input operator
        if (op !== "") {
            operatorButtons.forEach(btn => btn.style.border = "");
            display.textContent = operate(Number(firstNumber), Number(secondNumber), op);
            firstNumber = display.textContent;
            secondNumber = null;
        }
        op = e.target.textContent;
        readyForSecondNumber = true;
        e.target.style.border = "4px solid green";
    }
    else if (e.target.textContent === "=") {
        display.textContent = operate(Number(firstNumber), Number(secondNumber), op);
        firstNumber = display.textContent;
        secondNumber = null;
        operatorButtons.forEach(btn => btn.style.border = "");
        resultDisplayed = true;
    }
})