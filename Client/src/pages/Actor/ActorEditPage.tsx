import ActorForm from "./ActorForm";
import {useParams} from "react-router-dom";
import EditEntityPage from "../../utils/EditEntityPage";
import {actorCreationDTO, actorDTO} from "./actors.model";
import {urlActor} from "../../endpoints";
import {convertActorToFormData} from "../../utils/formDataUtils";


const ActorEditPage = () => {
    function transform(actor: actorDTO): actorCreationDTO {
        return {
            name: actor.name,
            pictureURL: actor.picture,
            biography: actor.biography,
            dateOfBirth: new Date(actor.dateOfBirth)
        }
    }

    return (
        <div className="grid gap-5">
            <EditEntityPage<actorCreationDTO, actorDTO>
                entityName="Actors"
                redirectTo="/actors"
                url={urlActor}
                transformFormData={convertActorToFormData}
                transform={transform}
            >
                {(entity, edit) =>
                    <ActorForm
                        model={entity}
                        onSubmit={async values => await edit(values)}
                    />
                }
            </EditEntityPage>
        </div>
    )
}

export default ActorEditPage;
