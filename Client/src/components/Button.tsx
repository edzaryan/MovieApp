import React from "react";


interface ButtonProps {
    children: React.ReactNode;
    color?: "primary" | "secondary" | "success" | "danger";
    onClick?(): void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
   children,
   type = "button",
   color = "primary",
   onClick,
   disabled = false,
   className = ""
}) => {
    const baseStyles = "inline-block px-4 py-2 text-md font-semibold rounded transition-colors duration-300";

    const colorClasses = {
        primary: disabled ? "bg-blue-300 text-blue-100" : "bg-blue-500 text-white hover:bg-blue-600",
        secondary: disabled ? "bg-gray-300 text-gray-100" : "bg-gray-500 text-white hover:bg-gray-600",
        success: disabled ? "bg-green-300 text-green-100" : "bg-green-500 text-white hover:bg-green-600",
        danger: disabled ? "bg-red-300 text-red-100" : "bg-red-500 text-white hover:bg-red-600",
    };

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`${baseStyles} ${colorClasses[color]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
