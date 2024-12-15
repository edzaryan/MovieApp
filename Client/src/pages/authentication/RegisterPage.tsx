import {authenticationResponse, userCredentials} from "../../auth/auth.models";
import { urlAccount } from "../../endpoints";
import axios from "axios";
import {useContext, useState} from "react";
import DisplayErrors from "../../utils/DisplayErrors";
import AuthForm from "../../auth/AuthForm";
import {getClaims, saveToken} from "../../auth/handleJWT";
import AuthenticationContext from "../../auth/AuthenticationContext";
import {useNavigate} from "react-router-dom";


const RegisterPage = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const { update } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    async function register(credentials: userCredentials) {
        try {
            setErrors([]);
            const response = await axios
                .post<authenticationResponse>(`${urlAccount}/create`, credentials);
            saveToken(response.data);
            update(getClaims());
            navigate("/");
        }
        catch (error) {
            setErrors(error.response.data);
        }
    }

    return (
        <div className="grid gap-5">
            <div className="text-2xl font-medium">Register</div>
            <DisplayErrors errors={errors}/>
            <AuthForm
                model={{ email: "", password: "" }}
                onSubmit={async values => await register(values)}
                buttonText="Register"
            />
        </div>
    )
}

export default RegisterPage;