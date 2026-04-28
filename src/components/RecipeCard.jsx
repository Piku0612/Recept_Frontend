import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../api";

export default function RecipeCard({ recipe, isFavourite, onToggleFavourite }) {
  const navigate = useNavigate();

  function openRecipe() {
    navigate(`/recipe/${recipe.recipe_id}`);
  }

  const imageSrc = getImageUrl(recipe.image_url);

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

            {onToggleFavourite && (
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
            )}
          </div>

          <div className="mt-1 text-muted small">
            <span style={{ color: "red", marginRight: "5px" }}>♥</span>
            <span>{recipe.szivekSzama || 0}</span>
          </div>

          <p className="card-text mt-2">
            {recipe.description?.slice(0, 120)}...
          </p>

          <button className="btn btn-warning mt-auto" onClick={openRecipe}>
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}