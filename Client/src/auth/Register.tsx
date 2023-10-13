import axios from "axios";
import {authenticationResponse, userCredentials} from "./auth.models";
import React, {useContext, useState} from "react";
import DisplayErrors from "../utils/DisplayErrors";
import AuthForm from "./AuthForm";
import {getClaims, saveToken} from "./handleJWT";
import AuthenticationContext from "./AuthenticationContext";
import {useNavigate} from "react-router-dom";

const Register: React.FC = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    async function register(credentials: userCredentials) {
        try {
            setErrors([]);
            const response = await axios.post<authenticationResponse>("/api/accounts/create", credentials);
            saveToken(response.data);
            update(getClaims());
            navigate("/");
        }
        catch (error) {
            setErrors(error.response.data);
        }
    }

    return (
        <div className="container">
            <h3>Register</h3>
            <DisplayErrors errors={errors} />
            <AuthForm
                model={{email: "", password: ""}}
                onSubmit={async values => await register(values)} />
        </div>
    )

}

export default Register;