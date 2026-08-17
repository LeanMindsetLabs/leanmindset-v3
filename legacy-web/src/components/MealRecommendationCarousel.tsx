import MealRecommendationCard from "./MealRecommendationCard";
import type { MealRecommendation } from "../services/mealsService";
import "../styles/meals.css";

type MealRecommendationCarouselProps = {
  meals: MealRecommendation[];
  onSelect: (meal: MealRecommendation) => void;
  onViewAll: () => void;
};

export default function MealRecommendationCarousel({
  meals,
  onSelect,
  onViewAll,
}: MealRecommendationCarouselProps) {
  return (
    <section className="meal-carousel-wrap">
      <div className="meal-carousel-head">
        <h2>Dinner ideas for you</h2>
        <button type="button" className="meal-view-all" onClick={onViewAll}>
          View all →
        </button>
      </div>
      <div className="meal-carousel">
        {meals.map((meal) => (
          <MealRecommendationCard
            key={meal.id}
            meal={meal}
            onClick={() => onSelect(meal)}
          />
        ))}
      </div>
    </section>
  );
}
