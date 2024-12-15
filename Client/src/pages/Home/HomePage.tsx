import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import MovieList from "../../components/Movie/MovieList";
import { homePageDTO } from "../../components/Movie/movie.model";
import { urlMovie } from "../../endpoints";
import AlertContext from "../../utils/AlertContext";


const HomePage = () => {
    const [movies, setMovies] = useState<homePageDTO>({});

    useEffect(() => {
        loadData();
    }, []);

    function loadData() {
        axios.get(urlMovie)
            .then((response: AxiosResponse<homePageDTO>) => {
                setMovies(response.data);
            });
    }

    return (
        <AlertContext.Provider value={() => {
            loadData();
        }}>
            <div className="grid gap-10">
                <div className="grid gap-4">
                    <div className="text-2xl font-medium">In Theatres</div>
                    <MovieList movies={movies.inTheaters}/>
                </div>
                <div className="grid gap-4">
                    <div className="text-2xl font-medium">Upcoming Releases</div>
                    <MovieList movies={movies.upcomingReleases}/>
                </div>
            </div>
        </AlertContext.Provider>
    )
}

export default HomePage;