import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMapEvent} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {coordinateDTO} from "./Coordinates.module";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';

interface mapProps {
    height?: string;
    coordinates: coordinateDTO[];
    handleMapClick?(coordinates: coordinateDTO): void;
    readOnly?: boolean;
}

interface mapClickProps {
    setCoordinates(coordinates: coordinateDTO): void;
}


const Map: React.FC<mapProps> = ({ height="500px", readOnly=false, coordinates, handleMapClick = () => {} }) => {

    const [selectedCoordinates, setSelectedCoordinated] = useState<coordinateDTO[]>(coordinates);

    return (
        <MapContainer style={{width: "100%", height}} center={[18.482214, -69.914311]} zoom={14}>
            <TileLayer
                attribution="React Movies"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {readOnly ? null : <MapClick setCoordinates={coordinates => {
                setSelectedCoordinated([coordinates]);
                handleMapClick(coordinates);
            }} />}
            {selectedCoordinates.map((coordinate, index) =>
                <Marker
                    key={index}
                    position={[coordinate.lat, coordinate.lng]}
                    icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
                >
                    {coordinate.name ? <Popup>
                        {coordinate.name}
                    </Popup> : null}
                </Marker>
            )}
        </MapContainer>
    )
}

const MapClick = (props: mapClickProps) => {
    useMapEvent('click', eventArgs => {
        props.setCoordinates({lat: eventArgs.latlng.lat, lng: eventArgs.latlng.lng});
    });
    return null;
}


export default Map;

