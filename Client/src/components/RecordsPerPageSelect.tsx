import React from "react";


interface recordsPerPageSelectProps {
    onChange(recordsPerPage: number): void;
}

const RecordsPerPageSelect: React.FC<recordsPerPageSelectProps> = ({ onChange }) => {
    return (
        <select
            className="p-2 border rounded"
            defaultValue={5}
            onChange={e => {
                onChange(parseInt(e.currentTarget.value, 10));
            }}
        >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
        </select>
    )
}

export default RecordsPerPageSelect;