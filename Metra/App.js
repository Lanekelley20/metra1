import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FoodLogProvider } from './context/FoodLogContext'; // Adjust the path if needed

export default function App() {
  const [collapsed, setCollapsed] = useState(true);

  const sampleMacros = {
    Calories: 100,
    Protein: 3,
    Carbs: 27,
    Fat: 0.3,
  };

  return (
    <FoodLogProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Metra Macro Tracker</Text>

        <View style={styles.macroContainer}>
          <Button
            title={collapsed ? "Show Macros" : "Hide Macros"}
            onPress={() => setCollapsed(!collapsed)}
          />
          {!collapsed && (
            <View style={styles.macros}>
              {Object.entries(sampleMacros).map(([key, value]) => (
                <Text key={key} style={styles.macroText}>
                  {key}: {value}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </FoodLogProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  macroContainer: {
    marginTop: 20,
  },
  macros: {
    marginTop: 10,
  },
  macroText: {
    fontSize: 18,
    marginVertical: 2,
  },
});
