import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecipeCard() {

  const navigate = useNavigate();

  function handleClick() {
    navigate("/add-recipe");
  }

  return (
    <div className="col-md-4 mb-4">

      <div
        className="card h-100 d-flex align-items-center justify-content-center shadow-sm"
        style={{ cursor: "pointer", minHeight: "300px" }}
        onClick={handleClick}
      >

        <div className="text-center">
          <h1 style={{ fontSize: "4rem" }}>+</h1>
          <p className="text-muted">Add new recipe</p>
        </div>

      </div>

    </div>
  );
}