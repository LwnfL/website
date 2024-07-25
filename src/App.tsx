import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Three from './Three';
import Experience from './Experience/Experience';



function App() {
  useEffect(() => {
    // Delay to ensure the div is rendered
    const timeout = setTimeout(() => {
      new Three('canvas.webgl');
      const experience = new Experience(document.querySelector('canvas.webgl'));
    }, );

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a> 
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {/* <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
      </div>
      <div className="Three">
      </div>
      <canvas className="webgl"></canvas>
    </>
  )
}

export default App
