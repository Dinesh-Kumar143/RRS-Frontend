import { useState,useEffect } from 'react'
import Project from "./components/card.jsx"
import './App.css'
 
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Project/>
    </>
  )
}

export default App
