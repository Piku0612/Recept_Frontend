import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function Home() {

  const [recipes, setRecipes] = useState([])
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

  return (
    <div className="container mt-4">
      {recipes.map(r => (
        <div key={r.id} className="border p-3 mb-3">
          <h5>{r.title}</h5>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  )
}