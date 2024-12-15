import React from "react";


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
        <div className="grid gap-2">
            <label>{displayName}</label>
            <div className="grid grid-flow-col justify-start gap-4">
                <ul className="w-[180px] h-[200px] overflow-y-auto border-2 rounded">
                    {nonSelected.map(item =>
                        <li className="cursor-pointer px-2 py-1 hover:bg-gray-200 border-b-2" key={item.key} onClick={() => select(item)}>{item.value}</li>)}
                </ul>
                <div className="flex flex-col justify-center items-center gap-3">
                    <button className="w-10 h-10 text-black border-2 transition duration-100 rounded" onClick={selectAll}>{">>"}</button>
                    <button className="w-10 h-10 text-black border-2 transition duration-100 rounded" onClick={deselectAll}>{"<<"}</button>
                </div>
                <ul className="w-[180px] h-[200px] overflow-y-auto border-2 rounded">
                    {selected.map(item =>
                        <li className="cursor-pointer px-2 py-1 hover:bg-gray-200 border-b-2" key={item.key} onClick={() => deselect(item)}>{item.value}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default MultipleSelector;