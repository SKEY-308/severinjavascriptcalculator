"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [response, setResponse] = useState("");
  const [expression, setExpression] = useState("");
  const extrim = expression.trim();

  const isOperator = (symb) => {
    return /[*/+-]/.test(symb);
  };

  const onPress = (symb) => {
    if (symb === "clear") {
      setResponse("");
      setExpression("0");
    } else if (isOperator(symb)) {
      setExpression(extrim + " " + symb + " ");
    } else if (symb === "=") {
      calc();
    } else if (symb === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symb);
      }
    } else if (symb === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symb);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symb);
      } else {
        setExpression(expression + symb);
      }
    }
  };

  const calc = () => {
    if (isOperator(extrim.charAt(extrim.length - 1))) return;

    const parts = extrim.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setResponse(eval(response + newExpression));
    } else {
      setResponse(eval(newExpression));
    }
    setExpression("");
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="row justify-content-center">
              <div className="card bg-secondary" id="sool">
                <div className="card-body  text-white text-end px-6">
                  <div className="fs-1 fw-semibold" id="display">
                    <div id="response">{response}</div>
                    <div id="expression">{expression}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row gap-0" id="calculator">
              <button
                className="btn fs-3 col-3 fw-semibold"
                type="button"
                id="clear"
                onClick={() => onPress("clear")}
              >
                C
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="nine"
                onClick={() => onPress("9")}
              >
                9
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="eight"
                onClick={() => onPress("8")}
              >
                8
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="divide"
                onClick={() => onPress("/")}
              >
                /
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="seven"
                onClick={() => onPress("7")}
              >
                7
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="six"
                onClick={() => onPress("6")}
              >
                6
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="five"
                onClick={() => onPress("5")}
              >
                5
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="multiply"
                onClick={() => onPress("*")}
              >
                *
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="four"
                onClick={() => onPress("4")}
              >
                4
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="three"
                onClick={() => onPress("3")}
              >
                3
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="two"
                onClick={() => onPress("2")}
              >
                2
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="subtract"
                onClick={() => onPress("-")}
              >
                -
              </button>
              <button
                className="btn btn-light fs-3 col-3 fw-semibold"
                type="button"
                id="one"
                onClick={() => onPress("1")}
              >
                1
              </button>
              <button
                className="btn btn-light fs-3 col-2 fw-semibold"
                type="button"
                id="zero"
                onClick={() => onPress("0")}
              >
                0
              </button>
              <button
                className="btn btn-light fs-3 col-2 fw-semibold"
                type="button"
                id="decimal"
                onClick={() => onPress(".")}
              >
                .
              </button>
              <button
                className="btn btn-light fs-3 col-2 fw-semibold"
                type="button"
                id="add"
                onClick={() => onPress("+")}
              >
                +
              </button>
              <button
                className="btn btn-primary fs-3 col-3 fw-semibold"
                type="button"
                id="equals"
                onClick={() => onPress("=")}
              >
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
