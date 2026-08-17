import { ChevronDown } from "lucide-react";
import { useState } from "react";
import WeightTrendChart from "./WeightTrendChart";
import {
  chartSeries,
  type ChartRange,
  type WeekReview,
} from "../services/weekReviewService";
import "../styles/week-review.css";

const ranges: { id: ChartRange; label: string }[] = [
  { id: "last7", label: "Last 7 days" },
  { id: "previous", label: "Previous week" },
  { id: "last4", label: "Last 4 weeks" },
];

type WeightTrendCardProps = {
  review: WeekReview;
  reviews: WeekReview[];
};

export default function WeightTrendCard({ review, reviews }: WeightTrendCardProps) {
  const [range, setRange] = useState<ChartRange>("last7");
  const [open, setOpen] = useState(false);
  const current = ranges.find((item) => item.id === range) ?? ranges[0];
  const points = chartSeries(review, range, reviews);

  return (
    <section className="weight-trend-card">
      <div className="weight-trend-head">
        <h2>Weight trend</h2>
        <button
          type="button"
          className="range-btn"
          onClick={() => setOpen((value) => !value)}
          aria-label={current.label}
        >
          {current.label}
          <ChevronDown size={12} strokeWidth={2.2} />
        </button>
      </div>
      {open && (
        <div className="range-menu">
          {ranges.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === range ? "active" : undefined}
              onClick={() => {
                setRange(item.id);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      <WeightTrendChart points={points} />
    </section>
  );
}
