import { NavLink, useNavigate } from 'react-router-dom'

export default function AppNavbar() {
    const nav = useNavigate()

    return (

             <>
      {/* HEADER */}
      <div className="bg-white border-bottom py-3">
        <div className="container">
          <div className="row align-items-center g-3">

            {/* Logo */}
            <div className="col-12 col-md-3 text-center text-md-start">
              <h2 className="fw-bold m-0">
                <span className="bg-dark text-white px-2">LH</span> LessHastle
              </h2>
            </div>

            {/* Search */}
            <div className="col-12 col-md-6">
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Search receipt..."
                />
                <button className="btn btn-warning">🔍</button>
              </div>
            </div>

            {/* Register */}
            <div className="col-12 col-md-1 text-center text-md-end">
              <NavLink to="/register" className="btn btn-outline-dark">
                Register
              </NavLink>
            </div>

            {/* Login */}
            <div className="col-12 col-md-2 text-center text-md-end">
              <NavLink to="/login" className="btn btn-outline-dark">
                Login
              </NavLink>
            </div>

          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="bg-black text-white py-2">
        <div className="container d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
          <NavLink to="/home" className="text-white text-decoration-none">
            Receipts
          </NavLink>
          <NavLink to="/ownreceipts" className="text-white text-decoration-none">
            OwnReceipts
          </NavLink>

          <NavLink to="/toplist" className="text-white text-decoration-none">
            Toplist
          </NavLink>

          <NavLink to="/favourites" className="text-white text-decoration-none">
            Favourites
          </NavLink>
        </div>
      </div>

     
    </>

    )
}