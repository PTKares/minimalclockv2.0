import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animaciones reutilizadas desde App.js
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const PomodoroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.5s ease;
`;

const TimeDisplay = styled.div`
  font-size: 6em;
  margin-bottom: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  background: ${({ isStop }) => (isStop ? 'red' : 'gray')};
  border: none;
  border-radius: 50px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.2em;
  padding: 15px 30px;
  transition: filter 0.3s ease, transform 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif;
  &:hover {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.5));
    transform: scale(1.1);
  }
`;

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px; /* Ajuste para mover los botones más arriba */
  margin-top: -80px; /* Ajuste para mover los botones más arriba */
`;

const SelectorButton = styled(Button)`
  background: gray;
  font-size: 1em;
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.2)' : 'gray')};
`;

const Pomodoro = ({ visible }) => {
  const [time, setTime] = useState(1500); // 25 minutes
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState('Pomodoro');
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (!running && time !== 0) {
      clearInterval(interval);
    }

    let titleText;
    if (time === 0) {
      titleText = "Time's up!";
    } else {
      const formattedTime = formatTime(time);
      if (mode === 'Pomodoro') {
        titleText = `${formattedTime} - Time to focus!`;
      } else {
        titleText = `${formattedTime} - Time for a break!`;
      }
    }
    document.title = titleText;

    return () => clearInterval(interval);
  }, [running, time, mode]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setRunning(false);
    setModeTime(mode);
  };

  const setModeTime = (mode) => {
    switch (mode) {
      case 'Pomodoro':
        setTime(1500);
        break;
      case 'Short Break':
        setTime(300);
        break;
      case 'Long Break':
        setTime(900);
        break;
      default:
        setTime(1500);
    }
  };

  const handleModeChange = (newMode) => {
    setAnimating(true);
    setRunning(false);
    setTimeout(() => {
      setMode(newMode);
      setModeTime(newMode);
      setAnimating(false);
    }, 500); // Tiempo de la animación
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <PomodoroContainer visible={!animating}>
      <SelectorContainer>
        <SelectorButton onClick={() => handleModeChange('Pomodoro')} active={mode === 'Pomodoro'}>Pomodoro</SelectorButton>
        <SelectorButton onClick={() => handleModeChange('Short Break')} active={mode === 'Short Break'}>Short Break</SelectorButton>
        <SelectorButton onClick={() => handleModeChange('Long Break')} active={mode === 'Long Break'}>Long Break</SelectorButton>
      </SelectorContainer>
      <TimeDisplay>{formatTime(time)}</TimeDisplay>
      <ButtonContainer>
        <Button onClick={handleStartStop} isStop={running}>{running ? 'Stop' : 'Start'}</Button>
        <Button onClick={handleReset}>Reset</Button>
      </ButtonContainer>
    </PomodoroContainer>
  );
};

export default Pomodoro;
