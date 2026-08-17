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
};

export type ProgramInfo = {
  name: string;
  day: number;
  totalDays: number;
  phase: string;
  upcoming: string;
  schedule: { week: string; focus: string }[];
};

export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  initial: string;
  online: boolean;
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
};

const SESSION_KEY = "lm-session";
const PROFILE_KEY = "lm-profile";

export const defaultUser: ProfileUser = {
  id: "mani-a",
  name: "Mani A",
  email: "mani.dev@gmail.com",
  initial: "M",
  online: true,
};

export const defaultProfile: ProfileState = {
  user: defaultUser,
  leanScore: 65,
  leanStatus: "Good",
  weightLb: 178.4,
  weightDeltaLb: -3.2,
  weightHistory: [
    { date: "2026-07-04", label: "Jul 4", lb: 181.6 },
    { date: "2026-07-18", label: "Jul 18", lb: 180.5 },
    { date: "2026-08-01", label: "Aug 1", lb: 179.3 },
    { date: "2026-08-15", label: "Today", lb: 178.4 },
  ],
  measurements: {
    weight: 178.4,
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
    units: "lb",
    shareProgress: false,
  },
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

function persistProfile(next: ProfileState) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
}

function persistSession(user: ProfileUser | null) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function loadProfile(): ProfileState {
  return readJson<ProfileState>(PROFILE_KEY) ?? { ...defaultProfile, user: { ...defaultUser } };
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
  session = {
    ...defaultUser,
    email: trimmed,
    name: trimmed === defaultUser.email ? defaultUser.name : trimmed.split("@")[0],
    initial: (trimmed === defaultUser.email ? "M" : trimmed[0] || "M").toUpperCase(),
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
  localStorage.removeItem(PROFILE_KEY);
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
      ...profile.weightHistory.filter((entry) => entry.date !== "2026-08-15"),
      { date: "2026-08-15", label: "Today", lb: next },
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

export function formatWeight(lb: number, units: "lb" | "kg") {
  if (units === "kg") return `${(lb / 2.2046).toFixed(1)} kg`;
  return `${lb.toFixed(1)} lb`;
}
