import { useState } from 'react'
import TaskList from './components/TaskList'
import './index.css'

const App=()=>{
  return (
    <div className='container mx-auto p-4'>
      
      <TaskList/>
    </div>
  )
}

export default App
