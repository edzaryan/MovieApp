import ActorForm from "./ActorForm";
import React, {useState} from "react";
import {actorCreationDTO} from "./Actors.model";
import DisplayErrors from "../../utils/DisplayErrors";
import {convertActorToFormData} from "../../utils/formDataUtils";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateActorPage: React.FC = () => {

    const [errors, setErrors] = useState<string[]>([]);
    const navigation = useNavigate();

    async function create(actor: actorCreationDTO) {
        try {
            const formData = convertActorToFormData(actor);

            await axios({
                method: 'post',
                url: '/api/actor',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });

            navigation("/actors");
        } catch (error) {
            if (error && error.response) {
                setErrors(error.res.data);
            }
        }
    }

    return (
        <div className="container">
            <h3 className="mb-3">Create Actor</h3>
            <DisplayErrors errors={errors} />
            <ActorForm
                model={{ name: '', dateOfBirth: undefined }}
                onSubmit={async values => await create(values)}
            />
        </div>
    )
}

export default CreateActorPage;