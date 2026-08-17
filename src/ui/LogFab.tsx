import { Ionicons } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

const glassWeb = {
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  boxShadow: "0 0 10px 2px rgba(61, 123, 255, 0.28)",
} as const;

type Props = {
  onPress: () => void;
};

/** Glass fill (B) + blue ring/glow (A). */
export default function LogFab({ onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Log"
      onPress={onPress}
      style={[styles.fab, Platform.OS === "web" ? glassWeb : null]}
    >
      <Ionicons name="add" size={26} color={colors.metricBlueSoft} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    outlineWidth: 0,
    backgroundColor: "rgba(34, 37, 41, 0.55)",
    borderWidth: 2.5,
    borderColor: colors.accentBlue,
    shadowColor: colors.accentBlue,
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
});
