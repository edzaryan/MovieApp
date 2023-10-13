import React from "react";
import {Field} from "formik";

interface checkboxFieldProps {
    field: string;
    displayName: string;
    inTheatres: boolean;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const CheckboxField: React.FC<checkboxFieldProps> = ({ field, displayName, inTheatres, onChange }) => {
    return (
        <div className="mb-3 form-check">
            <Field
                id={field}
                name={field}
                className="form-check-input"
                type="checkbox"
                checked={inTheatres}
                onClick={onChange}
            />
            <label htmlFor={field}>{displayName}</label>
        </div>
    )
}

export default CheckboxField;