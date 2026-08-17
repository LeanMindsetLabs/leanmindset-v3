import { colors } from "./colors";
import type { TextStyle } from "react-native";

export const typography = {
  display: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "700",
    letterSpacing: -0.6,
    color: colors.textPrimary,
  },
  heading1: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    letterSpacing: -0.4,
    color: colors.textPrimary,
  },
  heading2: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    letterSpacing: -0.2,
    color: colors.textPrimary,
  },
  heading3: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    letterSpacing: -0.15,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "400",
    color: colors.textPrimary,
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    letterSpacing: 0.4,
    color: colors.textSecondary,
    textTransform: "uppercase",
  },
  metricLarge: {
    fontSize: 44,
    lineHeight: 48,
    fontWeight: "700",
    letterSpacing: -1,
    color: colors.textPrimary,
  },
  metricMedium: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "700",
    letterSpacing: -0.4,
    color: colors.textPrimary,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    letterSpacing: -0.2,
    color: colors.white,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
