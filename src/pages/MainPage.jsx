import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import MainTop from '../components/MainTop';
import MainMiddle from '../components/MainMiddle';
import MainBottom from '../components/MainBottom';
import Footer from '../components/Footer';

const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  background-attachment: scroll;
  width: 100%;
`;

function MainPage() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ko');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <PageWrapper>
      <Header onChangeLanguage={setLanguage} language={language} />
      <MainTop language={language} />
      <MainMiddle language={language} />
      <MainBottom language={language} />
      <Footer language={language} />
    </PageWrapper>
  );
}

export default MainPage;
