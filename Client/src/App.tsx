import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import routes from "./route-conf";
import configureValidations from "./Validations";
import configureInterceptor from "./utils/httpInterceptors";
import React, {useEffect, useState} from "react";
import Footer from "./components/Footer/Footer";
import { claim } from "./auth/auth.models";
import AuthenticationContext from "./auth/AuthenticationContext";
import {getClaims} from "./auth/handleJWT";

configureValidations();
configureInterceptor();

const App: React.FC = () => {

  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
      setClaims(getClaims());
  }, []);

  function isAdmin() {
      return claims.findIndex(claims => claims.name === "role" && claims.value === "admin") > -1;
  }
  
  return (
    <>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
          <Navbar />

          <Routes>
              {routes.map((route) => (
                  <Route key={route.path} path={route.path} element={
                      route.isAdmin && !isAdmin() ?
                          <div className="container">You are not allowed to see this page</div> :
                          <route.component />
                  } />
              ))}
          </Routes>

          <Footer />
      </AuthenticationContext.Provider>
    </>
  );
}

export default App;
