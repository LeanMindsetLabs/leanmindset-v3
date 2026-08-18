export const layout = {
  screenPaddingX: 16,
  sectionGap: 16,
  cardGap: 12,
  maxContentWidth: 430,
  minTouchTarget: 44,
  compactWidth: 380,
  largeWidth: 428,
  compactHeight: 700,
  /** Gap from last content to tab bar top border (matches Meals grocery CTA). */
  tabBarContentInset: 10,
} as const;

export type ViewportClass = "compact" | "standard" | "large";

export function getViewportClass(width: number, height: number): ViewportClass {
  if (width < layout.compactWidth || height < layout.compactHeight) return "compact";
  if (width >= layout.largeWidth) return "large";
  return "standard";
}
