import GenreForm from "./GenreForm";
import React, {useState} from "react";
import {genreCreationDTO} from "./Genres.model";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DisplayErrors from "../../utils/DisplayErrors";

const CreateGenrePage: React.FC = () => {
    const navigation = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(genre: genreCreationDTO) {
        try {
            await axios.post('/api/genres', genre);
            navigation('/genres');
        }
        catch (error) {
            if (error && error.response) {
                setErrors(error.response.data);
            }
        }
    }

    return (
        <div className="container">
            <h3>Create Genre</h3>

            <DisplayErrors errors={errors} />

            <GenreForm
                model={{ name: '' }}
                onSubmit={async value => {
                    await create(value);
                }}
            />
        </div>
    )
}

export default CreateGenrePage;