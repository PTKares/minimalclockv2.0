import React, { useState, useEffect } from 'react';
import Clock from './components/Clock';
import ClockWithoutSeconds from './components/ClockWithoutSeconds';
import Stopwatch from './components/Stopwatch';
import Pomodoro from './components/Pomodoro';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { FaExpand, FaCompress, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const darkTheme = {
  background: '#000000',
  text: '#ffffff',
  shadowHover: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))'
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s linear;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  position: relative;
  padding-top: 70px;

  @media (max-width: 768px) {
    padding: 50px 20px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 10px 10px;
  }
`;

const Navigation = styled.nav`
  position: fixed;
  top: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
    top: 25px;
  }

  @media (max-width: 480px) {
    gap: 5px;
    top: 20px;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.2em;
  transition: filter 0.3s ease, transform 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif;
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

const ControlPanel = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    bottom: 5px;
    right: 5px;
    font-size: 1em;
  }

  @media (max-width: 480px) {
    bottom: 2px;
    right: 2px;
    font-size: 0.8em;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.5em;
  transition: filter 0.3s ease, transform 0.3s ease;
  &:hover {
    filter: ${({ theme }) => theme.shadowHover};
    transform: scale(1.1);
  }
`;

const ClockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    margin-bottom: 5px;
  }
`;

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

const SelectorContainer = styled.div`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.5s ease;

  @media (max-width: 768px) {
    margin-top: 5px;
  }

  @media (max-width: 480px) {
    margin-top: 2px;
  }
`;

const SelectorText = styled.div`
  margin-bottom: 10px;
  font-size: 1em;
  font-weight: 600;

  @media (max-width: 768px) {
    margin-bottom: 5px;
  }

  @media (max-width: 480px) {
    margin-bottom: 2px;
    font-size: 0.8em;
  }
`;

const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 5px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 3px 6px;
  }

  @media (max-width: 480px) {
    padding: 2px 4px;
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

const FormatSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  font-size: 1em;

  @media (max-width: 768px) {
    gap: 5px;
    margin-top: 5px;
    font-size: 0.8em;
  }

  @media (max-width: 480px) {
    gap: 2px;
    margin-top: 2px;
    font-size: 0.6em;
  }
`;

const FormatButton = styled.button`
  background: none;
  border: none;
  color: ${({ selected, theme }) => (selected ? theme.text : theme.text + '80')};
  cursor: pointer;
  font-size: 1em;
  transition: filter 0.3s ease, transform 0.3s ease;
  &:hover {
    filter: ${({ theme }) => theme.shadowHover};
    transform: scale(1.1);
  }
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  &:focus {
    outline: none;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 20px;
  text-align: center;
  font-size: 1em;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }

  @media (max-width: 480px) {
    font-size: 0.6em;
  }
`;

const DateDisplay = styled.div`
  font-size: 1em;
  margin-top: 20px;
  font-weight: 600;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: 768px) {
    font-size: 0.8em;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    font-size: 0.6em;
    margin-top: 5px;
  }
`;

const App = () => {
  const [is24HourFormat, setIs24HourFormat] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [clockStyleIndex, setClockStyleIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [view, setView] = useState('clock');

  const clockStyles = ['Classic', 'Focus'];

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        setIsFullScreen(false);
      }
    };
    
    const handleActivity = () => {
      setShowControls(true);
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        setShowControls(false);
      }, 10000);
    };

    let activityTimeout = setTimeout(() => {
      setShowControls(false);
    }, 10000);

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keydown', handleActivity);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keydown', handleActivity);
    };
  }, []);

  const toggleHourFormat = () => {
    setVisible(false);
    setTimeout(() => {
      setIs24HourFormat(!is24HourFormat);
      setVisible(true);
    }, 500); // Tiempo de la transición
  };

  const toggleFullScreen = () => {
    const docElm = document.documentElement;
    if (!isFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const handlePreviousStyle = () => {
    setVisible(false);
    setTimeout(() => {
      setClockStyleIndex((prevIndex) => (prevIndex === 0 ? clockStyles.length - 1 : prevIndex - 1));
      setVisible(true);
    }, 500); // Tiempo de la transición
  };

  const handleNextStyle = () => {
    setVisible(false);
    setTimeout(() => {
      setClockStyleIndex((prevIndex) => (prevIndex === clockStyles.length - 1 ? 0 : prevIndex + 1));
      setVisible(true);
    }, 500); // Tiempo de la transición
  };

  const renderClock = () => {
    switch (clockStyles[clockStyleIndex]) {
      case 'Classic':
        return <Clock is24HourFormat={is24HourFormat} visible={visible} />;
      case 'Focus':
        return <ClockWithoutSeconds is24HourFormat={is24HourFormat} visible={visible} />;
      default:
        return <Clock is24HourFormat={is24HourFormat} visible={visible} />;
    }
  };

  const renderDate = () => {
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return now.toLocaleDateString('en-US', options);
  };

  const renderView = () => {
    switch (view) {
      case 'clock':
        return renderClock();
      case 'stopwatch':
        return <Stopwatch visible={visible} />;
      case 'pomodoro':
        return <Pomodoro visible={visible} />;
      default:
        return renderClock();
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppContainer>
        <Navigation>
          <NavButton onClick={() => setView('clock')}>Clock</NavButton>
          <NavButton onClick={() => setView('stopwatch')}>Stopwatch</NavButton>
          <NavButton onClick={() => setView('pomodoro')}>Pomodoro</NavButton>
        </Navigation>
        <ClockWrapper>
          {renderView()}
        </ClockWrapper>
        <SelectorContainer visible={showControls && view === 'clock'}>
          <SelectorText>Select your clock style</SelectorText>
          <SelectorWrapper>
            <SelectorButton onClick={handlePreviousStyle}>
              <FaAngleLeft />
            </SelectorButton>
            <SelectorDisplay>{clockStyles[clockStyleIndex]}</SelectorDisplay>
            <SelectorButton onClick={handleNextStyle}>
              <FaAngleRight />
            </SelectorButton>
          </SelectorWrapper>
          <FormatSelector>
            <FormatButton selected={is24HourFormat} onClick={toggleHourFormat}>24H</FormatButton>
            <FormatButton selected={!is24HourFormat} onClick={toggleHourFormat}>12H</FormatButton>
          </FormatSelector>
        </SelectorContainer>
        {!showControls && view === 'clock' && (
          <DateDisplay>{renderDate()}</DateDisplay>
        )}
        <ControlPanel>
          <IconButton onClick={toggleFullScreen}>
            {isFullScreen ? <FaCompress /> : <FaExpand />}
          </IconButton>
        </ControlPanel>
        <Footer>
          © 2024 DigiTimeHub
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
