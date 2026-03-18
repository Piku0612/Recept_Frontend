import AppNavbar from "../components/AppNavbar"
import { useState, useEffect } from "react"
import { whoAmI, Logout } from "../api"
import { useNavigate } from "react-router-dom"
import AddRecipeCard from "../components/AddRecipeCard"



export default function OwnReceipt() {
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
        load()
    }, [])

    async function onLogout() {
        const data = await Logout()
        if (data.error) {
            return setErrorUser(data.error)
        }
        setUser(null)
        navigate('/')

    }

    return (
        <>
            <AppNavbar user={user} onLogout={onLogout} />
            

            <div className="container mt-4">

                {user ? (
                    <div className="row">

                        <AddRecipeCard />

                        {/* ide később jönnek a saját receptek */}

                    </div>
                ) : (
                    <div className="alert alert-secondary text-center">
                        <h4>You must be logged in to add recipes!</h4>
                    </div>
                )}

            </div>
        </>

    )
}