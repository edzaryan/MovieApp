import React, {useContext, useState} from "react";
import AuthForm from "./AuthForm";
import {authenticationResponse, userCredentials} from "./auth.models";
import axios from "axios";
import {getClaims, saveToken} from "./handleJWT";
import DisplayErrors from "../utils/DisplayErrors";
import AuthenticationContext from "./AuthenticationContext";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {

    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    async function login(credentials: userCredentials) {
        try {
            setErrors([]);
            const response = await axios.post<authenticationResponse>("/api/accounts/login", credentials);
            saveToken(response.data);
            update(getClaims());
            navigate("/");
        }
        catch(error) {
            setErrors(error.response.data);
        }
    }

    return (
        <div className="container">
            <h3>Login</h3>
            <DisplayErrors errors={errors} />
            <AuthForm
                model={{ email: "", password: "" }}
                onSubmit={async values => await login(values)}
            />
        </div>
    );
}

export default Login;