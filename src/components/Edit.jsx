import React, { useEffect } from 'react'
import { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import base_url from '../services/base_url';
import { updateProjectApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { responseContext } from '../contextapi/ContextProvider';

function Edit({project}) {

    const [show, setShow] = useState(false);
    const [data,setData]=useState({})

    const [preview,setPreview]=useState("")
    const {setResponse}=useContext(responseContext)


    useEffect(()=>{
      setData({...project})
    },[])

    useEffect(()=>{
      if(data.image?.type){
        setPreview(URL.createObjectURL(data.image))
      }
      else{
        setPreview("")
      }
    },[data.image])


  const handleEdit=async()=>{
    console.log(data)
    const {title,description,languages,github,demo,image}=data
    if(!title || !description || !languages || !github || !demo || !image){
      toast.warning("Enter valid inputs!!")
    }
    else{
      if(data.image?.type){
        const fd=new FormData()
      fd.append('title',title)
      fd.append('description',description)
      fd.append('languages',languages)
      fd.append('github',github)
      fd.append('demo',demo)
      fd.append('image',image)

      const header={
        'Content-Type':'multipart/form-data',
        'Authorization':`Token ${sessionStorage.getItem('token')}`
      }
      const res=await updateProjectApi(data._id,header,fd)
      console.log(res)
      if(res.status==200){
        toast.success("Project Details Updated!!")
        handleClose()
        setResponse(res)
      }
      else{
        toast.error("Updation failed!!!")
      } 
      }
      else{
        const header={
          'Content-Type':'application/json',
          'Authorization':`Token ${sessionStorage.getItem('token')}`
        }
        const res=await updateProjectApi(data._id,header,data)
      console.log(res)
      if(res.status==200){
        toast.success("Project Details Updated!!")
        handleClose()
        setResponse(res)
        }
        else{
          toast.error("updation failed!!!")
        } 
    }
  }
}
  
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

 

  return (
    <>
    <button className='btn' onClick={handleShow}>
    <i className="fa-solid fa-pen-to-square fa-xl" style={{color: "#0f60eb",}} />
                  </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-info'>
         <Row>
            <Col>
            <label>
                <input type="file" onChange={(e)=>setData({...data,image:e.target.files[0]})} style={{display:'none'}}/>
                <img style={{cursor:'pointer'}}  src={preview?preview:`${base_url}/uploads/${data.image}`} alt="" className='img-fluid' />
            </label>
            </Col>
            <Col>
            <input type="text" placeholder='Title' onChange={(e)=>setData({...data,title:e.target.value})}  defaultValue={data.title} className="form-control mb-2" />
            <input type="text" placeholder='Description' onChange={(e)=>setData({...data,description:e.target.value})} defaultValue={data.description} className="form-control mb-2" />
            <input type="text" placeholder='Languages Used' onChange={(e)=>setData({...data,languages:e.target.value})} defaultValue={data.languages} className="form-control mb-2" />
            <input type="text" placeholder='Git repository link' onChange={(e)=>setData({...data,github:e.target.value})} defaultValue={data.github} className="form-control mb-2" />
            <input type="text" placeholder='Demo link' onChange={(e)=>setData({...data,demo:e.target.value})} defaultValue={data.demo} className="form-control mb-2" />
            </Col>
         </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleEdit}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit