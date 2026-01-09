import React from 'react'
import { ToastContainer } from 'react-toastify';
import Upload from './pages/Upload';
import Download from './pages/Download';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div className='min-h-screen bg-gray-200'>
    <ToastContainer/>
    <Navbar/>
    <div className='flex justify-center items-center  '>
      <Routes>
       <Route path = '/' element = {<Upload/>}/>
       <Route path = '/download' element = {<Download/>}/>
      </Routes>
    </div>
    </div>
  )
}

export default App



