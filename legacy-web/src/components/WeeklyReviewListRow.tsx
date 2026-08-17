import { ChevronRight } from "lucide-react";
import {
  formatWeightDelta,
  weightChange,
  type WeekReview,
} from "../services/weekReviewService";
import "../styles/week-review.css";

type WeeklyReviewListRowProps = {
  review: WeekReview;
  units: "lb" | "kg";
  onClick: () => void;
};

export default function WeeklyReviewListRow({
  review,
  units,
  onClick,
}: WeeklyReviewListRowProps) {
  const delta = weightChange(review);
  const meals = review.mealsFollowedPct == null ? "—" : `${review.mealsFollowedPct}% meals`;
  const workouts =
    review.workoutsPlanned > 0
      ? `${review.workoutsDone}/${review.workoutsPlanned} workouts`
      : "—";

  return (
    <button
      type="button"
      className="review-list-row"
      onClick={onClick}
      aria-label={`Week ${review.week}`}
    >
      <span className="review-list-copy">
        <strong>Week {review.week}</strong>
        <em>Completed</em>
        <span>
          {formatWeightDelta(delta, units)} · {workouts} · {meals}
        </span>
      </span>
      <ChevronRight size={16} strokeWidth={2} />
    </button>
  );
}
