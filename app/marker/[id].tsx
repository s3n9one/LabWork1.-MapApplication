import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMarkers } from '../../context/MarkersContext';
import { MarkerData, ImageData } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import * as ImagePicker from 'expo-image-picker';

export default function MarkerDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { markers, updateMarker } = useMarkers();

  const [marker, setMarker] = useState<MarkerData | null>(null);

  useEffect(() => {
    // Находим маркер по id из общего списка
    const foundMarker = markers.find(m => m.id === id) || null;
    setMarker(foundMarker);
  }, [id, markers]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        const newImage: ImageData = {
          id: uuidv4(),
          uri: result.assets[0].uri,
        };
        if (marker) {
          const updated = { ...marker, images: [...marker.images, newImage] };
          setMarker(updated);
          updateMarker(updated); // Обновляем глобальное состояние
        }
      }
    } catch (error) {
      Alert.alert('Ошибка выбора изображения', String(error));
    }
  };

  const deleteImage = (imageId: string) => {
    if (marker) {
      const updated = {
        ...marker,
        images: marker.images.filter(img => img.id !== imageId),
      };
      setMarker(updated);
      updateMarker(updated);
    }
  };

  if (!marker) {
    return (
      <View style={styles.center}>
        <Text>Маркер не найден или не загружен.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Детали маркера</Text>
      <Text>Широта: {marker.latitude.toFixed(4)}</Text>
      <Text>Долгота: {marker.longitude.toFixed(4)}</Text>

      <Button title="Добавить изображение" onPress={pickImage} />

      <FlatList
        data={marker.images}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <TouchableOpacity onPress={() => deleteImage(item.id)}>
              <Text style={styles.deleteText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Нет добавленных изображений.</Text>}
      />

      <Button title="Назад на карту" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
  imageContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  image: { width: 100, height: 100, marginRight: 16 },
  deleteText: { color: 'red' },
  emptyText: { marginVertical: 16, fontStyle: 'italic' },
});
