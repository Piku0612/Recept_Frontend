import AppNavbar from "../components/AppNavbar"
import { useState } from "react"
import { useEffect } from "react"
import { whoAmI } from "../api"
import { Logout } from "../api"

export default function Favourites(){
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
    load()
  }, [])

  async function onLogout(){
    const data=await Logout()
    if (data.error) {
        return setErrorUser(data.error)
    }
    setUser(null)
    navigate('/')

}
    return(
        <div>
            <AppNavbar user={user} onLogout={onLogout}  />
      {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}
      <div className="container mt-4"></div>
        </div>
        
    )
    
    
}