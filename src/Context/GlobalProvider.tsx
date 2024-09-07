import React, { createContext, useContext, ReactNode, useState } from 'react';

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
}

const initialState: GlobalState = {
  defaultAppState: [
    { lat: 28.596611845825656, lng: 77.32879734033406, ZOOM_LEVEL: 14 },
  ],
  polygons: [],
};

export const GlobalContext = createContext<GlobalState>(initialState);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [polygons, setPolygons] = useState<Polygon[]>([]);
    console.log(setPolygons)
  return (
    <GlobalContext.Provider
      value={{
        defaultAppState: initialState.defaultAppState,
        polygons,
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
