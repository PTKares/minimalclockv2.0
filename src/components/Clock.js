import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
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

const ClockContainer = styled.div`
  font-size: 8em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 5em;
  }

  @media (max-width: 480px) {
    font-size: 3em;
  }
`;

const TimeText = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.5s ease-in-out;
  white-space: nowrap;
`;

const AmPm = styled.span`
  font-size: 0.2em;
  margin-left: 0.2em;
  align-self: flex-end;
`;

const Clock = ({ is24HourFormat, visible }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    let amPm = '';

    if (!is24HourFormat) {
      amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
    }

    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return { hours, minutes, seconds, amPm };
  };

  const { hours, minutes, seconds, amPm } = formatTime(time);

  return (
    <ClockContainer>
      <TimeText visible={visible}>
        {hours}:{minutes}:{seconds}
        {!is24HourFormat && <AmPm>{amPm}</AmPm>}
      </TimeText>
    </ClockContainer>
  );
};

export default Clock;
