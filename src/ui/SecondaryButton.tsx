import { Pressable, StyleSheet, Text, type PressableProps } from "react-native";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";

type SecondaryButtonProps = PressableProps & {
  label: string;
};

export default function SecondaryButton({ label, disabled, ...rest }: SecondaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
      {...rest}
    >
      <Text style={[typography.button, { color: colors.textPrimary }]} maxFontSizeMultiplier={1.2}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: layout.minTouchTarget + 4,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.88,
  },
});
