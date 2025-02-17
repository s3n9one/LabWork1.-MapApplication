import React from 'react';
import { Stack } from 'expo-router';
import { MarkersProvider } from '../context/MarkersContext';

export default function Layout() {
  return (
    <MarkersProvider>
      <Stack />
    </MarkersProvider>
  );
}
