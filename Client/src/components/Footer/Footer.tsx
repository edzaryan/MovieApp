import React from "react";

const Footer: React.FC = () => {
    return (
        <div className="bd-footer py-5 mt-5 bg-light">
            <div className="container">
                React Movies {new Date().getFullYear().toString()}
            </div>
        </div>
    )
}

export default Footer;