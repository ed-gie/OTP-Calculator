"use strict";

const display = document.querySelector(".display p");
const buttons = document.querySelector(".buttons");
const controls = document.querySelectorAll(".controls button");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const numbers = document.querySelectorAll(".numbers button");

let firstNumber = null;
let secondNumber = null;
let op = "";
let readyForSecondNumber = false;
let resultDisplayed = false;
let isError = false;

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
        isError = true;
        return "You can't divide by 0 idiot!";
    }
    else {
        return parseFloat((num1 / num2).toFixed(5));
    }
}

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
    if (isError && e.target.textContent !== "AC") return;
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
        operators.forEach(btn => btn.style.border = "");
        display.style.fontSize = "";
        isError = false;
    }
    else if (e.target.textContent === "⌫") {
        display.textContent = display.textContent.slice(0, -1);
    }
    else if (e.target.classList.contains("operator")) {//input operator
        if (op !== "") {// consecutive operator
            operators.forEach(btn => btn.style.border = "");
            display.textContent = operate(Number(firstNumber), Number(secondNumber), op);
            firstNumber = display.textContent;
            secondNumber = null;
            if (firstNumber === "You can't divide by 0 idiot!") {
                firstNumber = null;
            }
        }
        op = e.target.textContent;
        readyForSecondNumber = true;
        e.target.style.border = "4px solid green";
    }
    else if (e.target.textContent === "=") {
        if (firstNumber === null || secondNumber === null) return;
        display.textContent = operate(Number(firstNumber), Number(secondNumber), op);
        firstNumber = display.textContent;
        secondNumber = null;
        operators.forEach(btn => btn.style.border = "");
        resultDisplayed = true;
    }
})

// keyboard support
document.addEventListener("keydown", (e) => {
    const opKeyMap = {
        "/": "÷",
        "*": "×",
        "+": "+",
        "-": "-",
        "=": "=",
    };
    const controlsKeyMap = {
        "Backspace": "⌫",
        "Escape": "AC"
    }
    if (!isNaN(e.key) || e.key === ".") {// numbers
        const button = Array.from(numbers).find(btn => btn.textContent === e.key);
        if (button) button.click();
    }
    else if (Array.from(operators).find(btn => btn.textContent === opKeyMap[e.key])) {// operators
        const button = Array.from(operators).find(btn => btn.textContent === opKeyMap[e.key]);
        if (button) button.click();
    }
    else if (Array.from(controls).find(btn => btn.textContent === controlsKeyMap[e.key])) {// backspace and AC
        const button = Array.from(controls).find(btn => btn.textContent === controlsKeyMap[e.key]);
        if (button) button.click();
    }
    else if (e.key === "Enter") {// =
        equals.click();
    }
})