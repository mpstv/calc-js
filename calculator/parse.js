import {
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  OPEN_BRACKETS,
  CLOSE_BRACKETS,
} from "./consts.js";
import { Expression } from "./calc.js";

export function parse(inputString) {
  inputString = removeOuterBracketsIfNeed(inputString);
  const [variableMap, inputWihoutBrackets] = bracketsToVariables(inputString);

  const lowPriorityOperationIndex =
    operationIndex(inputWihoutBrackets, [PLUS, MINUS]) ??
    operationIndex(inputWihoutBrackets, [DIVIDE, MULTIPLY]);

  if (lowPriorityOperationIndex) {
    const { left, operation, right } = splitStringByOperationIndex(
      inputWihoutBrackets,
      lowPriorityOperationIndex,
    );

    return new Expression(
      parse(variablesToBrackets(left, variableMap)),
      operation,
      parse(variablesToBrackets(right, variableMap)),
    );
  }

  return Number(inputString);
}

function removeOuterBracketsIfNeed(inputString) {
  const outherBracketsExist = (inputString) => {
    if (inputString[0] === OPEN_BRACKETS) {
      let bracketsCount = 1;

      for (let i = 1; i < inputString.length - 1; i++) {
        if (inputString[i] === OPEN_BRACKETS) {
          bracketsCount += 1;
        }

        if (inputString[i] === CLOSE_BRACKETS) {
          bracketsCount -= 1;
        }

        if (bracketsCount === 0) {
          return false;
        }
      }

      return true;
    }

    return false;
  };

  if (outherBracketsExist(inputString)) {
    inputString = inputString.substring(1, inputString.length - 1);
  }

  return inputString;
}

function bracketsToVariables(inputString) {
  const variableMap = new Map();
  let inputWithVariables = inputString;

  let openedBracketsIndex = 0;
  let bracketsOpenedCount = 0;
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === OPEN_BRACKETS) {
      if (bracketsOpenedCount === 0) {
        openedBracketsIndex = i;
      }

      bracketsOpenedCount += 1;
    }

    if (inputString[i] === CLOSE_BRACKETS) {
      if (bracketsOpenedCount === 1) {
        const variable = `p${variableMap.size}`;
        const content = inputString.substring(openedBracketsIndex, i + 1);
        variableMap.set(variable, content);
        inputWithVariables = inputWithVariables.replace(content, variable);
      }

      bracketsOpenedCount -= 1;
    }
  }

  return [variableMap, inputWithVariables];
}

function operationIndex(inputString, operations) {
  for (let i = inputString.length - 1; i >= 0; i--) {
    if (operations.includes(inputString[i])) {
      return i;
    }
  }

  return null;
}

function splitStringByOperationIndex(inputString, operationIndex) {
  const left = inputString.substring(0, operationIndex);
  const operation = inputString[operationIndex];
  const right = inputString.substring(operationIndex + 1);

  return { left, operation, right };
}

function variablesToBrackets(inputWithoutBrackets, variableMap) {
  let inputWithBrackets = inputWithoutBrackets;

  variableMap.forEach((content, variable) => {
    inputWithBrackets = inputWithBrackets.replace(variable, content);
  });

  return inputWithBrackets;
}
