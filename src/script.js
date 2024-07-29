document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("calculatorInput");
    const numberButtons = document.querySelectorAll(".numbers button");
    const operationButtons = document.querySelectorAll(".operations button");
    const allButtons = document.querySelectorAll("button");
    const clearButton = document.getElementById("btAc");
  
    let firstOperand = null;
    let secondOperand = null;
    let currentOperation = null;
    let shouldResetInput = false;
  
    clearButton.addEventListener("click", () => {
      clearAll();
    });
  
    numberButtons.forEach((button) => {
      button.addEventListener("click", () => {
        addDigit(button.textContent);
      });
    });
  
    operationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.id === "btEq") {
          if (currentOperation && firstOperand !== null) {
            secondOperand = parseFloat(inputField.value);
            firstOperand = performOperation(firstOperand, secondOperand, currentOperation);
            inputField.value = firstOperand;
            resetStates();
          }
        } else {
          // Color inversion
          operationButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
  
          if (firstOperand === null) {
            firstOperand = parseFloat(inputField.value);
          } else if (currentOperation) {
            secondOperand = parseFloat(inputField.value);
            firstOperand = performOperation(firstOperand, secondOperand, currentOperation);
            inputField.value = firstOperand;
          }
  
          currentOperation = button.id;
          shouldResetInput = true;
        }
      });
    });
  
    allButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove 'active' class from operation buttons when any button is clicked
        if (!button.closest(".operations")) {
          operationButtons.forEach((btn) => btn.classList.remove("active"));
        }
      });
    });
  
    function clearInput() {
      inputField.value = "";
    }
  
    function clearAll() {
      clearInput();
      firstOperand = null;
      secondOperand = null;
      currentOperation = null;
      shouldResetInput = false;
    }
  
    function resetStates() {
      secondOperand = null;
      currentOperation = null;
      shouldResetInput = true;
    }
  
    function addDigit(digitOrDot) {
      if (shouldResetInput) {
        inputField.value = "";
        shouldResetInput = false;
      }
  
      if (digitOrDot === "." && inputField.value.includes(".")) {
        return; // Prevent adding another dot if one already exists
      }
      if (inputField.value.length < 9) {
        inputField.value += digitOrDot;
      }
    }
  
    function performOperation(op1, op2, operation) {
      switch (operation) {
        case "btDiv":
          if (op2 === 0) {
            clearAll();
            alert("Cannot divide by zero");
            return 0;
          }
          return op1 / op2;
        case "btTimes":
          return op1 * op2;
        case "btMin":
          return op1 - op2;
        case "btPlus":
          return op1 + op2;
        default:
          return op1;
      }
    }
  });
  