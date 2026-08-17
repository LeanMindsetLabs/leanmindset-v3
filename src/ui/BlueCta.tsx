import { Pressable, StyleSheet, Text, type PressableProps } from "react-native";
import { colors } from "@/src/theme/colors";

type Props = PressableProps & { label: string };

export default function BlueCta({ label, disabled, ...rest }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [styles.btn, disabled && styles.disabled, pressed && styles.pressed]}
      {...rest}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    width: "100%",
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7aa4ff",
    shadowOpacity: 0.7,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.88 },
});
