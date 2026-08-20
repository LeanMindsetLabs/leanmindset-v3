import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";

const ACCENT = colors.accentBlue;
export const ONBOARDING_FOOTER_LIFT = 52;

export function RunnerProgress({ index, total }: { index: number; total: number }) {
  return (
    <View style={styles.progressWrap} accessibilityRole="progressbar" accessibilityValue={{ min: 1, max: total, now: index + 1 }}>
      <View style={styles.segments}>
        {Array.from({ length: total }, (_, i) => {
          const current = i === index;
          const done = i < index;
          return (
            <View key={i} style={styles.segmentCol}>
              <View style={styles.runnerSlot}>
                {current ? <MaterialCommunityIcons name="run" size={26} color={ACCENT} /> : null}
              </View>
              <View style={[styles.segment, (current || done) && styles.segmentOn]} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function OnboardingHeader({
  title,
  subtitle,
  index,
  total,
  onBack,
  onSkip,
}: {
  title: string;
  subtitle: string;
  index: number;
  total: number;
  onBack?: () => void;
  onSkip?: () => void;
}) {
  return (
    <View style={styles.head}>
      <View style={styles.nav}>
        <Pressable onPress={onBack} disabled={!onBack} style={[styles.navBtn, !onBack && styles.hidden]} accessibilityRole="button" accessibilityLabel="Back">
          <Ionicons name="chevron-back" size={20} color={colors.white} />
        </Pressable>
        <Text style={styles.stepCount}>
          {index + 1} OF {total}
        </Text>
        <Pressable onPress={onSkip} disabled={!onSkip} style={[styles.navBtn, styles.skipBtn, !onSkip && styles.hidden]} accessibilityRole="button" accessibilityLabel="Skip">
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>
      <RunnerProgress index={index} total={total} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

export function NextBar({
  label = "Next",
  disabled,
  onPress,
  extra,
  below,
}: {
  label?: string;
  disabled?: boolean;
  onPress: () => void;
  extra?: ReactNode;
  below?: ReactNode;
}) {
  return (
    <View style={styles.footer}>
      {extra}
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        style={({ pressed }) => [styles.next, disabled && styles.nextOff, pressed && styles.pressed]}
      >
        <Text style={styles.nextLabel}>{label}</Text>
        <Ionicons name="arrow-forward" size={16} color={colors.white} />
      </Pressable>
      {below}
    </View>
  );
}

export function UnitToggle({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <View style={styles.toggle}>
      {options.map((option) => {
        const on = option === value;
        return (
          <Pressable key={option} onPress={() => onChange(option)} style={[styles.toggleItem, on && styles.toggleOn]} accessibilityRole="button" accessibilityState={{ selected: on }}>
            <Text style={[styles.toggleText, on && styles.toggleTextOn]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function GoalTile({
  label,
  detail,
  icon,
  selected,
  onPress,
}: {
  label: string;
  detail: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.goalTile, selected && styles.goalTileOn]} accessibilityRole="button" accessibilityState={{ selected }}>
      {selected ? <Ionicons name="checkmark-circle" size={18} color={ACCENT} style={styles.goalCheck} /> : null}
      <View style={styles.goalIcon}>
        <Ionicons name={icon} size={18} color={ACCENT} />
      </View>
      <Text style={styles.goalLabel}>{label}</Text>
      <Text style={styles.goalDetail}>{detail}</Text>
    </Pressable>
  );
}

export function OptionRow({
  label,
  detail,
  icon,
  selected,
  onPress,
}: {
  label: string;
  detail: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.optionRow, selected && styles.optionRowOn]} accessibilityRole="button" accessibilityState={{ selected }}>
      <View style={styles.optionIcon}>
        <Ionicons name={icon} size={18} color={selected ? ACCENT : colors.textSecondary} />
      </View>
      <View style={styles.optionCopy}>
        <Text style={styles.optionLabel}>{label}</Text>
        <Text style={styles.optionDetail}>{detail}</Text>
      </View>
      {selected ? <Ionicons name="checkmark-circle" size={20} color={ACCENT} /> : null}
    </Pressable>
  );
}

export function HealthChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipOn]} accessibilityRole="button" accessibilityState={{ selected }}>
      <Text style={[styles.chipText, selected && styles.chipTextOn]}>{label}</Text>
    </Pressable>
  );
}

export function BasicsRow({ label, value, onPress }: { label: string; value: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.basicsRow} accessibilityRole="button">
      <Text style={styles.basicsLabel}>{label}</Text>
      <View style={styles.basicsRight}>
        <Text style={styles.basicsValue}>{value}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

type PreviewRowIcon =
  | { set: "ion"; name: keyof typeof Ionicons.glyphMap }
  | { set: "mci"; name: keyof typeof MaterialCommunityIcons.glyphMap };

export function PlanPreviewCard({
  rows,
}: {
  rows: { label: string; value: string; icon: PreviewRowIcon; iconColor?: string }[];
}) {
  return (
    <View style={styles.previewCard}>
      <Text style={styles.previewTitle}>YOUR PLAN PREVIEW</Text>
      {rows.map((row) => (
        <View key={row.label} style={styles.previewRow}>
          <View style={styles.previewLeft}>
            {row.icon.set === "mci" ? (
              <MaterialCommunityIcons name={row.icon.name} size={18} color={row.iconColor ?? colors.profileOrange} />
            ) : (
              <Ionicons name={row.icon.name} size={18} color={row.iconColor ?? colors.profileOrange} />
            )}
            <Text style={styles.previewLabel}>{row.label}</Text>
          </View>
          <Text style={styles.previewValue}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

const CONFETTI = [
  { top: 0, left: 28, color: ACCENT, size: 7 },
  { top: 4, right: 26, color: "#FF9A3A", size: 6 },
  { top: 18, left: 6, color: colors.white, size: 5 },
  { top: 22, right: 10, color: ACCENT, size: 5 },
  { top: 8, right: 2, color: colors.white, size: 4 },
  { top: 32, left: 18, color: "#FF9A3A", size: 4 },
  { bottom: 14, left: 8, color: ACCENT, size: 5 },
  { bottom: 10, right: 14, color: "#FF9A3A", size: 5 },
  { bottom: 24, left: 42, color: colors.white, size: 4 },
  { bottom: 20, right: 38, color: ACCENT, size: 4 },
] as const;

export function CompleteBadge() {
  return (
    <View style={styles.completeWrap}>
      {CONFETTI.map((piece, i) => (
        <View
          key={i}
          style={[
            styles.spark,
            {
              width: piece.size,
              height: piece.size,
              borderRadius: piece.size / 2,
              backgroundColor: piece.color,
              ...("top" in piece ? { top: piece.top } : {}),
              ...("left" in piece ? { left: piece.left } : {}),
              ...("right" in piece ? { right: piece.right } : {}),
              ...("bottom" in piece ? { bottom: piece.bottom } : {}),
            },
          ]}
        />
      ))}
      <View style={styles.completeCircle}>
        <Ionicons name="checkmark" size={42} color={colors.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressWrap: { paddingHorizontal: 2 },
  segments: { flexDirection: "row", alignItems: "flex-end", gap: 5 },
  segmentCol: { flex: 1, alignItems: "center" },
  runnerSlot: { height: 28, alignItems: "center", justifyContent: "flex-end", marginBottom: 5 },
  segment: {
    height: 4,
    width: "100%",
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  segmentOn: { backgroundColor: ACCENT },
  stepCount: {
    flex: 1,
    fontSize: 11,
    color: "rgba(255,255,255,0.42)",
    textAlign: "center",
    letterSpacing: 1.6,
    fontWeight: "600",
  },
  head: { gap: 14 },
  nav: { flexDirection: "row", alignItems: "center", minHeight: 36 },
  navBtn: { width: 44, minHeight: 36, justifyContent: "center" },
  skipBtn: { alignItems: "flex-end" },
  hidden: { opacity: 0 },
  skip: { fontSize: 15, color: colors.white, fontWeight: "500" },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    letterSpacing: -0.4,
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: "center",
  },
  footer: { gap: spacing.sm, paddingTop: spacing.sm, paddingBottom: ONBOARDING_FOOTER_LIFT },
  next: {
    minHeight: 52,
    borderRadius: radius.pill,
    backgroundColor: ACCENT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  nextOff: { opacity: 0.45 },
  pressed: { opacity: 0.9 },
  nextLabel: { fontSize: 16, fontWeight: "700", color: colors.white },
  toggle: {
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: radius.pill,
    backgroundColor: colors.profileCard,
    padding: 3,
    gap: 2,
  },
  toggleItem: {
    minHeight: 32,
    minWidth: 64,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleOn: { backgroundColor: ACCENT },
  toggleText: { fontSize: 13, fontWeight: "600", color: colors.textSecondary },
  toggleTextOn: { color: colors.white },
  goalTile: {
    width: "48%",
    flexGrow: 1,
    minHeight: 132,
    borderRadius: 14,
    backgroundColor: colors.profileCard,
    padding: 14,
    gap: 8,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  goalTileOn: { borderColor: ACCENT, backgroundColor: "rgba(61,123,255,0.08)" },
  goalCheck: { position: "absolute", top: 10, right: 10 },
  goalIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(61,123,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  goalLabel: { fontSize: 16, fontWeight: "700", color: colors.white },
  goalDetail: { fontSize: 12, lineHeight: 16, color: colors.textSecondary },
  optionRow: {
    minHeight: 64,
    borderRadius: 14,
    backgroundColor: colors.profileCard,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  optionRowOn: { borderColor: ACCENT, backgroundColor: "rgba(61,123,255,0.08)" },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  optionCopy: { flex: 1, gap: 2 },
  optionLabel: { fontSize: 15, fontWeight: "700", color: colors.white },
  optionDetail: { fontSize: 12, lineHeight: 16, color: colors.textSecondary },
  chip: {
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.profileCard,
    justifyContent: "center",
  },
  chipOn: { backgroundColor: "rgba(61,123,255,0.18)" },
  chipText: { fontSize: 13, fontWeight: "500", color: colors.textPrimary },
  chipTextOn: { color: colors.white, fontWeight: "600" },
  basicsRow: {
    minHeight: layout.minTouchTarget,
    borderRadius: 12,
    backgroundColor: colors.profileCard,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  basicsLabel: { fontSize: 14, color: colors.textSecondary },
  basicsRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  basicsValue: { fontSize: 14, fontWeight: "600", color: colors.white },
  previewCard: {
    borderRadius: 14,
    backgroundColor: colors.profileCard,
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 14,
  },
  previewTitle: {
    fontSize: 11,
    letterSpacing: 1.6,
    fontWeight: "700",
    color: colors.profileOrange,
  },
  previewRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  previewLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  previewLabel: { fontSize: 14, color: colors.white, fontWeight: "500" },
  previewValue: { fontSize: 14, fontWeight: "700", color: colors.white, textAlign: "right", flexShrink: 1 },
  completeWrap: {
    alignSelf: "center",
    width: 108,
    height: 108,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  completeCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
  },
  spark: {
    position: "absolute",
    opacity: 0.9,
  },
});
