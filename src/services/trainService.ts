export type WorkoutDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type WorkoutExercise = {
  id: string;
  name: string;
  detail: string;
  durationSec?: number;
  reps?: number;
  sets: number;
  restSec: number;
  illustration: string;
};

export type WorkoutSession = {
  id: string;
  title: string;
  durationMin: number;
  durationMax: number;
  difficulty: WorkoutDifficulty;
  tags: string[];
  illustration: string;
  completed: boolean;
  inProgress: boolean;
  exercises: WorkoutExercise[];
};

export type TrainingDay = {
  date: string;
  dayLabel: string;
  completed: boolean;
};

export const walkCoreA: WorkoutSession = {
  id: "walk-core-a",
  title: "Walk + Core A",
  durationMin: 25,
  durationMax: 30,
  difficulty: "Beginner",
  tags: ["NEAT + Midline"],
  illustration: "/train/walk-core-a.png",
  completed: false,
  inProgress: false,
  exercises: [
    {
      id: "dead-bug",
      name: "Dead Bug",
      detail: "Opposite arm and leg, slow",
      reps: 10,
      sets: 3,
      restSec: 28,
      illustration: "/train/dead-bug.png",
    },
    {
      id: "plank",
      name: "Forearm plank",
      detail: "Keep ribs down, squeeze glutes",
      durationSec: 40,
      sets: 3,
      restSec: 20,
      illustration: "/train/plank.png",
    },
    {
      id: "bridge",
      name: "Glute bridge",
      detail: "Pause at the top",
      reps: 12,
      sets: 3,
      restSec: 28,
      illustration: "/train/glute-bridge.png",
    },
    {
      id: "bird-dog",
      name: "Bird dog",
      detail: "Opposite arm and leg, hold briefly",
      reps: 10,
      sets: 3,
      restSec: 28,
      illustration: "/train/bird-dog.png",
    },
    {
      id: "crunch",
      name: "Controlled crunch",
      detail: "Exhale on the way up",
      reps: 12,
      sets: 3,
      restSec: 28,
      illustration: "/train/crunch.png",
    },
    {
      id: "walk",
      name: "Brisk walk",
      detail: "Easy pace outdoors or indoors",
      durationSec: 480,
      sets: 1,
      restSec: 0,
      illustration: "/train/walk-core-a.png",
    },
  ],
};

export const walkMobility: WorkoutSession = {
  id: "walk-mobility",
  title: "20-min walk + mobility",
  durationMin: 20,
  durationMax: 20,
  difficulty: "Beginner",
  tags: ["Easy", "Recovery focus"],
  illustration: "/train/walk-core-a.png",
  completed: false,
  inProgress: false,
  exercises: [
    {
      id: "easy-walk",
      name: "Easy walk",
      detail: "Conversational pace",
      durationSec: 720,
      sets: 1,
      restSec: 0,
      illustration: "/train/walk-core-a.png",
    },
    {
      id: "hips",
      name: "Hip openers",
      detail: "90/90 and figure-four",
      durationSec: 180,
      sets: 2,
      restSec: 20,
      illustration: "/train/bird-dog.png",
    },
    {
      id: "spine",
      name: "Cat-cow",
      detail: "Slow and controlled",
      reps: 8,
      sets: 2,
      restSec: 20,
      illustration: "/train/glute-bridge.png",
    },
    {
      id: "stretch",
      name: "Down-regulation stretch",
      detail: "Breathe through the nose",
      durationSec: 180,
      sets: 1,
      restSec: 0,
      illustration: "/train/crunch.png",
    },
  ],
};

export const workoutsById: Record<string, WorkoutSession> = {
  [walkCoreA.id]: walkCoreA,
  [walkMobility.id]: walkMobility,
};

export const defaultWeek: TrainingDay[] = [
  { date: "2026-08-10", dayLabel: "M", completed: true },
  { date: "2026-08-11", dayLabel: "T", completed: true },
  { date: "2026-08-12", dayLabel: "W", completed: true },
  { date: "2026-08-13", dayLabel: "T", completed: true },
  { date: "2026-08-14", dayLabel: "F", completed: true },
  { date: "2026-08-15", dayLabel: "S", completed: true },
  { date: "2026-08-16", dayLabel: "S", completed: false },
];

export function adherenceCount(days: TrainingDay[]) {
  return days.filter((day) => day.completed).length;
}

export function completeToday(days: TrainingDay[]) {
  const next = days.map((day) => ({ ...day }));
  const open = next.find((day) => !day.completed);
  if (open) open.completed = true;
  return next;
}

export function exerciseMeta(exercise: WorkoutExercise) {
  if (exercise.reps && exercise.sets) {
    return `${exercise.reps} reps × ${exercise.sets} sets`;
  }
  if (exercise.durationSec && exercise.sets > 1) {
    return `${exercise.durationSec} sec × ${exercise.sets} sets`;
  }
  if (exercise.durationSec) {
    const mins = Math.round(exercise.durationSec / 60);
    return mins >= 2 ? `${mins} min` : `${exercise.durationSec} sec`;
  }
  return exercise.detail;
}

export function timerDuration(exercise: WorkoutExercise) {
  if (exercise.reps) return exercise.restSec || 28;
  return exercise.durationSec || exercise.restSec || 28;
}
