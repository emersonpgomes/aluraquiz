import React, { useEffect, useState } from 'react';
import db from '../db.json';
import Page from '../src/components/Page';
import Question from '../src/components/Question';
import Result from '../src/components/Result';
import Widget from '../src/components/Widget';

const TELAS = {
  CARREGANDO: 1,
  QUIZ: 2,
  RESULTADO: 3,
};

export default function Quiz() {
  const [telaAtual, setTelaAtual] = useState(TELAS.CARREGANDO);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [resultados, setResultados] = useState([]);
  const question = db.questions[questionIndex];
  const totalDeQuestoes = db.questions.length;

  function handleResultadoDaQuestao(resultado) {
    const proximaQuestao = questionIndex + 1;

    setResultados((resultadosAnteriores) => [
      ...resultadosAnteriores,
      resultado,
    ]);

    if (proximaQuestao < totalDeQuestoes) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setTelaAtual(TELAS.RESULTADO);
    }
  }

  useEffect(() => {
    setTimeout(() => setTelaAtual(TELAS.QUIZ), 1 * 1000);
  }, []);

  return (
    <Page>
      <Widget>
        <Widget.Header>
          {`Pergunta ${questionIndex + 1} de ${totalDeQuestoes}`}
        </Widget.Header>
        <Widget.Content>
          {telaAtual === TELAS.CARREGANDO && <div>Carregando...</div>}
          {telaAtual === TELAS.QUIZ && (
            <Question
              key={questionIndex}
              question={question}
              onSubmit={handleResultadoDaQuestao}
            />
          )}
          {telaAtual === TELAS.RESULTADO && <Result resultados={resultados} />}
        </Widget.Content>
      </Widget>
    </Page>
  );
}
