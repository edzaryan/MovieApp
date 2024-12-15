import React, { ReactElement, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosResponse } from "axios";
import { actorMovieDTO } from "../../pages/actor/actors.model";
import { urlActor } from "../../endpoints";


interface typeAheadActorsProps {
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors: actorMovieDTO[]): void;
    onRemove(actors: actorMovieDTO[]): void;
    listUI(actor: actorMovieDTO): ReactElement;
}

const TypeAheadActors: React.FC<typeAheadActorsProps> = ({
    displayName, actors, onAdd, onRemove, listUI
}) => {

    const [draggedElement, setDraggedElement] = useState<actorMovieDTO | undefined>(undefined);
    const [actorList, setActorList] = useState<actorMovieDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const selected: actorMovieDTO[] = [];

    function handleSearch(query: string) {
        setIsLoading(true);

        axios.get(`${urlActor}/searchByName/${query}`)
            .then((response: AxiosResponse<actorMovieDTO[]>) => {
                setActorList(response.data);
                setIsLoading(false);
            });
    }

    function handleDragStart(actor: actorMovieDTO) {
        setDraggedElement(actor);
    }

    function handleDragOver(actor: actorMovieDTO) {
        if (!draggedElement) {
            return;
        }

        if (actor.id !== draggedElement.id) {
            const draggedElementIndex = actors.findIndex(x => x.id === draggedElement.id);
            const actorIndex = actors.findIndex(x => x.id === actor.id);

            const actorsx = [...actors];
            actorsx[actorIndex] = draggedElement;
            actorsx[draggedElementIndex] = actor;
            onAdd(actorsx);
        }
    }

    return (
        <div className="mb-3">
            <label className="mb-1">{displayName}</label>
            <AsyncTypeahead
                id="typeahead"
                onChange={selectedActor => {
                    if (selectedActor.length === 0) return;

                    if (actors.findIndex(x => x.id === (selectedActor[0] as actorMovieDTO).id) === -1) {
                        onAdd([...actors, (selectedActor[0] as actorMovieDTO)]);
                    }
                }}
                options={actorList}
                selected={selected}
                labelKey="name"
                filterBy={() => true}
                isLoading={isLoading}
                onSearch={handleSearch}
                placeholder="Actor name..."
                minLength={1}
                flip={true}
                renderMenuItemChildren={ option => {
                    const { name, picture } = option as actorMovieDTO;
                    return (
                        <div className="grid grid-cols-[auto_1fr] items-center gap-4 w-[400px] bg-white">
                            <div className="w-[60px] h-[75px] bg-cover bg-no-repeat bg-center"
                                 style={{ backgroundImage: `url(${picture})` }} />
                            <div>{name}</div>
                        </div>
                    );
                }}
            />
            <div className="list-group mt-2">
                {
                    actors.map(actor => (
                        <div
                            key={actor.id}
                            className="grid grid-flow-col justify-start items-center gap-2 p-2 border-2 rounded"
                            draggable={true}
                            onDragStart={() => handleDragStart(actor)}
                            onDragOver={() => handleDragOver(actor)}>
                            { listUI(actor) }
                            <div
                                className="w-[34px] h-[34px] grid items-center justify-center cursor-pointer border rounded"
                                onClick={() => onRemove(actors.filter(a => a.id !== actor.id))}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default TypeAheadActors;