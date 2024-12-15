import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieTheaterForm from "./MovieTheaterForm";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import { urlMovieTheater } from "../../endpoints";
import {useState} from "react";
import DisplayErrors from "../../utils/DisplayErrors";


const MovieTheaterCreatePage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(movieTheater: movieTheaterCreationDTO) {
        try {
            await axios.post(urlMovieTheater, movieTheater);
            navigate("/movieTheaters");
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setErrors(error.response.data);
                } else {
                    setErrors(["An unknown error occurred"]);
                }
            } else {
                setErrors(["An unexpected error occurred"]);
            }
        }
    }

    return (
        <div className="grid gap-5">
            <div className="text-2xl font-medium">Create Movie Theater</div>
            <DisplayErrors errors={errors} />
            <MovieTheaterForm
                model={{ name: "" }}
                onSubmit={ async values => await create(values) }
            />
        </div>
    )
}

export default MovieTheaterCreatePage;