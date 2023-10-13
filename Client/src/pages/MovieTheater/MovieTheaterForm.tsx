import TextField from "../../utils/TextField";
import {Form, Formik, FormikHelpers} from "formik";
import Button from "../../utils/Button";
import {Link} from "react-router-dom";
import {movieTheaterCreationDTO} from "./MovieTheater.model";
import * as Yup from 'yup';
import MapField from "../../utils/MapField";
import {coordinateDTO} from "../../utils/Coordinates.module";
import React from "react";

interface movieTheaterForm {
    model: movieTheaterCreationDTO;
    onSubmit(values: movieTheaterCreationDTO, actions: FormikHelpers<movieTheaterCreationDTO>): void;
}

export const MovieTheaterForm: React.FC<movieTheaterForm> = ({ model, onSubmit }) => {

    function transformCoordinates(): coordinateDTO[] | undefined {
        if (model.latitude && model.longitude) {
            const response: coordinateDTO = { lat: model.latitude, lng: model.longitude };
            return [response];
        }

        return undefined;
    }

    return (
        <Formik
            initialValues={model}
            onSubmit={onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required').firstLetterUppercase()
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField displayName="Name" field="name" />
                    <MapField latField="latitude" lngField="longitude" coordinates={transformCoordinates()} />
                    <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                    <Link to="/movietheatres" className="btn btn-secondary">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}