import readline from "node:readline";
import { parse } from "./src/parse.js";
import { calc } from "./src/calc.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

askExpressionToCalculate();

function askExpressionToCalculate() {
  rl.question(`Enter expression:\n`, (expressionString) => {
    console.log(`${calc(parse(expressionString))}`);
    askExpressionToCalculate();
  });
}
