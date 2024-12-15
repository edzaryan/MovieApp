import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { genreDTO } from "../genre/genre.model";
import Button from "../../components/Button";
import axios, { AxiosResponse } from "axios";
import { urlGenre, urlMovie } from "../../endpoints";
import { movieDTO } from "../../components/Movie/movie.model";
import MovieList from "../../components/Movie/MovieList";
import {useLocation, useNavigate} from "react-router-dom";
import Pagination from "../../components/Pagination";

interface filterMoviesForm {
    title: string;
    genreId: number;
    upcomingReleases: boolean;
    inTheaters: boolean;
    page: number;
    recordsPerPage: number;
}

const MovieFilterPage = () => {
    const [genres, setGenres] = useState<genreDTO[]>([]);
    const [movies, setMovies] = useState<movieDTO[]>([]);
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);

    const initialValues: filterMoviesForm = {
        title: "",
        genreId: 0,
        upcomingReleases: false,
        inTheaters: false,
        page: 1,
        recordsPerPage: 10
    };

    useEffect(() => {
        axios.get(`${urlGenre}/all`)
            .then((response: AxiosResponse<genreDTO[]>) => {
                setGenres(response.data);
            });
    }, []);

    useEffect(() => {
        if (query.get("title")) {
            initialValues.title = query.get("title")!;
        }

        if (query.get("genreId")) {
            initialValues.genreId = parseInt(query.get("genreId")!, 10);
        }

        if (query.get("upcomingReleases")) {
            initialValues.upcomingReleases = true;
        }

        if (query.get("inTheaters")) {
            initialValues.inTheaters = true;
        }

        if (query.get("page")) {
            initialValues.page = parseInt(query.get("page")!, 10);
        }

        searchMovies(initialValues);
    }, []);

    function searchMovies(values: filterMoviesForm) {
        modifyURL(values);
        axios.get(`${urlMovie}/filter`, { params: values })
            .then((response: AxiosResponse<movieDTO[]>) => {
                const records = parseInt(response.headers["totalamountofrecords"], 10);
                setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage));
                setMovies(response.data);
            });
    }

    function modifyURL(values: filterMoviesForm) {
        const queryStrings: string[] = [];

        if (values.title) {
            queryStrings.push(`title=${values.title}`);
        }

        if (values.genreId) {
            queryStrings.push(`genreId=${values.genreId}`);
        }

        if (values.upcomingReleases) {
            queryStrings.push(`upcomingReleases=${values.upcomingReleases}`);
        }

        if (values.inTheaters) {
            queryStrings.push(`inTheaters=${values.inTheaters}`);
        }

        queryStrings.push(`page=${values.page}`);
        navigate(`/movies/filter?${queryStrings.join("&")}`);
    }

    return (
        <div className="grid gap-5">
            <div className="text-2xl font-medium">Filter Movies</div>
            <Formik
                initialValues={initialValues}
                onSubmit={ values => {
                    values.page = 1;
                    searchMovies(values);
                }}
            >
                {(formikProps) => (
                    <>
                        <Form>
                            <div className="grid grid-flow-col justify-start gap-6">
                                <div className="grid items-center">
                                    <input type="text" id="title" className="py-2 px-3 border-2 rounded"
                                           placeholder="Title of the movie" {...formikProps.getFieldProps("title")} />
                                </div>
                                <div className="grid items-center">
                                    <select
                                        className="py-2 px-3 border-2 rounded" {...formikProps.getFieldProps("genreId")}>
                                        <option value="0">-- Choose a genre --</option>
                                        {genres.map(genre =>
                                            <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                                    </select>
                                </div>
                                <div className="grid items-center">
                                    <div className="grid grid-flow-col items-center gap-2">
                                        <Field id="upcomingReleases" name="upcomingReleases" type="checkbox" className="w-4 h-4" />
                                        <label htmlFor="upcomingReleases">Upcoming Releases</label>
                                    </div>
                                </div>
                                <div className="grid items-center">
                                    <div className="grid grid-flow-col items-center gap-2">
                                        <Field id="inTheaters" name="inTheaters" type="checkbox" className="w-4 h-4" />
                                        <label htmlFor="inTheaters">In Theaters</label>
                                    </div>
                                </div>
                                <div className="grid items-center grid-flow-col gap-2">
                                    <Button onClick={() => formikProps.submitForm()} color="primary">Filter</Button>
                                    <Button onClick={() => {
                                        formikProps.setValues(initialValues);
                                        searchMovies(initialValues);
                                    }} color="danger">Clear</Button>
                                </div>
                            </div>
                        </Form>
                        <MovieList movies={movies} />
                        <Pagination
                            currentPage={formikProps.values.page}
                            totalAmountOfPages={totalAmountOfPages}
                            onChange={newPage => {
                                formikProps.values.page = newPage;
                                searchMovies(formikProps.values);
                            }}
                        />
                    </>
                )}
            </Formik>
        </div>
    )
}

export default MovieFilterPage;