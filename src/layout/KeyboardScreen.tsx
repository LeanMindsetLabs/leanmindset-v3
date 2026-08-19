import { type ReactNode } from "react";
import { ScrollView, StyleSheet, View, type ViewStyle } from "react-native";
import AppScreen from "./AppScreen";
import { useKeyboardHeight } from "@/src/hooks/useKeyboardHeight";
import { spacing } from "@/src/theme/spacing";

type KeyboardScreenProps = {
  children: ReactNode;
  footer?: ReactNode;
  edges?: ("top" | "right" | "bottom" | "left")[];
  contentStyle?: ViewStyle;
};

export default function KeyboardScreen({
  children,
  footer,
  edges = ["top"],
  contentStyle,
}: KeyboardScreenProps) {
  const keyboardHeight = useKeyboardHeight();

  return (
    <AppScreen edges={edges}>
      <View style={[styles.flex, { paddingBottom: keyboardHeight }]}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.content, contentStyle]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: spacing.lg,
  },
  footer: {
    paddingBottom: spacing.md,
  },
});
