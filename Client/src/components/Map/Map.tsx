import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

interface CoordinateDTO {
    lat: number;
    lng: number;
    name?: string;
}

interface MapProps {
    height?: string;
    coordinates: CoordinateDTO[];
    handleMapClick?: (coordinates: CoordinateDTO) => void;
    readOnly?: boolean;
}

interface MapClickProps {
    setCoordinates: (coordinates: CoordinateDTO) => void;
}

const markerIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const Map: React.FC<MapProps> = ({ height = "500px", readOnly = false, coordinates, handleMapClick = () => {} }) => {
    const [selectedCoordinates, setSelectedCoordinates] = useState<CoordinateDTO[]>(coordinates);

    const handleMapClickInternal = (newCoordinates: CoordinateDTO) => {
        setSelectedCoordinates([newCoordinates]);
        handleMapClick(newCoordinates);
    };

    return (
        <MapContainer
            style={{ width: "100%", height }}
            center={[50, 30]}
            zoom={5}
        >
            <TileLayer attribution="React Movies" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            { !readOnly && <MapClick setCoordinates={handleMapClickInternal} /> }
            {
                selectedCoordinates.map((coordinate, index) => (
                    <Marker
                        key={index}
                        position={[coordinate.lat, coordinate.lng]}
                        icon={markerIcon}>
                        { coordinate.name && <Popup>{coordinate.name}</Popup> }
                    </Marker>
                ))
            }
        </MapContainer>
    );
};

const MapClick: React.FC<MapClickProps> = ({ setCoordinates }) => {
    useMapEvent("click", (event) => {
        setCoordinates({
            lat: event.latlng.lat,
            lng: event.latlng.lng,
        });
    });

    return null;
};

export default Map;
