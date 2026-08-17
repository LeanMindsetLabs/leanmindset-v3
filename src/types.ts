export const tabs = ["home", "today", "meals", "coach", "train", "progress"] as const;

export type TabId = (typeof tabs)[number];
