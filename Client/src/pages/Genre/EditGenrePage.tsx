import React from "react";
import {genreCreationDTO, genreDTO} from "./Genres.model";
import EditEntityPage from "../../utils/EditEntityPage";
import GenreForm from "./GenreForm";


const EditGenrePage: React.FC = () => {
    return (
        <div className="container">
            <EditEntityPage<genreCreationDTO, genreDTO> url="/api/genres" entityName="Genres" indexURL="/genres">
                {(entity, edit) =>
                    <GenreForm model={entity}
                           onSubmit={async value => {
                                await edit(value);
                           }}
                    />}
            </EditEntityPage>
        </div>
    )
}

export default EditGenrePage;