import AppNavbar from "../components/AppNavbar";
import { useState, useEffect } from "react";
import { whoAmI, Logout, getTopRecipes, getImageUrl } from "../api";
import { useNavigate } from "react-router-dom";

export default function TopList() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [errorUser, setErrorUser] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function load() {
      const userData = await whoAmI();

      if (!userData.error) {
        setUser(userData);
      }

      const recipeData = await getTopRecipes();

      if (recipeData.error) {
        setErrorUser(recipeData.error);
        return;
      }

      setRecipes(recipeData);
    }

    load();
  }, []);

  async function onLogout() {
    const data = await Logout();

    if (data.error) {
      return setErrorUser(data.error);
    }

    setUser(null);
    navigate("/");
  }

  return (
    <>
      <AppNavbar user={user} onLogout={onLogout} />

      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Top receptek</h1>
          <p className="text-muted">
            A receptek kedvelések száma alapján vannak rangsorolva.
          </p>
        </div>

        {errorUser && (
          <div className="alert alert-danger text-center">{errorUser}</div>
        )}

        {recipes.length === 0 ? (
          <p className="text-center">Még nincs recept a toplistában.</p>
        ) : (
          <div className="row g-4">
            {recipes.map((recipe, index) => (
              <div className="col-md-6 col-lg-4" key={recipe.recipe_id}>
                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                  <div className="position-relative">
                    <img
                      src={getImageUrl(recipe.image_url)}
                      alt={recipe.title}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />

                    <span
                      className="position-absolute top-0 start-0 m-3 badge bg-warning text-dark fs-6"
                    >
                      #{index + 1}
                    </span>
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h4 className="card-title">{recipe.title}</h4>

                    <p className="text-muted small mb-2">
                      Készítette: {recipe.username || "Ismeretlen"}
                    </p>

                    <p className="card-text">
                      {recipe.description?.slice(0, 100) || "Nincs leírás"}...
                    </p>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <div className="fw-bold">
                        <span className="text-danger me-1">♥</span>
                        {recipe.szivekSzama || 0} kedvelés
                      </div>

                      <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/recipe/${recipe.recipe_id}`)}
                      >
                        Megnézem
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}