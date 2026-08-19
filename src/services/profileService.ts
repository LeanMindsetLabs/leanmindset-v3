import { appStorage } from "@/src/lib/storage";

export type WeightEntry = {
  date: string;
  label: string;
  lb: number;
};

export type MeasurementKey = "weight" | "waist" | "chest" | "hips";

export type Measurements = Record<MeasurementKey, number>;

export type AppPreferences = {
  notifications: boolean;
  units: "lb" | "kg";
  shareProgress: boolean;
  darkMode: boolean;
  heightUnit: "cm" | "in";
  temperatureUnit: "c" | "f";
  coachingReminders: boolean;
  workoutReminders: boolean;
  mealReminders: boolean;
  achievementAlerts: boolean;
};

export type ProgramInfo = {
  name: string;
  day: number;
  totalDays: number;
  phase: string;
  upcoming: string;
  schedule: { week: string; focus: string }[];
};

export type MembershipInfo = {
  planName: string;
  interval: string;
  status: "active" | "inactive";
  memberSinceLabel: string;
  nextBillingLabel: string;
  last4: string;
  brand: string;
};

export type Achievement = {
  id: string;
  label: string;
  detail: string;
  caption: string;
  mark: string;
  tone: "blue" | "green" | "purple" | "muted";
  icon?: "flame";
  unlocked: boolean;
};

export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  initial: string;
  online: boolean;
  birthdayLabel: string;
  gender: string;
  heightCm: number;
  country: string;
  memberSinceLabel: string;
  leanLevel: number;
};

export type ProfileState = {
  user: ProfileUser;
  leanScore: number;
  leanStatus: string;
  weightLb: number;
  weightDeltaLb: number;
  weightHistory: WeightEntry[];
  measurements: Measurements;
  program: ProgramInfo;
  appleHealthConnected: boolean;
  preferences: AppPreferences;
  streakDays: number;
  consistencyPct: number;
  workoutsCount: number;
  goalLabel: string;
  targetWeightKg: number;
  goalProgress: number;
  membership: MembershipInfo;
  achievements: Achievement[];
};

const SESSION_KEY = "lm-session";
const PROFILE_KEY = "lm-profile";

export const defaultUser: ProfileUser = {
  id: "mani-a",
  name: "Mani A",
  email: "mani.dev@gmail.com",
  initial: "M",
  online: true,
  birthdayLabel: "Mar 12, 1994",
  gender: "Male",
  heightCm: 175,
  country: "United States",
  memberSinceLabel: "Aug 2026",
  leanLevel: 12.3,
};

export const defaultProfile: ProfileState = {
  user: defaultUser,
  leanScore: 65,
  leanStatus: "Good",
  weightLb: 141.1,
  weightDeltaLb: -7.05,
  weightHistory: [
    { date: "2026-07-20", label: "Jul 20", lb: 158.7 },
    { date: "2026-07-22", label: "Jul 22", lb: 157.0 },
    { date: "2026-07-24", label: "Jul 24", lb: 157.9 },
    { date: "2026-07-26", label: "Jul 26", lb: 155.2 },
    { date: "2026-07-28", label: "Jul 28", lb: 156.3 },
    { date: "2026-07-31", label: "Jul 31", lb: 153.7 },
    { date: "2026-08-03", label: "Aug 3", lb: 154.8 },
    { date: "2026-08-05", label: "Aug 5", lb: 151.2 },
    { date: "2026-08-08", label: "Aug 8", lb: 152.1 },
    { date: "2026-08-11", label: "Aug 11", lb: 148.6 },
    { date: "2026-08-14", label: "Aug 14", lb: 146.8 },
    { date: "2026-08-17", label: "Aug 17", lb: 144.2 },
    { date: "2026-08-19", label: "Aug 20", lb: 141.1 },
  ],
  measurements: {
    weight: 141.1,
    waist: 34.5,
    chest: 40,
    hips: 38,
  },
  program: {
    name: "6-Week Lab",
    day: 18,
    totalDays: 42,
    phase: "Build",
    upcoming: "Peak",
    schedule: [
      { week: "Weeks 1–2", focus: "Foundation · Walk + Core" },
      { week: "Weeks 3–4", focus: "Build · Strength density" },
      { week: "Weeks 5–6", focus: "Peak · Adherence lock-in" },
    ],
  },
  appleHealthConnected: false,
  preferences: {
    notifications: true,
    units: "kg",
    shareProgress: false,
    darkMode: true,
    heightUnit: "cm",
    temperatureUnit: "c",
    coachingReminders: true,
    workoutReminders: true,
    mealReminders: false,
    achievementAlerts: true,
  },
  streakDays: 18,
  consistencyPct: 84,
  workoutsCount: 42,
  goalLabel: "Lose 6 kg",
  targetWeightKg: 60,
  goalProgress: 0.65,
  membership: {
    planName: "Premium Plan",
    interval: "Annual",
    status: "active",
    memberSinceLabel: "Aug 14, 2026",
    nextBillingLabel: "Aug 14, 2027",
    last4: "4242",
    brand: "Visa",
  },
  achievements: [
    { id: "7-days", label: "7 DAYS", caption: "STREAK", detail: "Week streak", mark: "7", tone: "purple", unlocked: true },
    { id: "10-workouts", label: "10 WORKOUTS", caption: "WORKOUTS", detail: "Training volume", mark: "10", tone: "green", unlocked: true },
    { id: "calorie-burn", label: "2000", caption: "CALORIE BURN", detail: "Fuel target hit", mark: "2000", tone: "purple", unlocked: true },
    { id: "1-month", label: "1 MONTH", caption: "MEMBER", detail: "Member milestone", mark: "1 MO", tone: "muted", unlocked: true },
    { id: "early-bird", label: "EARLY BIRD", caption: "MORNING", detail: "5 morning sessions", mark: "5 AM", tone: "muted", unlocked: false },
    { id: "protein", label: "PROTEIN PRO", caption: "NUTRITION", detail: "7 days on target", mark: "PRO", tone: "muted", unlocked: false },
  ],
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

function persistProfile(next: ProfileState) {
  appStorage.setItem(PROFILE_KEY, JSON.stringify(next));
}

function persistSession(user: ProfileUser | null) {
  if (user) appStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else appStorage.removeItem(SESSION_KEY);
}

function readJson<T>(key: string): T | null {
  try {
    const raw = appStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function rehydrateProfile() {
  profile = loadProfile();
  session = readJson<ProfileUser>(SESSION_KEY) ?? defaultUser;
  notify();
}

function mergeProfile(saved: Partial<ProfileState> | null): ProfileState {
  if (!saved) return { ...defaultProfile, user: { ...defaultUser } };
  return {
    ...defaultProfile,
    ...saved,
    user: { ...defaultUser, ...saved.user },
    measurements: { ...defaultProfile.measurements, ...saved.measurements },
    program: { ...defaultProfile.program, ...saved.program },
    preferences: { ...defaultProfile.preferences, ...saved.preferences },
    membership: { ...defaultProfile.membership, ...saved.membership },
    weightHistory: saved.weightHistory && saved.weightHistory.length >= 12 ? saved.weightHistory : defaultProfile.weightHistory,
    weightLb: saved.weightHistory && saved.weightHistory.length >= 12 ? saved.weightLb ?? defaultProfile.weightLb : defaultProfile.weightLb,
    weightDeltaLb: saved.weightHistory && saved.weightHistory.length >= 12 ? saved.weightDeltaLb ?? defaultProfile.weightDeltaLb : defaultProfile.weightDeltaLb,
    achievements:
      saved.achievements?.length &&
      saved.achievements.every((item) => "tone" in item && "mark" in item && "caption" in item) &&
      saved.achievements.some((item) => item.mark === "1 MO")
        ? saved.achievements
        : defaultProfile.achievements,
  };
}

function loadProfile(): ProfileState {
  return mergeProfile(readJson<ProfileState>(PROFILE_KEY));
}

let profile: ProfileState = loadProfile();
let session: ProfileUser | null = readJson<ProfileUser>(SESSION_KEY) ?? defaultUser;

export function getProfile() {
  return profile;
}

export function getSession() {
  return session;
}

export function subscribeProfile(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function login(email: string) {
  const trimmed = email.trim() || defaultUser.email;
  const name = trimmed === defaultUser.email ? defaultUser.name : trimmed.split("@")[0];
  session = {
    ...defaultUser,
    email: trimmed,
    name,
    initial: (name[0] || "M").toUpperCase(),
  };
  profile = { ...defaultProfile, user: session };
  persistSession(session);
  persistProfile(profile);
  notify();
  return session;
}

export function logout() {
  session = null;
  profile = { ...defaultProfile, user: { ...defaultUser } };
  persistSession(null);
  appStorage.removeItem(PROFILE_KEY);
  notify();
}

export function updateUser(patch: Partial<ProfileUser>) {
  const user = { ...profile.user, ...patch };
  if (patch.name) user.initial = patch.name.trim()[0]?.toUpperCase() || user.initial;
  profile = { ...profile, user };
  if (session) {
    session = { ...session, ...user };
    persistSession(session);
  }
  persistProfile(profile);
  notify();
}

export function updateWeight(lb: number) {
  const next = Math.round(lb * 10) / 10;
  const start = profile.weightHistory[0]?.lb ?? next;
  profile = {
    ...profile,
    weightLb: next,
    weightDeltaLb: Math.round((next - start) * 10) / 10,
    measurements: { ...profile.measurements, weight: next },
    weightHistory: [
      ...profile.weightHistory.filter((entry) => entry.date !== "2026-08-19"),
      { date: "2026-08-19", label: "Aug 20", lb: next },
    ],
  };
  persistProfile(profile);
  notify();
}

export function updateMeasurement(key: MeasurementKey, value: number) {
  const next = Math.round(value * 10) / 10;
  profile = {
    ...profile,
    measurements: { ...profile.measurements, [key]: next },
    ...(key === "weight" ? { weightLb: next } : {}),
  };
  persistProfile(profile);
  notify();
}

export function setAppleHealthConnected(connected: boolean) {
  profile = { ...profile, appleHealthConnected: connected };
  persistProfile(profile);
  notify();
}

export function updatePreferences(patch: Partial<AppPreferences>) {
  profile = { ...profile, preferences: { ...profile.preferences, ...patch } };
  persistProfile(profile);
  notify();
}

export function lbToKg(lb: number) {
  return lb / 2.2046;
}

export function kgToLb(kg: number) {
  return kg * 2.2046;
}

export function formatWeight(lb: number, units: "lb" | "kg") {
  if (units === "kg") return `${lbToKg(lb).toFixed(1)} kg`;
  return `${lb.toFixed(1)} lb`;
}

export function formatWeightDelta(lb: number, units: "lb" | "kg") {
  const value = units === "kg" ? lbToKg(lb) : lb;
  const unit = units === "kg" ? "kg" : "lb";
  const rounded = Math.round(value * 10) / 10;
  const sign = rounded > 0 ? "+" : "";
  return `${sign}${rounded.toFixed(1)} ${unit}`;
}

export function formatHeight(cm: number, unit: "cm" | "in") {
  if (unit === "in") {
    const total = cm / 2.54;
    const feet = Math.floor(total / 12);
    const inches = Math.round(total - feet * 12);
    return `${feet}'${inches}"`;
  }
  return `${Math.round(cm)} cm`;
}
