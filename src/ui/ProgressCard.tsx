import { type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";

type ProgressCardProps = {
  title: string;
  children: ReactNode;
};

export default function ProgressCard({ title, children }: ProgressCardProps) {
  return (
    <View style={styles.card}>
      <Text style={typography.caption} maxFontSizeMultiplier={1.3}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
});
