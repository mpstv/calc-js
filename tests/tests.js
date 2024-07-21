import { parse } from "../src/parse.js";
import { calc } from "../src/calc.js";

function check(stringExpression, expectedResult) {
  calc(parse(stringExpression)) === expectedResult
    ? console.log("\x1b[32mPassed")
    : console.log("\x1b[31mFail");
}

check("6-2", 4);
check("2+6-2", 6);
check("1+2+3+4-10", 0);
check("6+2*3", 12);
check("2*3+6", 12);
check("2*(3+6)", 18);
check("1+(3+6)*2", 19);
check("150+(33+67)*10", 1150);
check("150-(33+67)*10", -850);
check("2+1*2-(2-1)+4", 7);
check("2+1*2-(2-1)+4/2", 5);
check("(2+3)*(10-5)", 25);
check("((2+3)*(10-5))", 25);
