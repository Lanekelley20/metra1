// app/screens/HomeScreen.tsx
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined;
  ChatScreen: undefined;
  FoodLogScreen: undefined;
  CravingAI: undefined;
  FoodHistory: undefined;  // <-- Added here
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function ProgressBar({ progress }: { progress: number }) {
  const percentage = Math.min(Math.max(progress, 0), 1) * 100;
  return (
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
    </View>
  );
}

export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const dailyMacros = {
    protein: { current: 90, goal: 120 },
    carbs: { current: 150, goal: 200 },
    fats: { current: 50, goal: 70 },
    calories: { current: 1800, goal: 2200 },
  };

  const nutritionFocus = {
    potassium: { current: 2200, goal: 3400, unit: 'mg' },
    magnesium: { current: 200, goal: 310, unit: 'mg' },
    fiber: { current: 17, goal: 25, unit: 'g' },
    sodium: { current: 1900, goal: 2300, unit: 'mg' },
  };

  const hydration = {
    water: { current: 60, goal: 80, unit: 'oz' },
    electrolytesLogged: true,
  };

  const streakDays = 5;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#1E1E1E' }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        <Text style={[styles.header, { color: '#064635' }]}>🧬 METRA</Text>

        <View style={styles.topBar}>
          <Text style={{ color: '#E0E0E0' }}>📅 Today: June 5</Text>
          <View style={styles.topRight}>
            <TouchableOpacity>
              <Text style={{ color: '#E0E0E0' }}>👤 Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: '#E0E0E0' }}>⚙️ Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* The big Log Foods button */}
        <TouchableOpacity
          style={[styles.logFoodsButton, { backgroundColor: '#0B8B3E' }]}
          onPress={() => navigation.navigate('ChatScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.logFoodsButtonText}>💬 Log Foods</Text>
        </TouchableOpacity>

        {/* Split buttons for Craving AI and Food History */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.smallButton, { backgroundColor: '#0B8B3E' }]}
            onPress={() => navigation.navigate('CravingAI')}
          >
            <Text style={styles.buttonText}>😋 Craving?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallButton, { backgroundColor: '#0B8B3E' }]}
            onPress={() => navigation.navigate('FoodHistory')}  
          >
            <Text style={styles.buttonText}>📜 Food History</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Macros */}
        <SectionTitle title="🍽️ Daily Macros" />
        <TouchableOpacity>
          <Text style={styles.toggleText}>🔻 [show foods]</Text>
        </TouchableOpacity>
        {Object.entries(dailyMacros).map(([key, { current, goal }]) => (
          <View key={key} style={styles.row}>
            <Text style={[styles.macroLabel, { color: '#E0E0E0' }]}>{capitalize(key)}</Text>
            <Text style={[styles.macroValue, { color: '#E0E0E0' }]}>
              {getEmojiForMacro(key)} {current} / {goal}
            </Text>
            <ProgressBar progress={current / goal} />
          </View>
        ))}

        {/* Nutrition Focus */}
        <SectionTitle title="🔬 Nutrition Focus" />
        <TouchableOpacity>
          <Text style={styles.toggleText}>🔻 [show nutrient sources]</Text>
        </TouchableOpacity>
        {Object.entries(nutritionFocus).map(([key, { current, goal, unit }]) => (
          <View key={key} style={styles.row}>
            <Text style={[styles.macroLabel, { color: '#E0E0E0' }]}>{capitalize(key)}</Text>
            <Text style={[styles.macroValue, { color: '#E0E0E0' }]}>
              {getEmojiForNutrient(key)} {current}
              {unit} / {goal}
              {unit}
            </Text>
            <ProgressBar progress={current / goal} />
          </View>
        ))}

        {/* Hydration */}
        <SectionTitle title="💧 Hydration Logged" />
        <TouchableOpacity>
          <Text style={styles.toggleText}>🔻 [show hydration history]</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={[styles.macroLabel, { color: '#E0E0E0' }]}>Water</Text>
          <Text style={[styles.macroValue, { color: '#E0E0E0' }]}>
            💧 {hydration.water.current} {hydration.water.unit} / {hydration.water.goal}{' '}
            {hydration.water.unit}
          </Text>
          <ProgressBar progress={hydration.water.current / hydration.water.goal} />
        </View>
        <View style={styles.row}>
          <Text style={[styles.macroLabel, { color: '#E0E0E0' }]}>Electrolytes</Text>
          <Text
            style={[
              styles.macroValue,
              hydration.electrolytesLogged && { color: 'lightgreen' },
            ]}
          >
            ⚡ {hydration.electrolytesLogged ? '✔️ Logged' : 'Not Logged'}
          </Text>
        </View>

        {/* Streak Garden */}
        <SectionTitle title={`🌱 Streak Garden (${streakDays} Days)`} />
        <View style={styles.streakContainer}>
          {[...Array(streakDays)].map((_, i) => (
            <Text key={i} style={styles.streakEmoji}>
              {getStreakEmoji(i)}
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View
        style={[
          styles.bottomNav,
          { paddingBottom: insets.bottom, height: 80 + insets.bottom },
        ]}
      >
        <TouchableOpacity>
          <Text>⬅️ Community</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Helpers

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getEmojiForMacro(key: string) {
  switch (key) {
    case 'protein':
      return '🍗';
    case 'carbs':
      return '🍞';
    case 'fats':
      return '🥑';
    case 'calories':
      return '🔥';
    default:
      return '';
  }
}

function getEmojiForNutrient(key: string) {
  switch (key) {
    case 'potassium':
      return '🍌';
    case 'magnesium':
      return '🥬';
    case 'fiber':
      return '💊';
    case 'sodium':
      return '🧂';
    default:
      return '';
  }
}

function getStreakEmoji(index: number) {
  const emojis = ['🍃', '🌿', '🌳', '🌼', '🌺'];
  return emojis[index] || '🌱';
}

// Styles

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#1E1E1E',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#999',
    paddingBottom: 8,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 10,
  },
  topRight: {
    flexDirection: 'row',
    gap: 15,
  },
  toggleText: {
    color: '#0B8B3E',
    marginBottom: 8,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 6,
    color: '#E0E0E0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroLabel: {
    width: 100,
    fontSize: 16,
  },
  macroValue: {
    width: 120,
    fontSize: 16,
  },
  progressBarBackground: {
    flex: 1,
    height: 12,
    backgroundColor: '#3A3A3A',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0B8B3E',
  },
  button: {
    backgroundColor: '#0B8B3E',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  buttonText: {
    color: '#E0E0E0',
    fontSize: 17,
    textAlign: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
    gap: 10,
  },
  streakEmoji: {
    fontSize: 28,
    marginHorizontal: 6,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2A2A2A',
    borderTopWidth: 1,
    borderColor: '#444',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  logFoodsButton: {
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logFoodsButtonText: {
    fontSize: 28,
    color: '#E0E0E0',
    fontWeight: '700',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  smallButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
});

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}
