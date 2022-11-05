import { useState } from 'react'
import { TextField } from '@mui/material'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-gray-100 text-gray-800 px-4 py-6 h-screen flex justify-between m-5'>
      <Login />
    </div>
  )
}

export default App
