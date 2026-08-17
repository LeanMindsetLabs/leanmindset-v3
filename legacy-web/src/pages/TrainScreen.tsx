import { useEffect, useState } from "react";
import PrimaryWorkoutButton from "../components/PrimaryWorkoutButton";
import ScoreRing from "../components/ScoreRing";
import SecondaryWorkoutButton from "../components/SecondaryWorkoutButton";
import TrainHeader from "../components/TrainHeader";
import TrainingAdherenceCard from "../components/TrainingAdherenceCard";
import UiVariantToggle from "../components/UiVariantToggle";
import WorkoutSessionCard from "../components/WorkoutSessionCard";
import { useWorkoutRuntime } from "../hooks/useWorkoutRuntime";
import {
  leaveSession,
  loadWorkout,
  markWorkoutDone,
  startSession,
} from "../services/workoutSessionService";
import type { LayoutVariant } from "./HomeScreen";
import WorkoutSessionScreen from "./WorkoutSessionScreen";
import "../styles/train.css";
import "../styles/whoop.css";

type TrainScreenProps = {
  onBack: () => void;
  startWorkoutId?: string | null;
  onStartConsumed?: () => void;
  variant?: LayoutVariant;
  onVariantChange?: (next: LayoutVariant) => void;
};

export default function TrainScreen({
  onBack,
  startWorkoutId,
  onStartConsumed,
  variant = "classic",
  onVariantChange,
}: TrainScreenProps) {
  const runtime = useWorkoutRuntime();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!startWorkoutId) return;
    loadWorkout(startWorkoutId, true);
    onStartConsumed?.();
  }, [startWorkoutId, onStartConsumed]);

  function openSession() {
    if (runtime.session.completed) return;
    setLoading(true);
    window.setTimeout(() => {
      startSession();
      setLoading(false);
    }, 220);
  }

  if (runtime.view === "session") {
    return <WorkoutSessionScreen onBack={leaveSession} />;
  }

  return (
    <div className="train-screen">
      {onVariantChange ? (
        <div className="layout-toggle-bar">
          <UiVariantToggle
            label="Train layout"
            value={variant}
            onChange={onVariantChange}
            options={[
              { id: "classic", label: "Classic" },
              { id: "whoop", label: "Whoop" },
            ]}
          />
        </div>
      ) : null}
      {variant === "whoop" ? (
        <>
          <div className="whoop-hero">
            <ScoreRing size={196} strokeWidth={8} progress={8.4 / 14} fillColor="#3D7BFF">
              <span>LOAD</span>
              <strong>8.4</strong>
            </ScoreRing>
          </div>
          <div className="whoop-rows">
            <div className="whoop-row">
              <span>SESSION</span>
              <strong>{runtime.session.title ?? "Walk + Core A"}</strong>
            </div>
            <div className="whoop-row">
              <span>TARGET</span>
              <strong>14.0</strong>
            </div>
            <div className="whoop-row">
              <span>DURATION</span>
              <strong>25 min</strong>
            </div>
          </div>
          <div className="whoop-note">
            <h3>Keep this session easy</h3>
            <p>Ready is yellow, so stay in the target zone and finish Walk + Core A.</p>
            <span className="highlight-cta">View session →</span>
          </div>
          <PrimaryWorkoutButton
            label={runtime.session.inProgress ? "Resume session" : "Start session"}
            onClick={openSession}
            disabled={runtime.session.completed}
            loading={loading}
          />
        </>
      ) : (
        <>
      <TrainHeader onBack={onBack} />
      <WorkoutSessionCard session={runtime.session} />
      <PrimaryWorkoutButton
        label={runtime.session.inProgress ? "Resume session" : "Start session"}
        onClick={openSession}
        disabled={runtime.session.completed}
        loading={loading}
      />
      <SecondaryWorkoutButton
        label={runtime.session.completed ? "Completed ✓" : "Mark as done"}
        onClick={markWorkoutDone}
        disabled={runtime.session.completed}
      />
      <TrainingAdherenceCard days={runtime.week} />
        </>
      )}
    </div>
  );
}
