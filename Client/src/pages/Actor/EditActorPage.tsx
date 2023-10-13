import React from "react";
import EditEntityPage from "../../utils/EditEntityPage";
import {actorCreationDTO, actorDTO} from "./Actors.model";
import ActorForm from "./ActorForm";
import {convertActorToFormData} from "../../utils/formDataUtils";

const EditActorPage: React.FC = () => {

    function transform(actor: actorDTO): actorCreationDTO {
        return {
            name: actor.name,
            pictureURL: actor.picture,
            biography: actor.biography,
            dateOfBirth: new Date(actor.dateOfBirth)
        }
    }

    return (
        <div className="container">
           <EditEntityPage<actorCreationDTO, actorDTO>
               url="/api/actor"
               entityName="Actors"
               indexURL="/actors"
               transformFormData={convertActorToFormData}
               transform={transform}
           >
               {(entity, edit) =>
                   <ActorForm model={entity} onSubmit={async values => await edit(values)} />
               }
           </EditEntityPage>
        </div>
    )
}

export default EditActorPage;