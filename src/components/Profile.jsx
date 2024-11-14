import React,{useContext} from 'react'
import { useState,useEffect } from 'react'
import base_url from '../services/base_url'
import { toast } from 'react-toastify'
import { updateProfileApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextapi/AuthContext'

function Profile() {
    const [view,setView] = useState(false)
    const [details,setDetails]=useState({
        username:"",github:"",linkdin:"",profile:""
    })
    const [preview,setPreview]=useState("")
    const nav=useNavigate()
    const {setLogStatus}=useContext(logContext)
    
    
    useEffect(()=>{
        if(sessionStorage.getItem('user')){
            setDetails({username:sessionStorage.getItem('user'),github:sessionStorage.getItem('github'),
                linkdin:sessionStorage.getItem('linkdin'),profile:sessionStorage.getItem('profile')
            })
        }
    },[])

    useEffect(()=>{
        if(details?.profile.type){
            setPreview(URL.createObjectURL(details.profile))
        }
        else{
            setPreview("")
        }
    },[details.profile])

    const changeView=()=>{
        setView(!view)
      }
      const handleUpdate=async()=>{
        console.log(details)
        const {username,github,linkdin,profile}=details
        if(!username || !github || !linkdin ||!profile){
            toast.warning("Enter valid input!!!")
        }
        else{
            if(profile.type){
                const fd=new FormData()
                fd.append('username',username)
                fd.append('github',github)
                fd.append('linkdin',linkdin)
                fd.append('profile',profile)

                const header={
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${sessionStorage.getItem('token')}` 
                }
                const result =await updateProfileApi(header,fd)
                if(result.status==200){
                  toast.success("Profile updation successfull!!")
                  nav('/auth')
                  setLogStatus(false)
                  sessionStorage.clear()

                }
                else{
                  toast.error("Updation failed!!!")
                }
                
            }
            else{
              const header={
                'Content-Type':'Application/json',
                'Authorization':`Token ${sessionStorage.getItem('token')}`
              }
              const result=await updateProfileApi(header,details)
              if(result.status==200){
                toast.success("Profile updation successfull!!")
                nav('/auth')
                setLogStatus(false)
                sessionStorage.clear()

            }
            else{
              toast.error("Updation failed!!!")
            }
        }
      }
    }
    
  return (
    <>
    <div className="w-100 p-2 border mt-3 border-3">
          <div className="d-flex justify-content-between">
            <h4>Profile Updation</h4>
            <button className='btn' onClick={changeView}>
              {
                view?
                <i className="fa-solid fa-chevron-up" />
                :
                <i className="fa-solid fa-chevron-down" />
              }
            </button>
          </div>
          {
           view &&
           <div>
            <label>
              <input type="file" onChange={(e)=>setDetails({...details,profile:e.target.files[0]})} style={{display:'none'}} name="" id="" />
              <img src={preview?preview:details.profile!=='undefined'?`${base_url}/uploads/${details.profile}`:"https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"} 
              alt="profile" className='img-fluid' />
            </label>
            <input type="text" defaultValue={details.username} onChange={(e)=>setDetails({...details,username:e.target.value})} placeholder='Username' className="form-control border-1 border-dark shadow mb3 mt-1" />
            <input type="text" defaultValue={details.github} onChange={(e)=>setDetails({...details,github:e.target.value})} placeholder='GitHub Link' className="form-control border-1 border-dark shadow mb3 mt-1" />
            <input type="text" defaultValue={details.linkdin} onChange={(e)=>setDetails({...details,linkdin:e.target.value})} placeholder='LinkdIn Link' className="form-control border-1 border-dark shadow mb3 mt-1" />
            <div className="d-flex justify-content-between">
              <button className='btn btn-success mt-1 border-1 shadow'onClick={handleUpdate} >Update</button>
              <button className='btn btn-danger mt-1 border-1 shadow'onClick={changeView} >Cancel</button>
            </div>
           </div> 
          }

        </div>
    </>
  )
}

export default Profile