import { useState } from 'react'
import Page1 from './components/Page1'
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='form-style'>
    <Page1/>
    </div>

  )
}

export default App
