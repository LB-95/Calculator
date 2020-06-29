const calculator ={
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay(){
    const display = document.querySelector('#display');
    display.value = calculator.displayValue;
}
updateDisplay();

function inputDigit(digit){
    const {displayValue, waitingForSecondOperand}=calculator;
    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }else{
    calculator.displayValue = displayValue === '0'? digit : displayValue+digit;
}
console.log(calculator);
}
function inputDecimal(dot) {
    if(calculator.waitingForSecondOperand === true) return;
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }
  function handleOperator(nextOperator){
      const {firstOperand, displayValue, operator} = calculator;
      const inputValue = parseFloat(displayValue);

      if(operator && calculator.waitingForSecondOperand){
          calculator.operator = nextOperator;
          console.log(calculator);
          return;
      }
      if(firstOperand == null){
          calculator.firstOperand = inputValue;
      }else if(operator){
          const currentValue = firstOperand || 0;
          const result = performCalculation[operator](firstOperand, inputValue);

          calculator.displayValue = String(result);
          calculator.firstOperand = result;
      }
      calculator.waitingForSecondOperand = true;
      calculator.operator = nextOperator
      console.log(calculator);
  }
  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };
  function resetCalculator(){
      calculator.displayValue = '0';
      calculator.firstOperand = null;
      calculator.waitingForSecondOperand = false;
      calculator.operator = null;
      console.log(calculator);
  }
const keys = document.querySelector('#button-container');
keys.addEventListener('click',(e)=>{
    const target = e.target;
    if(!target.matches('button')){
        return;
    }
    if(target.classList.contains('operator')){
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    
    
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    
    if (target.classList.contains('clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }
    if (target.classList.contains('backspace')) {
        console.log('back', target.value);
        return;
    }
    inputDigit(target.value);
    updateDisplay();
});
