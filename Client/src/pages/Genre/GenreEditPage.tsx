import EditEntityPage from "../../utils/EditEntityPage";
import GenreForm from "./GenreForm";
import { genreCreationDTO, genreDTO } from "./genre.model";
import { urlGenre } from "../../endpoints";


const GenreEditPage = () => {

    return (
        <div className="grid gap-5">
            <EditEntityPage<genreCreationDTO, genreDTO>
                entityName="Genres"
                redirectTo="/genres"
                url={urlGenre}>
                {(entity, edit) =>
                    <GenreForm
                        model={entity}
                        onSubmit={async value => {
                            await edit(value);
                        }}
                    />
                }
            </EditEntityPage>
        </div>
    )
}


export default GenreEditPage;