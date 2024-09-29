import { PLUS, MINUS, MULTIPLY, DIVIDE } from "./consts.js";

export class Expression {
  left;
  operation;
  right;

  constructor(left, operation, right) {
    this.left = left;
    this.operation = operation;
    this.right = right;
  }
}

export function calc(expression) {
  const leftOperandValue = getOperandValue(expression.left);
  const rightOperandValue = getOperandValue(expression.right);

  if (expression.operation === PLUS) {
    return leftOperandValue + rightOperandValue;
  }

  if (expression.operation === MINUS) {
    return leftOperandValue - rightOperandValue;
  }

  if (expression.operation === MULTIPLY) {
    return leftOperandValue * rightOperandValue;
  }

  if (expression.operation === DIVIDE) {
    return leftOperandValue / rightOperandValue;
  }
}

function getOperandValue(operand) {
  if (typeof operand === "number") {
    return operand;
  }

  if (operand instanceof Expression) {
    return calc(operand);
  }
}
