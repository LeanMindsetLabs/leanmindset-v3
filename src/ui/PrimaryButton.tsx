import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
} from "react-native";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { radius } from "@/src/theme/radius";
import { shadows } from "@/src/theme/shadows";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";

type PrimaryButtonProps = PressableProps & {
  label: string;
  loading?: boolean;
};

export default function PrimaryButton({
  label,
  loading,
  disabled,
  ...rest
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={typography.button} maxFontSizeMultiplier={1.2}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: layout.minTouchTarget + 8,
    borderRadius: radius.lg,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    ...shadows.cta,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.88,
  },
});
