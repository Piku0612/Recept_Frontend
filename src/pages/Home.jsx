import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { whoAmI, Logout } from "../api"
import AppNavbar from "../components/AppNavbar"
import RecipeCard from "../components/RecipeCard"

export default function Home() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [errorUser, setErrorUser] = useState("")
  const [recipes, setRecipes] = useState([])
  console.log(recipes);
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search")

  // receptek betöltése 
  useEffect(() => {

    async function fetchRecipes() {

      const res = await fetch(
        'http://127.0.0.1:4000/recipe/list'
      )
      //console.log(res);
      const data = await res.json()
      //console.log(data);
      setRecipes(data)
    }

    fetchRecipes()

  }, [search])

  // WhoAmI
  useEffect(() => {

    async function load() {
      const data = await whoAmI()

      if (data.error) {
        return setErrorUser(data.error)
      }

      setUser(data)
    }

    load()

  }, [])

  async function onLogout() {

    const data = await Logout()

    if (data.error) {
      return setErrorUser(data.error)
    }

    setUser(null)
    navigate("/")

  }

  return (
    <div>

      <AppNavbar user={user} onLogout={onLogout} />

      {errorUser && (
        <div className="alert alert-danger text-center my-2">
          {errorUser}
        </div>
      )}

      <div className="container mt-4">

        <div className="row">

          {recipes.length === 0 && (
            <p className="text-center">No recipes found.</p>
          )}

          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}

        </div>

      </div>

    </div>
  )
}