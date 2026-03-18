import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import { Logout, whoAmI } from "../api";

export default function AddRecipe() {

  const [user, setUser] = useState(null)
  const [errorUser, setErrorUser] = useState('')

  //WhoAmi
  useEffect(() => {
    async function load() {
      const data = await whoAmI()
      //console.log(data);
      if (data.error) {
        return setErrorUser(data.error)

      }


      return setUser(data)
    }
    load()
  }, [])

  async function onLogout() {
    const data = await Logout()
    if (data.error) {
      return setErrorUser(data.error)
    }
    setUser(null)
    navigate('/')
  }

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch("/recipe/add", {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.error || "Error adding recipe");
      }

      setSuccess("Recipe added successfully!");

      setTimeout(() => {
        navigate("/ownreceipts");
      }, 1000);

    } catch (err) {
      setError("Server error");
    }
  }

  return (


    <div>
      <div>
        <AppNavbar user={user} onLogout={onLogout} />
        {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}
        <div className="container mt-4"></div>
      </div>


      <div className="container mt-4">

        <h2 className="mb-4">Add New Recipe</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ingredients</label>
            <textarea
              className="form-control"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button className="btn btn-warning">
            Add Recipe
          </button>

        </form>

      </div>

    </div>
  );
}