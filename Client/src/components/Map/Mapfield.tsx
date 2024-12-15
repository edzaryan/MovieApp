import Map from "./Map";
import coordinateDTO from "./coordinates.model";
import React from "react";
import { useFormikContext } from "formik";

interface mapFieldProps {
    coordinates: coordinateDTO[];
    latField: string;
    lngField: string;
}

const MapField: React.FC<mapFieldProps> = ({ coordinates = [], latField, lngField }) => {
    const { values } = useFormikContext<any>();

    function handleMapClick(newCoordinates: coordinateDTO) {
        values[latField] = newCoordinates.lat;
        values[lngField] = newCoordinates.lng
     }

    return (
        <Map
            coordinates={coordinates}
            handleMapClick={handleMapClick}
        />
    )
}

export default MapField;
