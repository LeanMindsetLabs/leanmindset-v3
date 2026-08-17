import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  INITIAL_MEAL_LOG,
  type MealLogEntry,
  type MealLogId,
} from "../services/mealsLogService";

type MealsLogContextValue = {
  meals: MealLogEntry[];
  saveMealLog: (id: MealLogId, summary: string) => void;
};

const MealsLogContext = createContext<MealsLogContextValue | null>(null);

export function MealsLogProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<MealLogEntry[]>(INITIAL_MEAL_LOG);

  const saveMealLog = useCallback((id: MealLogId, summary: string) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, logged: true, itemsSummary: summary } : m,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({ meals, saveMealLog }),
    [meals, saveMealLog],
  );

  return (
    <MealsLogContext.Provider value={value}>{children}</MealsLogContext.Provider>
  );
}

export function useMealsLog() {
  const ctx = useContext(MealsLogContext);
  if (!ctx) throw new Error("useMealsLog requires MealsLogProvider");
  return ctx;
}
