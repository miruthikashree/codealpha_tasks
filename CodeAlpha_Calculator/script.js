
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let expression = "";
let justCalculated = false;

// Enter a number
function inputNumber(number) {
    if (display.value === "Error") {
        clearCalculator();
    }

    if (justCalculated) {
        expression = "";
        justCalculated = false;
    }

    expression += number;
    display.value = expression;
}

// Enter a decimal point
function inputDecimal() {
    if (display.value === "Error") {
        clearCalculator();
    }

    if (justCalculated) {
        expression = "";
        justCalculated = false;
    }

    const currentNumber = expression.split(/[+\-*/]/).pop();

    if (currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "") {
        expression += "0";
    }

    expression += ".";
    display.value = expression;
}

// Enter an arithmetic operator
function chooseOperator(nextOperator) {
    if (display.value === "Error") {
        clearCalculator();
        return;
    }

    if (expression === "" || expression === "-") {
        return;
    }

    if (/[+\-*/.]$/.test(expression)) {
        expression = expression.slice(0, -1);
    }

    expression += nextOperator;
    display.value = expression;
    justCalculated = false;
}

// Evaluate the expression using operator precedence
function calculate() {
    if (expression === "" || /[+\-*/.]$/.test(expression)) {
        return;
    }

    try {
        const result = evaluateExpression(expression);

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        expression = String(Number(result.toPrecision(12)));
        display.value = expression;
        justCalculated = true;
    } catch {
        display.value = "Error";
        expression = "";
        justCalculated = false;
    }
}

// Safely evaluate numbers and arithmetic operators
function evaluateExpression(input) {
    const tokens = input.match(/\d*\.?\d+|[+\-*/]/g);

    if (!tokens || tokens.join("") !== input) {
        throw new Error("Invalid expression");
    }

    const numbers = [];
    const operators = [];
    let expectingNumber = true;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (expectingNumber) {
            if (token === "-" && (i === 0 || /[+\-*/]/.test(tokens[i - 1]))) {
                const next = tokens[i + 1];

                if (next === undefined || /[+\-*/]/.test(next)) {
                    throw new Error("Invalid number");
                }

                numbers.push(-Number(next));
                i++;
                expectingNumber = false;
            } else if (!isNaN(Number(token)) && !/[+\-*/]/.test(token)) {
                numbers.push(Number(token));
                expectingNumber = false;
            } else {
                throw new Error("Expected a number");
            }
        } else {
            if (!/[+\-*/]/.test(token)) {
                throw new Error("Expected an operator");
            }

            operators.push(token);
            expectingNumber = true;
        }
    }

    if (expectingNumber || numbers.length !== operators.length + 1) {
        throw new Error("Incomplete expression");
    }

    // First, perform multiplication and division
    for (let i = 0; i < operators.length;) {
        if (operators[i] === "*" || operators[i] === "/") {
            const a = numbers[i];
            const b = numbers[i + 1];

            if (operators[i] === "/" && b === 0) {
                throw new Error("Division by zero");
            }

            const result = operators[i] === "*" ? a * b : a / b;

            numbers.splice(i, 2, result);
            operators.splice(i, 1);
        } else {
            i++;
        }
    }

    // Then, perform addition and subtraction
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
            result += numbers[i + 1];
        } else if (operators[i] === "-") {
            result -= numbers[i + 1];
        }
    }

    return result;
}

// Clear everything
function clearCalculator() {
    expression = "";
    display.value = "";
    justCalculated = false;
}

// Delete the last character
function deleteLastCharacter() {
    if (display.value === "Error" || justCalculated) {
        clearCalculator();
        return;
    }

    expression = expression.slice(0, -1);
    display.value = expression;
}

// Connect buttons
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value !== undefined) {
            if (value === ".") {
                inputDecimal();
            } else if (["+", "-", "*", "/"].includes(value)) {
                chooseOperator(value);
            } else {
                inputNumber(value);
            }
        }

        if (action === "clear") {
            clearCalculator();
        } else if (action === "delete") {
            deleteLastCharacter();
        } else if (action === "calculate") {
            calculate();
        }
    });
});

// Keyboard support
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        inputNumber(key);
    } else if (key === ".") {
        inputDecimal();
    } else if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLastCharacter();
    } else if (key === "Escape") {
        clearCalculator();
    }
});
