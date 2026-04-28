import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function AppNavbar({ user, onLogout }) {

  const isLoggedIn = !!user
  const normalizedRole = String(user?.role ?? "").toLowerCase()
  const isAdmin = normalizedRole === "admin" || normalizedRole === "1"

  const nav = useNavigate()
  const [search, setSearch] = useState("")

  // ✅ PROFIL STATE
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  function handleSearch() {
    if (!search.trim()) return
    nav(`/home?search=${search}`)
  }

  function handleSave() {
    if (password !== confirm) {
      alert("A jelszavak nem egyeznek!")
      return
    }

    console.log("Új név:", name)
    console.log("Új jelszó:", password)

    alert("Mentve!")
    setShowModal(false)
  }

  return (

    <>
      {/* HEADER */}
      <div className="bg-white border-bottom py-3">
        <div className="container">
          <div className="row align-items-center g-3">

            {/* Logo */}
            <div className="col-12 col-md-3 text-center text-md-start">
              <h2 className="fw-bold m-0">
                <span className="bg-dark text-white px-2">LH</span> LessHassle
              </h2>
            </div>

            {/* Search */}
            <div className="col-12 col-md-5">
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Search receipt..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-warning"
                  onClick={handleSearch}
                >
                  🔍
                </button>
              </div>
            </div>

            {isLoggedIn ? (
              <>
                {/* Admin */}
                <div className="col-6 col-md-1 text-center text-md-end">
                  {isAdmin && (
                    <NavLink to='/admin' className="btn btn-outline-dark">
                      Admin
                    </NavLink>
                  )}
                </div>

                {/* Logout */}
                <div className="col-6 col-md-1 text-center text-md-end">
                  <NavLink onClick={onLogout} className="btn btn-outline-dark">
                    Logout
                  </NavLink>
                </div>

                {/* ✅ PROFIL IKON */}
                <div className="col-12 col-md-2 text-center text-md-end">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Profil"
                    width="40"
                    height="40"
                    className="rounded-circle"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowModal(true)}
                  />
                </div>

              </>
            ) : (
              <>
                {/* Register */}
                <div className="col-6 col-md-1 text-center text-md-end">
                  <NavLink to="/register" className="btn btn-outline-dark">
                    Register
                  </NavLink>
                </div>

                {/* Login */}
                <div className="col-6 col-md-1 text-center text-md-end">
                  <NavLink to="/login" className="btn btn-outline-dark">
                    Login
                  </NavLink>
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="bg-black text-white py-2">
        <div className="container d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
          <NavLink to="/home" className="text-white text-decoration-none my-1">
            Receipts
          </NavLink>
          <NavLink to="/ownreceipts" className="text-white text-decoration-none my-1">
            OwnReceipts
          </NavLink>
          <NavLink to="/toplist" className="text-white text-decoration-none my-1">
            Toplist
          </NavLink>
          <NavLink to="/favourites" className="text-white text-decoration-none my-1">
            Favourites
          </NavLink>
        </div>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Profil módosítása</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Új név</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Új jelszó</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Jelszó megerősítése</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Bezárás
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Mentés
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </>
  )
}