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

const StopwatchContainer = styled.div`
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

const LapsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const Lap = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  margin: 5px 0;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: ${({ isFastest, isSlowest }) => (isFastest ? 'green' : isSlowest ? 'red' : '#ffffff')};
  border-bottom: 1px solid #ffffff;
  padding-bottom: 5px;
`;

const LapNumber = styled.div`
  text-align: left;
`;

const LapTime = styled.div`
  text-align: right;
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
      }, 10); // Cambiado a milisegundos
    } else if (!running && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleLapReset = () => {
    if (running) {
      setLaps([...laps, time]);
    } else {
      setTime(0);
      setLaps([]);
    }
  };

  const formatTime = (time) => {
    const getMilliseconds = `00${time % 100}`.slice(-2);
    const seconds = Math.floor(time / 100);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds},${getMilliseconds}`;
  };

  const fastestLap = Math.min(...laps);
  const slowestLap = Math.max(...laps);

  return (
    <StopwatchContainer visible={visible}>
      <TimeDisplay>{formatTime(time)}</TimeDisplay>
      <ButtonContainer>
        <Button onClick={handleStartStop} isStop={running}>{running ? 'Stop' : 'Start'}</Button>
        <Button onClick={handleLapReset}>{running ? 'Lap' : 'Reset'}</Button>
      </ButtonContainer>
      <LapsContainer>
        {laps.map((lap, index) => (
          <Lap
            key={index}
            isFastest={lap === fastestLap}
            isSlowest={lap === slowestLap}
          >
            <LapNumber>Lap {index + 1}</LapNumber>
            <LapTime>{formatTime(lap)}</LapTime>
          </Lap>
        ))}
      </LapsContainer>
    </StopwatchContainer>
  );
};

export default Stopwatch;
