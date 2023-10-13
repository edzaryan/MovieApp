import React from "react";
import './MultipleSelector.css';

interface multipleSelectorProps {
    displayName: string;
    selected: multipleSelectorModel[];
    nonSelected: multipleSelectorModel[];
    onChange(selected: multipleSelectorModel[], nonSelected: multipleSelectorModel[]): void;
}

export interface multipleSelectorModel {
    key: number;
    value: string;
}

const MultipleSelector: React.FC<multipleSelectorProps> = ({ selected, nonSelected, onChange, displayName }) => {

    const select = (item: multipleSelectorModel) => {
        const newSelected = [...selected, item];
        const newNonSelected = nonSelected.filter(value => value !== item);
        onChange(newSelected, newNonSelected);
    }

    const deselect = (item: multipleSelectorModel) => {
        const newNonSelected = [...nonSelected, item];
        const newSelected = selected.filter(value => value !== item);
        onChange(newSelected, newNonSelected);
    }

    const selectAll = () => {
        const allSelected = [...selected, ...nonSelected];
        const newNonSelected: multipleSelectorModel[] = [];
        onChange(allSelected, newNonSelected);
    }

    const deselectAll = () => {
        const allNonSelected = [...nonSelected, ...selected];
        const newSelected: multipleSelectorModel[] = [];
        onChange(newSelected, allNonSelected);
    }

    return (
        <div className="mb-3">
            <label className="mb-1">{displayName}</label>
            <div className="multiple-selector">
                <ul>
                    {nonSelected.map(item => <li key={item.key} onClick={() => select(item)}>{item.value}</li>)}
                </ul>
                <div className="multiple-selector-buttons">
                    <button type="button" onClick={selectAll}>{">>"}</button>
                    <button type="button" onClick={deselectAll}>{"<<"}</button>
                </div>
                <ul>
                    {selected.map(item => <li key={item.key} onClick={() => deselect(item)}>{item.value}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default MultipleSelector;