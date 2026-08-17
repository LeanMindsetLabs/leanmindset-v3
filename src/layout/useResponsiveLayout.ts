import { useWindowDimensions } from "react-native";
import { getViewportClass, layout, type ViewportClass } from "@/src/theme/layout";

export type ResponsiveLayout = {
  width: number;
  height: number;
  viewport: ViewportClass;
  contentWidth: number;
  horizontalGutter: number;
  isCompact: boolean;
  isLarge: boolean;
};

export function useResponsiveLayout(): ResponsiveLayout {
  const { width, height } = useWindowDimensions();
  const viewport = getViewportClass(width, height);
  const contentWidth = Math.min(width, layout.maxContentWidth);
  const horizontalGutter = Math.max(layout.screenPaddingX, (width - contentWidth) / 2);

  return {
    width,
    height,
    viewport,
    contentWidth,
    horizontalGutter,
    isCompact: viewport === "compact",
    isLarge: viewport === "large",
  };
}
