import type { MealLogId } from "./mealsLogService";

export type Macro = {
  label: "Protein" | "Fat" | "Carbs";
  consumed: number;
  target: number;
  color: string;
};

export type Nutrition = {
  kcalLogged: number;
  kcalTarget: number;
  protein: Macro;
  fat: Macro;
  carbs: Macro;
};

export type MealRecommendation = {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  image: string;
  tags: string[];
  ingredients: string[];
};

export type GroceryItem = {
  id: string;
  name: string;
  aisle: string;
  quantity: string;
  checked: boolean;
};

export const groceryPreviewNames = [
  "Chicken",
  "Yogurt",
  "Spinach",
  "Oats",
  "Berries",
];

export const groceryItems: GroceryItem[] = [
  { id: "chicken", name: "Chicken breast", aisle: "Protein", quantity: "1.5 lb", checked: false },
  { id: "yogurt", name: "Greek yogurt", aisle: "Dairy", quantity: "32 oz", checked: false },
  { id: "tofu", name: "Firm tofu", aisle: "Protein", quantity: "14 oz", checked: false },
  { id: "spinach", name: "Spinach", aisle: "Produce", quantity: "1 bag", checked: false },
  { id: "broccoli", name: "Broccoli", aisle: "Produce", quantity: "2 heads", checked: false },
  { id: "peppers", name: "Bell peppers", aisle: "Produce", quantity: "3", checked: false },
  { id: "berries", name: "Mixed berries", aisle: "Produce", quantity: "1 pint", checked: false },
  { id: "oats", name: "Rolled oats", aisle: "Pantry", quantity: "18 oz", checked: false },
  { id: "rice", name: "Rice", aisle: "Pantry", quantity: "1 bag", checked: false },
  { id: "oil", name: "Olive oil", aisle: "Pantry", quantity: "1 bottle", checked: false },
];

export const defaultNutrition: Nutrition = {
  kcalLogged: 1600,
  kcalTarget: 2200,
  protein: { label: "Protein", consumed: 79, target: 140, color: "#19E68C" },
  fat: { label: "Fat", consumed: 31, target: 65, color: "#F5B83D" },
  carbs: { label: "Carbs", consumed: 125, target: 180, color: "#5B9DFF" },
};

export const dinnerIdeas: MealRecommendation[] = [
  {
    id: "chicken-veg",
    name: "Chicken + vegetables",
    kcal: 520,
    protein: 42,
    image: "/meals/chicken-vegetables.png",
    tags: ["Dinner", "High protein"],
    ingredients: ["Chicken breast", "Broccoli", "Mixed vegetables", "Olive oil"],
  },
  {
    id: "yogurt-berries",
    name: "Greek yogurt + berries",
    kcal: 310,
    protein: 28,
    image: "/meals/greek-yogurt-berries.png",
    tags: ["Snack", "High protein"],
    ingredients: ["Greek yogurt", "Blueberries", "Strawberries", "Granola"],
  },
  {
    id: "tofu-stir-fry",
    name: "Tofu stir-fry",
    kcal: 480,
    protein: 24,
    image: "/meals/tofu-stir-fry.png",
    tags: ["Dinner", "Plant"],
    ingredients: ["Tofu", "Broccoli", "Bell peppers", "Rice"],
  },
];

export type MealSlot = "breakfast" | "lunch" | "snack" | "dinner";

const breakfastIdeas: MealRecommendation[] = [
  {
    id: "oatmeal-berries",
    name: "Oatmeal + berries",
    kcal: 340,
    protein: 14,
    image: "/meals/greek-yogurt-berries.png",
    tags: ["Breakfast", "Fiber"],
    ingredients: ["Rolled oats", "Mixed berries", "Honey", "Almond milk"],
  },
  {
    id: "egg-scramble",
    name: "Egg white scramble",
    kcal: 280,
    protein: 32,
    image: "/meals/chicken-vegetables.png",
    tags: ["Breakfast", "High protein"],
    ingredients: ["Egg whites", "Spinach", "Bell peppers", "Olive oil"],
  },
  {
    id: "yogurt-parfait",
    name: "Greek yogurt parfait",
    kcal: 290,
    protein: 24,
    image: "/meals/greek-yogurt-berries.png",
    tags: ["Breakfast", "Quick"],
    ingredients: ["Greek yogurt", "Granola", "Berries", "Chia seeds"],
  },
];

const lunchIdeas: MealRecommendation[] = [
  {
    id: "chicken-rice-bowl",
    name: "Chicken rice bowl",
    kcal: 490,
    protein: 38,
    image: "/meals/chicken-vegetables.png",
    tags: ["Lunch", "High protein"],
    ingredients: ["Chicken breast", "Brown rice", "Broccoli", "Olive oil"],
  },
  {
    id: "tofu-bowl",
    name: "Tofu power bowl",
    kcal: 450,
    protein: 26,
    image: "/meals/tofu-stir-fry.png",
    tags: ["Lunch", "Plant"],
    ingredients: ["Tofu", "Quinoa", "Mixed vegetables", "Tahini"],
  },
  {
    id: "turkey-salad",
    name: "Turkey salad plate",
    kcal: 380,
    protein: 34,
    image: "/meals/chicken-vegetables.png",
    tags: ["Lunch", "Lean"],
    ingredients: ["Turkey breast", "Greens", "Tomatoes", "Olive oil"],
  },
];

const snackIdeas: MealRecommendation[] = [
  {
    id: "yogurt-berries",
    name: "Greek yogurt + berries",
    kcal: 310,
    protein: 28,
    image: "/meals/greek-yogurt-berries.png",
    tags: ["Snack", "High protein"],
    ingredients: ["Greek yogurt", "Blueberries", "Strawberries", "Granola"],
  },
  {
    id: "apple-almonds",
    name: "Apple + almonds",
    kcal: 220,
    protein: 6,
    image: "/meals/greek-yogurt-berries.png",
    tags: ["Snack", "Quick"],
    ingredients: ["Apple", "Almonds", "Cinnamon"],
  },
  {
    id: "protein-shake",
    name: "Protein shake",
    kcal: 180,
    protein: 24,
    image: "/meals/tofu-stir-fry.png",
    tags: ["Snack", "High protein"],
    ingredients: ["Protein powder", "Almond milk", "Banana"],
  },
];

export const mealIdeasBySlot: Record<MealSlot, MealRecommendation[]> = {
  breakfast: breakfastIdeas,
  lunch: lunchIdeas,
  snack: snackIdeas,
  dinner: dinnerIdeas,
};

export function mealSlotLabel(slot: MealSlot) {
  return slot.charAt(0).toUpperCase() + slot.slice(1);
}

export function mealSlotFromLogId(id: string): MealSlot {
  if (id === "breakfast") return "breakfast";
  if (id === "lunch") return "lunch";
  if (id === "dinner") return "dinner";
  return "snack";
}

export function mealSlotByTime(date = new Date()): MealSlot {
  const hour = date.getHours();
  if (hour < 10) return "breakfast";
  if (hour < 12) return "snack";
  if (hour < 15) return "lunch";
  if (hour < 17) return "snack";
  if (hour < 21) return "dinner";
  return "snack";
}

export function defaultMealLogIdByTime(date = new Date()): MealLogId {
  const slot = mealSlotByTime(date);
  if (slot === "breakfast") return "breakfast";
  if (slot === "lunch") return "lunch";
  if (slot === "dinner") return "dinner";
  return date.getHours() < 17 ? "snack1" : "snack2";
}

export function getMealIdeasForSlot(slot: MealSlot) {
  return mealIdeasBySlot[slot];
}

export function mealIdeasHeading(slot: MealSlot) {
  return `${mealSlotLabel(slot)} ideas for you`;
}

export function percent(consumed: number, target: number) {
  if (target <= 0) return 0;
  return Math.round((consumed / target) * 100);
}

export function formatKcal(value: number) {
  return value.toLocaleString("en-US");
}

export function proteinShort(nutrition: Nutrition) {
  return Math.max(0, nutrition.protein.target - nutrition.protein.consumed);
}

export function parseMealDescription(text: string) {
  const lower = text.toLowerCase();
  let kcal = 420;
  let protein = 28;
  let fat = 12;
  let carbs = 32;
  let name = text.trim() || "Logged meal";

  if (lower.includes("chicken")) {
    kcal = 520;
    protein = 42;
    fat = 14;
    carbs = 18;
    name = "Chicken meal";
  } else if (lower.includes("yogurt")) {
    kcal = 310;
    protein = 28;
    fat = 8;
    carbs = 24;
    name = "Greek yogurt";
  } else if (lower.includes("tofu")) {
    kcal = 480;
    protein = 24;
    fat = 16;
    carbs = 48;
    name = "Tofu stir-fry";
  } else if (lower.includes("salad")) {
    kcal = 280;
    protein = 18;
    fat = 12;
    carbs = 22;
    name = "Salad";
  }

  return { name, kcal, protein, fat, carbs };
}

export function addLoggedMeal(nutrition: Nutrition, meal: { kcal: number; protein: number; fat: number; carbs: number }): Nutrition {
  return {
    ...nutrition,
    kcalLogged: nutrition.kcalLogged + meal.kcal,
    protein: {
      ...nutrition.protein,
      consumed: nutrition.protein.consumed + meal.protein,
    },
    fat: {
      ...nutrition.fat,
      consumed: nutrition.fat.consumed + meal.fat,
    },
    carbs: {
      ...nutrition.carbs,
      consumed: nutrition.carbs.consumed + meal.carbs,
    },
  };
}
