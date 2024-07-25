import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Three from './Three'
// import Experience from './Experience/Experience'

// const experience = new Experience();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// window.addEventListener("DOMContentLoaded", () => {
//   new Three('three-container');
//   console.log('Hello from main.tsx');
// });
