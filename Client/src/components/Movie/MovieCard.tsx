import { movieDTO } from "./Movies.model";
import css from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import React, {useContext} from "react";
import Button from "../../utils/Button";
import customConfirm from "../../utils/customConfirm";
import axios from "axios";
import AlertContext from "../../utils/AlertContext";
import Authorized from "../../auth/Authorized";

const MovieCard: React.FC<movieDTO> = ({ id, poster, title }) => {

    const buildLink = () => `/movie/${id}`;
    const customAlert = useContext(AlertContext);

    function deleteMovie() {
        axios.delete(`/api/movies/${id}`)
            .then(() => {
                customAlert();
            });
    }

    return (
        <div className={css.div}>
            <Link to={buildLink()}>
                <img src={poster} alt="Poster" />
            </Link>
            <div>
                <Link to={buildLink()}>{title}</Link>
            </div>
            <Authorized
                role="admin"
                authorized={<>
                    <div>
                        <Link to={`/movie/edit/${id}`} style={{marginRight: "1rem"}} className="btn btn-info">Edit</Link>
                        <Button onClick={() => customConfirm(() => deleteMovie())} className="btn btn-danger">Delete</Button>
                    </div>
                </>}
            />
        </div>
    )
}

export default MovieCard;