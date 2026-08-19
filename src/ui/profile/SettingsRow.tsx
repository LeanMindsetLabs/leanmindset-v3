import { type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { profileIcon, profileIconTile } from "./iconSpec";
import ProfileIcon, { type ProfileIconName } from "./ProfileIcon";

export type SettingsRowProps = {
  icon?: ProfileIconName;
  label: string;
  value?: string;
  trailing?: string;
  layout?: "inline" | "stack";
  destructive?: boolean;
  showChevron?: boolean;
  flush?: boolean;
  accessory?: ReactNode;
  onPress?: () => void;
};

export default function SettingsRow({
  icon,
  label,
  value,
  trailing,
  layout = "inline",
  destructive,
  showChevron = true,
  flush,
  accessory,
  onPress,
}: SettingsRowProps) {
  const labelColor = destructive ? colors.danger : colors.textPrimary;
  const glyphColor = destructive ? colors.danger : colors.white;
  const stacked = layout === "stack";
  const content = (
    <View style={[styles.row, flush && styles.flush]}>
      {icon ? (
        <View style={styles.iconWrap}>
          <ProfileIcon name={icon} size={profileIcon.row} color={glyphColor} strokeWidth={profileIcon.stroke} />
        </View>
      ) : null}
      <View style={styles.copy}>
        <Text style={[stacked ? styles.stackLabel : styles.label, { color: stacked ? colors.textSecondary : labelColor }]} numberOfLines={1}>
          {label}
        </Text>
        {stacked && trailing ? (
          <Text style={styles.stackValue} numberOfLines={1}>
            {trailing}
          </Text>
        ) : null}
        {!stacked && value ? (
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
        ) : null}
      </View>
      {!stacked && trailing ? (
        <Text style={styles.trailing} numberOfLines={1}>
          {trailing}
        </Text>
      ) : null}
      {accessory}
      {showChevron && !accessory ? (
        <ProfileIcon name="chevron" size={profileIcon.chevron} color={colors.white} strokeWidth={profileIcon.stroke} />
      ) : null}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} style={({ pressed }) => (pressed ? styles.pressed : null)}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: layout.minTouchTarget + 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconWrap: {
    ...profileIconTile,
  },
  flush: {
    paddingHorizontal: 0,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  stackLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  stackValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  value: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  trailing: {
    flexShrink: 1,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "right",
    maxWidth: "46%",
  },
  pressed: {
    opacity: 0.72,
  },
});
