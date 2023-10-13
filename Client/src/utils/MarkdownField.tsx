import React from "react";
import {Field, useFormikContext} from "formik";
import ReactMarkdown from "react-markdown";
import './MarkdownField.css';

interface markdownFieldProps {
    displayName: string;
    field: string;
}

const MarkdownField: React.FC<markdownFieldProps> = ({ displayName, field }) => {
    const { values } = useFormikContext<any>();

    return (
        <div className="form-markdown">
            <div>
                <label>{displayName}</label>
                <div>
                    <Field name={field} as="textarea" className="form-textarea" />
                </div>
            </div>
            <div>
                <label>{displayName} (preview):</label>
                <div className="markdown-container">
                    <ReactMarkdown>{values[field]}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

export default MarkdownField;