import { Trophy } from "lucide-react";
import "../styles/week-review.css";

type WeekReviewHeroProps = {
  week: number;
};

export default function WeekReviewHero({ week }: WeekReviewHeroProps) {
  const size = 74;
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * 0.86;

  return (
    <section className="week-review-hero">
      <div className="trophy-ring" aria-hidden="true">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#2C2C2E"
            strokeWidth={stroke}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#5B9DFF"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            transform={`rotate(-90 ${center} ${center})`}
          />
        </svg>
        <span className="trophy-ring-icon">
          <Trophy size={22} strokeWidth={2} />
        </span>
      </div>
      <div className="week-hero-copy">
        <h2 className="week-hero-title">Week {week} complete</h2>
        <p className="week-hero-status">You're on track 🎉</p>
        <p className="week-hero-support">
          Keep showing up. Small steps,
          <br />
          big change.
        </p>
      </div>
    </section>
  );
}
