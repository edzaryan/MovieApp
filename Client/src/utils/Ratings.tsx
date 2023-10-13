import React, { useContext, useEffect, useState } from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "./Rating.css";
import AuthenticationContext from "../auth/AuthenticationContext";
import Swal from "sweetalert2";


interface ratingsProps {
    maximumValue: number;
    selectedValue: number;
    onChange(rate: number): void;
}

const Ratings: React.FC<ratingsProps> = ({ maximumValue, selectedValue, onChange }) => {

    const [maximumValueArr, setMaximumValueArr] = useState<number[]>([]);
    const [selValue, setSelectedValue] = useState(selectedValue);
    const {claims} = useContext(AuthenticationContext);

    useEffect(() => {
        setMaximumValueArr(Array(maximumValue).fill(0));
    }, [maximumValue])

    function handleMouseOver(rate: number){
        setSelectedValue(rate);
    }

    function handleClick(rate: number){
        const userIsLoggedIn = claims.length > 0;
        if (!userIsLoggedIn){
            Swal.fire({title: 'Error', text: 'You need to login', icon: 'error'});
            return;
        }

        setSelectedValue(rate);
        onChange(rate);
    }

    return (
        <>
            {maximumValueArr.map((_, index) => <FontAwesomeIcon
                onMouseOver={() => handleMouseOver(index+1)}
                onClick={() => handleClick(index+1)}
                icon="star" key={index}
                className={`fa-lg pointer ${selValue >= index+1 ? 'checked' : null}`}
            />)}
        </>
    )
}

export default Ratings;