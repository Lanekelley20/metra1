import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FoodLogContext } from '../Context/FoodLogContext';

export default function FoodHistory() {
  const navigation = useNavigation();
  const { foodEntries } = useContext(FoodLogContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {foodEntries.length === 0 ? (
        <Text style={styles.emptyText}>No food logged yet.</Text>
      ) : (
        <FlatList
          data={foodEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.entryContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.macros}>
                Calories: {item.macros.calories} | Protein: {item.macros.protein}g | Carbs: {item.macros.carbs}g | Fat: {item.macros.fat}g
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5', // gray background
    padding: 12,
  },
  backButton: {
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#0B8B3E',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#666',
    fontSize: 18,
  },
  entryContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  time: {
    color: '#666',
    marginBottom: 6,
  },
  macros: {
    fontSize: 14,
    color: '#333',
  },
});
