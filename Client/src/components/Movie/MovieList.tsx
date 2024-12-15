import React from "react";
import { movieDTO } from "./movie.model";
import MovieCard from "./MovieCard";
import GenericList from "../../utils/GenericList";

interface moviesListProps {
    movies?: movieDTO[];
}

const MovieList: React.FC<moviesListProps> = ({ movies }) => {
    return (
        <GenericList list={movies}>
            <div className="inline-grid grid-cols-8 justify-start gap-[20px]">
                {
                    movies?.map(movie =>
                        <MovieCard {...movie} key={movie.id} />)
                }
            </div>
        </GenericList>
    )
}

export default MovieList;