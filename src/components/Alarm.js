import React, { useState, useEffect } from 'react';

function Alarm() {
  const [time, setTime] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      setTime(now);
      if (now === alarmTime) {
        setMessage('¡Alarma!');
      } else {
        setMessage('');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [alarmTime]);

  return (
    <div>
      <h2>Alarma</h2>
      <div>Current Time: {time}</div>
      <input
        type="time"
        value={alarmTime}
        onChange={e => setAlarmTime(e.target.value)}
      />
      <div>{message}</div>
    </div>
  );
}

export default Alarm;
