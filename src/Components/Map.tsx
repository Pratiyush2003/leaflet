import React, { useRef, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import './Map.css'
import { GlobalContext } from "../Context/GlobalProvider";
const Map: React.FC = () => {
    const { defaultAppState } = useContext(GlobalContext);
    const mapRef = useRef<L.Map>(null);


    const center = { lat: defaultAppState[0].lat, lng: defaultAppState[0].lng };
    const ZOOM_LEVEL = defaultAppState[0].ZOOM_LEVEL;

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
            <div className="text-center mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    React Leaflet - Polygon Drawing with Leaflet Draw
                </h2>
            </div>
            <div className="w-full h-full max-w-screen-lg">
                <MapContainer
                    center={center}
                    zoom={ZOOM_LEVEL}
                    ref={mapRef}
                    style={{ height: "80vh", width: "100%" }}
                    className="rounded-lg shadow-lg"
                >
                    <FeatureGroup>
                        <EditControl
                            position="topright"
                            draw={{
                                rectangle: false, // Disable rectangle drawing if you only want polygons
                            }}
                        />
                    </FeatureGroup>
                    <TileLayer
                        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                        attribution={'&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}
                    />
                    <Marker position={[center.lat, center.lng]}>
                        <Popup>A popup message on the marker.</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
