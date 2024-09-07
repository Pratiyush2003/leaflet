import React, { useRef, useEffect } from 'react';
import { useGlobalContext } from '../Context/GlobalProvider';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import osmProvider from './osm-provider';
import L from 'leaflet';
import './Map.css'

// Define the center and zoom level based on your defaultAppState
const Map: React.FC = () => {
  const { defaultAppState, onCreated, onEdited, onDeleted } = useGlobalContext();
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on('layeradd', (event: L.LeafletEvent) => {
        const layer = event.layer;

        if (layer instanceof L.Polygon) {
          makeDraggable(layer);
        }
      });
    }
  }, [mapRef.current]);

  const makeDraggable = (layer: L.Polygon) => {
    layer.on('mousedown', onMouseDown);
    layer.on('mouseup', onMouseUp);

    function onMouseDown(event: L.LeafletEvent) {
      const polygon = event.target as L.Polygon;
      polygon.on('mousemove', onMouseMove);

      function onMouseMove(event: L.LeafletEvent) {
        const latlng = mapRef.current?.latLngToLayerPoint(event.latlng);
        if (latlng) {
          const latLngs = polygon.getLatLngs();
          for (let i = 0; i < latLngs[0].length; i++) {
            latLngs[0][i] = mapRef.current?.layerPointToLatLng(latlng);
          }
          polygon.setLatLngs(latLngs);
        }
      }
    }

    function onMouseUp() {
      layer.off('mousemove', onMouseMove);
    }
  };

  const center = { lat: defaultAppState[0].lat, lng: defaultAppState[0].lng };
  const ZOOM_LEVEL = defaultAppState[0].ZOOM_LEVEL;

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Interactive Map with Polygon Drawing
        </h2>
        <p className="text-gray-600 mt-2">
          Draw, edit, and drag polygons on the map for dynamic interactions.
        </p>
      </div>
      <div className="w-full h-full max-w-screen-lg">
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          ref={(ref) => { if (ref) mapRef.current = ref; }}
          style={{ height: '80vh', width: '100%' }}
          className="rounded-lg shadow-lg border border-gray-300"
        >
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={onCreated}
              onEdited={onEdited}
              onDeleted={onDeleted}
              draw={{
                rectangle: true,
                polyline: true,
                circle: true,
                marker: true,
                polygon: true,
              }}
            />
          </FeatureGroup>
          <TileLayer
            url={osmProvider.maptiler.url}
            attribution={osmProvider.maptiler.attribution}
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
