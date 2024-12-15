import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios, { AxiosResponse } from "axios";
import {urlMovie, urlRating} from "../../endpoints";
import { movieDTO } from "../../components/Movie/movie.model";
import Loading from "../../utils/Loading";
import Link from "../../components/Link";
import ReactMarkdown from "react-markdown";
import coordinateDTO from "../../components/Map/coordinates.model";
import Map from "../../components/Map/Map";
import Rating from "../../components/Rating";
import Swal from "sweetalert2";


const MovieDetailsPage = () => {
    const {id}: any = useParams();
    const [movie, setMovie] = useState<movieDTO>();

    useEffect(() => {
        axios.get(`${urlMovie}/${id}`)
            .then((response: AxiosResponse<movieDTO>) => {
                response.data.releaseDate = new Date(response.data.releaseDate);
                setMovie(response.data);
            });
    }, [id]);

    function generateEmbeddedVideoURL(trailer: string): string {
        if (!trailer) return "";

        let videoId = trailer.split("v=")[1];
        const ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }

        return `https://www.youtube.com/embed/${videoId}`;
    }

    function transformCoordinates(): coordinateDTO[] {
        if (movie?.movieTheaters) {
            const coordinates = movie.movieTheaters.map(movieTheatre => (
                {
                    lat: movieTheatre.latitude,
                    lng: movieTheatre.longitude,
                    name: movieTheatre.name
                } as coordinateDTO
            ));

            return coordinates;
        }

        return [];
    }

    function handleRate(rate: number) {
        console.log({ rating: rate, movieId: id });
        axios
            .post(urlRating, { rating: rate, movieId: id })
            .then(() => { Swal.fire({ icon: "success", title: "Rating received" }) });
    }

    return (
        movie
            ? (
                <div className="grid gap-5">
                    <div className="text-3xl font-medium">{movie.title} ({movie.releaseDate.getFullYear()})</div>
                    <div className="grid grid-flow-col justify-start gap-2 items-center">
                        {
                            movie.genres?.map(genre =>
                                <Link to={`/movies/filter?genreId=${genre.id}`} key={genre.id} className="btn btn-primary btn-sm rounded-pill">
                                    {genre.name}
                                </Link>
                            )
                        }
                        | { movie.releaseDate.toDateString() } |
                        Your vote: <Rating maximumValue={5} selectedValue={movie.userVote} onChange={handleRate} /> |
                        Average Vote: {movie.averageVote}
                    </div>
                    <div className="grid grid-flow-col justify-start gap-3">
                        <img src={movie.poster} className="w-[225px] h-[315px]" alt="poster"/>
                        {
                            movie.trailer &&
                                <div>
                                    <iframe
                                        title="youtube-trailer"
                                        className="w-[560px] h-[315px]"
                                        src={generateEmbeddedVideoURL(movie.trailer)}
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen />
                                </div>
                        }
                    </div>
                    {
                        movie.summary &&
                            <div className="mt-2 grid gap-5">
                                <div className="text-xl font-medium">Summary</div>
                                <div>
                                    <ReactMarkdown>{movie.summary}</ReactMarkdown>
                                </div>
                            </div>
                    }
                    {
                        movie.actors && movie.actors.length > 0 &&
                            <div className="mt-2 grid gap-5">
                                <div className="text-xl font-medium">Actors</div>
                                <div className="grid grid-flow-col">
                                    {
                                        movie.actors?.map(actor =>
                                            <div key={actor.id} className="grid grid-flow-col justify-start items-center gap-10 mb-1">
                                                <img src={actor.picture} className="w-[70px]" alt="picture" />
                                                <div>{actor.name}</div>
                                                <div>{actor.character}</div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                    }
                    {
                        movie.movieTheaters && movie.movieTheaters.length > 0 &&
                            <div className="mt-2 grid gap-5">
                                <div className="text-xl font-medium">Showing on</div>
                                <Map coordinates={transformCoordinates()} readOnly={true} />
                            </div>
                    }
                </div>
            )
            : <Loading/>
    )
}

export default MovieDetailsPage;