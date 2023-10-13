import React, {useEffect, useState} from "react";
import MovieForm from "./MovieForm";
import {useNavigate, useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {movieCreationDTO, moviePutGetDTO} from "../../components/Movie/Movies.model";
import {convertMovieToFormData} from "../../utils/formDataUtils";
import DisplayErrors from "../../utils/DisplayErrors";
import Loading from "../../utils/Loading";


const EditMoviePage: React.FC = () => {

    const {id}: any = useParams();
    const [movie, setMovie] = useState<movieCreationDTO>();
    const [moviePutGet, setMoviePutGet] = useState<moviePutGetDTO>();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`/api/movies/PutGet/${id}`)
            .then((response: AxiosResponse<moviePutGetDTO>) => {
               const model: movieCreationDTO = {
                   title: response.data.movie.title,
                   inTheatres: response.data.movie.inTheatres,
                   trailer: response.data.movie.trailer,
                   actors: response.data.movie.actors,
                   posterURL: response.data.movie.poster,
                   summary: response.data.movie.summary,
                   releaseDate: new Date(response.data.movie.releaseDate)
               };

                setMovie(model);
                setMoviePutGet(response.data);
            });
    }, [id]);

    async function edit(movieToEdit: movieCreationDTO) {
        try {
            const formData = convertMovieToFormData(movieToEdit);
            await axios({
                method: "put",
                url: `/api/movies/${id}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"}
            });

            navigate(`/movie/${id}`);
        }
        catch (error) {
            setErrors(error.response.data);
        }
    }

    return (
        <div className="container">
            <h3>Edit Movie Page</h3>
            <DisplayErrors errors={errors} />
            {
                movie && moviePutGet ? <MovieForm
                    model={movie}
                    onSubmit={async values => await edit(values)}
                    selectedGenres={moviePutGet.selectedGenres}
                    nonSelectedGenres={moviePutGet.nonSelectedGenres}
                    selectedMovieTheatres={moviePutGet.selectedMovieTheatres}
                    nonSelectedMovieTheatres={moviePutGet.nonSelectedMovieTheatres}
                    selectedActors={moviePutGet.actors}
                /> : <Loading />
            }
        </div>
    )
}

export default EditMoviePage;