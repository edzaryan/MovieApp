import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ActorForm from "./ActorForm";
import DisplayErrors from "../../utils/DisplayErrors";
import { urlActor } from "../../endpoints";
import { actorCreationDTO } from "./actors.model";
import { convertActorToFormData } from "../../utils/formDataUtils";


const ActorCreatePage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(actor: actorCreationDTO) {
        try {
            const formData = convertActorToFormData(actor);

            await axios({
                method: "post",
                url: urlActor,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            });

            navigate("/actors");
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setErrors(error.response.data);
                } else {
                    setErrors(["An unknown error occurred"]);
                }
            } else {
                setErrors(["An unexpected error occurred"]);
            }
        }
    }

    return (
        <div className="grid gap-5">
            <div className="text-2xl font-medium">Create Actor</div>
            <DisplayErrors errors={errors} />
            <ActorForm
                model={{
                    name: "",
                    dateOfBirth: undefined
                }}
                onSubmit={ async values => await create(values) }
            />
        </div>
    )
}

export default ActorCreatePage;