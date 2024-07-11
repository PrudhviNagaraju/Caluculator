const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = null;
let previousInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      clearDisplay();
    } else if (value === '=') {
      calculateResult();
    } else if (['+', '-', '*', '/'].includes(value)) {
      handleOperator(value);
    } else {
      handleNumber(value);
    }
  });
});

function handleNumber(value) {
  currentInput += value;
  display.textContent = currentInput;
}

function handleOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculateResult();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculateResult() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  display.textContent = currentInput;
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = null;
  display.textContent = '';
}
