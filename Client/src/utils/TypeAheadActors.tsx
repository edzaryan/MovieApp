import React, {ReactElement, useState} from "react";
import {actorMovieDTO} from "../pages/Actor/Actors.model";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import axios, {AxiosResponse} from "axios";

interface typeAheadActorsProps {
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors: actorMovieDTO[]): void;
    onRemove(actors: actorMovieDTO[]): void;
    listUI(actor: actorMovieDTO): ReactElement;
}

const TypeAheadActors: React.FC<typeAheadActorsProps> = ({ displayName, actors, onAdd, onRemove, listUI }) => {

    const [draggedElement, setDraggedElement] = useState<actorMovieDTO | undefined>(undefined);
    const [actorList, setActorList] = useState<actorMovieDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const selected: actorMovieDTO[] = [];

    function handleSearch(query: string) {
        setIsLoading(true);
        axios.get(`/api/actor/searchByName/${query}`)
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

                        console.log(actors);
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
                renderMenuItemChildren={(option) => {
                    const actor = option as actorMovieDTO;
                    return (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "auto 1fr",
                            alignItems: "center"
                        }}>
                            <div style={{
                                    width: '46px',
                                    height: '64px',
                                    marginRight: '10px',
                                    backgroundImage: `url(${actor.picture})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}>
                            </div>
                            <span>{actor.name}</span>
                        </div>
                    );
                }}
            />
            <ul className="list-group mt-2">
                {
                    actors.map(actor => <li key={actor.id} className="list-group-item" draggable={true} onDragStart={() => handleDragStart(actor)} onDragOver={() => handleDragOver(actor)}>
                        { listUI(actor) }
                        <span className="badge text-bg-light pointer"
                            onClick={() => {
                                const updatedActors = actors.filter(a => a.id !== actor.id);
                                onRemove(updatedActors);
                            }}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </li>)
                }
            </ul>
        </div>
    );
}

export default TypeAheadActors;
