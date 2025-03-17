// context/MarkersContext.tsx

import 'react-native-get-random-values';
import React, { createContext, useContext, useState } from 'react';
import { MarkerData } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface MarkersContextProps {
  markers: MarkerData[];
  setMarkers: React.Dispatch<React.SetStateAction<MarkerData[]>>;
  addMarker: (latitude: number, longitude: number) => void;
  updateMarker: (marker: MarkerData) => void;
}

const MarkersContext = createContext<MarkersContextProps | undefined>(undefined);

export const useMarkers = () => {
  const context = useContext(MarkersContext);
  if (!context) {
    throw new Error('useMarkers must be used within a MarkersProvider');
  }
  return context;
};

export const MarkersProvider: React.FC = ({ children }) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const addMarker = (latitude: number, longitude: number) => {
    const newMarker: MarkerData = {
      id: uuidv4(),
      latitude,
      longitude,
      images: [],
    };
    setMarkers(prev => [...prev, newMarker]);
  };

  const updateMarker = (updatedMarker: MarkerData) => {
    setMarkers(prev =>
      prev.map(m => (m.id === updatedMarker.id ? updatedMarker : m))
    );
  };

  return (
    <MarkersContext.Provider
      value={{ markers, setMarkers, addMarker, updateMarker }}
    >
      {children}
    </MarkersContext.Provider>
  );
};
