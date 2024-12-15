import React, { useEffect, useState } from "react";


interface paginationProps {
    currentPage: number;
    totalAmountOfPages: number;
    radio?: number;
    onChange(page: number): void;
}

interface linkModel {
    page: number;
    enabled: boolean;
    text: string;
    active: boolean;
}

const Pagination: React.FC<paginationProps> = ({ currentPage, totalAmountOfPages, radio = 3, onChange }) => {
    const [linkModels, setLinkModels] = useState<linkModel[]>([]);

    function selectPage(link: linkModel) {
        if (link.page === currentPage) {
            return;
        }

        if (!link.enabled) {
            return;
        }

        onChange(link.page);
    }

    function getClass(link: linkModel) {
        if (link.active) {
            return "bg-blue-500 text-white";
        }

        if (!link.enabled) {
            return "text-gray-400 cursor-not-allowed";
        }

        return "text-blue-500 hover:bg-blue-100 cursor-pointer";
    }

    useEffect(() => {
        const previousPageEnabled = currentPage !== 1;
        const previousPage = currentPage - 1;
        const links: linkModel[] = [];

        links.push({
            text: "Previous",
            enabled: previousPageEnabled,
            page: previousPage,
            active: false,
        });

        for (let i = 1; i <= totalAmountOfPages; i++) {
            if (i >= currentPage - radio && i <= currentPage + radio) {
                links.push({
                    text: `${i}`,
                    active: currentPage === i,
                    enabled: true,
                    page: i,
                });
            }
        }

        const nextPageEnabled = currentPage !== totalAmountOfPages && totalAmountOfPages > 0;
        const nextPage = currentPage + 1;
        links.push({
            text: "Next",
            page: nextPage,
            enabled: nextPageEnabled,
            active: false,
        });

        setLinkModels(links);
    }, [currentPage, totalAmountOfPages, radio]);

    return (
        <div className="inline-grid grid-flow-col gap-2 justify-center select-none">
            {
                linkModels.map((link, index) => (
                    <div
                        key={link.text}
                        onClick={() => selectPage(link)}
                        className={`
                            page-item ${getClass(link)} 
                            px-4 py-2 border border-gray-100 cursor-pointer 
                            ${ index === 0 && "rounded-l-md" } 
                            ${ index === linkModels.length - 1 && "rounded-r-md" }`}>
                        <a className="page-link">{link.text}</a>
                    </div>
                ))
            }
        </div>
    );
};

export default Pagination;
