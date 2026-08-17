import ExerciseProgressBar from "./ExerciseProgressBar";
import "../styles/session.css";

type ExerciseProgressProps = {
  current: number;
  total: number;
};

export default function ExerciseProgress({ current, total }: ExerciseProgressProps) {
  const percent = total > 0 ? Math.floor((current / total) * 100) : 0;

  return (
    <section className="exercise-progress">
      <div className="exercise-progress-labels">
        <p>
          Exercise <em>{current}</em> of {total}
        </p>
        <p>
          <em>{percent}%</em> complete
        </p>
      </div>
      <ExerciseProgressBar value={percent} />
    </section>
  );
}
