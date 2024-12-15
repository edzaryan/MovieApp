import React, { useContext } from "react";
import axios from "axios";
import { movieDTO } from "./movie.model";
import LinkButton from "../Link";
import { Link } from "react-router-dom";
import Button from "../Button";
import customConfirm from "../../utils/CustomConfirm";
import { urlMovie } from "../../endpoints";
import AlertContext from "../../utils/AlertContext";
import Authorized from "../../auth/Authorized";


const MovieCard: React.FC<movieDTO> = ({ id, poster, title }) => {
    const customAlert = useContext(AlertContext);

    function deleteMovie() {
        axios.delete(`${urlMovie}/${id}`)
            .then(() => {
                customAlert();
            });
    }

    return (
        <div>
            <Link to={`/movie/${id}`}>
                <div style={{backgroundImage: `url(${poster})`}} className="h-[250px] bg-cover bg-center" />
                <div className="p-3 text-center text-md font-medium text-blue-600">{title}</div>
            </Link>
            <Authorized
                role="admin"
                authorized={
                    <div className="grid grid-cols-2 gap-3">
                        <LinkButton to={`/movie/edit/${id}`}>Edit</LinkButton>
                        <Button color="danger" onClick={() => customConfirm(() => deleteMovie())}>Delete</Button>
                    </div>
                }
            />
        </div>
    )
}

export default MovieCard;