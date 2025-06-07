// RootNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ChatScreen from '../screens/ChatScreen';
import CravingAI from '../screens/CravingAI';
import FoodHistory from '../screens/FoodHistory';
import FoodLogScreen from '../screens/FoodLogScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
    id={undefined}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="FoodLogScreen" component={FoodLogScreen} />
      <Stack.Screen name="CravingAI" component={CravingAI} />
      <Stack.Screen name="FoodHistory" component={FoodHistory} />
    </Stack.Navigator>
  );
}
