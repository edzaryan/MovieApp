import React from "react";
import { Field } from "formik";

interface checkboxFieldProps {
    displayName: string;
    field: string;
}

const CheckboxField: React.FC<checkboxFieldProps> = ({ displayName, field }) => {
    return (
        <div className="grid grid-flow-col items-center justify-start gap-2">
            <Field type="checkbox" className="w-4 h-4" id={field} name={field} />
            <label htmlFor={field}>{displayName}</label>
        </div>
    )
}

export default CheckboxField;