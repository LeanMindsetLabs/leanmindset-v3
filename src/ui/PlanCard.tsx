import { type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";

type PlanCardProps = {
  title: string;
  meta: string;
  complete?: boolean;
  icon?: ReactNode;
  onPress?: () => void;
};

export default function PlanCard({ title, meta, complete, icon, onPress }: PlanCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      style={({ pressed }) => [styles.card, pressed && onPress ? styles.pressed : null]}
    >
      <View style={styles.icon}>{icon}</View>
      <View style={styles.copy}>
        <Text style={typography.heading3} maxFontSizeMultiplier={1.3}>
          {title}
        </Text>
        <Text style={typography.bodySmall} maxFontSizeMultiplier={1.4}>
          {meta}
        </Text>
      </View>
      <Ionicons
        name={complete ? "checkmark-circle" : "chevron-forward"}
        size={20}
        color={complete ? colors.accent : colors.textMuted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: layout.minTouchTarget + 12,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  pressed: {
    opacity: 0.88,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
});
