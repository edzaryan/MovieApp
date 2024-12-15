import EntityPage from "../../utils/EntityPage";
import { actorDTO } from "./actors.model";
import { urlActor } from "../../endpoints";


const ActorPage = () => {
    return (
        <div className="grid gap-10">
            <EntityPage<actorDTO>
                url={urlActor}
                title="Actors"
                createURL="/actor/create"
                entityName="Actor">
                {(actors, buttons) =>
                    <>
                        <div className="grid grid-cols-[1fr_1fr] border-b-2">
                            <div className="px-4 py-5 text-md font-bold text-gray-700">Name</div>
                            <div className="px-4 py-5 text-md font-bold text-gray-700">Actions</div>
                        </div>
                        {
                            actors?.map(actor =>
                                <div key={actor.id} className="grid grid-cols-[1fr_1fr] border-b hover:bg-gray-50">
                                    <div className="px-4 py-2 text-sm text-gray-600 grid items-center">{actor.name}</div>
                                    <div className="px-4 py-2">
                                        {buttons(`/actor/edit/${actor.id}`, actor.id)}
                                    </div>
                                </div>
                            )
                        }
                    </>
                }
            </EntityPage>
        </div>
    )
}

export default ActorPage;