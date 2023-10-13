import MovieCard from "./MovieCard";
import { movieDTO } from "./Movies.model";
import css from "./MovieList.module.css";
import GenericList from "./../../utils/GenericList";
import React from "react";

interface moviesListProps {
    movies?: movieDTO[];
}


const MovieList: React.FC<moviesListProps> = ({ movies }) => {
    return (
        <GenericList list={movies}>
            <div className={css.div}>
                {movies?.map(movie => <MovieCard {...movie} key={movie.id} />)}
            </div>
        </GenericList>
    )
}

export default MovieList;