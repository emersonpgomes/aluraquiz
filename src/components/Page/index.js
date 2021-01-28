import Head from 'next/head';
import React from 'react';
import db from '../../../db.json';
import Footer from '../Footer';
import GitHubCorner from '../GitHubCorner';
import QuizBackground from '../QuizBackground';
import QuizContainer from '../QuizContainer';
import QuizLogo from '../QuizLogo';

export default function Page({ children }) {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Quiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        {children}
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/emersonpgomes/aluraquiz" />
    </QuizBackground>
  );
}
