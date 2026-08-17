import { type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";

type MetricCardProps = {
  label: string;
  value: string;
  detail?: string;
  icon?: ReactNode;
};

export default function MetricCard({ label, value, detail, icon }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        {icon}
        <Text style={typography.caption} maxFontSizeMultiplier={1.3}>
          {label}
        </Text>
      </View>
      <Text style={typography.heading2} maxFontSizeMultiplier={1.25}>
        {value}
      </Text>
      {detail ? (
        <Text style={typography.bodySmall} maxFontSizeMultiplier={1.4}>
          {detail}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
});
