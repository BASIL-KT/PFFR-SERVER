import React, { useState,useEffect,useContext } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { getProjectAPi } from '../services/allApis'
import { responseContext } from '../contextapi/ContextProvider'
import { deleteProjectApi } from '../services/allApis'
import { toast } from 'react-toastify'
import Profile from '../components/Profile'

function Dashboard() {

  const [uname,setUname]=useState("")
  const [projects,setProjects]=useState([])
  const {response}=useContext(responseContext)
  const {setResponse}=useContext(responseContext)



  const getData=async()=>{
    const header={
      'Content-Type':'application/json',
      'Authorization':`Token ${sessionStorage.getItem('token')}`
    }
    const res=await getProjectAPi(header)
    console.log(res)
    if(res.status==200){
      setProjects(res.data)
    }
  }

  useEffect(()=>{
    if(sessionStorage.getItem('user')){
      setUname(sessionStorage.getItem('user'))


    }
    getData()
  },[response])

  const handleDelete=async(id)=>{
    const header={
      'Content-Type':"application/json",
      'Authorization':`Token ${sessionStorage.getItem('token')}`
    }
    const res=await deleteProjectApi(id,header)
    if(res.status==200){
      console.log(res)
      toast.success("Project Deleted!!!")
      setResponse(res)
    }
    else{
      toast.warning("Deletion Failed!!!")
    }
  }


 
  
  return (
    <>
    <Header/>
    <div className="container-fluid p-3">
      <h1 className="text-center my-3">Welcome ,<span className='text-info'>{uname}</span></h1>
      <Row>
        <Col md={8} sm={12}>
        <h3>Projects</h3>
        <div className="border border-3 border-dark shadow p-3 my-3">
          <Add/>
          <div className="my-2">
            {
              projects.length>0 ?
              projects.map(item=>(
                <div className="border p-2 border-2 border-info shadow mb-3 d-flex justify-content-between">
                <h5>{item.title}</h5>
                <div>
                  <a href={item.github} className='me-2'>
                  <i className="fa-brands fa-github fa-xl"/>
                  </a>
                  <Edit project={item}/>
                  <button className='btn' onClick={()=>handleDelete(item._id)}>
                  <i className="fa-solid fa-trash fa-xl" style={{color: "#d81313",}} />
                  </button>
                </div>
            </div>
              ))
              :
              <h3 className='text-center text-danger'>No projects added yet</h3>
            }
          </div>
        </div>
        </Col>
        <Col md={4} sm={12} >
        <Profile/>
        </Col>
      </Row>
    </div>
    </>
  )
}

export default Dashboard