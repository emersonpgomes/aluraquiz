import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  padding: 4px 0;
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &[data-selecionado='true'] {
    background-color: ${({ theme }) => theme.colors.primary};

    &[data-status='SUCESSO'] {
      background-color: ${({ theme }) => theme.colors.success};
    }

    &[data-status='ERRO'] {
      background-color: ${({ theme }) => theme.colors.wrong};
    }
  }
`;

export default function Question({ question, onSubmit }) {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState();
  const temOpcaoSelecionada = opcaoSelecionada !== undefined;
  const [respostaConfirmada, setRespostaConfirmada] = useState(false);
  const [timer, setTimer] = useState(2);
  const timeoutID = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    setRespostaConfirmada(true);
  }

  useEffect(() => {
    if (respostaConfirmada) {
      timeoutID.current = setTimeout(() => {
        if (timer === 1) {
          const isRespostaCorreta = opcaoSelecionada === question.answer;
          clearTimeout(timeoutID.current);
          onSubmit(isRespostaCorreta);
        } else {
          setTimer((oldTimer) => oldTimer - 1);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutID.current);
    };
  }, [respostaConfirmada, timer]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>{question.title}</h1>
      <p>{question.description}</p>
      {question.alternatives.map((alternative, index) => {
        const alternativeId = `alternative_${index}`;
        const isCorreto = index === question.answer;
        const isSelecionado = index === opcaoSelecionada;

        return (
          <Label
            key={`${alternativeId}`}
            htmlFor={alternativeId}
            data-selecionado={isSelecionado}
            data-status={
              respostaConfirmada && `${isCorreto ? 'SUCESSO' : 'ERRO'}`
            }
          >
            <input
              name="resposta"
              disabled={respostaConfirmada}
              type="radio"
              id={alternativeId}
              onChange={() => setOpcaoSelecionada(index)}
            />
            {' '}
            {alternative}
          </Label>
        );
      })}
      <button
        disabled={!temOpcaoSelecionada || respostaConfirmada}
        type="submit"
      >
        Confirmar
      </button>
      {respostaConfirmada && (
        <span>
          {timer}
          ...
        </span>
      )}
    </form>
  );
}
