import React from 'react'
import Card from './components/Card'
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <div className='card'>
      <Card/>
      <Toaster/>
    </div>
  )
}

export default App