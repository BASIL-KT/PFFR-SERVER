import React, { useState,useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logContext } from '../contextapi/AuthContext';

function Header() {
  const [uname,setName]=useState("")

  const nav=useNavigate()
  const {setLogStatus}=useContext(logContext)

  const handleLogout=()=>{
    sessionStorage.clear()
    toast.info("User logged out!!!")
    setLogStatus(false)
    nav('/auth')
  }

  return (
    <>
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
        <i className="fa-solid fa-diagram-project" style={{color: "#d11595",}} />
        {' '}
        Project Fair
        </Navbar.Brand>
        <button onClick={handleLogout} className='btn btn-danger'>
          LOGOUT
        </button>
      </Container>
    </Navbar>
    </>
  )
}

export default Header