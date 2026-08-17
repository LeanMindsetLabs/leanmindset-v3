import { type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { typography } from "@/src/theme/typography";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: ReactNode;
};

export default function ScreenHeader({ title, subtitle, onBack, right }: ScreenHeaderProps) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={styles.iconBtn}
        >
          <Ionicons name="chevron-back" size={22} color={colors.textSecondary} />
        </Pressable>
      ) : null}
      <View style={styles.copy}>
        <Text style={typography.heading1} maxFontSizeMultiplier={1.3}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={typography.bodySmall} maxFontSizeMultiplier={1.4}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  iconBtn: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
  },
});
