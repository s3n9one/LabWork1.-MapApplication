import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker as MapMarker, MapEvent } from 'react-native-maps';
import { MarkerData } from '../types';
import { useRouter } from 'expo-router';

interface MapProps {
  markers: MarkerData[];
  onLongPress: (event: MapEvent) => void;
  onMarkerPress: (markerId: string) => void;
}

export default function Map({ markers, onLongPress, onMarkerPress }: MapProps) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 58.0, // Координаты Перми
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
          onPress={() => onMarkerPress(marker.id)} // Передаем markerId
        >
          <View style={styles.markerContainer}>
            <Image
              source={require('../assets/images/mark.png')}
              style={styles.markerImage}
              resizeMode="contain"
            />
          </View>
        </MapMarker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    width: 40,
    height: 40,
  },
});