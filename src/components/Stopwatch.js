import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

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

const StopwatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${({ visible }) => (visible ? fadeIn : 'none')} 0.5s ease;
`;

const TimeDisplay = styled.div`
  font-size: 8em; /* Increased size */
  margin-bottom: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif;
  
  @media (max-width: 768px) {
    font-size: 6em; /* Increased size */
  }

  @media (max-width: 480px) {
    font-size: 4em; /* Increased size */
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

const LapList = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    margin-top: 15px;
    max-width: 300px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
    max-width: 200px;
  }
`;

const LapItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #444;

  &:first-child {
    border-top: 1px solid #444;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const LapTime = styled.span`
  color: ${({ best, worst }) => (best ? 'green' : worst ? 'red' : '#fff')};
`;

const Stopwatch = ({ visible }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    } else if (!running && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLapReset = () => {
    if (running) {
      setLaps([...laps, time]);
    } else {
      handleReset();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds},${centiseconds < 10 ? `0${centiseconds}` : centiseconds}`;
  };

  const bestLap = Math.min(...laps);
  const worstLap = Math.max(...laps);

  return (
    <StopwatchContainer visible={visible}>
      <TimeDisplay>{formatTime(time)}</TimeDisplay>
      <ButtonContainer>
        <Button onClick={handleStartStop} isStop={running}>{running ? 'Stop' : 'Start'}</Button>
        <Button onClick={handleLapReset}>{running ? 'Lap' : 'Reset'}</Button>
      </ButtonContainer>
      <LapList>
        {laps.map((lap, index) => (
          <LapItem key={index}>
            <span>Lap {index + 1}</span>
            <LapTime best={lap === bestLap} worst={lap === worstLap}>
              {formatTime(lap)}
            </LapTime>
          </LapItem>
        ))}
      </LapList>
    </StopwatchContainer>
  );
};

export default Stopwatch;
