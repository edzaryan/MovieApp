import React, {ReactElement, useContext, useEffect} from "react";
import AuthenticationContext from "./AuthenticationContext";

interface authorizedProps {
    authorized: ReactElement;
    notAuthorized?: ReactElement;
    role?: string;
}

const Authorized: React.FC<authorizedProps> = ({ authorized, notAuthorized, role }) => {
    const [isAuthorized, setIsAuthorized] = React.useState(true);
    const { claims } = useContext(AuthenticationContext);

    useEffect(() => {
        if (role) {
            const index = claims.findIndex(claim => claim.name === "role" && claim.value === role);
            setIsAuthorized(index > -1);
        } else {
            setIsAuthorized(claims.length > 0);
        }
    }, [claims, role]);

    return (
        <>
            { isAuthorized ? authorized : notAuthorized }
        </>
    )
}

export default Authorized;