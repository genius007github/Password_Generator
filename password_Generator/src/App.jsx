import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [includenumber, setIncludeNumber] = useState(true)
  const [includcharacter, setIncludCharacter] = useState(true)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null);
  const CopypasswordToClipSboard = useCallback(() => {
    window.navigator.clipboard.writeText(passwordRef.current.value)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (includenumber) str += "0123456789"
    if (includcharacter) str += " !@#$%^&*()-_=+|{};:/?.>,"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [setLength, setIncludeNumber, setIncludCharacter])

  useEffect(() => {
    passwordGenerator()
  }, [length, setIncludeNumber, setIncludCharacter, passwordGenerator])

  return (

    <div className='Container'>
      <h1>Pasword Generator</h1>
      <div className="fill">

        <input
          type="text"
          className=''
          value={password}
          placeholder='password'
          readOnly
          ref={passwordRef}

        />
        <button onClick={CopypasswordToClipSboard} className="btn">Copy</button>
      </div>
      <div className='final'>
        <div className="range">
          <input type="range"
            min={8}
            max={15}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label >Length:{length}</label>
        </div>
        <div className="NumChar">
          <input type="checkbox"
            defaultChecked={includenumber}
            onChange={() => {
              setIncludeNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>

        </div>

        <div className="NumChar">
          <input type="checkbox"
            defaultChecked={includcharacter}
            onChange={() => {
              setIncludeNumber((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>

        </div>
      </div>
    </div>
  )
}

export default App;


