import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [value, setValue] = useState(0);
  const [valStr, setValStr] = useState('');
  const [theme, setTheme] = useState('light')
  const [timeoutRef, setTimeoutRef] = useState(null)

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
    <div className={"app app-" + theme}>
        <button className={"button button-" + theme} onClick={() => {setTheme(theme == 'light' ? 'dark' : 'light')}}>{theme == 'light' ? "Change to dark theme" : "Change to light theme" }</button>
        <div className={"watch watch-" + theme}>
          <div>{Math.floor(value / 60)}</div>: <div>{value % 60}</div>
        </div>
        <div className={"countdown-input countdown-input-" + theme}>
          <input className={"input-" + theme} type="text" placeholder="Countdown time in seconds" value={valStr} onChange={(e) => {setValStr(e.target.value)}}/>
          <button className={"button-" + theme} onClick={() => {setValue(parseInt(valStr)); setValStr('')}}>Set Countdown</button>
        </div>
    </div>
  )
}

export default App
