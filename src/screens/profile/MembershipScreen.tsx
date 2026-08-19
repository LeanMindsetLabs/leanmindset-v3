import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import ScrollableScreen from "@/src/layout/ScrollableScreen";
import { useProfile } from "@/src/hooks/useProfile";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import PrimaryButton from "@/src/ui/PrimaryButton";
import ProfileIcon from "@/src/ui/profile/ProfileIcon";
import ProfileNavHeader from "@/src/ui/profile/ProfileNavHeader";
import SettingsGroup, { SettingsDivider } from "@/src/ui/profile/SettingsGroup";
import SettingsRow from "@/src/ui/profile/SettingsRow";
import { pushProfile } from "./nav";

export default function MembershipScreen() {
  const { profile } = useProfile();
  const { membership } = profile;

  return (
    <ScrollableScreen backgroundColor={colors.profileBlack}>
      <ProfileNavHeader title="Membership" onBack={() => router.back()} />

      <LinearGradient
        colors={["#3D5AFE", "#5A67F2", "#7C4DFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.crown}>
          <ProfileIcon name="crown" size={22} color={colors.white} strokeWidth={1.65} />
        </View>
        <Text style={styles.heroKicker}>LEANMINDSET PREMIUM</Text>
        <Text style={styles.heroTitle}>You’re on a Premium Plan</Text>
        <View style={styles.active}>
          <Text style={styles.activeText}>ACTIVE</Text>
        </View>
      </LinearGradient>

      <SettingsGroup>
        <SettingsRow label="Plan" trailing={membership.interval} showChevron={false} />
        <SettingsDivider inset={16} />
        <SettingsRow label="Member since" trailing={membership.memberSinceLabel} showChevron={false} />
        <SettingsDivider inset={16} />
        <SettingsRow label="Next billing date" trailing={membership.nextBillingLabel} showChevron={false} />
        <SettingsDivider inset={16} />
        <SettingsRow label="Payment method" trailing={`${membership.brand} •••• ${membership.last4}`} showChevron={false} />
      </SettingsGroup>

      <PrimaryButton label="Manage Subscription" onPress={() => pushProfile("billing")} />

      <SettingsGroup>
        <SettingsRow
          icon="receipt"
          label="Billing History"
          onPress={() => pushProfile("billing")}
        />
      </SettingsGroup>

      <View style={styles.family}>
        <View style={styles.familyIcon}>
          <ProfileIcon name="people" size={22} color={colors.white} strokeWidth={1.65} />
        </View>
        <View style={styles.familyCopy}>
          <Text style={typography.heading3}>Upgrade to Family Plan</Text>
          <Text style={typography.bodySmall}>Share coaching, meals, and training with up to 5 people.</Text>
        </View>
      </View>
    </ScrollableScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 16,
    padding: 24,
    gap: 10,
  },
  family: {
    backgroundColor: colors.profileCard,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  familyIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  crown: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroKicker: {
    ...typography.caption,
    color: colors.metricBlueSoft,
  },
  heroTitle: typography.heading2,
  active: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(25, 230, 140, 0.16)",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  activeText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  familyCopy: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
});
