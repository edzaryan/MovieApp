import React, {useEffect, useState} from "react";
import MovieForm from "./MovieForm";
import {genreDTO} from "../Genre/Genres.model";
import {movieTheatreDTO} from "../MovieTheater/MovieTheater.model";
import axios, {AxiosResponse} from "axios";
import {movieCreationDTO, moviesPostGetDTO} from "../../components/Movie/Movies.model";
import Loading from "../../utils/Loading";
import {convertMovieToFormData} from "../../utils/formDataUtils";
import {useNavigate} from "react-router-dom";
import DisplayErrors from "../../utils/DisplayErrors";


const CreateMoviePage: React.FC = () => {
    const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
    const [nonSelectedMovieTheatres, setNonSelectedMovieTheatres] = useState<movieTheatreDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        axios.get(`/api/movies/postget`)
            .then((response: AxiosResponse<moviesPostGetDTO>) => {
                setNonSelectedGenres(response.data.genres);
                setNonSelectedMovieTheatres(response.data.movieTheatres);
                setLoading(false);
            })
    }, []);

    async function create(movie: movieCreationDTO) {
        try {
            const formData = convertMovieToFormData(movie);
            const response = await axios({
                method: "post",
                url: "/api/movies",
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });

            navigation(`/movie/${response.data}`)
        }
        catch(error) {
            setErrors(error.response.data);
        }
    }

    return (
        <div className="container">
            <h3>Create Movie</h3>
            <DisplayErrors errors={errors} />
            {
                loading ?
                    <Loading /> :
                    <MovieForm
                        model={{title: "", inTheatres: false, trailer: ""}}
                        onSubmit={ async values => await create(values) }
                        selectedGenres={[]}
                        nonSelectedGenres={nonSelectedGenres}
                        selectedMovieTheatres={[]}
                        nonSelectedMovieTheatres={nonSelectedMovieTheatres}
                        selectedActors={[]}
                     />
            }
        </div>
    )
}

export default CreateMoviePage;