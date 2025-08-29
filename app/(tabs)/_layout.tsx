import { Tabs } from 'expo-router';
import React, { createContext, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GlobalStateProvider } from '../globalcontext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GlobalStateProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Play',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'game-controller' : 'game-controller-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'dice' : 'dice-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </GlobalStateProvider>
  );
}
