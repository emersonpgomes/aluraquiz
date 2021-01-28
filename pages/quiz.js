import React, { useState } from 'react';
import db from '../db.json';
import Page from '../src/components/Page';
import Widget from '../src/components/Widget';

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];

  return (
    <Page>
      <Widget>
        <Widget.Header>
          Pergunta 1 de 1
        </Widget.Header>
        <Widget.Content>
          <form>
            <h1>{question.title}</h1>
            <p>{question.description}</p>
            <ul>
              {question.alternatives.map((alternative) => <li>{alternative}</li>)}
            </ul>
            <button type="submit">Confirmar</button>
          </form>
        </Widget.Content>
      </Widget>
    </Page>
  );
}
