

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('user-input');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';
    let result = '';

    const updateDisplay = (value) => {
        display.textContent = value;
    };

    const handleNumberClick = (value) => {
        currentInput += value;
        updateDisplay(currentInput || '0');
    };

    const handleOperatorClick = (op) => {
        if (currentInput === '' && op !== '=') return; // Prevents operator click with no input
        if (firstOperand !== '') {
            calculate(); // Perform calculation if there's already an operand
        }
        operator = op;
        firstOperand = currentInput;
        currentInput = '';
    };

    const calculate = () => {
        if (firstOperand === '' || currentInput === '') return;
        firstOperand = parseFloat(firstOperand);
        currentInput = parseFloat(currentInput);
        switch (operator) {
            case '+':
                result = firstOperand + currentInput;
                break;
            case '-':
                result = firstOperand - currentInput;
                break;
            case '*':
                result = firstOperand * currentInput;
                break;
            case '/':
                result = firstOperand / currentInput;
                break;
            case '%':
                result = firstOperand % currentInput;
                break;
            default:
                return;
        }
        updateDisplay(result);
        firstOperand = result;
        currentInput = '';
        operator = '';
    };

    const handleSpecialClick = (action) => {
        switch (action) {
            case 'AC':
                currentInput = '';
                firstOperand = '';
                operator = '';
                updateDisplay('0');
                break;
            case 'DEL':
                currentInput = currentInput.slice(0, -1);
                updateDisplay(currentInput || '0');
                break;
            case '.':
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                    updateDisplay(currentInput);
                }
                break;
        }
    };

    document.querySelectorAll('.numbers').forEach(button => {
        button.addEventListener('click', () => handleNumberClick(button.textContent));
    });

    document.querySelectorAll('.key-operate').forEach(button => {
        button.addEventListener('click', () => handleOperatorClick(button.textContent));
    });

    document.querySelectorAll('.key-others').forEach(button => {
        button.addEventListener('click', () => handleSpecialClick(button.textContent));
    });

    document.querySelector('.key-operate.operations').addEventListener('click', () => calculate());
});
