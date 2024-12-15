import { useNavigate, useParams } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";


interface editEntityProps<TCreation, TRead> {
    url: string;
    entityName: string;
    redirectTo: string;
    transform(entity: TRead): TCreation;
    transformFormData?(model: TCreation): FormData;
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntityPage.defaultProps = {
    transform: (entity: any) => entity
}

function EditEntityPage<TCreation, TRead>(props: editEntityProps<TCreation, TRead>) {

    const {id}: any = useParams();
    const [entity, setEntity] = useState<TCreation>();
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${props.url}/${id}`)
            .then((response: AxiosResponse<TRead>) => {
                setEntity(props.transform(response.data));
            });
    }, [id]);

    async function edit(entityToEdit: TCreation) {
        try {
            if (props.transformFormData) {
                const formData = props.transformFormData(entityToEdit);
                await axios({
                    method: "put",
                    url: `${props.url}/${id}`,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
            else {
                await axios.put(`${props.url}/${id}`, entityToEdit);
            }

            navigate(props.redirectTo);
        }
        catch (error) {
            if (error && error.response) {
                setErrors(error.response.data);
            }
        }
    }

    return (
        <>
            <div className="text-2xl font-medium">Edit {props.entityName}</div>
            <DisplayErrors errors={errors} />
            {
                entity
                    ? props.children(entity, edit)
                    : <Loading />
            }
        </>
    )
}

export default EditEntityPage;