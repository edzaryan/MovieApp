import React, {useEffect, useState} from "react";

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
            return "active pointer";
        }

        if (!link.enabled) {
            return "disabled";
        }

        return "pointer";
    }

    useEffect(() => {
        const previousPageEnabled = currentPage !== 1;
        const previousPage = currentPage - 1;
        const links: linkModel[] = [];

        links.push({
            text: 'Previous',
            enabled: previousPageEnabled,
            page: previousPage,
            active: false
        });

        for (let i = 1; i <= totalAmountOfPages; i++) {
            if (i >= currentPage - radio && i <= currentPage + radio) {
                links.push({
                    text: `${i}`,
                    active: currentPage === 1,
                    enabled: true,
                    page: i
                });
            }
        }

        const nextPageEnabled = currentPage !== totalAmountOfPages && totalAmountOfPages > 0;
        const nextPage = currentPage + 1;

        links.push({
            text: 'Next',
            page: nextPage,
            enabled: nextPageEnabled,
            active: false
        });

        setLinkModels(links);

    }, [currentPage, totalAmountOfPages, radio]);

    return (
        <ul className="pagination justify-content-center">
            {
                linkModels.map(link => <li key={link.text} onClick={() => selectPage(link)} className={`page-item cursor ${getClass(link)}`}>
                    <a className="page-link">{link.text}</a>
                </li>)
            }
        </ul>
    )
}

export default Pagination;