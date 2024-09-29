import { parse } from "./calculator/parse.js";
import { calc } from "./calculator/calc.js";

const equal = "=";
const clear = "C";
const clearEntity = "CE";

window.onload = () => {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".buttons > button");

  const scrollDisplayToBottom = () => {
    display.scrollTo({ top: display.scrollHeight });
  };

  let expressionContainer = null;

  buttons.forEach((button) => {
    button.onclick = () => {
      const operation = button.getAttribute("data-val");

      if (operation === clear) {
        expressionContainer = null;
        display.innerHTML = null;
        return;
      }

      if (operation === equal) {
        if (expressionContainer) {
          passResultOfCalculation(expressionContainer);
          expressionContainer = null;

          scrollDisplayToBottom();
        }

        return;
      }

      if (operation === clearEntity) {
        if (expressionContainer) {
          clearLastSymbol(expressionContainer);

          if (containIsEmptyText(expressionContainer)) {
            expressionContainer = null;
          }
        }

        return;
      }

      if (expressionContainer === null) {
        expressionContainer = getNextContainer(expressionContainer, display);
      }

      expressionContainer.textContent += operation;
      scrollDisplayToBottom();
    };
  });

  document.onkeyup = (event) => {
    let key = event.key;

    if (key === "Enter") {
      key = equal;
    }

    if (key === "Backspace") {
      key = clearEntity;
    }

    const calculatorButton = document.querySelector(`[data-val="${key}"]`);

    if (calculatorButton) {
      calculatorButton.click();
      calculatorButton.focus();
    }
  };
};

function getNextContainer(expressionContainer, display) {
  expressionContainer = document.createElement("p");
  display.appendChild(expressionContainer);

  return expressionContainer;
}

function containIsEmptyText(expressionContainer) {
  return !expressionContainer.textContent;
}

function clearLastSymbol(expressionContainer) {
  expressionContainer.textContent = expressionContainer.textContent.slice(
    0,
    expressionContainer.textContent.length - 1
  );
}

function passResultOfCalculation(expressionContainer) {
  expressionContainer.textContent += ` ${equal} ${calc(
    parse(expressionContainer.textContent)
  )}`;
}
