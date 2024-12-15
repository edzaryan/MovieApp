import React from "react";

interface DisplayErrorsProps {
    errors?: string[];
}

const DisplayErrors: React.FC<DisplayErrorsProps> = ({ errors }) =>
    errors?.length ? (
        <ul className="list-disc pl-5">
            {errors.map((error, index) => (
                <li className="text-red-500" key={index}>{error}</li>
            ))}
        </ul>
    ) : null;

export default DisplayErrors;
