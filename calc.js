"use strict";

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const controls = document.querySelector(".controls");
const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");

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
    if (!isNaN(e.target.textContent)) {
        if (resultDisplayed === true) {
            display.textContent = "";
            firstNumber = null;
            secondNumber = null;
            resultDisplayed = false;
        }
        if (readyForSecondNumber === false) {
            //input first number
            display.textContent += e.target.textContent;
            firstNumber = display.textContent;

            console.log(`firstNumber: ${firstNumber}`);
            console.log(`secondNumber: ${secondNumber}`);
            console.log(`readyForSecondNumber: ${readyForSecondNumber}`);
        }
        else {
            // input second number
            if (op !== "") {
                display.textContent = ""
            }
            display.textContent += e.target.textContent;
            secondNumber = display.textContent;

            console.log(`firstNumber: ${firstNumber}`);
            console.log(`secondNumber: ${secondNumber}`);
        }
    }
    else if (e.target.textContent === "AC") {
        display.textContent = "";
        firstNumber = null;
        secondNumber = null;
        op = "";
        document.querySelectorAll(".operator").forEach(btn => btn.style.border = "");
    }
    else if (e.target.textContent === "⌫") {
        display.textContent = display.textContent.slice(0, -1);
    }
    else if (e.target.classList.contains("operator")) {
        if (readyForSecondNumber === true) {
            op = e.target.textContent;
            document.querySelectorAll(".operator").forEach(btn => btn.style.border = "");
            e.target.style.border = "4px solid green";
            return;
        }
        if (op !== "") {
            display.textContent = operate(Number(firstNumber), Number(secondNumber), op); //result
            secondNumber = null;
            firstNumber = display.textContent;
            document.querySelectorAll(".operator").forEach(btn => btn.style.border = "");
            e.target.style.border = "4px solid green";
            op = e.target.textContent;
            readyForSecondNumber = true;

            console.log(`firstNumber: ${firstNumber}`);
            console.log(`secondNumber: ${secondNumber}`);
            console.log(`readyForSecondNumber: ${readyForSecondNumber}`)
        }
        else {
            firstNumber = display.textContent;
            op = e.target.textContent;
            readyForSecondNumber = true;
            e.target.style.border = "4px solid green";

            console.log(`op: ${op}`);
            console.log(`readyForSecondNumber: ${readyForSecondNumber}`)
        }
    }
    else if (e.target.textContent === ".") {
        if (!display.textContent.includes(".")) {
            display.textContent += ".";
        }
    }
    else if (e.target.textContent === "=") {
        display.textContent = operate(Number(firstNumber), Number(secondNumber), op); //result
        firstNumber = display.textContent;
        readyForSecondNumber = false;
        document.querySelectorAll(".operator").forEach(btn => btn.style.border = "");
        resultDisplayed = true;

        console.log(`op: ${op}`);
        console.log(`resultDisplayed: ${resultDisplayed}`);
        console.log(`firstNumber: ${firstNumber}`);
        console.log(`secondNumber: ${secondNumber}`);
    }
})