import React from 'react';
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

const ClockContainer = styled.div`
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

const Clock = ({ is24HourFormat, visible }) => {
  const formatTime = (date) => {
    const hours = is24HourFormat ? date.getHours() : date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = is24HourFormat ? '' : date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} ${ampm}`;
  };

  const now = new Date();

  return (
    <ClockContainer visible={visible}>
      <TimeDisplay>{formatTime(now)}</TimeDisplay>
    </ClockContainer>
  );
};

export default Clock;
