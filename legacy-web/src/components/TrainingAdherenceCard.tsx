import AdherenceDayBar from "./AdherenceDayBar";
import { adherenceCount, type TrainingDay } from "../services/trainService";
import "../styles/train.css";

type TrainingAdherenceCardProps = {
  days: TrainingDay[];
};

export default function TrainingAdherenceCard({ days }: TrainingAdherenceCardProps) {
  const done = adherenceCount(days);
  const heights = [46, 52, 40, 56, 48, 54, 22];

  return (
    <section className="adherence-card">
      <div className="adherence-head">
        <h2>Training adherence</h2>
        <span>
          {done}/{days.length} days
        </span>
      </div>
      <div className="adherence-bars">
        {days.map((day, index) => (
          <AdherenceDayBar
            key={`${day.dayLabel}-${index}`}
            label={day.dayLabel}
            completed={day.completed}
            height={day.completed ? heights[index] : 18}
          />
        ))}
      </div>
    </section>
  );
}
