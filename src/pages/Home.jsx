import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  whoAmI,
  Logout,
  listFavourites,
  addFavourite,
  removeFavourite,
  List,
  searchRecipes
} from "../api";
import AppNavbar from "../components/AppNavbar";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [errorUser, setErrorUser] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  function isSameRecipeId(firstId, secondId) {
    return String(firstId) === String(secondId);
  }

  useEffect(() => {
    async function fetchRecipes() {
      const data = search?.trim()
        ? await searchRecipes(search)
        : await List();

      if (data.error) {
        setRecipes([]);
        return;
      }

      setRecipes(data);
    }

    fetchRecipes();
  }, [search]);

  useEffect(() => {
    async function load() {
      const data = await whoAmI();

      if (data.error) {
        return setErrorUser(data.error);
      }

      setUser(data);

      const favData = await listFavourites();
      if (!favData.error) {
        setFavourites(favData);
      }
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
    if (!user) {
      alert("Először jelentkezz be.");
      return;
    }



    const isFav = favourites.some((fav) =>
      isSameRecipeId(fav.recipe_id, recipeId)
    );


    if (isFav) {
      const data = await removeFavourite(recipeId);

      if (data.error) {
        alert(data.error);
        return;
      }

      setFavourites((prev) =>
        prev.filter((fav) => !isSameRecipeId(fav.recipe_id, recipeId))
      );



      setRecipes((prev) =>
        prev.map((recipe) =>
          isSameRecipeId(recipe.recipe_id, recipeId)
            ? {
                ...recipe,
                szivekSzama: Math.max(0, Number(recipe.szivekSzama || 0) - 1),
              }
            : recipe
        )
      );

    } else {
      const data = await addFavourite(recipeId);

      if (data.error) {
        alert(data.error);
        return;
      }



      const recipeToAdd = recipes.find((r) =>
        isSameRecipeId(r.recipe_id, recipeId)
      );


      if (recipeToAdd) {
        setFavourites((prev) =>
          prev.some((fav) => isSameRecipeId(fav.recipe_id, recipeId))
            ? prev
            : [...prev, recipeToAdd]
        );
      }

      setRecipes((prev) =>
        prev.map((recipe) =>
          isSameRecipeId(recipe.recipe_id, recipeId)
            ? {
                ...recipe,
                szivekSzama: Number(recipe.szivekSzama || 0) + 1,
              }
            : recipe
        )
      );
    }
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
          {recipes.length === 0 ? (
            <p className="text-center">No recipes found.</p>
          ) : (
            recipes.map((r) => (
              <RecipeCard
                key={r.recipe_id}
                recipe={r}
                isFavourite={favourites.some((fav) =>
                  isSameRecipeId(fav.recipe_id, r.recipe_id)
                )}
                onToggleFavourite={handleToggleFavourite}
              />
            ))
          )}


          {recipes.map((r) => (
            <RecipeCard
              key={r.recipe_id}
              recipe={r}
              isFavourite={favourites.some((fav) => isSameRecipeId(fav.recipe_id, r.recipe_id))}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}

        </div>
      </div>
    </div>
  );
}
