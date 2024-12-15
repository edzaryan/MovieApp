import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreForm from "./GenreForm";
import { genreCreationDTO } from "./genre.model";
import {urlGenre} from "../../endpoints";
import axios from "axios";
import DisplayErrors from "../../utils/DisplayErrors";


const GenreCreatePage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(genre: genreCreationDTO) {
        try {
            await axios.post(urlGenre, genre);
            navigate("/genres");
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
            <div className="text-2xl font-medium">Create Genre</div>
            <DisplayErrors errors={errors} />
            <GenreForm
                model={{ name: "" }}
                onSubmit={ async value => await create(value) }
            />
        </div>
    );
}

export default GenreCreatePage;
