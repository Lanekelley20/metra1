import React, { createContext, ReactNode, useState } from 'react';

export interface FoodEntry {
  id: string;
  name: string;
  time: string;
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface FoodLogContextType {
  foodEntries: FoodEntry[];
  addEntry: (entry: FoodEntry) => void;
}

export const FoodLogContext = createContext<FoodLogContextType>({
  foodEntries: [],
  addEntry: () => {},
});

export const FoodLogProvider = ({ children }: { children: ReactNode }) => {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);

  const addEntry = (entry: FoodEntry) => {
    setFoodEntries((prev) => [entry, ...prev]);
  };

  return (
    <FoodLogContext.Provider value={{ foodEntries, addEntry }}>
      {children}
    </FoodLogContext.Provider>
  );
};
