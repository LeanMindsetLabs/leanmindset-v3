import { type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import AppScreen from "./AppScreen";
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
  return (
    <AppScreen edges={edges}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.content, contentStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </KeyboardAvoidingView>
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
