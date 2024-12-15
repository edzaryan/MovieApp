import React from 'react';


const Footer = () => {
    return (
        <div className="grid justify-center bg-gray-100">
            <div className="w-[1700px] m-3">
                React Movies {new Date().getFullYear().toString()}
            </div>
        </div>
    )
};

export default Footer;