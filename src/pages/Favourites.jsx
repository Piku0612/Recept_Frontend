import AppNavbar from "../components/AppNavbar";
import { useState, useEffect } from "react";
import { whoAmI, Logout, listFavourites, removeFavourite } from "../api";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

export default function Favourites() {
  const [user, setUser] = useState(null);
  const [errorUser, setErrorUser] = useState("");
  const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await whoAmI();

      if (data.error) {
        return setErrorUser(data.error);
      }

      setUser(data);

      const favData = await listFavourites();
      if (favData.error) {
        return setErrorUser(favData.error);
      }

      setFavourites(favData);
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

  async function handleToggleFavourite(recipeId) {
    const data = await removeFavourite(recipeId);

    if (data.error) {
      alert(data.error);
      return;
    }

    setFavourites((prev) => prev.filter((fav) => fav.recipe_id !== recipeId));
  }

  return (
    <div>
      <AppNavbar user={user} onLogout={onLogout} />
      {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}

      <div className="container mt-4">
        <h2 className="mb-4">My favourites</h2>

        <div className="row">
          {favourites.length === 0 ? (
            <p className="text-center">Még nincs kedvenc recepted.</p>
          ) : (
            favourites.map((recipe) => (
              <RecipeCard
                key={recipe.recipe_id}
                recipe={recipe}
                isFavourite={true}
                onToggleFavourite={handleToggleFavourite}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}