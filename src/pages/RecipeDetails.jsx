import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import {
  Logout,
  whoAmI,
  getRecipeById,
  getImageUrl,
} from "../api";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const userData = await whoAmI();
      if (!userData.error) {
        setUser(userData);
      }

      const recipeData = await getRecipeById(id);
      if (recipeData.error) {
        setError(recipeData.error);
        return;
      }

      setRecipe(recipeData);
    }

    load();
  }, [id]);

  async function onLogout() {
    const data = await Logout();

    if (data.error) {
      return setError(data.error);
    }

    setUser(null);
    navigate("/");
  }

  function splitText(text) {
    if (!text) return [];

    return String(text)
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (error) {
    return (
      <>
        <AppNavbar user={user} onLogout={onLogout} />
        <div className="container mt-5">
          <div className="alert alert-danger text-center">{error}</div>
        </div>
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <AppNavbar user={user} onLogout={onLogout} />
        <div className="container mt-5 text-center">
          <h4>Betöltés...</h4>
        </div>
      </>
    );
  }

  const imageSrc = getImageUrl(recipe.image_url);
  const ingredients = splitText(recipe.ingredients);

  return (
    <>
      <AppNavbar user={user} onLogout={onLogout} />

      <div className="container my-5">
        <button
          className="btn btn-outline-secondary mb-4"
          onClick={() => navigate(-1)}
        >
          ← Vissza
        </button>

        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <img
            src={imageSrc}
            alt={recipe.title}
            className="w-100"
            style={{
              height: "430px",
              objectFit: "cover",
            }}
          />

          <div className="card-body p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
              <div>
                <h1 className="fw-bold mb-2">{recipe.title}</h1>
                <p className="text-muted mb-0">
                  Készítette: <strong>{recipe.username || "Ismeretlen"}</strong>
                </p>
              </div>

              <div className="text-md-end">
                <div className="fs-3 text-danger">♥</div>
                <strong>{recipe.szivekSzama || 0}</strong> kedvelés
              </div>
            </div>

            <hr className="my-4" />

            <div className="row g-4">
              <div className="col-md-5">
                <div className="p-4 bg-light rounded-4 h-100">
                  <h3 className="mb-3">Hozzávalók</h3>

                  {ingredients.length === 0 ? (
                    <p className="text-muted">Nincs megadva hozzávaló.</p>
                  ) : (
                    <ul className="mb-0">
                      {ingredients.map((item, index) => (
                        <li key={index} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="col-md-7">
                <div className="p-4 border rounded-4 h-100">
                  <h3 className="mb-3">Leírás</h3>
                  <p className="fs-5" style={{ whiteSpace: "pre-line" }}>
                    {recipe.description || "Nincs megadva leírás."}
                  </p>
                </div>
              </div>
            </div>

            {recipe.created_at && (
              <p className="text-muted mt-4 mb-0">
                Létrehozva: {new Date(recipe.created_at).toLocaleDateString("hu-HU")}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}