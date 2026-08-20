import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "@/src/theme/colors";
import AuthBrandHeader from "@/src/ui/auth/AuthBrandHeader";
import AuthHeroBackground from "@/src/ui/auth/AuthHeroBackground";

/** Shown while storage/profile hydrates — matches auth hero + logo. */
export default function AppBootScreen() {
  return (
    <View style={styles.page}>
      <AuthHeroBackground />
      <View style={styles.content}>
        <AuthBrandHeader />
        <ActivityIndicator color={colors.accentBlue} style={styles.spinner} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#05070b",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  spinner: {
    marginTop: 28,
  },
});
