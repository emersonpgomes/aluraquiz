import { useRouter } from 'next/router';
import React, { useState } from 'react';
import db from '../db.json';
import Page from '../src/components/Page';
import Widget from '../src/components/Widget';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export default function Home() {
  const [nome, setNome] = useState('');
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/quiz?nome=${nome}`);
  }

  function handleChange(event) {
    setNome(event.target.value);
  }

  return (
    <Page>
      <Widget>
        <Widget.Header>
          <h1>{db.title}</h1>
        </Widget.Header>
        <Widget.Content>
          <p>{db.description}</p>
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange} />
            <button type="submit" disabled={nome.length === 0}>Jogar</button>
          </form>
        </Widget.Content>
      </Widget>
      <Widget>
        <Widget.Content>
          <h1>Quizes da Galera</h1>

          <p>lorem ipsum dolor sit amet...</p>
        </Widget.Content>
      </Widget>
    </Page>
  );
}
