import React from 'react';

export default function Result({ resultados }) {
  const total = resultados.length;
  const quantidade = resultados.filter((r) => r).length;

  return (
    <div>
      <div>
        {`Você acertou ${quantidade} de ${total} questões.`}
      </div>
      <ul>
        {resultados.map((resultado, index) => {
          const key = `resultado_${index}`;
          return (
            <li key={key}>
              {`#${index + 1}`}
              {' '}
              {resultado ? 'Acertou' : 'Errou'}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
