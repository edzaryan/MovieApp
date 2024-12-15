import React, {useContext, useState} from "react";
import AuthForm from "../../auth/AuthForm";
import {authenticationResponse, userCredentials} from "../../auth/auth.models";
import axios from "axios";
import {urlAccount} from "../../endpoints";
import DisplayErrors from "../../utils/DisplayErrors";
import {getClaims, saveToken} from "../../auth/handleJWT";
import AuthenticationContext from "../../auth/AuthenticationContext";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const { update } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    async function login(credentials: userCredentials) {
        try {
            setErrors([]);
            const response = await axios
                .post<authenticationResponse>(`${urlAccount}/login`, credentials);

            saveToken(response.data);
            update(getClaims());
            navigate("/");
        }
        catch(error) {
            setErrors(error.response.data);
        }
    }

    return (
        <div className="grid gap-5">
            <div className="text-2xl font-medium">Login</div>
            <DisplayErrors errors={errors}/>
            <AuthForm
                model={{ email: "", password: "" }}
                onSubmit={async values => await login(values)}
                buttonText="Login"
            />
        </div>
    )
}

export default Login;