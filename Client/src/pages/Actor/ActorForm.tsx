import {Form, Formik, FormikHelpers} from "formik";
import {actorCreationDTO} from "./Actors.model";
import TextField from "../../utils/TextField";
import Button from "../../utils/Button";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import DateField from "../../utils/DateField";
import React from "react";
import ImageField from "../../utils/ImageField";
import MarkdownField from "../../utils/MarkdownField";

interface actorFormProps {
    model: actorCreationDTO;
    onSubmit(values: actorCreationDTO, action: FormikHelpers<actorCreationDTO>): void;
}

const ActorForm: React.FC<actorFormProps> = ({ model, onSubmit }) => {
    return (
        <Formik
            initialValues={model}
            onSubmit={onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required').firstLetterUppercase(),
                dateOfBirth: Yup.date().nullable().required('This field is required')
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField field="name" displayName="Name" />
                    <DateField field="dateOfBirth" displayName="Date of Birth" />
                    <ImageField displayName="Picture" field="picture" imageURL={model.pictureURL} />
                    <MarkdownField displayName="Biography" field="biography" />
                    <Button type="submit" disabled={formikProps.isSubmitting}>Save Change</Button>
                    <Link to="/actors" className="btn btn-secondary">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

export default ActorForm;