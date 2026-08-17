import "../styles/week-review.css";

type WeekReadyCardProps = {
  week: number;
  onClick: () => void;
};

export default function WeekReadyCard({ week, onClick }: WeekReadyCardProps) {
  return (
    <button type="button" className="week-ready-card" onClick={onClick} aria-label="View Week in Review">
      <strong>Week {week} complete 🎉</strong>
      <p>Your weekly review is ready. See your progress and next week's focus.</p>
      <em>View Week in Review →</em>
    </button>
  );
}
