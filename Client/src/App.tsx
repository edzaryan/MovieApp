import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./route-config";
import "./App.css";
import configureValidations from "./utils/Functions/Validations";
import { claim } from "./auth/auth.models";
import AuthenticationContext from "./auth/AuthenticationContext";
import {getClaims} from "./auth/handleJWT";
import configureInterceptor from "./utils/httpInterceptors";

configureValidations();
configureInterceptor();


const App = () => {
    const [claims, setClaims] = useState<claim[]>([]);

    useEffect(() => {
        setClaims(getClaims());
    }, []);

    function isAdmin() {
        return claims.findIndex(claim => claim.name === "role" && claim.value === "admin") > -1;
    }

    return (
        <div className="grid gap-10">
            <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
                <Navbar/>
                <div className="grid justify-center">
                    <div className="w-[1500px]">
                        <Routes>
                            {routes.map((route) => (
                                <Route key={route.path} path={route.path} element={
                                    route.isAdmin && !isAdmin()
                                        ? <>You are not allowed to see this page</>
                                        : <route.component/>
                                } />
                            ))}
                        </Routes>
                    </div>
                </div>
            </AuthenticationContext.Provider>
        </div>
    );
}

export default App;
