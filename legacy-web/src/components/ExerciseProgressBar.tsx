import "../styles/session.css";

type ExerciseProgressBarProps = {
  value: number;
};

export default function ExerciseProgressBar({ value }: ExerciseProgressBarProps) {
  return (
    <div className="exercise-bar" aria-hidden="true">
      <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
