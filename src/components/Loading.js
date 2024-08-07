import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const lightSweep = keyframes`
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 2em;
  flex-direction: column;
`;

const Spinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.1);
  border-top: 8px solid #fff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const Text = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.5em;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.5) 100%);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeIn} 1s forwards, ${lightSweep} 2s linear infinite;
`;

const Loading = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000); // Mostrar el texto después de 2 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContainer>
      {!showText ? <Spinner /> : <Text>Here we go!</Text>}
    </LoadingContainer>
  );
};

export default Loading;
