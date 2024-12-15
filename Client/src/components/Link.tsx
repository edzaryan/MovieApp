import React from "react";
import { Link as RouterLink } from "react-router-dom";


interface LinkProps {
    children: React.ReactNode;
    color?: "primary" | "secondary" | "success" | "danger";
    to: string;
    className?: string;
}

const Link: React.FC<LinkProps> = ({
   children,
   color = "primary",
   to,
   className = ""
}) => {
    const baseStyles = "inline-block px-4 py-2 text-center text-md font-semibold rounded cursor-pointer transition-colors duration-100";

    const typeStyles = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
    };

    return (
        <RouterLink to={to} className={`${baseStyles} ${typeStyles[color]} ${className}`}>
            {children}
        </RouterLink>
    );
};

export default Link;
