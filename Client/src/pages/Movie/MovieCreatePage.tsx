import MovieForm from "./MovieForm";
import { genreDTO } from "../genre/genre.model";
import {movieCreationDTO, moviesPostGetDTO} from "../../components/Movie/movie.model";
import { movieTheaterDTO } from "../movieTheater/movieTheater.model";
import {useEffect, useState} from "react";
import { urlMovie } from "../../endpoints";
import axios, {AxiosResponse} from "axios";
import Loading from "../../utils/Loading";
import { convertMovieToFormData } from "../../utils/formDataUtils";
import { useNavigate } from "react-router-dom";
import DisplayErrors from "../../utils/DisplayErrors";


const MovieCreatePage = () => {
    const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState<movieTheaterDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${urlMovie}/postget`)
            .then((response: AxiosResponse<moviesPostGetDTO>) => {
                setNonSelectedGenres(response.data.genres);
                setNonSelectedMovieTheaters(response.data.movieTheaters);
                setLoading(false);
            });
    }, []);

    async function create(movie: movieCreationDTO) {
        try {
            const formData = convertMovieToFormData(movie);
            const response = await axios({
                method: "post",
                url: urlMovie,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            });

            navigate(`/movie/${response.data}`);
        }
        catch (error) {
            setErrors(error.response.data);
        }
    }

    return (
        <div className="grid gap-5">
            <div className="text-2xl font-medium">Create Movie</div>
            <DisplayErrors errors={errors} />
            {loading
                ? <Loading />
                : <MovieForm
                    model={{
                        title: "",
                        inTheaters: false,
                        trailer: "",
                    }}
                    selectedGenres={[]}
                    nonSelectedGenres={nonSelectedGenres}
                    selectedMovieTheatres={[]}
                    nonSelectedMovieTheatres={nonSelectedMovieTheaters}
                    selectedActors={[]}
                    onSubmit={ async values => await create(values) }
                />
            }
        </div>
    );
}

export default MovieCreatePage;