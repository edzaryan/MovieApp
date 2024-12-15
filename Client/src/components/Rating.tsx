import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import AuthenticationContext from "../auth/AuthenticationContext";
import Swal from "sweetalert2";


interface RatingProps {
    maximumValue: number;
    selectedValue: number;
    onChange(rate: number): void;
}

const Rating: React.FC<RatingProps> = ({ maximumValue, selectedValue, onChange }) => {
    const [maximumValueArr, setMaximumValueArr] = useState<number[]>([]);
    const [selValue, setSelValue] = useState(selectedValue);
    const { claims } = useContext(AuthenticationContext);

    useEffect(() => {
        setMaximumValueArr(Array.from({ length: maximumValue }, (_, i) => i + 1));
    }, [maximumValue]);

    function handleMouseOver(rate: number) {
        setSelValue(rate);
    }

    function handleClick(rate: number) {
        const userIsLoggedIn = claims.length > 0;
        if (!userIsLoggedIn) {
            Swal.fire({ title: "Error", text: "You need to login", icon: "error" });
            return;
        }

        setSelValue(rate);
        onChange(rate);
    }

    return (
        <>
            {maximumValueArr.map((_, index) => (
                <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    className={`cursor-pointer text-gray-400 ${selValue >= index + 1 && "text-yellow-400"}`}
                    onClick={() => handleClick(index + 1)}
                />
            ))}
        </>
    );
};

export default Rating;
