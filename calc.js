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
    if (num1 === 0 || num2 === 0) {
        return "You can't divide by 0 idiot!";
    }
    return num1 / num2;
}

let num1 = 0;
let num2 = 0;
let operator = "";

function operate(num1, num2, operator) {
    return `${num1} ${operator} ${num2}`;
}