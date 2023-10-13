import React from "react";
import {MovieTheaterForm} from "./MovieTheaterForm";
import EditEntityPage from "../../utils/EditEntityPage";
import {movieTheaterCreationDTO, movieTheatreDTO} from "./MovieTheater.model";

const EditMovieTheatrePage: React.FC = () => {

    return (
        <div className="container">
            <EditEntityPage<movieTheaterCreationDTO, movieTheatreDTO>
                url="/api/movietheatres"
                entityName="Movie Theatre"
                indexURL="/movietheatres">
                {(entity, edit) =>
                    <MovieTheaterForm model={entity} onSubmit={async values => await edit(values)} />
                }
            </EditEntityPage>
        </div>
    )
}

export default EditMovieTheatrePage;