import * as Yup from "yup";
import {Form, Formik, FormikHelpers} from "formik";
import TextField from "../../components/Form/TextField";
import Button from "../../components/Button";
import Link from "../../components/Link";
import React from "react";
import {genreCreationDTO} from "./genre.model";


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
                name: Yup.string().required("Name is required").max(50, "Max length is 50 characters").firstLetterUppercase(),
            })}
        >
            {(formikProps) => (
                <Form className="grid gap-4">
                    <TextField field="name" displayName="Name" />
                    <div className="grid grid-flow-col justify-end gap-4">
                        <Link color="secondary" to="/genres">Cancel</Link>
                        <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default GenreForm;