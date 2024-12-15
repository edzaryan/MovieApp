import React, { ReactElement } from "react";
import Loading from "./Loading";

interface genericListProps {
    list: any;
    loadingUI?: ReactElement;
    emptyListUI?: ReactElement;
    children: ReactElement;
}

const GenericList: React.FC<genericListProps> = ({ list, loadingUI, emptyListUI, children }) => {
    if (!list) {
        if (loadingUI) {
            return loadingUI;
        }
        return <Loading />;
    } else if (list.length === 0) {
        if (emptyListUI) {
            return emptyListUI;
        }
        return <>There are not elements to display</>
    } else {
        return children;
    }
}

export default GenericList;