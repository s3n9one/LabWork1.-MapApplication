// components/Map.tsx

import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { MapEvent, Marker as MapMarker } from 'react-native-maps';
import { MarkerData } from '../types';
import { useRouter } from 'expo-router';

interface MapProps {
  markers: MarkerData[];
  onLongPress: (event: MapEvent) => void;
}

const Map: React.FC<MapProps> = ({ markers, onLongPress }) => {
  const router = useRouter();

  const handleMarkerPress = (id: string) => {
    // Переход на экран деталей маркера
    try {
      router.push(`/marker/${id}`);
    } catch (error) {
      Alert.alert('Ошибка навигации', 'Не удалось перейти к деталям маркера');
    }
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 58.0,
        longitude: 56.3167,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onLongPress={onLongPress}
    >
      {markers.map(marker => (
        <MapMarker
          key={marker.id}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          onPress={() => handleMarkerPress(marker.id)}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
