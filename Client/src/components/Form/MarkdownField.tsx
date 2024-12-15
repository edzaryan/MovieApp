import React from "react";
import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";

interface markdownFieldProps {
    displayName: string;
    field: string;
}

const MarkdownField: React.FC<markdownFieldProps> = ({ displayName, field }) => {
    const {values} = useFormikContext<any>();

    return (
        <div className="grid gap-8 grid-flow-col justify-start">
            <div className="grid gap-2">
                <label>{displayName}</label>
                <Field name={field} as="textarea" className="w-[500px] h-[500px] border-2 outline-none" />
            </div>
            <div className="grid gap-2">
                <label>{displayName} (preview)</label>
                <ReactMarkdown className="w-[500px] h-[500px] border-2 prose overflow-auto">{values[field]}</ReactMarkdown>
            </div>
        </div>
    )
};

export default MarkdownField;