import React from "react";

interface buttonProps {
    children: React.ReactNode;
    onClick?(): void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
}


const Button: React.FC<buttonProps> = ({ children, onClick, className = "btn btn-primary", type = "button", disabled = false }) => {
    return (
        <button type={type} disabled={disabled} className={className} onClick={onClick}>{children}</button>
    )
}

export default Button;