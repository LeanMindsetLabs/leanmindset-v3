export const tabs = ["home", "today", "meals", "coach", "train", "progress"] as const;

export type TabId = (typeof tabs)[number];

export type ProgressView =
  | "profile"
  | "lean-score"
  | "weight"
  | "see-all"
  | "program"
  | "measurements"
  | "integrations"
  | "settings"
  | "help"
  | "photos"
  | "reviews";
