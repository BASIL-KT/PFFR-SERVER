import { useState,useContext } from 'react'
import './bootstrap.min.css'
import './App.css'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Allprojects from './pages/Allprojects'
import { Routes,Route } from 'react-router-dom'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { logContext } from './contextapi/AuthContext'


function App() {

  const {logStatus}=useContext(logContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/dash' element={logStatus?<Dashboard/>:<Auth/>}/>
      <Route path='/projects' element={logStatus?<Allprojects/>:<Auth/>}/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
    <Footer/>
    <ToastContainer/>
    </>
  )
}

export default App
