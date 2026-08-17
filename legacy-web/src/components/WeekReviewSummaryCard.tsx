import { Dumbbell, Droplet, Info, Moon, Scale, Utensils } from "lucide-react";
import WeekReviewSummaryRow from "./WeekReviewSummaryRow";
import {
  formatSleep,
  formatWeightDelta,
  weightChange,
  type WeekReview,
} from "../services/weekReviewService";
import "../styles/week-review.css";

type WeekReviewSummaryCardProps = {
  review: WeekReview;
  units: "lb" | "kg";
  onInfo: () => void;
};

export default function WeekReviewSummaryCard({
  review,
  units,
  onInfo,
}: WeekReviewSummaryCardProps) {
  const delta = weightChange(review);
  const workouts =
    review.workoutsPlanned > 0 ? `${review.workoutsDone}/${review.workoutsPlanned}` : "—";
  const meals = review.mealsFollowedPct == null ? "—" : `${review.mealsFollowedPct}%`;
  const hydration =
    review.hydrationGoal > 0 ? `${review.hydrationDays}/${review.hydrationGoal}` : "—";

  return (
    <>
      <div className="week-summary-head">
        <h2>Progress summary</h2>
        <button type="button" className="week-compare" onClick={onInfo} aria-label="vs last 7 days">
          vs last 7 days
          <Info size={12} strokeWidth={2} />
        </button>
      </div>
      <section className="week-summary-card">
        <WeekReviewSummaryRow
          label="Weight"
          value={formatWeightDelta(delta, units)}
          icon={<Scale size={13} strokeWidth={2} />}
          iconBg="rgba(50,209,125,.14)"
          iconColor="#19E68C"
          positive={delta != null && delta < 0}
        />
        <WeekReviewSummaryRow
          label="Workouts"
          value={workouts}
          icon={<Dumbbell size={13} strokeWidth={2} />}
          iconBg="rgba(75,132,255,.16)"
          iconColor="#5B9DFF"
        />
        <WeekReviewSummaryRow
          label="Meals followed"
          value={meals}
          icon={<Utensils size={13} strokeWidth={2} />}
          iconBg="rgba(50,209,125,.14)"
          iconColor="#19E68C"
        />
        <WeekReviewSummaryRow
          label="Hydration"
          value={hydration}
          icon={<Droplet size={13} strokeWidth={2} />}
          iconBg="rgba(75,132,255,.16)"
          iconColor="#5B9DFF"
        />
        <WeekReviewSummaryRow
          label="Sleep avg"
          value={formatSleep(review.sleepAvgMin)}
          icon={<Moon size={13} strokeWidth={2} />}
          iconBg="rgba(154,108,255,.16)"
          iconColor="#9A6CFF"
        />
      </section>
    </>
  );
}
