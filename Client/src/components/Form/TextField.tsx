import { ErrorMessage, Field } from "formik";
import React from "react";

interface textFieldProps {
    field: string;
    displayName: string;
    type?: "text" | "password"
}

const TextField: React.FC<textFieldProps> = ({ field, displayName, type = "text" }) => {
    return (
        <div className="grid gap-2">
            <label htmlFor={field}>{displayName}</label>
            <Field type={type} id={field} name={field} className="py-2 px-3 border-2 rounded"/>
            <ErrorMessage name={field}>{msg =>
                <div className="text-red-500">{msg}</div>}
            </ErrorMessage>
        </div>
    )
}

export default TextField;