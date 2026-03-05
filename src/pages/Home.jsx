import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { whoAmI, Logout } from "../api"
import { useNavigate } from "react-router-dom"
import AppNavbar from "../components/AppNavbar"


export default function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [errorUser, setErrorUser] = useState('')

  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [searchParams] = useSearchParams()

  const search = searchParams.get("search")

  useEffect(() => {

    async function fetchRecipes() {

      const res = await fetch(
        `http://127.0.0.1:4000/recipes?search=${search || ""}`
      )

      const data = await res.json()
      setRecipes(data)
    }

    fetchRecipes()

  }, [search])

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



  return (
    <div>
      <AppNavbar user={user} onLogout={onLogout}  />
      {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}
      <div className="container mt-4">

      {recipes.map(r => (
        <div key={r.id} className="border p-3 mb-3">
          <h5>{r.title}</h5>
          <p>{r.description}</p>
        </div>
      ))}
    </div>

    

      


    </div>
  )
}