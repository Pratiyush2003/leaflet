import React, { createContext, useContext, ReactNode, useCallback, useState } from 'react';

// Define the app state structure
interface initialAppState {
  lat: number;
  lng: number;
  ZOOM_LEVEL: number;
}

// Define polygon structure (or use GeoJSON type if applicable)
interface Polygon {
  id: string;
  geoJSON: any;
}

// Define the global state interface
interface GlobalState {
  defaultAppState: initialAppState[];
  polygons: Polygon[];
  onCreated: (e: any) => void;
  onEdited: (e: any) => void;
  onDeleted: (e: any) => void;
}

const initialState: GlobalState = {
  defaultAppState: [
    { lat: 28.596611845825656, lng: 77.32879734033406, ZOOM_LEVEL: 14 },
  ],
  polygons: [],
  onCreated: () => {}, // Placeholder
  onEdited: () => {},  // Placeholder
  onDeleted: () => {}, // Placeholder
};

export const GlobalContext = createContext<GlobalState>(initialState);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [polygons, setPolygons] = useState<Polygon[]>([]);

  // Handler for creating a polygon
  const onCreated = useCallback((e) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const polygon = layer.toGeoJSON();
      const newPolygon = { id: layer._leaflet_id, geoJSON: polygon };
      setPolygons((prevPolygons) => [...prevPolygons, newPolygon]); // Add new polygon to the state
      console.log("Polygon created:", polygon);
    }
  }, []);

  // Handler for editing a polygon
  const onEdited = useCallback((e) => {
    const { layers } = e;
    layers.eachLayer((layer) => {
      const updatedPolygon = layer.toGeoJSON();
      const updatedId = layer._leaflet_id;
      setPolygons((prevPolygons) =>
        prevPolygons.map((polygon) =>
          polygon.id === updatedId ? { ...polygon, geoJSON: updatedPolygon } : polygon
        )
      );
      console.log("Polygon updated:", updatedPolygon);
    });
  }, []);

  // Handler for deleting a polygon
  const onDeleted = useCallback((e) => {
    const { layers } = e;
    layers.eachLayer((layer) => {
      const deletedId = layer._leaflet_id;
      setPolygons((prevPolygons) => prevPolygons.filter((polygon) => polygon.id !== deletedId));
      console.log("Polygon deleted:", layer);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        defaultAppState: initialState.defaultAppState,
        polygons,
        onCreated,
        onEdited,
        onDeleted,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the Global Context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;
