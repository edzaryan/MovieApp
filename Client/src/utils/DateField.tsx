import {useFormikContext} from "formik";
import React from "react";

interface dateFieldProps {
    field: string;
    displayName: string;
}

const DateField: React.FC<dateFieldProps> = ({ field, displayName }) => {

    const { values, validateForm, touched, errors } = useFormikContext<any>();

    return (
        <div className="mb-3">
            <label className="mb-1" htmlFor={field}>{displayName}</label>
            <input
                type="date"
                className="form-control"
                id={field}
                name={field}
                defaultValue={values[field]?.toLocaleDateString('en-CA')}
                onChange={e => {
                    const date = new Date(e.currentTarget.value + 'T00:00:00');
                    values[field] = date;
                    validateForm();
                }}
            />
            {touched[field] && errors[field] ?
                <div className="text-danger">{errors[field]?.toString()}</div> : null}
        </div>
    )
}

export default DateField;