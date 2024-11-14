import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { searchProjectApi } from '../services/allApis'

function Allprojects() {

  const [data,setData]=useState([])
  const [key,setKey]=useState("")

  useEffect(()=>{
    getData()
  },[key])

  const getData=async()=>{
    const res=await searchProjectApi(key)
    if(res.status==200){
      setData(res.data)
    }
  }
  // console.log(res)

  return (
    <>
    <Header/>
    <div className="container-fluid p-3">
      <div className="d-flex justify-content-between mt-2 ">
    <h3>All projects</h3>
    <input type="text" onChange={(e)=>setKey(e.target.value)}  placeholder='Search languages' className="form-control w-25 shadow border-1 " />
    </div>
    <div className='row justify-content-around gap-3 mt-2'>
    {
      data.length>0 ?
      <>
      {data.map((item)=>(
        <ProjectCard project={item}/>
      ))}
      </>
      :
      <h3>No project available!!!!</h3>
    }
    {/* */}
    </div>
    </div>
    
    
    </>
  )
}

export default Allprojects