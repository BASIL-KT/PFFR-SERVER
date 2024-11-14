import React,{useEffect,useState} from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { allProjectsApi } from '../services/allApis'

function Landing() {

    const [logStatus,setlogStatus]=useState(false)
    const [data,setData]=useState([])

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setlogStatus(true)
        }
        else{
            setlogStatus(false)
        }
        getData()
    },[])

    const getData=async()=>{
        const res=await allProjectsApi()
        if(res.status==200)
            setData(res.data)
    }
    console.log(data)

    return (
        <>
            <div className="container-fluid d-flex  justify-content-center align-items-center " style={{ height: '90vh', background: 'rgb(56 201 171)' }}>
                <Row>
                    <Col className='d-flex flex-column justify-content-center'>
                        <h2>Project Fair</h2>
                        <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, distinctio maxime at ad porro nihil fuga officiis quibusdam totam veniam eveniet sit neque laboriosam fugit nostrum voluptates ipsa doloremque consectetur.</p>
                        <div className='d-grid'>
                            {
                                logStatus ?
                                <Link className="btn btn-success"to={'/dash'}>Go to dashboard</Link>
                                :
                                <Link className='btn btn-primary mt-3' to={'/auth'}>Start to explore</Link>

                            }
                        </div>
                    </Col>
                    <Col>
                        <img src="https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_1280.png" alt=""
                         className='img-fluid' />
                    </Col>
                </Row>
            </div>
            <div className="container-fluid p-3">
                <h3 className='text-center mb-5'>Sample Projects</h3>
                {
                    data.length > 0 ?
                    <div className='d-flex justify-content-around'>
                        {data.slice(-4,4).map(item =>(
                            <ProjectCard project={item}/>
                        ))}
                </div>
                :
                <h3 className='my-3 text-center text-danger '>No Project Available!!!</h3>
                }


                
                <div className='text-center'>
                    <Link to={'/projects'} className='text-dark'>view more</Link>
                </div>
                   
            </div>
        </>
    )
}

export default Landing