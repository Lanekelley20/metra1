// CravingAI.tsx (new screen to be created later)
// Placeholder navigation for now

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

export default function CravingAI() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>😋 Craving AI</Text>
      <Text style={styles.placeholder}>Coming soon...</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0B8B3E',
    marginBottom: 20,
  },
  placeholder: {
    color: '#E0E0E0',
    fontSize: 18,
    marginBottom: 40,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#0B8B3E',
    borderRadius: 8,
  },
  backText: {
    color: '#E0E0E0',
    fontSize: 16,
  },
});
