import {Link, NavLink} from 'react-router-dom';
import Authorized from "../../auth/Authorized";
import Button from "../../utils/Button";
import {logout} from "../../auth/handleJWT";
import {useContext} from "react";
import AuthenticationContext from "../../auth/AuthenticationContext";

const Navbar = () => {

    const {update, claims} = useContext(AuthenticationContext);

    function getUserEmail(): string {
        return claims.filter(x => x.name === "email")[0]?.value;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">React Movies</NavLink>
                <div className="collapse navbar-collapse" style={{ display: "flex", justifyContent: "space-between" }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/movie/filter" className="nav-link">Filter Movies</NavLink>
                        </li>
                        <Authorized role="admin"
                            authorized={<>
                                <li className="nav-item">
                                    <NavLink to="/genres" className="nav-link">Genres</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/actors" className="nav-link">Actors</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/movietheatres" className="nav-link">Movie Theaters</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/movie/create" className="nav-link">Create a Movie</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/users" className="nav-link">Users</NavLink>
                                </li>
                            </>}
                        />
                    </ul>
                    <Authorized
                        authorized={<>
                            <span className="nav-link">Hello, {getUserEmail()}</span>
                            <Button onClick={() => {
                                logout();
                                update([]);
                            }} className="nav-link btn btn-link">Log out</Button>
                        </>}
                        notAuthorized={<>
                            <ul className="navbar-nav">
                                <li className="nav-link">
                                    <Link to="/register" className="btn btn-primary">Register</Link>
                                </li>
                                <li className="nav-link">
                                    <Link to="/login" className="btn btn-light">Login</Link>
                                </li>
                            </ul>
                        </>}
                    />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;