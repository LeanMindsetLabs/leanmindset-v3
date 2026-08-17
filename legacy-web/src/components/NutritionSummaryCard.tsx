import { Info } from "lucide-react";
import MacroRow from "./MacroRow";
import NutritionRing from "./NutritionRing";
import type { Nutrition } from "../services/mealsService";
import { formatKcal, percent } from "../services/mealsService";
import "../styles/meals.css";

type NutritionSummaryCardProps = {
  nutrition: Nutrition;
};

export default function NutritionSummaryCard({ nutrition }: NutritionSummaryCardProps) {
  const pct = percent(nutrition.kcalLogged, nutrition.kcalTarget);

  return (
    <section className="nutrition-card">
      <div className="nutrition-head">
        <h2>Today's nutrition</h2>
        <button type="button" className="meals-info" aria-label="About today's nutrition">
          <Info size={14} strokeWidth={1.7} />
        </button>
      </div>
      <div className="nutrition-body">
        <NutritionRing logged={nutrition.kcalLogged} target={nutrition.kcalTarget} />
        <div className="nutrition-side">
          <div className="nutrition-target-row">
            <span className="nutrition-target">
              Target {formatKcal(nutrition.kcalTarget)} kcal
            </span>
            <span className="nutrition-percentage">{pct}%</span>
          </div>
          <div className="nutrition-dots" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, i) => (
              <span key={i} className={i / 22 <= pct / 100 ? "on" : ""} />
            ))}
          </div>
          <div className="macro-list">
            <MacroRow macro={nutrition.protein} />
            <MacroRow macro={nutrition.fat} />
            <MacroRow macro={nutrition.carbs} />
          </div>
        </div>
      </div>
    </section>
  );
}
