import { appStorage } from "@/src/lib/storage";

export type DailyWeight = {
  day: string;
  lb: number;
};

export type WeekReview = {
  week: number;
  status: "completed";
  workoutsDone: number;
  workoutsPlanned: number;
  mealsFollowedPct: number | null;
  hydrationDays: number;
  hydrationGoal: number;
  sleepAvgMin: number | null;
  dailyWeights: DailyWeight[];
  viewed: boolean;
};

export type ChartRange = "last7" | "previous" | "last4";

export type WeekProgramState = {
  currentWeek: number;
  dayInWeek: number;
  weekLength: number;
  reviewPending: boolean;
  reviews: WeekReview[];
};

const WEEK_KEY = "lm-week";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

function persist(next: WeekProgramState) {
  appStorage.setItem(WEEK_KEY, JSON.stringify(next));
}

function readJson<T>(key: string): T | null {
  try {
    const raw = appStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function rehydrateWeek() {
  state = readJson<WeekProgramState>(WEEK_KEY) ?? defaultWeekState;
  notify();
}

export const week2Weights: DailyWeight[] = [
  { day: "Sun", lb: 174.4 },
  { day: "Mon", lb: 173.9 },
  { day: "Tue", lb: 173.2 },
  { day: "Wed", lb: 172.8 },
  { day: "Thu", lb: 172.1 },
  { day: "Fri", lb: 171.6 },
  { day: "Sat", lb: 170.8 },
];

export const week1Weights: DailyWeight[] = [
  { day: "Sun", lb: 175.6 },
  { day: "Mon", lb: 175.3 },
  { day: "Tue", lb: 175.0 },
  { day: "Wed", lb: 174.8 },
  { day: "Thu", lb: 174.6 },
  { day: "Fri", lb: 174.5 },
  { day: "Sat", lb: 174.4 },
];

export const defaultWeekState: WeekProgramState = {
  currentWeek: 2,
  dayInWeek: 7,
  weekLength: 7,
  reviewPending: true,
  reviews: [
    {
      week: 2,
      status: "completed",
      workoutsDone: 4,
      workoutsPlanned: 5,
      mealsFollowedPct: 87,
      hydrationDays: 4,
      hydrationGoal: 7,
      sleepAvgMin: 430,
      dailyWeights: week2Weights,
      viewed: false,
    },
    {
      week: 1,
      status: "completed",
      workoutsDone: 3,
      workoutsPlanned: 4,
      mealsFollowedPct: 82,
      hydrationDays: 5,
      hydrationGoal: 7,
      sleepAvgMin: 410,
      dailyWeights: week1Weights,
      viewed: true,
    },
  ],
};

let state: WeekProgramState = readJson<WeekProgramState>(WEEK_KEY) ?? defaultWeekState;

export function getWeekState() {
  return state;
}

export function subscribeWeek(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function isReviewReady() {
  return state.reviewPending && state.dayInWeek >= state.weekLength;
}

export function completedWeekNumber() {
  return state.reviews[0]?.week ?? state.currentWeek;
}

export function getReview(week: number) {
  return state.reviews.find((item) => item.week === week) ?? null;
}

export function weightChange(review: WeekReview) {
  if (review.dailyWeights.length < 2) return null;
  const start = review.dailyWeights[0].lb;
  const end = review.dailyWeights[review.dailyWeights.length - 1].lb;
  return Math.round((end - start) * 10) / 10;
}

export function formatSleep(minutes: number | null) {
  if (minutes == null) return "—";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins.toString().padStart(2, "0")}m`;
}

export function formatWeightDelta(delta: number | null, units: "lb" | "kg") {
  if (delta == null) return "—";
  const value = units === "kg" ? delta / 2.2046 : delta;
  const abs = Math.abs(value).toFixed(1);
  const arrow = value < 0 ? "↓" : value > 0 ? "↑" : "–";
  return `${arrow} ${abs} ${units}`;
}

export function chartSeries(review: WeekReview, range: ChartRange, reviews: WeekReview[]) {
  if (range === "previous") {
    const prev = reviews.find((item) => item.week === review.week - 1);
    return prev?.dailyWeights ?? review.dailyWeights;
  }
  if (range === "last4") {
    return [...reviews]
      .filter((item) => item.week <= review.week)
      .sort((a, b) => a.week - b.week)
      .flatMap((item) => item.dailyWeights)
      .slice(-28);
  }
  return review.dailyWeights;
}

export function markReviewViewed(week: number) {
  state = {
    ...state,
    reviews: state.reviews.map((item) =>
      item.week === week ? { ...item, viewed: true } : item
    ),
  };
  persist(state);
  notify();
}

export function startNextWeek() {
  const finished = completedWeekNumber();
  const nextWeek = finished + 1;
  state = {
    ...state,
    currentWeek: nextWeek,
    dayInWeek: 1,
    reviewPending: false,
    reviews: state.reviews.map((item) =>
      item.week === finished ? { ...item, viewed: true } : item
    ),
  };
  persist(state);
  notify();
  return nextWeek;
}

export function resetWeekState() {
  state = { ...defaultWeekState, reviews: defaultWeekState.reviews.map((item) => ({ ...item })) };
  persist(state);
  notify();
}
