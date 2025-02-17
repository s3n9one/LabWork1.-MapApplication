import 'react-native-get-random-values';
import React from 'react';
import { MapEvent } from 'react-native-maps';
import { useMarkers } from '../context/MarkersContext';
import Map from '../components/Map';

export default function Home() {
  const { markers, addMarker } = useMarkers();

  const handleLongPress = (event: MapEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    addMarker(latitude, longitude);
  };

  return <Map markers={markers} onLongPress={handleLongPress} />;
}

