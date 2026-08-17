import type { MealRecommendation } from "../services/mealsService";
import "../styles/meals.css";

type MealRecommendationCardProps = {
  meal: MealRecommendation;
  onClick: () => void;
};

export default function MealRecommendationCard({
  meal,
  onClick,
}: MealRecommendationCardProps) {
  return (
    <button
      type="button"
      className="meal-rec"
      onClick={onClick}
      aria-label={`${meal.name}, ${meal.kcal} kcal, ${meal.protein}g protein`}
    >
      <img src={meal.image} alt="" className="meal-rec-image" />
      <span className="meal-rec-body">
        <strong>{meal.name}</strong>
        <em>{meal.kcal} kcal</em>
        <em>{meal.protein}g protein</em>
      </span>
    </button>
  );
}
