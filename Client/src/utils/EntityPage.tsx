import { ReactElement, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Link from "../components/Link";
import Pagination from "../components/Pagination";
import RecordsPerPageSelect from "../components/RecordsPerPageSelect";
import GenericList from "./GenericList";
import Button from "../components/Button";
import customConfirm from "./CustomConfirm";


interface entityProps<T> {
    url: string;
    title: string;
    createURL?: string;
    entityName?: string;
    children(entities: T[], buttons: (editURL: string, id: number) => ReactElement): ReactElement;
}

function EntityPage<T>(props: entityProps<T>) {
    const [entities, setEntities] = useState<T[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadData();
    }, [page, recordsPerPage]);

    function loadData() {
        axios
            .get(props.url, {
                params: { page, recordsPerPage }
            })
            .then((response: AxiosResponse<T[]>) => {
                const totalAmountOfRecords = parseInt(response.headers["totalamountofrecords"], 10);
                setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
                setEntities(response.data);
            });
    }

    async function deleteEntity(id: number) {
        try {
            await axios.delete(`${props.url}/${id}`);
            loadData();
        }
        catch (error) {
            if (error && error.response) {
                console.log(error.response.data);
            }
        }
    }

    const buttons = (editUrl: string, id: number) => (
        <>
            <Link className="mr-2" color="success" to={editUrl}>Edit</Link>
            <Button
                color="danger"
                onClick={() => customConfirm(() => deleteEntity(id))}>
                Delete
            </Button>
        </>
    );

    return (
        <>
            <div className="grid grid-flow-col justify-between items-center">
                <div className="text-3xl font-medium">{props.title}</div>
                {props.createURL && <Link to={props.createURL}>Create {props.entityName}</Link>}
            </div>
            <div className="grid grid-flow-col justify-end gap-5">
                <Pagination
                    currentPage={page}
                    totalAmountOfPages={totalAmountOfPages}
                    onChange={newPage => setPage(newPage)} />
                <RecordsPerPageSelect onChange={amountOfRecords => {
                    setPage(1);
                    setRecordsPerPage(amountOfRecords);
                }} />
            </div>
            <div>
                <GenericList list={entities}>
                    <div className="w-full">
                        {props.children(entities!, buttons)}
                    </div>
                </GenericList>
            </div>
        </>
    )
}

export default EntityPage;

