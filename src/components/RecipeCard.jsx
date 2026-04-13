import React from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://192.168.10.110:4000";

export default function RecipeCard({ recipe, isFavourite, onToggleFavourite }) {
  const navigate = useNavigate();
  const heartColor = isFavourite ? "#dc3545" : "#adb5bd";

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
              className="btn p-0 border-0 bg-transparent d-inline-flex align-items-center justify-content-center"
              aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill={isFavourite ? heartColor : "none"}
                viewBox="0 0 16 16"
                style={{
                  color: heartColor,
                  transition: "0.2s",
                  cursor: "pointer",
                }}
              >
                <path
                  fillRule="evenodd"
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </button>
          </div>

          <p className="card-text mt-2">{recipe.description?.slice(0, 120)}...</p>

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
