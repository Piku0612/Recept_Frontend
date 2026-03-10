import React from "react";
import { useNavigate } from "react-router-dom";
import { List } from "../api";

export default function RecipeCard({ recipe }) {

  const navigate = useNavigate();

  function openRecipe() {
    navigate(`/recipe/list`);
  }

  return (
    <div className="col-md-4 mb-4">

      <div className="card h-100 shadow-sm">

        <img
          src={recipe.image || "https://via.placeholder.com/400x200"}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title">
            {recipe.title}
          </h5>

          <p className="card-text">
            {recipe.description?.slice(0, 120)}...
          </p>

          <p className="text-muted small">
            <strong>Ingredients:</strong> {recipe.ingredient}
          </p>

          <button
            className="btn btn-warning mt-auto"
            onClick={openRecipe}
          >
            View Recipe
          </button>

        </div>

      </div>

    </div>
  );
}