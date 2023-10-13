import React, {useState} from "react";
import {MovieTheaterForm} from "./MovieTheaterForm";
import {movieTheaterCreationDTO} from "./MovieTheater.model";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DisplayErrors from "../../utils/DisplayErrors";

const MovieTheatrePage: React.FC = () => {
    const navigation = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(movieTheatre: movieTheaterCreationDTO) {
        try {
            await axios.post("/api/movieTheatres", movieTheatre);
            navigation("/movietheatre");
        }
        catch (error) {
            if (error && error.response) {
                setErrors(error.response.data);
            }
        }
    }

    return (
        <div className="container">
            <h3>Create MovieTheatre</h3>
            <DisplayErrors errors={errors} />
            <MovieTheaterForm
                model={{ name: "" }}
                onSubmit={ async values => {
                    await create(values);
                }}
            />
        </div>
    )
}

export default MovieTheatrePage;