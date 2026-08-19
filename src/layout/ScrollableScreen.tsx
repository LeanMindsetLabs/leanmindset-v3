import { type ReactNode } from "react";
import { ScrollView, StyleSheet, type ViewStyle } from "react-native";
import { layout } from "@/src/theme/layout";
import { spacing } from "@/src/theme/spacing";
import AppScreen from "./AppScreen";

type ScrollableScreenProps = {
  children: ReactNode;
  edges?: ("top" | "right" | "bottom" | "left")[];
  padded?: boolean;
  contentStyle?: ViewStyle;
  backgroundColor?: string;
};

export default function ScrollableScreen({
  children,
  edges = ["top"],
  padded = true,
  contentStyle,
  backgroundColor,
}: ScrollableScreenProps) {
  return (
    <AppScreen edges={edges} padded={padded} backgroundColor={backgroundColor}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, contentStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: spacing.sm,
    paddingBottom: layout.tabBarContentInset,
    gap: spacing.lg,
  },
});
