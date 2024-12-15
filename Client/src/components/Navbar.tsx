import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import ButtonLink from "../components/Link";
import Authorized from "../auth/Authorized";
import Button from "./Button";
import { logout } from "../auth/handleJWT";
import AuthenticationContext from "../auth/AuthenticationContext";


const Navbar = () => {
    const { update, claims } = useContext(AuthenticationContext);

    function getUserEmail(): string {
        return claims.filter(x => x.name === "email")[0]?.value;
    }

    return (
        <div className="sticky top-0 left-0 right-0 bg-gray-100 grid justify-center select-none">
            <div className="w-[1700px] grid grid-flow-col justify-between">
                <div className="grid grid-flow-col gap-10">
                    <Link to="/" className="text-[22px] py-3">React Movies</Link>
                    <div className="grid grid-flow-col items-center gap-6">
                        <NavLink className="grid items-center no-underline text-gray-500 font-medium" to="/movies/filter">Filter Movies</NavLink>
                        <Authorized
                            role="admin"
                            authorized={
                                <>
                                    <NavLink className="no-underline text-gray-500 font-medium"
                                             to="/genres">Genres</NavLink>
                                    <NavLink className="no-underline text-gray-500 font-medium"
                                             to="/actors">Actors</NavLink>
                                    <NavLink className="no-underline text-gray-500 font-medium"
                                             to="/movietheaters">Movie Theaters</NavLink>
                                    <NavLink className="no-underline text-gray-500 font-medium"
                                             to="/movie/create">Create a Movie</NavLink>
                                    <NavLink className="no-underline text-gray-500 font-medium"
                                             to="/users">Users</NavLink>
                                </>
                            }
                        />
                    </div>
                </div>
                <div className="grid items-center">
                    <Authorized
                        authorized={
                            <div className="grid grid-flow-col items-center gap-4">
                                <div>Hello, {getUserEmail()}</div>
                                <Button onClick={() => {
                                    logout();
                                    update([]);
                                }}>Log out</Button>
                            </div>
                        }
                        notAuthorized={
                            <div className="grid grid-flow-col gap-4">
                                <ButtonLink color="secondary" to="/register">Register</ButtonLink>
                                <ButtonLink to="/login">Login</ButtonLink>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar;