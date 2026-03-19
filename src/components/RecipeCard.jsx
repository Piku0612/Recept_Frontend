import React from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://192.168.10.110:4000";

export default function RecipeCard({ recipe, isFavourite, onToggleFavourite }) {
  const navigate = useNavigate();

  function openRecipe() {
    navigate(`/recipe/list`);
  }

  const imageSrc = recipe.image_url
    ? `${BACKEND_URL}${recipe.image_url}`
    : "https://via.placeholder.com/400x200";

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={imageSrc}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title mb-0">{recipe.title}</h5>

            <button
              type="button"
              onClick={() => onToggleFavourite(recipe.recipe_id)}
              className="btn p-0 border-0 bg-transparent"
              style={{ fontSize: "1.5rem" }}
            >
              <span
                style={{
                  color: isFavourite ? "red" : "#ccc",
                  transition: "0.2s",
                  cursor: "pointer",
                }}
              >
                ♥
              </span>
            </button>
          </div>

          <p className="card-text mt-2">
            {recipe.description?.slice(0, 120)}...
          </p>

          <p className="text-muted small">
            <strong>Ingredients:</strong> {recipe.ingredients}
          </p>

          <button className="btn btn-warning mt-auto" onClick={openRecipe}>
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}