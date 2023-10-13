import {Form, Formik, FormikHelpers} from "formik";
import {movieCreationDTO} from "../../components/Movie/Movies.model";
import React, {useState} from "react";
import * as Yup from 'yup';
import Button from "../../utils/Button";
import {Link} from "react-router-dom";
import TextField from "../../utils/TextField";
import DateField from "../../utils/DateField";
import ImageField from "../../utils/ImageField";
import CheckboxField from "../../utils/CheckboxField";
import MultipleSelector, {multipleSelectorModel} from "../../utils/MultipleSelector";
import {genreDTO} from "../Genre/Genres.model";
import {movieTheatreDTO} from "../MovieTheater/MovieTheater.model";
import TypeAheadActors from "../../utils/TypeAheadActors";
import {actorMovieDTO} from "../Actor/Actors.model";
import MarkdownField from "../../utils/MarkdownField";

interface movieFormProps {
    model: movieCreationDTO;
    onSubmit(values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>): void;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheatres: movieTheatreDTO[];
    nonSelectedMovieTheatres: movieTheatreDTO[];
    selectedActors: actorMovieDTO[];
}

const MovieForm: React.FC<movieFormProps> = ({ model, onSubmit, selectedGenres, nonSelectedGenres, selectedMovieTheatres, nonSelectedMovieTheatres, selectedActors }) => {

    const [selGenres, setSelectedGenres] = useState(mapToModel(selectedGenres));
    const [selMovieTheatre, setSelectedMovieTheatre] = useState(mapToModel(selectedMovieTheatres));
    const [selActors, setSelectedActors] = useState<actorMovieDTO[]>(selectedActors);
    const [nonSelGenres, setNonSelectedGenres] = useState(mapToModel(nonSelectedGenres));
    const [nonSelMovieTheatre, setNonSelectedMovieTheatre] = useState(mapToModel(nonSelectedMovieTheatres));
    const [inTheatres, setInTheatres] = useState(model.inTheatres);

    function mapToModel(items: {id: number, name: string}[]) : multipleSelectorModel[] {
        return items.map(item => {
           return { key: item.id, value: item.name }
        });
    }

    return (
        <Formik
            initialValues={model}
            onSubmit={(values, actions) => {
                values.genresIds = selGenres.map(item => item.key);
                values.movieTheatresIds = selMovieTheatre.map(item => item.key);
                values.actors = selActors;

                onSubmit(values, actions);
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('This field is required').firstLetterUppercase()
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField field="title" displayName="Title" />
                    <CheckboxField field="inTheatres" displayName="In Theatres" inTheatres={inTheatres} onChange={(event) => setInTheatres(event.target.checked)} />
                    <TextField field="trailer" displayName="Trailer" />
                    <DateField field="releaseDate" displayName="Release Date" />
                    <ImageField field="poster" displayName="Poster" imageURL={model.posterURL} />
                    <MarkdownField displayName="Summary" field="summary" />
                    <MultipleSelector
                        displayName="Genres"
                        nonSelected={nonSelGenres}
                        selected={selGenres}
                        onChange={(selected, nonSelected) => {
                            setSelectedGenres(selected);
                            setNonSelectedGenres(nonSelected);
                        }}
                    />
                    <MultipleSelector
                        displayName="Movie Theatres"
                        nonSelected={nonSelMovieTheatre}
                        selected={selMovieTheatre}
                        onChange={(selected, nonSelected) => {
                            setSelectedMovieTheatre(selected);
                            setNonSelectedMovieTheatre(nonSelected);
                        }}
                    />
                    <TypeAheadActors
                        displayName="Actors"
                        actors={selActors}
                        onAdd={actors => setSelectedActors(actors)}
                        onRemove={actors => setSelectedActors(actors)}
                        listUI={ (actor: actorMovieDTO) =>
                            <>
                                {actor.name} / <input type="text" placeholder="Character" value={actor.character || ''} onChange={e => {
                                    const index = selActors.findIndex(x => x.id === actor.id);

                                    if (index !== -1) {
                                        const actors = [...selActors];
                                        actors[index].character = e.currentTarget.value;
                                        setSelectedActors(actors);
                                    }
                                    else {
                                        console.warn("Actor not found in the selectedActors list.");
                                    }
                                }} />
                            </>
                        }
                    />
                    <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                    <Link to="/genres" className="btn btn-secondary">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

export default MovieForm;