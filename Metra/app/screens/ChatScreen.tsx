import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { FoodLogContext } from '../Context/FoodLogContext';

export default function ChatScreen() {
  const navigation = useNavigation();
  const { addEntry } = useContext(FoodLogContext);

  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);

  // Manual add food state
  const [manualAddOpen, setManualAddOpen] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualCalories, setManualCalories] = useState('');
  const [manualProtein, setManualProtein] = useState('');
  const [manualCarbs, setManualCarbs] = useState('');
  const [manualFat, setManualFat] = useState('');

  function handleSend() {
    if (!chatInput.trim()) return;

    // For demo: Just add the chat input to chatLog and pretend AI recognized food
    setChatLog((prev) => [...prev, `You: ${chatInput}`]);

    // Simulate AI parsing input and adding entry (here we just fake one)
    const newFood = {
      id: Date.now().toString(), // Important: add id here
      name: chatInput,
      time: new Date().toLocaleString(),
      macros: {
        calories: 100,
        protein: 5,
        carbs: 20,
        fat: 2,
      },
    };
    addEntry(newFood);

    setChatLog((prev) => [
      ...prev,
      `Metra AI: Logged "${chatInput}" with estimated macros.`,
    ]);
    setChatInput('');
  }

  function addManualEntry() {
    if (!manualName.trim()) return;

    addEntry({
      id: Date.now().toString(), // Add unique id here
      name: manualName,
      time: new Date().toLocaleString(),
      macros: {
        calories: Number(manualCalories) || 0,
        protein: Number(manualProtein) || 0,
        carbs: Number(manualCarbs) || 0,
        fat: Number(manualFat) || 0,
      },
    });

    setManualName('');
    setManualCalories('');
    setManualProtein('');
    setManualCarbs('');
    setManualFat('');
    setManualAddOpen(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.chatContainer}>
        {chatLog.map((line, index) => (
          <Text key={index} style={styles.chatText}>
            {line}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={chatInput}
          onChangeText={setChatInput}
          placeholder="Tell Metra what you ate..."
          placeholderTextColor="#ccc"
        />
        <Button title="Send" onPress={handleSend} color="#0B8B3E" />
      </View>

      <TouchableOpacity
        style={styles.manualToggleButton}
        onPress={() => setManualAddOpen(!manualAddOpen)}
      >
        <Text style={styles.manualToggleButtonText}>
          {manualAddOpen ? 'Cancel Manual Add' : 'Add Food Manually'}
        </Text>
      </TouchableOpacity>

      {manualAddOpen && (
        <View style={styles.manualAddContainer}>
          <TextInput
            style={styles.manualInput}
            placeholder="Food Name"
            value={manualName}
            onChangeText={setManualName}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.manualInput}
            placeholder="Calories"
            value={manualCalories}
            onChangeText={setManualCalories}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.manualInput}
            placeholder="Protein (g)"
            value={manualProtein}
            onChangeText={setManualProtein}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.manualInput}
            placeholder="Carbs (g)"
            value={manualCarbs}
            onChangeText={setManualCarbs}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.manualInput}
            placeholder="Fat (g)"
            value={manualFat}
            onChangeText={setManualFat}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          <Button
            title="Add Food"
            onPress={addManualEntry}
            color="#0B8B3E"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5', // Gray background to match palette
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
  chatContainer: {
    flex: 1,
    marginBottom: 12,
  },
  chatText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    color: '#333',
  },
  manualToggleButton: {
    backgroundColor: '#0B8B3E',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'center',
  },
  manualToggleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  manualAddContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  manualInput: {
    backgroundColor: '#F0F2F5',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    color: '#333',
  },
});
