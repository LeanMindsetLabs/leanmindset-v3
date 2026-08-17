import { useEffect, useState } from "react";
import { getWorkoutRuntime, subscribeWorkout } from "../services/workoutSessionService";

export function useWorkoutRuntime() {
  const [runtime, setRuntime] = useState(getWorkoutRuntime);

  useEffect(() => {
    const unsubscribe = subscribeWorkout(() => setRuntime({ ...getWorkoutRuntime() }));
    return () => {
      unsubscribe();
    };
  }, []);

  return runtime;
}
