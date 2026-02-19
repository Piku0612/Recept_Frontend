import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
    return (

        <>


            <div className="container d-flex vh-100 flex-column justify-content-center ">
                <div className="p-4 border border-secondary rounded" >

                    <input className="form-control mb-3" placeholder="Email" />
                    <input className="form-control mb-3" placeholder="Password" />

                    <button type="button" className="btn btn-outline-primary">Login</button>

                    <div class="text-center">
                        <p>Not a member? <NavLink to="/register" className="btn btn-outline-dark">
                            Register
                        </NavLink></p>
                    </div>

                </div>

            </div>
        </>

    )
}