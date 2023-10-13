import Map from "./Map";
import {coordinateDTO} from "./Coordinates.module";
import React from "react";
import {useFormikContext} from "formik";

interface mapFieldProps {
    coordinates?: coordinateDTO[];
    latField: string;
    lngField: string;
}

const MapField: React.FC<mapFieldProps> = ({ coordinates = [], latField, lngField }) => {

    const { values } = useFormikContext<any>();

    const handleMapClick = (coordinates: coordinateDTO) => {
        values[latField] = coordinates.lat;
        values[lngField] = coordinates.lng;
    }

    return (
        <Map coordinates={coordinates} handleMapClick={handleMapClick} />
    )
}

export default MapField;