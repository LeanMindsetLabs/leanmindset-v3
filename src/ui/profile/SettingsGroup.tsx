import { type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";

type SettingsGroupProps = {
  title?: string;
  children: ReactNode;
};

export default function SettingsGroup({ title, children }: SettingsGroupProps) {
  return (
    <View style={styles.wrap}>
      {title ? (
        <Text style={styles.title} maxFontSizeMultiplier={1.3}>
          {title}
        </Text>
      ) : null}
      <View style={styles.card}>{children}</View>
    </View>
  );
}

export function SettingsDivider({ inset = 16 }: { inset?: number }) {
  return <View style={[styles.divider, { marginLeft: inset }]} />;
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  title: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: colors.textSecondary,
    textTransform: "uppercase",
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: colors.profileCard,
    borderRadius: 16,
    overflow: "hidden",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderSubtle,
  },
});
