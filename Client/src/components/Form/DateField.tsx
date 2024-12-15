import React from "react";
import { useFormikContext } from "formik";

interface dateFieldProps {
    field: string;
    displayName: string;
}

const DateField: React.FC<dateFieldProps> = ({ field, displayName }) => {
    const { values, validateForm, touched, errors } = useFormikContext<any>();

    const dateValue = values[field] ? values[field].toLocaleDateString("en-CA") : "";

    return (
        <div className="grid gap-2">
            <label htmlFor={field}>{displayName}</label>
            <input
                id={field}
                type="date"
                name={field}
                value={dateValue}
                onChange={e => {
                    const date = e.target.value ? new Date(e.target.value + "T00:00:00") : null;
                    values[field] = date;
                    validateForm();
                }}
                className="py-2 px-3 border-2 rounded"
            />
            {touched[field] && errors[field] &&
                <div className="text-red-500">{errors[field]?.toString()}</div>}
        </div>
    )
}

export default DateField;
