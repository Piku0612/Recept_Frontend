import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import {
  whoAmI,
  Logout,
  listAdminUsers,
  updateAdminUser,
  deleteAdminUser,
  listAdminRecipes,
  updateAdminRecipe,
  deleteAdminRecipe,
  listAdminEmails,
  updateAdminEmail,
  deleteAdminEmail,
} from "../api";

export default function Admin() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [errorUser, setErrorUser] = useState("");
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [emails, setEmails] = useState([]);

  const [errorUsers, setErrorUsers] = useState("");
  const [errorRecipes, setErrorRecipes] = useState("");
  const [errorEmails, setErrorEmails] = useState("");

  const [editType, setEditType] = useState("");
  const [editId, setEditId] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");

  const [emailAddress, setEmailAddress] = useState("");
  const [emailLabel, setEmailLabel] = useState("");
  const [emailStatus, setEmailStatus] = useState("active");

  function isAdmin(roleValue) {
    const roleText = String(roleValue ?? "").toLowerCase();
    return roleText === "admin" || roleText === "1";
  }

  function getUserId(item) {
    return item.user_id || item.id;
  }

  function getRecipeId(item) {
    return item.recipe_id || item.id;
  }

  function getEmailId(item) {
    return item.email_id || item.id;
  }

  function resetEdit() {
    setEditType("");
    setEditId("");
    setUsername("");
    setEmail("");
    setRole("user");
    setTitle("");
    setDescription("");
    setIngredients("");
    setEmailAddress("");
    setEmailLabel("");
    setEmailStatus("active");
  }

  function normalizeList(data, key) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.[key])) return data[key];
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }

  useEffect(() => {
    async function load() {
      const data = await whoAmI();

      if (data.error) {
        setErrorUser(data.error);
        setLoading(false);
        return;
      }

      setUser(data);

      if (!isAdmin(data.role)) {
        setLoading(false);
        return;
      }

      const usersData = await listAdminUsers();
      if (usersData.error) {
        setErrorUsers(usersData.error);
      } else {
        setUsers(normalizeList(usersData, "users"));
      }

      const recipesData = await listAdminRecipes();
      if (recipesData.error) {
        setErrorRecipes(recipesData.error);
      } else {
        setRecipes(normalizeList(recipesData, "recipes"));
      }

      const emailsData = await listAdminEmails();
      if (emailsData.error) {
        setErrorEmails(emailsData.error);
      } else {
        setEmails(normalizeList(emailsData, "emails"));
      }

      setLoading(false);
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

  function startEditUser(item) {
    setEditType("user");
    setEditId(getUserId(item));
    setUsername(item.username || item.name || "");
    setEmail(item.email || item.mail || "");
    setRole(String(item.role || item.user_role || "user").toLowerCase());
  }

  function startEditRecipe(item) {
    setEditType("recipe");
    setEditId(getRecipeId(item));
    setTitle(item.title || item.name || "");
    setDescription(item.description || item.instructions || "");
    setIngredients(item.ingredients || item.ingredient_list || "");
  }

  function startEditEmail(item) {
    setEditType("email");
    setEditId(getEmailId(item));
    setEmailAddress(item.email || item.address || item.mail || "");
    setEmailLabel(item.label || item.type || "");
    setEmailStatus(String(item.status || item.state || "active").toLowerCase());
  }

  async function saveUser() {
    const data = await updateAdminUser(editId, { username, email, role });

    if (data.error) {
      return setErrorUsers(data.error);
    }

    setUsers((prev) =>
      prev.map((item) =>
        String(getUserId(item)) === String(editId)
          ? { ...item, username, email, role }
          : item
      )
    );

    resetEdit();
  }

  async function saveRecipe() {
    const data = await updateAdminRecipe(editId, { title, description, ingredients });

    if (data.error) {
      return setErrorRecipes(data.error);
    }

    setRecipes((prev) =>
      prev.map((item) =>
        String(getRecipeId(item)) === String(editId)
          ? { ...item, title, description, ingredients }
          : item
      )
    );

    resetEdit();
  }

  async function saveEmail() {
    const data = await updateAdminEmail(editId, {
      email: emailAddress,
      label: emailLabel,
      status: emailStatus,
    });

    if (data.error) {
      return setErrorEmails(data.error);
    }

    setEmails((prev) =>
      prev.map((item) =>
        String(getEmailId(item)) === String(editId)
          ? { ...item, email: emailAddress, label: emailLabel, status: emailStatus }
          : item
      )
    );

    resetEdit();
  }

  async function handleDeleteUser(id) {
    const ok = window.confirm("Delete this user?");
    if (!ok) return;

    const data = await deleteAdminUser(id);
    if (data.error) {
      return setErrorUsers(data.error);
    }

    setUsers((prev) => prev.filter((item) => String(getUserId(item)) !== String(id)));
    if (String(editId) === String(id)) resetEdit();
  }

  async function handleDeleteRecipe(id) {
    const ok = window.confirm("Delete this recipe?");
    if (!ok) return;

    const data = await deleteAdminRecipe(id);
    if (data.error) {
      return setErrorRecipes(data.error);
    }

    setRecipes((prev) => prev.filter((item) => String(getRecipeId(item)) !== String(id)));
    if (String(editId) === String(id)) resetEdit();
  }

  async function handleDeleteEmail(id) {
    const ok = window.confirm("Delete this email?");
    if (!ok) return;

    const data = await deleteAdminEmail(id);
    if (data.error) {
      return setErrorEmails(data.error);
    }

    setEmails((prev) => prev.filter((item) => String(getEmailId(item)) !== String(id)));
    if (String(editId) === String(id)) resetEdit();
  }

  return (
    <div>
      <AppNavbar user={user} onLogout={onLogout} />
      {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}

      <div className="container mt-4 mb-5">
        {loading ? (
          <div className="alert alert-secondary text-center">Loading...</div>
        ) : !user ? (
          <div className="alert alert-secondary text-center">You need to log in first.</div>
        ) : !isAdmin(user.role) ? (
          <div className="alert alert-danger text-center">You are not admin, so you cannot open this page.</div>
        ) : (
          <>
            <h2 className="mb-4">Admin Page</h2>

            <div className="mb-4 d-flex gap-2 flex-wrap">
              <button
                className={`btn ${activeTab === "users" ? "btn-dark" : "btn-outline-dark"}`}
                onClick={() => {
                  setActiveTab("users");
                  resetEdit();
                }}
              >
                Users
              </button>
              <button
                className={`btn ${activeTab === "recipes" ? "btn-dark" : "btn-outline-dark"}`}
                onClick={() => {
                  setActiveTab("recipes");
                  resetEdit();
                }}
              >
                Recipes
              </button>
              <button
                className={`btn ${activeTab === "emails" ? "btn-dark" : "btn-outline-dark"}`}
                onClick={() => {
                  setActiveTab("emails");
                  resetEdit();
                }}
              >
                Emails
              </button>
            </div>

            {activeTab === "users" && (
              <>
                <h4 className="mb-3">Users</h4>
                {errorUsers && <div className="alert alert-danger">{errorUsers}</div>}

                <div className="table-responsive mb-4">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item) => (
                        <tr key={getUserId(item)}>
                          <td>{item.username || item.name}</td>
                          <td>{item.email || item.mail}</td>
                          <td>{item.role || item.user_role}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-dark me-2"
                              onClick={() => startEditUser(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-dark"
                              onClick={() => handleDeleteUser(getUserId(item))}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {editType === "user" && (
                  <div className="border rounded p-3">
                    <h5 className="mb-3">Edit User</h5>

                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </div>

                    <button className="btn btn-dark me-2" onClick={saveUser}>
                      Save
                    </button>
                    <button className="btn btn-outline-dark" onClick={resetEdit}>
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === "recipes" && (
              <>
                <h4 className="mb-3">Recipes</h4>
                {errorRecipes && <div className="alert alert-danger">{errorRecipes}</div>}

                <div className="table-responsive mb-4">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Ingredients</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipes.map((item) => (
                        <tr key={getRecipeId(item)}>
                          <td>{item.title || item.name}</td>
                          <td>{item.description || item.instructions}</td>
                          <td>{item.ingredients || item.ingredient_list}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-dark me-2"
                              onClick={() => startEditRecipe(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-dark"
                              onClick={() => handleDeleteRecipe(getRecipeId(item))}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {editType === "recipe" && (
                  <div className="border rounded p-3">
                    <h5 className="mb-3">Edit Recipe</h5>

                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                      />
                    </div>

                    <button className="btn btn-dark me-2" onClick={saveRecipe}>
                      Save
                    </button>
                    <button className="btn btn-outline-dark" onClick={resetEdit}>
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === "emails" && (
              <>
                <h4 className="mb-3">Emails</h4>
                {errorEmails && <div className="alert alert-danger">{errorEmails}</div>}

                <div className="table-responsive mb-4">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Email</th>
                        <th>Label</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emails.map((item) => (
                        <tr key={getEmailId(item)}>
                          <td>{item.email || item.address || item.mail}</td>
                          <td>{item.label || item.type}</td>
                          <td>{item.status || item.state}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-dark me-2"
                              onClick={() => startEditEmail(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-dark"
                              onClick={() => handleDeleteEmail(getEmailId(item))}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {editType === "email" && (
                  <div className="border rounded p-3">
                    <h5 className="mb-3">Edit Email</h5>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Label</label>
                      <input
                        className="form-control"
                        value={emailLabel}
                        onChange={(e) => setEmailLabel(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={emailStatus}
                        onChange={(e) => setEmailStatus(e.target.value)}
                      >
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                    </div>

                    <button className="btn btn-dark me-2" onClick={saveEmail}>
                      Save
                    </button>
                    <button className="btn btn-outline-dark" onClick={resetEdit}>
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
