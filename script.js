const calculatorDisplay = document.querySelector('input'); 

let firstNumber = '';
let secondNumber = '';
let operationSelected = '';
let memoryNumber = '';

document.querySelectorAll('.number')
.forEach(numberButton => numberButton.addEventListener('click', setNumber));

document.querySelectorAll('.operation')
.forEach(operationButton => operationButton.addEventListener('click', operationAssigned));

document.querySelectorAll('.memory')
.forEach(memoryButton => memoryButton.addEventListener('click', memoryCall));

document.querySelector('.equal')
.addEventListener('click', () => {
    if (firstNumber && operationSelected && secondNumber) {
        const result = calculate();
        firstNumber = result;
        secondNumber = '';
        calculatorDisplay.value = result; 
    } 
});

document.querySelector('.decimal')
.addEventListener('click', decimalCheck);

function setNumber(e) {
    let numberSelection = e.target.value;

    if (operationSelected) {
        secondNumber += numberSelection;
        calculatorDisplay.value = '';
        calculatorDisplay.value = secondNumber;
    } else {
        firstNumber += numberSelection;
        calculatorDisplay.value = firstNumber;
    }
};

function operationAssigned(e) {
    if (firstNumber && !secondNumber) {
        operationSelected = e.target.textContent;
    } else if (firstNumber && operationSelected && secondNumber ) {
        const result = calculate();
        firstNumber = result;
        secondNumber = '';
        calculatorDisplay.value = result; 
        operationSelected = e.target.textContent;
    } 
}

function decimalCheck() {
    if (!operationSelected && noDecimal(firstNumber)) {
        firstNumber += '.';
        calculatorDisplay.value = firstNumber;
        return; 
    } 
    
    if (noDecimal(secondNumber) && operationSelected !== '') {
        secondNumber += '.';
        calculatorDisplay.value = secondNumber;
        return; 
    }
}

function noDecimal(numberString) {
    return numberString.indexOf('.') === -1;
}

 
function memoryCall(e) {
    memoryButton = e.target.value;
    switch (memoryButton) {
        case 'M+':
            memoryNumber = document.querySelector('input').value;
            break;
        case 'M-':
            memoryNumber = '';
            break;
        case 'MR':
            if (!firstNumber) {
                firstNumber += memoryNumber; 
                calculatorDisplay.value = firstNumber; 
                return; 
            }
            if (!secondNumber && operationSelected) {
                secondNumber += memoryNumber; 
                calculatorDisplay.value = secondNumber; 
                return; 
            }
        return; 
    }
}

function calculate() {
    switch (operationSelected) {
        case 'X':
            return multiply();
        case '/':
            return divide();
        case '+':
            return add();
        case '-':
            return subtract();
    }
}

function add() {
    return `${Number(firstNumber) + Number(secondNumber)}`; 
}

function subtract() {
    return `${Number(firstNumber) - Number(secondNumber)}`; 
}

function multiply() {
    return `${Number(firstNumber) * Number(secondNumber)}`; 
}

function divide() {
    return `${Number(firstNumber) / Number(secondNumber)}`; 
}

document.querySelector('.clear')
.addEventListener('click', () => {
    document.querySelector('input').value = '';
    firstNumber = '';
    secondNumber = '';
    operationSelected = '';
});