import React from "react";
import IndexEntity from "../../utils/EntityPage";
import {movieTheatreDTO} from "./MovieTheater.model";


const MovieTheatrePage: React.FC = () => {

    return (
        <div className="container">
            <IndexEntity<movieTheatreDTO>
                url="/api/movieTheatres"
                createURL="/movietheatres/create"
                title="Movie Theatres"
                entityName="Movie Theatre"
            >
                {(entities, buttons) => <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {entities?.map(entity => <tr key={entity.id}>
                        <td>
                            {buttons(`/movietheatres/edit/${entity.id}`, entity.id)}
                        </td>
                        <td>
                            {entity.name}
                        </td>
                    </tr>)}
                    </tbody>
                </>}
            </IndexEntity>
        </div>
    )
}

export default MovieTheatrePage;