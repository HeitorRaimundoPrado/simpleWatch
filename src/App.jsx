import { useState, useEffect, useContext, createContext, useCallback } from 'react'
import './App.css'

const themeContext = createContext('light');

const CountDown = () => {
  const theme = useContext(themeContext);

  const [timeoutRef, setTimeoutRef] = useState(null)
  const [value, setValue] = useState(0);
  const [valStr, setValStr] = useState('');

  const handleOneSec = () => {
    if (value <= 0) {
      return;
    }

    setValue(value - 1);
    setTimeoutRef(setTimeout(handleOneSec, 1000));
  }

  useEffect(() => {
    if (timeoutRef !== null) {
      clearTimeout(timeoutRef);
    }

    setTimeoutRef(setTimeout(handleOneSec, 1000));
  }, [value])

  return (
    <>
      <div className={"watch watch-" + theme}>
        <div>{Math.floor(value / 60)}</div>: <div>{value % 60}</div>
      </div>
      <div className={"countdown-input countdown-input-" + theme}>
        <input className={"input-" + theme} type="text" placeholder="Countdown time in seconds" value={valStr} onChange={(e) => {setValStr(e.target.value)}}/>
        <button className={"button-" + theme} onClick={() => {setValue(parseInt(valStr)); setValStr('')}}>Set Countdown</button>
      </div>
    </>
  )
}

const StopWatch = () => {
  const [value, setValue] = useState(0);
  const [timeoutRef, setTimeoutRef] = useState(null);
  const [active, setActive] = useState(false);

  const theme = useContext(themeContext);

  const handleOneSec = () => {
    setValue(prevValue => prevValue + 1);
    setTimeoutRef(setTimeout(handleOneSec, 1000));
    console.log(value)
  }

  const handleInitStopwatch = () => {
    if (active === false) {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef);
      }

      setTimeoutRef(setTimeout(handleOneSec, 1000));
      setActive(true);
    }

    else {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef)
      }

      setActive(false);
    }
  }

  const handleResetStopwatch = () => {
    if (timeoutRef !== null) {
      clearTimeout(timeoutRef);
    }

    setActive(false);
    setValue(0);
  }

  return (
    <>
      <button className={"stopwatch stopwatch-" + theme} onClick={handleInitStopwatch}>
        <div className={"watch watch-" + theme}>
          <div>{Math.floor(value / 60)}</div>: <div>{value % 60}</div>
        </div>
      </button>

      <button className={"reset-stopwatch-button button button-" + theme} onClick={handleResetStopwatch}>Reset Stopwatch</button>
    </>
  );
}

const ChessClock = () => {
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [timeoutRef, setTimeoutRef] = useState(null);
  const [active, setActive] = useState(false);
  const [firstValueActive, setFirstValueActive] = useState(null);
  const [firstClockStr, setFirstClockStr] = useState(null);
  const [secondClockStr, setSecondClockStr] = useState(null);

  const theme = useContext(themeContext);

  const handleOneSec = () => {
    if (firstValue <= 0 || secondValue <= 0) {
      clearTimeout(timeoutRef);
      return;
    } 

    if (firstValueActive) {
      setFirstValue(prevValue => {
        if (prevValue <= 0) {
          clearTimeout(timeoutRef);
          return 0;
        }

        return prevValue - 1
      });

      setTimeoutRef(setTimeout(handleOneSec, 1000));
    }

    else {
      setSecondValue(prevValue => {
        if (prevValue <= 0) {
          clearTimeout(timeoutRef);
          return 0;
        }
        return prevValue - 1
      });
      setTimeoutRef(setTimeout(handleOneSec, 1000));
    }
  }

  const handleSetClocks = () => {
    if (timeoutRef !== null) {
      clearTimeout(timeoutRef);
    }

    setFirstValue(parseInt(firstClockStr));
    setSecondValue(parseInt(secondClockStr));
    setFirstValueActive(false);
    setTimeoutRef(setTimeout(handleOneSec, 1000));
  };

  const handleChangeCurrentWatch = () => {
    clearTimeout(timeoutRef);
    setFirstValueActive(prevValue => prevValue == true ? false : true); // change to opposing clock
    setTimeoutRef(setTimeout(handleOneSec, 1000));
  }

  return (
    <>
      <div>
        <button className={"chess-watch chess-watch-" + theme} onClick={handleChangeCurrentWatch}>
          <div className={"watch watch-" + theme}>
            <div>{Math.floor(firstValue / 60)}</div>: <div>{firstValue % 60}</div>
          </div>
        </button>

        <button className={"chess-watch chess-watch-" + theme} onClick={handleChangeCurrentWatch}>
          <div className={"watch watch-" + theme}>
            <div>{Math.floor(secondValue / 60)}</div>: <div>{secondValue % 60}</div>
          </div>
        </button>
      </div>

      <div>
        <input className={"set-clock input input-" + theme} type="text" onChange={(e) => setFirstClockStr(e.target.value)}/>
        <input className={"set-clock input input-" + theme} type="text" onChange={(e) => setSecondClockStr(e.target.value)}/>
      </div>
      <button className={"button-set-clock button button-" + theme} onClick={handleSetClocks}>Set Clocks</button>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState('light')
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(<CountDown/>);


  return (
   <div className={"app app-" + theme}>
      <div className={"sidebar sidebar-" + theme} style={{display: sidebarVisible ? 'flex' : 'none'}}>
        <div className='sidebar-content'>
          <button onClick={() => setSidebarVisible(false)}>Close</button>
          <button onClick={() => setCurrentPage(<StopWatch/>)}>StopWatch</button>
          <button onClick={() => setCurrentPage(<CountDown/>)}>CountDown</button>
          <button onClick={() => setCurrentPage(<ChessClock/>)}>ChessClock</button>
        </div>
      </div>

      <div className="header">
        <button className="sandwich-button" onClick={() => {setSidebarVisible(true)}}><img className={"sandwich-menu sandwich-menu-" + theme} src="bars-solid.svg" alt="menu" /></button>
        <button className={"button button-" + theme} onClick={() => {setTheme(theme == 'light' ? 'dark' : 'light')}}>{theme == 'light' ? "Change to dark theme" : "Change to light theme" }</button>
      </div>

      <themeContext.Provider value={theme}>
        {currentPage}
      </themeContext.Provider>
    </div>
  )
}

export default App
