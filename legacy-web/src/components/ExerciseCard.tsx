import ExerciseIllustration from "./ExerciseIllustration";
import WorkoutTimer from "./WorkoutTimer";
import { exerciseMeta, timerDuration, type WorkoutExercise } from "../services/trainService";
import "../styles/session.css";

type ExerciseCardProps = {
  exercise: WorkoutExercise;
  remaining: number;
};

export default function ExerciseCard({ exercise, remaining }: ExerciseCardProps) {
  return (
    <section className="exercise-card">
      <h2>{exercise.name}</h2>
      <p>{exerciseMeta(exercise)}</p>
      <ExerciseIllustration src={exercise.illustration} alt={exercise.name} />
      <WorkoutTimer remaining={remaining} total={timerDuration(exercise)} />
    </section>
  );
}
