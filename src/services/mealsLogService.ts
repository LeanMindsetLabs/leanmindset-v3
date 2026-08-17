export type MealLogId = "breakfast" | "lunch" | "snack1" | "dinner" | "snack2";

export type MealLogEntry = {
  id: MealLogId;
  name: string;
  desc: string;
  time: string;
  logged: boolean;
  itemsSummary?: string;
};

export type FoodCat = "protein" | "veggie" | "fruit" | "pantry";
export type GroceryFilter = "bowls" | FoodCat;

export type FoodItem = {
  id: string;
  name: string;
  kcal: number;
  cat: FoodCat;
  emoji: string;
};

export type SavedBowl = {
  id: string;
  name: string;
  cat: "protein" | "veggie" | "fruit";
  items: string[];
  emoji: string;
};

export type AddedLine = {
  id: string;
  name: string;
  sub: string;
  qty: number;
};

export const INITIAL_MEAL_LOG: MealLogEntry[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    desc: "Protein + carb",
    time: "8:00 AM",
    logged: true,
    itemsSummary: "Apple + Coffee black",
  },
  {
    id: "lunch",
    name: "Lunch",
    desc: "Protein + veg",
    time: "12:00 PM",
    logged: true,
    itemsSummary: "1x Protein Bowl + 1x Salad Bowl",
  },
  {
    id: "snack1",
    name: "Snack",
    desc: "Controlled portion",
    time: "3:00 PM",
    logged: true,
    itemsSummary: "1x Fruit Bowl",
  },
  {
    id: "dinner",
    name: "Dinner",
    desc: "Protein + veg",
    time: "7:00 PM",
    logged: true,
    itemsSummary: "1x Protein Bowl + 1x Salad Bowl",
  },
  {
    id: "snack2",
    name: "Snack",
    desc: "Controlled portion",
    time: "9:00 PM",
    logged: true,
    itemsSummary: "1x Yogurt + 1x Mix Nuts",
  },
];

export const MEAL_FOODS: FoodItem[] = [
  { id: "chicken", name: "Chicken breast", kcal: 165, cat: "protein", emoji: "🍗" },
  { id: "turkey", name: "Turkey", kcal: 135, cat: "protein", emoji: "🦃" },
  { id: "salmon", name: "Salmon", kcal: 206, cat: "protein", emoji: "🐟" },
  { id: "egg", name: "Egg whites", kcal: 52, cat: "protein", emoji: "🥚" },
  { id: "tofu", name: "Tofu", kcal: 76, cat: "protein", emoji: "🧈" },
  { id: "yogurt", name: "Greek yogurt", kcal: 100, cat: "protein", emoji: "🥛" },
  { id: "broccoli", name: "Broccoli", kcal: 55, cat: "veggie", emoji: "🥦" },
  { id: "cauli", name: "Cauliflower", kcal: 40, cat: "veggie", emoji: "🥬" },
  { id: "spinach", name: "Spinach", kcal: 23, cat: "veggie", emoji: "🍃" },
  { id: "apple", name: "Apple", kcal: 95, cat: "fruit", emoji: "🍎" },
  { id: "berries", name: "Mixed berries", kcal: 70, cat: "fruit", emoji: "🫐" },
  { id: "sweetpotato", name: "Sweet potato", kcal: 112, cat: "fruit", emoji: "🍠" },
  { id: "almonds", name: "Almonds", kcal: 160, cat: "pantry", emoji: "🥜" },
];

export const DEFAULT_BOWLS: SavedBowl[] = [
  { id: "pb1", name: "Protein bowl 1", cat: "protein", items: ["Chicken breast", "Turkey"], emoji: "🍗" },
  { id: "pb2", name: "Protein bowl 2", cat: "protein", items: ["Salmon"], emoji: "🐟" },
  { id: "vb1", name: "Veggies", cat: "veggie", items: ["Broccoli", "Cauliflower"], emoji: "🥦" },
];

export const GROCERY_FILTERS: { id: GroceryFilter; label: string }[] = [
  { id: "bowls", label: "Bowls" },
  { id: "protein", label: "Proteins" },
  { id: "veggie", label: "Veggies" },
  { id: "fruit", label: "Fruit" },
  { id: "pantry", label: "Pantry" },
];

export function formatMealSummary(lines: AddedLine[]) {
  const parts = lines
    .filter((a) => a.qty > 0)
    .map((a) => `${a.qty === 1 ? "1x" : `${a.qty}x`} ${a.name}`);
  return parts.length ? parts.join(" + ") : "Tap bowls or foods to build this meal.";
}

export function bowlSub(items: string[]) {
  return items.join(" / ");
}
