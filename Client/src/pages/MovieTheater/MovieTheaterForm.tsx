import React, { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../../components/Form/TextField";
import Button from "../../components/Button";
import Link from "../../components/Link";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import * as Yup from "yup";
import coordinateDTO from "../../components/Map/coordinates.model";
import MapField from "../../components/Map/Mapfield";

interface movieTheaterFormProps {
    model: movieTheaterCreationDTO;
    onSubmit(values: movieTheaterCreationDTO, actions: FormikHelpers<movieTheaterCreationDTO>): void;
}

const MovieTheaterForm: React.FC<movieTheaterFormProps> = ({ model, onSubmit }) => {

    function transformCoordinates(): coordinateDTO[] {
        if (model.latitude && model.longitude) {
            const response: coordinateDTO = { lat: model.latitude, lng: model.longitude };
            return [response];
        }

        return [];
    }

    return (
        <Formik
            initialValues={model}
            onSubmit={onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required("This field is required").firstLetterUppercase(),
            })}
        >
            {(formikProps) => (
                <Form className="grid gap-4 mb-10">
                    <TextField field="name" displayName="Name" />
                    <div className="mb-[1rem]">
                        <MapField coordinates={transformCoordinates()} latField="latitude" lngField="longitude" />
                    </div>
                    <div className="grid grid-flow-col gap-4 justify-end">
                        <Link color="secondary" to="/movietheaters">Cancel</Link>
                        <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default MovieTheaterForm;