import { useEffect } from "react";
import ExerciseCard from "../components/ExerciseCard";
import ExerciseProgress from "../components/ExerciseProgress";
import WorkoutControlButton from "../components/WorkoutControlButton";
import WorkoutSessionHeader from "../components/WorkoutSessionHeader";
import { useWorkoutRuntime } from "../hooks/useWorkoutRuntime";
import { completeSet, previousExercise, tickTimer } from "../services/workoutSessionService";
import "../styles/session.css";

type WorkoutSessionScreenProps = {
  onBack: () => void;
};

export default function WorkoutSessionScreen({ onBack }: WorkoutSessionScreenProps) {
  const runtime = useWorkoutRuntime();
  const exercise = runtime.session.exercises[runtime.step];
  const total = runtime.session.exercises.length;

  useEffect(() => {
    const timer = window.setInterval(() => tickTimer(), 1000);
    return () => window.clearInterval(timer);
  }, [runtime.step, runtime.currentSet]);

  if (!exercise) return null;

  return (
    <div className="session-screen">
      <WorkoutSessionHeader title={runtime.session.title} onBack={onBack} />
      <ExerciseProgress current={runtime.step + 1} total={total} />
      <ExerciseCard exercise={exercise} remaining={runtime.remaining} />
      <div className="workout-controls">
        <WorkoutControlButton
          label="Previous"
          variant="prev"
          onClick={previousExercise}
          disabled={runtime.step === 0}
        />
        <WorkoutControlButton label="Complete Set" variant="complete" onClick={completeSet} />
      </div>
    </div>
  );
}
