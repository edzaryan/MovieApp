import { Field, ErrorMessage } from 'formik';
import React from "react";

interface textFieldProps {
    field: string;
    displayName: string;
    type?: "text" | "password";
}

const TextField: React.FC<textFieldProps> = ({ field, displayName, type="text" }) => {
    return (
        <div className="mb-3">
            <label className="mb-1" htmlFor={field}>{displayName}</label>
            <Field name={field} id={field} className="form-control" type={type} />
            <ErrorMessage name={field}>
                {msg => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
        </div>
    )
}

export default TextField;