import React, { useState,useContext } from 'react'
import { Row,Col } from 'react-bootstrap'
import { registerApi,loginApi } from '../services/allApis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextapi/AuthContext'

function Auth() {

  const [authStatus,setAuthStatus] = useState(false)
  const [user,setUser]= useState({
    email:"",username:"",password:""
  })

  const nav=useNavigate()
  const {setLogStatus}=useContext(logContext)


  const changeAuth= () =>{
    setAuthStatus(!authStatus)
  }

  const handleRegister=async() =>{
    console.log(user)
    const {email,username,password}=user
    if(!email || !username || !password){
      toast.warning("Enter Valid Data!!")
    }
    else{
      const res=await registerApi(user)
      console.log(res)
      if(res.status==200){
        toast.success("Registration successfull!!!")
        changeAuth()
        setUser({
          email:"",username:"",password:""
        })
      }
      else{
        toast.error("Registration Failed")
      }
    }
  }
 const handleLogin=async()=>{
  const{email,password}=user
  if(!email || !password){
    toast.warning("Emter valid data!!!")
  }
  else{
    const res=await loginApi(user)
    console.log(res)
    if(res.status==200){
      toast.success("Login Successfull!!!")
      changeAuth()
      setUser({
        username:"",email:"",password:""
      })
      sessionStorage.setItem('token',res.data.token)
      sessionStorage.setItem('user',res.data.username)
      sessionStorage.setItem('profile',res.data.profile)
      sessionStorage.setItem('github',res.data.github)
      sessionStorage.setItem('linkdin',res.data.linkdin) 
      setAuthStatus(true)
      setLogStatus(true)
      nav('/')
    }
    else{
      toast.error("Login Failed!!")
    }
  }
 }
  return (
    <>
    <div className="container-fluid w-100 d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
      <div className="w-75 border border-2 shadow">
        <Row>
          <Col>
          <img src="https://pan.itaxinfo.com/assets/img/login.gif" 
            className='img-fluid' alt="" />
          </Col>
          <Col className='d-flex flex-column justify-content-center'>
          <h4>
            {authStatus ?
            <>Registration</>:
            <>Login</>
            }
          </h4>
          <div>
            <input type="email" placeholder='Enter Email ID' onChange={(e)=>(setUser({...user,email:e.target.value}))} 
            value={user.email} className="form-control my-3" />
            {
              authStatus &&
              <input type="text" placeholder='Enter Username' onChange={(e)=>(setUser({...user,username:e.target.value}))} value={user.username} className="form-control mb-3" />
            }
            <input type="password" placeholder='Enter Password' onChange={(e)=>(setUser({...user,password:e.target.value}))} value={user.password} className="form-control mb-3" />
          </div>
          <div className="d-flex justify-content-between">
            {
              authStatus?
              <button className='btn btn-info' onClick={handleRegister}>Registration</button>
              :
              <button className='btn btn-success' onClick={handleLogin} >Login</button>
            }
            <button className='btn btn-link text-info' onClick={changeAuth}>
              {
                authStatus?
                <>Already A user?</>
                :
                <>New User?</>
              }
            </button>
          </div>
          </Col>
        </Row>
      </div>
    </div>
    </>
  )
}

export default Auth