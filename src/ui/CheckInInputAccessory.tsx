import { InputAccessoryView, Keyboard, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";

export const CHECKIN_INPUT_ACCESSORY = "lm-checkin-accessory";

/** iOS number pads have no Return key. This bar sits on top of the keyboard. */
export function CheckInInputAccessory({
  label,
  disabled,
  onPress,
}: {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  if (Platform.OS !== "ios") return null;

  return (
    <InputAccessoryView nativeID={CHECKIN_INPUT_ACCESSORY}>
      <View style={styles.bar}>
        <Pressable
          accessibilityRole="button"
          disabled={disabled}
          onPress={() => {
            Keyboard.dismiss();
            onPress();
          }}
          style={[styles.btn, disabled && styles.btnOff]}
        >
          <Text style={styles.label}>{label}</Text>
        </Pressable>
      </View>
    </InputAccessoryView>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#12161C",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "flex-end",
  },
  btn: {
    backgroundColor: colors.accentBlue,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnOff: {
    opacity: 0.4,
  },
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
});
