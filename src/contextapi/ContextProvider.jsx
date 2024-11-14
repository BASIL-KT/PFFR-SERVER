import React from 'react'
import { createContext,useState } from 'react'

export const responseContext=createContext()


function ContextProvider({children}) {
    const [response,setResponse]=useState("")
    const [logStatus,setLogStatus]=useState(false)
  return (
    <>
    <responseContext.Provider value={{response,setResponse,logStatus,setLogStatus}}>
        {children}
    </responseContext.Provider>
    </>

  )
}

export default ContextProvider