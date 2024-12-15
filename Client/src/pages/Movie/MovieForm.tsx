import React, { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "../../components/Movie/movie.model";
import * as Yup from "yup";
import TextField from "../../components/Form/TextField";
import Button from "../../components/Button";
import Link from "../../components/Link";
import DateField from "../../components/Form/DateField";
import ImageField from "../../components/Form/ImageField";
import CheckboxField from "../../components/Form/CheckboxField";
import MultipleSelector, { multipleSelectorModel } from "../../components/Form/MultipleSelector";
import { genreDTO } from "../genre/genre.model";
import { movieTheaterDTO } from "../movieTheater/movieTheater.model";
import TypeAheadActors from "../../components/Form/TypeAheadActors";
import {actorMovieDTO} from "../actor/actors.model";
import MarkdownField from "../../components/Form/MarkdownField";


interface movieFormProps {
    model: movieCreationDTO;
    onSubmit(values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>): void;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheatres: movieTheaterDTO[];
    nonSelectedMovieTheatres: movieTheaterDTO[];
    selectedActors: actorMovieDTO[];
}

const MovieForm: React.FC<movieFormProps> = ({
    model, onSubmit, selectedGenres, nonSelectedGenres, selectedMovieTheatres, nonSelectedMovieTheatres, selectedActors
}) => {
    const [selGenres, setSelGenres] = useState<multipleSelectorModel[]>(mapToModel(selectedGenres));
    const [nonSelGenres, setNonSelGenres] = useState<multipleSelectorModel[]>(mapToModel(nonSelectedGenres));

    const [selMovieTheaters, setSelMovieTheaters] = useState<multipleSelectorModel[]>(mapToModel(selectedMovieTheatres));
    const [nonSelMovieTheaters, setNonSelMovieTheaters] = useState<multipleSelectorModel[]>(mapToModel(nonSelectedMovieTheatres));

    const [selActors, setSelActors] = useState(selectedActors);

    function mapToModel(items: { id: number, name: string }[]): multipleSelectorModel[] {
        return items.map(item => {
            return { key: item.id, value: item.name }
        });
    }

    return (
        <Formik
            initialValues={model}
            onSubmit={async (values, actions) => {
                values.genresIds = selGenres.map(item => item.key);
                values.movieTheatersIds = selMovieTheaters.map(item => item.key);
                values.actors = selActors;
                await onSubmit(values, actions);
            }}
            validationSchema={Yup.object({
                title: Yup.string().required("This field is required").firstLetterUppercase(),
            })}
        >
            {(formikProps) => (
                <Form className="grid gap-4 mb-10">
                    <TextField field="title" displayName="Title" />
                    <CheckboxField field="inTheaters" displayName="In Theaters" />
                    <TextField field="trailer" displayName="Trailer" />
                    <DateField field="releaseDate" displayName="Release Date" />
                    <ImageField field="poster" displayName="Poster" imageURL={model.posterURL} />
                    <MarkdownField displayName="Summary" field="summary" />
                    <MultipleSelector
                        displayName="Genres"
                        nonSelected={nonSelGenres}
                        selected={selGenres}
                        onChange={(selected, nonSelected) => {
                            setSelGenres(selected);
                            setNonSelGenres(nonSelected);
                        }}
                    />
                    <MultipleSelector
                        displayName="Movie Theaters"
                        nonSelected={nonSelMovieTheaters}
                        selected={selMovieTheaters}
                        onChange={(selected, nonSelected) => {
                            setSelMovieTheaters(selected);
                            setNonSelMovieTheaters(nonSelected);
                        }}
                    />
                    <TypeAheadActors
                        displayName="Actors"
                        actors={selActors}
                        onAdd={actors => setSelActors(actors)}
                        onRemove={updatedActors => setSelActors(updatedActors)}
                        listUI={(actor: actorMovieDTO) => (
                            <>
                                {actor.name} /
                                <input
                                    placeholder="Character"
                                    type="text"
                                    className="w-[250px] px-2 py-1 rounded border outline-none"
                                    value={actor.character}
                                    onChange={e =>
                                        setSelActors(prev =>
                                            prev.map(a =>
                                                a.id === actor.id ? { ...a, character: e.target.value } : a
                                            )
                                        )
                                    }
                                />
                            </>
                        )}
                    />
                    <div className="grid grid-flow-col justify-end gap-4">
                        <Link color="secondary" to="/genres">Cancel</Link>
                        <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default MovieForm;