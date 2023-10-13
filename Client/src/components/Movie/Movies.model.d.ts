import {actorDTO, actorMovieDTO} from "../../pages/Actor/Actors.model";
import {genreDTO} from "../../pages/Genre/Genres.model";
import {movieTheatreDTO} from "../../pages/MovieTheater/MovieTheater.model";

export interface movieDTO {
    id: number;
    title: string;
    poster: string;
    inTheatres: boolean;
    trailer: string;
    summary?: string;
    releaseDate: Date;
    genres: genreDTO[];
    movieTheatres: movieTheatreDTO[];
    actors: actorMovieDTO[];
    userVote: number;
    averageVote: number;
}

export interface movieCreationDTO {
    title: string;
    inTheatres: boolean;
    trailer: string;
    summary?: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
    genresIds?: number[];
    movieTheatresIds?: number[];
    actors?: actorMovieDTO[];
}

export interface homePageDTO {
    inTheatres?: movieDTO[];
    upcomingReleases?: movieDTO[];
}

export interface moviesPostGetDTO {
    genres: genreDTO[];
    movieTheatres: movieTheatreDTO[];
}

export interface moviePutGetDTO {
    movie: movieDTO;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheatres: movieTheatreDTO[];
    nonSelectedMovieTheatres: movieTheatreDTO[];
    actors: actorMovieDTO[];
}