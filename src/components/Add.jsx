import React from 'react'
import { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import { addProjectApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { responseContext } from '../contextapi/ContextProvider';

function Add() {

    const [show, setShow] = useState(false);
    const [project,setproject]=useState(
      {
      title:"",description:"",languages:"",github:"",demo:"",image:""
    }
  )

    
    const [preview,setPreview]=useState("")

    const {setResponse}=useContext(responseContext)

    const handleClose = () => {setShow(false);
      setproject({
        title:"",description:"",languages:"",github:"",demo:"",image:""
      })
    }
  const handleShow = () => setShow(true);

    const handleProjectAdd=async()=>{
      console.log(project)
      const {title,description,languages,github,demo,image}=project
      if(!title || !description || !languages || !github || !demo || !image){
        toast.warning("Enter valid inputs!!")
      }
      else{
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

        const res=await addProjectApi(fd,header)
        console.log(res)
        if(res.status==200){
          toast.success("Project Added!!")
          handleClose()
          setResponse(res)

        }
      }
    }

    useEffect(()=>{
      if(project.image){
        setPreview(URL.createObjectURL(project.image))
      }
      else{
        setPreview("")
      }
    },[project.image])

  
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Add Projects
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-info'>
         <Row>
            <Col>
            <label>
                <input type="file" onChange={(e)=>setproject({...project,image:e.target.files[0]})} style={{display:'none'}}/>
                <img style={{cursor:'pointer'}} src={preview?preview:"https://static.thenounproject.com/png/187803-200.png"} alt="" className='img-fluid' />
            </label>
            </Col>
            <Col>
            <input type="text" onChange={(e)=>setproject({...project,title:e.target.value})} placeholder='Title' className="form-control mb-2" />
            <input type="text" onChange={(e)=>setproject({...project,description:e.target.value})} placeholder='Description' className="form-control mb-2" />
            <input type="text" onChange={(e)=>setproject({...project,languages:e.target.value})} placeholder='Languages Used' className="form-control mb-2" />
            <input type="text" onChange={(e)=>setproject({...project,github:e.target.value})} placeholder='Git repository link' className="form-control mb-2" />
            <input type="text" onChange={(e)=>setproject({...project,demo:e.target.value})} placeholder='Demo link' className="form-control mb-2" />
            </Col>
         </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleProjectAdd}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add