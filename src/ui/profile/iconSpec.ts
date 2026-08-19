import { colors } from "@/src/theme/colors";

/** Locked sizes from the high-res Profile mockup (24pt icon area, 1.65pt stroke). */
export const profileIcon = {
  stroke: 1.65,
  header: 22,
  row: 22,
  tile: 32,
  tileRadius: 8,
  chevron: 18,
  stat: 24,
  goal: 20,
  edit: 11,
  pencil: 12,
  crown: 22,
  people: 22,
  accent: colors.white,
} as const;

export const profileRowDividerInset = 16 + 32 + 12;

export const profileIconTile = {
  width: profileIcon.tile,
  height: profileIcon.tile,
  borderRadius: profileIcon.tileRadius,
  backgroundColor: "transparent",
  alignItems: "center" as const,
  justifyContent: "center" as const,
};
