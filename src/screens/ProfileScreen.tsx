import { router } from "expo-router";
import { StyleSheet, Switch, Text, View } from "react-native";
import ScrollableScreen from "@/src/layout/ScrollableScreen";
import { useProfile } from "@/src/hooks/useProfile";
import { logout, updatePreferences } from "@/src/services/profileService";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import ScreenHeader from "@/src/ui/ScreenHeader";
import SecondaryButton from "@/src/ui/SecondaryButton";

/**
 * Profile
 * Reusable: ScrollableScreen, ScreenHeader, SecondaryButton
 * Scrolls: yes. Safe area: top. Keyboard: none on this screen.
 */
export default function ProfileScreen() {
  const { profile } = useProfile();

  return (
    <ScrollableScreen>
      <ScreenHeader title={profile.user.name} subtitle={profile.user.email} />

      <View style={styles.card}>
        <Row label="Program" value={profile.program.name} />
        <Row label="Phase" value={profile.program.phase} />
        <Row label="Units" value={profile.preferences.units.toUpperCase()} />
      </View>

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Text style={typography.body}>Notifications</Text>
          <Switch
            value={profile.preferences.notifications}
            onValueChange={(notifications) => updatePreferences({ notifications })}
            trackColor={{ true: colors.accentBlue }}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={typography.body}>Share progress</Text>
          <Switch
            value={profile.preferences.shareProgress}
            onValueChange={(shareProgress) => updatePreferences({ shareProgress })}
            trackColor={{ true: colors.accentBlue }}
          />
        </View>
      </View>

      <SecondaryButton
        label="Sign out"
        onPress={() => {
          logout();
          router.replace("/login");
        }}
      />
    </ScrollableScreen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={typography.bodySmall}>{label}</Text>
      <Text style={typography.body}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  row: {
    minHeight: layout.minTouchTarget - 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  switchRow: {
    minHeight: layout.minTouchTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
});
