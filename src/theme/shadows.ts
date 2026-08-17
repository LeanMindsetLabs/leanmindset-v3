import { colors } from "./colors";

export const shadows = {
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 6,
  },
  highlight: {
    shadowColor: colors.highlightCta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 4,
  },
  cta: {
    shadowColor: colors.accentBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 5,
  },
} as const;
