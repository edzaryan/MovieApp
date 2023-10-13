import * as Yup from "yup";
import {Form, Formik, FormikHelpers} from "formik";
import TextField from "../../utils/TextField";
import Button from "../../utils/Button";
import { Link } from "react-router-dom";
import { genreCreationDTO } from "./Genres.model";
import React from "react";

interface genreFormProps {
    model: genreCreationDTO;
    onSubmit(values: genreCreationDTO, action: FormikHelpers<genreCreationDTO>): void;
}

const GenreForm: React.FC<genreFormProps> = ({ model, onSubmit }) => {
    return (
        <Formik
            initialValues={model}
            onSubmit={onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required').max(30, 'Max length is 30 characters').firstLetterUppercase()
            })}>
        {(formikProps) => (
            <Form>
                <TextField field="name" displayName="Name" />
                <Button disabled={formikProps.isSubmitting} type='submit'>Save Changes</Button>
                <Link className="btn btn-secondary" to="/genres">Cancel</Link>
            </Form>
        )}
        </Formik>
    )
}

export default GenreForm;