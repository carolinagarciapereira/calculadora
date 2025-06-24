"use client";

import { useState } from "react";
import "./styles.css";

export default function MathTool() {
  const [valorAtual, definirValorAtual] = useState("0");
  const [valorAnterior, definirValorAnterior] = useState(null);
  const [sinal, definirSinal] = useState(null);
  const [saida, definirSaida] = useState(null);

  const inserirNumero = (digito) => {
    if (saida !== null) {
      definirValorAtual(digito);
      definirSaida(null);
      return;
    }
    definirValorAtual((ant) => (ant === "0" ? digito : ant + digito));
  };

  const escolherSinal = (op) => {
    if (valorAtual === "") return;
    definirValorAnterior(valorAtual);
    definirValorAtual("0");
    definirSinal(op);
  };

  const executarCalculo = () => {
    if (!valorAnterior || !sinal) return;

    const prev = parseFloat(valorAnterior);
    const curr = parseFloat(valorAtual);
    let result;

    switch (sinal) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = curr !== 0 ? prev / curr : NaN;
        break;
      default:
        return;
    }

    definirSaida(result.toString());
    definirValorAtual(result.toString());
    definirValorAnterior(null);
    definirSinal(null);
  };

  const resetar = () => {
    definirValorAtual("0");
    definirValorAnterior(null);
    definirSinal(null);
    definirSaida(null);
  };

  return (
    <div className="math-box">
      <div className="screen">{saida ?? valorAtual}</div>
      <div className="keypad">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", "AC", "=", "+"].map(
          (tecla) => (
            <button
              key={tecla}
              onClick={() => {
                if (tecla === "AC") resetar();
                else if (tecla === "=") executarCalculo();
                else if (["+", "-", "*", "/"].includes(tecla)) escolherSinal(tecla);
                else inserirNumero(tecla);
              }}
            >
              {tecla}
            </button>
          )
        )}
      </div>
    </div>
  );
}