import React from "react";
import EntityPage from "../../utils/EntityPage";
import {actorDTO} from "./Actors.model";


const ActorPage: React.FC = () => {
    return (
        <div className="container">
            <EntityPage<actorDTO> url="/api/actor" createURL="/actors/create" title="Actor" entityName="Actor">
                {(actors, buttons) => <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actors?.map(actor => <tr key={actor.id}>
                            <td>
                                {buttons(`actor/edit/${actor.id}`, actor.id)}
                            </td>
                            <td>
                                {actor.name}
                            </td>
                        </tr>)}
                    </tbody>
                </>}
            </EntityPage>
        </div>
    )
}

export default ActorPage;