import React, { useState } from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Page from '../src/components/Page';
import Widget from '../src/components/Widget';

const Label = styled.label`
  display: block;
  padding: 4px 0;
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${(props) => props.selecionado
    && `
    background-color: rgba(255,255,255,0.3);
  `}
`;

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];
  const questionId = `question_${questionIndex}`;
  const [alternativaSelecionada, setAlternativaSelecionada] = useState();
  const [resposta, setResposta] = useState();
  const totalDeQuestoes = db.questions.length;

  function handleInputChange(e) {
    setAlternativaSelecionada(Number(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setResposta(alternativaSelecionada);
  }

  function handleNextClick() {
    const proximaQuestao = questionIndex + 1;

    if (proximaQuestao < totalDeQuestoes) {
      setQuestionIndex(questionIndex + 1);
      setAlternativaSelecionada(undefined);
      setResposta(undefined);
    }
  }

  return (
    <Page>
      <Widget>
        <Widget.Header>
          {`Pergunta ${questionIndex + 1} de ${totalDeQuestoes}`}
        </Widget.Header>
        <Widget.Content>
          {resposta >= 0 && (
            <div>
              {`Resposta: ${
                resposta === question.answer ? 'Correta' : 'Errada'
              }`}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <h1>{question.title}</h1>
            <p>{question.description}</p>
            {question.alternatives.map((alternative, index) => {
              const alternativeId = `alternative_${index}`;

              return (
                <Label
                  key={`${questionId}-${alternativeId}`}
                  htmlFor={alternativeId}
                  selecionado={alternativaSelecionada === index}
                >
                  <input
                    disabled={resposta >= 0}
                    name={questionId}
                    type="radio"
                    id={alternativeId}
                    onChange={handleInputChange}
                    value={index}
                  />
                  {' '}
                  {alternative}
                </Label>
              );
            })}
            {resposta >= 0 ? (
              <button type="button" onClick={handleNextClick}>
                Próximo
              </button>
            ) : (
              <button
                disabled={alternativaSelecionada === undefined}
                type="submit"
              >
                Confirmar
              </button>
            )}
          </form>
        </Widget.Content>
      </Widget>
    </Page>
  );
}
