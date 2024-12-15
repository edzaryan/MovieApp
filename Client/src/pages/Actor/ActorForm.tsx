import React from "react";
import {Form, Formik, FormikHelpers} from "formik";
import {actorCreationDTO} from "./actors.model";
import TextField from "../../components/Form/TextField";
import Button from "../../components/Button";
import Link from "../../components/Link";
import * as Yup from "yup";
import DateField from "../../components/Form/DateField";
import ImageField from "../../components/Form/ImageField";
import MarkdownField from "../../components/Form/MarkdownField";


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
                name: Yup.string().required("This field is required").firstLetterUppercase(),
                dateOfBirth: Yup.date().nullable().required("This field is required")
            })}
        >
            {(formikProps) => (
                <Form className="grid gap-4 mb-10">
                    <TextField field="name" displayName="Name" />
                    <DateField field="dateOfBirth" displayName="Date of Birth" />
                    <ImageField field="picture" displayName="Picture" imageURL={model.pictureURL} />
                    <MarkdownField field="biography" displayName="Biography" />

                    <div className="grid grid-flow-col justify-end gap-4">
                        <Link to="/actors" color="secondary">Cancel</Link>
                        <Button type="submit" disabled={formikProps.isSubmitting}>Save Change</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ActorForm;