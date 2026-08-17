import { Camera, ChevronLeft, PenLine } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import GroceryPreviewCard from "../components/GroceryPreviewCard";
import MealActionCard from "../components/MealActionCard";
import MealRecommendationCarousel from "../components/MealRecommendationCarousel";
import MealsHeader from "../components/MealsHeader";
import NutritionInsightCard from "../components/NutritionInsightCard";
import NutritionSummaryCard from "../components/NutritionSummaryCard";
import UiVariantToggle from "../components/UiVariantToggle";
import {
  addLoggedMeal,
  defaultNutrition,
  dinnerIdeas,
  groceryItems as grocerySeed,
  parseMealDescription,
  proteinShort,
  type GroceryItem,
  type MealRecommendation,
  type Nutrition,
} from "../services/mealsService";
import type { MealsUiVariant } from "./MealsLogScreen";
import "../styles/meals.css";
import "../styles/meals-log.css";

type MealsView = "main" | "describe" | "photo" | "detail" | "all" | "grocery";

type MealsScreenProps = {
  onAskCoach: (message: string) => void;
  mealsVariant?: MealsUiVariant;
  onMealsVariantChange?: (next: MealsUiVariant) => void;
};

export default function MealsScreen({
  onAskCoach,
  mealsVariant = "classic",
  onMealsVariantChange,
}: MealsScreenProps) {
  const [view, setView] = useState<MealsView>("main");
  const [nutrition, setNutrition] = useState<Nutrition>(defaultNutrition);
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<MealRecommendation | null>(null);
  const [groceries, setGroceries] = useState<GroceryItem[]>(grocerySeed);
  const fileRef = useRef<HTMLInputElement>(null);

  const parsed = useMemo(() => parseMealDescription(description), [description]);
  const grouped = useMemo(() => {
    return groceries.reduce<Record<string, GroceryItem[]>>((acc, item) => {
      acc[item.aisle] = acc[item.aisle] ? [...acc[item.aisle], item] : [item];
      return acc;
    }, {});
  }, [groceries]);
  const remaining = groceries.filter((item) => !item.checked).length;
  const aisleOrder = ["Produce", "Protein", "Dairy", "Pantry"];
  const groupedAisles = aisleOrder.filter((aisle) => grouped[aisle]?.length);

  function logMeal(meal: { kcal: number; protein: number; fat: number; carbs: number }) {
    setNutrition((current) => addLoggedMeal(current, meal));
    setView("main");
    setDescription("");
    setPhotoUrl(null);
  }

  if (view === "describe") {
    return (
      <div className="meals-sub">
        <div className="meals-sub-head">
          <button type="button" className="meals-back" onClick={() => setView("main")} aria-label="Back">
            <ChevronLeft size={22} />
          </button>
          <h2>Describe a meal</h2>
        </div>
        <textarea
          className="meals-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. grilled chicken, rice, and broccoli"
          aria-label="What you ate"
        />
        {description.trim() && (
          <p className="meals-note" style={{ marginTop: 10 }}>
            {parsed.name} · {parsed.kcal} kcal · {parsed.protein}g protein
          </p>
        )}
        <button
          type="button"
          className="meals-primary"
          disabled={!description.trim()}
          onClick={() => logMeal(parsed)}
        >
          Log meal
        </button>
      </div>
    );
  }

  if (view === "photo") {
    return (
      <div className="meals-sub">
        <div className="meals-sub-head">
          <button type="button" className="meals-back" onClick={() => setView("main")} aria-label="Back">
            <ChevronLeft size={22} />
          </button>
          <h2>Review meal</h2>
        </div>
        {photoUrl && <img src={photoUrl} alt="Selected meal" className="photo-preview" />}
        <p className="meals-note">
          Estimated from your photo: 420 kcal · 28g protein · 12g fat · 32g carbs
        </p>
        <button
          type="button"
          className="meals-primary"
          onClick={() => logMeal({ kcal: 420, protein: 28, fat: 12, carbs: 32 })}
        >
          Log meal
        </button>
      </div>
    );
  }

  if (view === "detail" && selectedMeal) {
    return (
      <div className="meals-sub">
        <div className="meals-sub-head">
          <button type="button" className="meals-back" onClick={() => setView("main")} aria-label="Back">
            <ChevronLeft size={22} />
          </button>
          <h2>{selectedMeal.name}</h2>
        </div>
        <img src={selectedMeal.image} alt="" className="meals-detail-image" />
        <p className="meals-detail-meta">
          {selectedMeal.kcal} kcal · {selectedMeal.protein}g protein
        </p>
        <ul className="meals-ingredients">
          {selectedMeal.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button
          type="button"
          className="meals-primary"
          onClick={() =>
            logMeal({
              kcal: selectedMeal.kcal,
              protein: selectedMeal.protein,
              fat: 12,
              carbs: 30,
            })
          }
        >
          Add to today's log
        </button>
      </div>
    );
  }

  if (view === "all") {
    return (
      <div className="meals-sub">
        <div className="meals-sub-head">
          <button type="button" className="meals-back" onClick={() => setView("main")} aria-label="Back">
            <ChevronLeft size={22} />
          </button>
          <h2>Dinner ideas</h2>
        </div>
        <div className="meals-list">
          {dinnerIdeas.map((meal) => (
            <button
              key={meal.id}
              type="button"
              className="meals-list-item"
              onClick={() => {
                setSelectedMeal(meal);
                setView("detail");
              }}
            >
              <img src={meal.image} alt="" />
              <span>
                <strong>{meal.name}</strong>
                <em>
                  {meal.kcal} kcal · {meal.protein}g protein
                </em>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === "grocery") {
    return (
      <div className="meals-sub">
        <div className="meals-sub-head">
          <button type="button" className="meals-back" onClick={() => setView("main")} aria-label="Back">
            <ChevronLeft size={22} />
          </button>
          <h2>Grocery list</h2>
        </div>
        <p className="grocery-remaining">
          {remaining} of {groceries.length} items left
        </p>
        {groupedAisles.map((aisle) => (
          <div key={aisle} className="grocery-group">
            <h3>{aisle}</h3>
            {grouped[aisle].map((item) => (
              <button
                key={item.id}
                type="button"
                className={`grocery-row${item.checked ? " checked" : ""}`}
                onClick={() =>
                  setGroceries((current) =>
                    current.map((entry) =>
                      entry.id === item.id ? { ...entry, checked: !entry.checked } : entry
                    )
                  )
                }
                aria-pressed={item.checked}
                aria-label={`${item.checked ? "Uncheck" : "Check"} ${item.name}`}
              >
                <span className="grocery-check" aria-hidden="true">
                  {item.checked ? "✓" : ""}
                </span>
                <span className="grocery-name">{item.name}</span>
                <span className="grocery-qty">{item.quantity}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="meals-screen">
      {onMealsVariantChange ? (
        <div className="meals-classic-bar">
          <UiVariantToggle
            label="Meals layout"
            value={mealsVariant}
            onChange={onMealsVariantChange}
            options={[
              { id: "classic", label: "Classic" },
              { id: "log", label: "Meals Log" },
            ]}
          />
        </div>
      ) : null}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          setPhotoUrl(URL.createObjectURL(file));
          setView("photo");
          event.target.value = "";
        }}
      />
      <div className="meals-scroll">
        <MealsHeader />
        <div className="meals-actions">
          <MealActionCard
            title="Photo log meal"
            subtitle="Snap a photo to log"
            icon={<Camera size={16} strokeWidth={1.9} />}
            onClick={() => fileRef.current?.click()}
          />
          <MealActionCard
            title="Describe a meal"
            subtitle="Type what you ate"
            icon={<PenLine size={16} strokeWidth={1.9} />}
            onClick={() => setView("describe")}
          />
        </div>
        <NutritionSummaryCard nutrition={nutrition} />
        <NutritionInsightCard
          gramsShort={proteinShort(nutrition)}
          onClick={() =>
            onAskCoach(
              `I'm ${proteinShort(nutrition)}g short on protein today. What high-protein dinner should I eat?`
            )
          }
        />
        <MealRecommendationCarousel
          meals={dinnerIdeas}
          onSelect={(meal) => {
            setSelectedMeal(meal);
            setView("detail");
          }}
          onViewAll={() => setView("all")}
        />
        <GroceryPreviewCard onGenerate={() => setView("grocery")} />
      </div>
    </div>
  );
}
