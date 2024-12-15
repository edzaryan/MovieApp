import {useEffect, useState} from "react";
import axios, { AxiosResponse } from "axios";
import {useNavigate, useParams} from "react-router-dom";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviePutGetDTO } from "../../components/Movie/movie.model";
import { urlMovie } from "../../endpoints";
import {convertMovieToFormData} from "../../utils/formDataUtils";
import DisplayErrors from "../../utils/DisplayErrors";
import Loading from "../../utils/Loading";


const MovieEditPage = () => {
    const {id}: any = useParams();
    const [movie, setMovie] = useState<movieCreationDTO>();
    const [moviePutGet, setMoviePutGet] = useState<moviePutGetDTO>();
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${urlMovie}/PutGet/${id}`)
            .then((response: AxiosResponse<moviePutGetDTO>) => {
               const model: movieCreationDTO = {
                   title: response.data.movie.title,
                   inTheaters: response.data.movie.inTheaters,
                   trailer: response.data.movie.trailer,
                   posterURL: response.data.movie.poster,
                   summary: response.data.movie.summary,
                   releaseDate: new Date(response.data.movie.releaseDate)
               }

               setMovie(model);
               setMoviePutGet(response.data);
            });
    }, [id]);

    async function edit(movieToEdit: movieCreationDTO) {
        try {
            const formData = convertMovieToFormData(movieToEdit);
            await axios({
                method: "put",
                url: `${urlMovie}/${id}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            });

            navigate(`/movie/${id}`);
        }
        catch(error) {
            setErrors(error.response.data)
        }
    }

    return (
        <div className="grid gap-5">
            <div className="text-2xl font-medium">Edit Movie</div>
            <DisplayErrors errors={errors} />
            {
                movie && moviePutGet
                    ? <MovieForm
                        model={movie}
                        selectedGenres={moviePutGet.selectedGenres}
                        nonSelectedGenres={moviePutGet.nonSelectedGenres}
                        selectedMovieTheatres={moviePutGet.selectedMovieTheaters}
                        nonSelectedMovieTheatres={moviePutGet.nonSelectedMovieTheaters}
                        selectedActors={moviePutGet.actors}
                        onSubmit={ async values => await edit(values) }
                    />
                    : <Loading />
            }

        </div>
    );
}

export default MovieEditPage;