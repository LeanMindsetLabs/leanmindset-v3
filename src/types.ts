export const tabs = ["home", "today", "meals", "coach", "train", "profile"] as const;

export type TabId = (typeof tabs)[number];
