import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useUiVariant } from "@/src/context/UiVariantContext";
import { InPhoneModal } from "@/src/layout/PhoneOverlay";
import { colors } from "@/src/theme/colors";
import LogFab from "@/src/ui/LogFab";

const options: { id: "meal" | "workout" | "checkin"; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "meal", label: "Meal", icon: "restaurant-outline" },
  { id: "workout", label: "Workout", icon: "barbell-outline" },
  { id: "checkin", label: "Check-in", icon: "moon-outline" },
];

const glassWeb = {
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  boxShadow: "0 0 16px 2px rgba(61, 123, 255, 0.22)",
} as const;

export default function LogMenuHost() {
  const { composerOpen, logMenuOpen, setLogMenuOpen, setCoachVariant, previewRoute } = useUiVariant();

  function close() {
    setLogMenuOpen(false);
  }

  function pick(id: "meal" | "workout" | "checkin") {
    close();
    if (id === "meal") {
      router.push("/(tabs)/meals");
      return;
    }
    if (id === "workout") {
      router.push("/workout");
      return;
    }
    setCoachVariant("checkin");
    router.push("/(tabs)/coach");
  }

  const hideFab = composerOpen || previewRoute === "login" || previewRoute === "coach";

  return (
    <>
      {hideFab ? null : (
        <View pointerEvents="box-none" style={styles.fabWrap}>
          <LogFab onPress={() => setLogMenuOpen(true)} />
        </View>
      )}

      <InPhoneModal visible={logMenuOpen}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={close} />
          <View style={[styles.sheet, Platform.OS === "web" ? glassWeb : null]}>
            <View style={styles.head}>
              <Text style={styles.title}>LOG</Text>
              <Pressable onPress={close} accessibilityLabel="Close" style={styles.close}>
                <Ionicons name="close" size={18} color={colors.textSecondary} />
              </Pressable>
            </View>
            {options.map((opt, i) => (
              <Pressable
                key={opt.id}
                onPress={() => pick(opt.id)}
                style={[styles.row, i < options.length - 1 && styles.rowLine]}
              >
                <Ionicons name={opt.icon} size={20} color={colors.metricBlueSoft} />
                <Text style={styles.rowLabel}>{opt.label}</Text>
              </Pressable>
            ))}
          </View>
          <View pointerEvents="box-none" style={styles.fabWrap}>
            <LogFab onPress={() => setLogMenuOpen(true)} />
          </View>
        </View>
      </InPhoneModal>
    </>
  );
}

const styles = StyleSheet.create({
  fabWrap: {
    ...StyleSheet.absoluteFill,
    zIndex: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 18,
    paddingBottom: Platform.OS === "web" ? 98 : 88,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
  },
  sheet: {
    marginHorizontal: 12,
    marginBottom: 108,
    borderRadius: 18,
    backgroundColor: "rgba(34, 37, 41, 0.72)",
    borderWidth: 1.5,
    borderColor: "rgba(61, 123, 255, 0.45)",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  close: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
  },
  rowLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(61, 123, 255, 0.22)",
  },
  rowLabel: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
});
