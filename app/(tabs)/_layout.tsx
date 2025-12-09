import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs>
      {/* keep only the home/index tab */}
      <Tabs.Screen name="index" options={{ title: 'Police Siren', headerShown: false }} />
    </Tabs>
  );
}
