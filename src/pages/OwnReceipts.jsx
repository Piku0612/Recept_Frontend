import AppNavbar from "../components/AppNavbar"
import { useState, useEffect } from "react"
import { whoAmI, Logout } from "../api"
import { useNavigate } from "react-router-dom"



export default function OwnReceipt(){
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')

    //WhoAmi
  useEffect(() => {
    async function load() {
      const data = await whoAmI()
      //console.log(data);
      if (data.error) {
        return setErrorUser(data.error)

      }
      return setUser(data)
    }
    load()}, [])

    async function onLogout(){
        const data=await Logout()
        if (data.error) {
            return setErrorUser(data.error)
        }
        setUser(null)
        navigate('/')
    
    }

    return( 
        <>
         <AppNavbar user={user} onLogout={onLogout}/>
        <div className="container py-4">
            <div className="mb-3">
                {user ? (
                    <form className="d-flex gap-2"></form>
                ) : (
                    <div className="alert alert-secondary">
                        <h1>A feltöltéshez be kell jelentkezni!</h1>
                    </div>
                )} 
            </div>
        </div>
        </>
   
    )
}