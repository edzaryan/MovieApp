import EditEntityPage from "../../utils/EditEntityPage";
import {movieTheaterCreationDTO, movieTheaterDTO} from "./movieTheater.model";
import {urlMovieTheater} from "../../endpoints";
import MovieTheaterForm from "./MovieTheaterForm";


const MovieTheaterEditPage = () => {
    return (
        <div className="grid gap-5">
            <EditEntityPage<movieTheaterCreationDTO, movieTheaterDTO>
                entityName="Movie Theater"
                redirectTo="/movieTheaters"
                url={urlMovieTheater}
            >
                {(movieTheater, edit) =>
                    <MovieTheaterForm
                        model={movieTheater}
                        onSubmit={ async values => await edit(values) }
                    />
                }
            </EditEntityPage>
        </div>
    )
}

export default MovieTheaterEditPage;