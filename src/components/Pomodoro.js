import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

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
  font-size: 8em;
  margin-bottom: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif;
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.5s ease;

  @media (max-width: 768px) {
    font-size: 6em;
  }

  @media (max-width: 480px) {
    font-size: 4em;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }
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

  @media (max-width: 768px) {
    font-size: 1em;
    padding: 10px 20px;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
    padding: 5px 10px;
  }
`;

const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 5px 10px;
  border-radius: 20px;
  margin-bottom: 20px;
  margin-top: -20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 3px 6px;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    padding: 2px 4px;
    margin-bottom: 5px;
  }
`;

const SelectorButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.5em;
  transition: filter 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  &:hover {
    filter: ${({ theme }) => theme.shadowHover};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 1em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const SelectorDisplay = styled.div`
  font-size: 1em;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 20px;
  text-align: center;
  min-width: 80px;

  @media (max-width: 768px) {
    font-size: 0.8em;
    padding: 3px 6px;
    min-width: 60px;
  }

  @media (max-width: 480px) {
    font-size: 0.6em;
    padding: 2px 4px;
    min-width: 50px;
  }
`;

const Pomodoro = ({ visible }) => {
  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);
  const [modeIndex, setModeIndex] = useState(0); // 0: Pomodoro, 1: Short Break, 2: Long Break
  const [animationVisible, setAnimationVisible] = useState(true);

  const modes = ['Pomodoro', 'Short Break', 'Long Break'];
  const times = [1500, 300, 900]; // 25 min, 5 min, 15 min

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime > 0 ? prevTime - 1 : 0);
      }, 1000);
    } else if (!running && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  useEffect(() => {
    setTime(times[modeIndex]);
  }, [modeIndex]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(times[modeIndex]);
  };

  const handlePreviousMode = () => {
    setAnimationVisible(false);
    setTimeout(() => {
      setModeIndex(prevIndex => (prevIndex === 0 ? modes.length - 1 : prevIndex - 1));
      setAnimationVisible(true);
    }, 500); // Tiempo de la transición
  };

  const handleNextMode = () => {
    setAnimationVisible(false);
    setTimeout(() => {
      setModeIndex(prevIndex => (prevIndex === modes.length - 1 ? 0 : prevIndex + 1));
      setAnimationVisible(true);
    }, 500); // Tiempo de la transición
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <PomodoroContainer visible={visible}>
      <SelectorWrapper>
        <SelectorButton onClick={handlePreviousMode}>
          <FaAngleLeft />
        </SelectorButton>
        <SelectorDisplay>{modes[modeIndex]}</SelectorDisplay>
        <SelectorButton onClick={handleNextMode}>
          <FaAngleRight />
        </SelectorButton>
      </SelectorWrapper>
      <TimeDisplay visible={animationVisible}>{formatTime(time)}</TimeDisplay>
      <ButtonContainer>
        <Button onClick={handleStartStop} isStop={running}>{running ? 'Stop' : 'Start'}</Button>
        <Button onClick={handleReset}>Reset</Button>
      </ButtonContainer>
    </PomodoroContainer>
  );
};

export default Pomodoro;
