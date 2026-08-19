import { useState } from "react";
import { Platform, Share, StyleSheet, Switch, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import ScrollableScreen from "@/src/layout/ScrollableScreen";
import { useProfile } from "@/src/hooks/useProfile";
import { logout, setAppleHealthConnected, updatePreferences } from "@/src/services/profileService";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import HexBadge from "@/src/ui/profile/HexBadge";
import ConfirmSheet from "@/src/ui/profile/ConfirmSheet";
import ProfileNavHeader from "@/src/ui/profile/ProfileNavHeader";
import SettingsGroup, { SettingsDivider } from "@/src/ui/profile/SettingsGroup";
import SettingsRow from "@/src/ui/profile/SettingsRow";
import { openLegalPage } from "@/src/lib/legal";

const titles: Record<string, string> = {
  goals: "Goals & Targets",
  "workout-prefs": "Workout Preferences",
  "nutrition-prefs": "Nutrition Preferences",
  "lean-coach": "Lean Coach",
  health: "Health & Wearables",
  "export-data": "Export My Data",
  password: "Password & Security",
  billing: "Payment & Billing",
  privacy: "Privacy & Data",
  "delete-account": "Delete Account",
  help: "Help & Support",
  terms: "Terms & Privacy",
  achievements: "Achievements",
};

export default function ProfileSectionScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const { profile } = useProfile();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const title = titles[section ?? ""] ?? "Profile";

  async function exportData() {
    const payload = JSON.stringify(profile, null, 2);
    if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(payload);
      return;
    }
    await Share.share({ message: payload, title: "LeanMindset data" });
  }

  return (
    <ScrollableScreen backgroundColor={colors.profileBlack}>
      <ProfileNavHeader title={title} onBack={() => router.back()} />

      {section === "goals" ? (
        <SettingsGroup>
          <SettingsRow label="Current goal" value={profile.goalLabel} showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Target weight" value={`${profile.targetWeightKg} kg`} showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Goal progress" value={`${Math.round(profile.goalProgress * 100)}%`} showChevron={false} />
        </SettingsGroup>
      ) : null}

      {section === "workout-prefs" ? (
        <SettingsGroup>
          <SettingsRow label="Program" value={profile.program.name} showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Phase" value={profile.program.phase} showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Upcoming" value={profile.program.upcoming} showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Difficulty" value="Beginner" showChevron={false} />
        </SettingsGroup>
      ) : null}

      {section === "nutrition-prefs" ? (
        <SettingsGroup>
          <SettingsRow label="Style" value="High protein" showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Daily calories" value="2,100 kcal" showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Protein target" value="140 g" showChevron={false} />
        </SettingsGroup>
      ) : null}

      {section === "lean-coach" ? (
        <SettingsGroup>
          <SettingsRow label="Check-in time" value="8:00 AM" showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Tone" value="Direct and supportive" showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Weekly review" value="Sunday" showChevron={false} />
        </SettingsGroup>
      ) : null}

      {section === "health" ? (
        <SettingsGroup>
          <SettingsRow
            icon="heart"
            label="Apple Health"
            showChevron={false}
            accessory={
              <Switch
                value={profile.appleHealthConnected}
                onValueChange={setAppleHealthConnected}
                trackColor={{ true: colors.profilePurple, false: "rgba(255,255,255,0.18)" }}
                thumbColor={colors.white}
              />
            }
          />
          <SettingsDivider />
          <SettingsRow label="Health Connect" value="Coming soon" showChevron={false} />
        </SettingsGroup>
      ) : null}

      {section === "export-data" ? (
        <SettingsGroup>
          <SettingsRow icon="download" label="Copy / share JSON export" onPress={() => void exportData()} />
        </SettingsGroup>
      ) : null}

      {section === "password" ? (
        <SettingsGroup>
          <SettingsRow label="Password" value="Last updated 14 days ago" showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Two-factor authentication" value="Off" showChevron={false} />
        </SettingsGroup>
      ) : null}

      {section === "billing" ? (
        <SettingsGroup>
          <SettingsRow label="Plan" value={profile.membership.planName} showChevron={false} />
          <SettingsDivider />
          <SettingsRow
            label="Card"
            value={`${profile.membership.brand} •••• ${profile.membership.last4}`}
            showChevron={false}
          />
          <SettingsDivider />
          <SettingsRow label="Next charge" value={profile.membership.nextBillingLabel} showChevron={false} />
        </SettingsGroup>
      ) : null}

      {section === "privacy" ? (
        <SettingsGroup>
          <SettingsRow
            label="Share progress"
            showChevron={false}
            accessory={
              <Switch
                value={profile.preferences.shareProgress}
                onValueChange={(shareProgress) => updatePreferences({ shareProgress })}
                trackColor={{ true: colors.profilePurple, false: "rgba(255,255,255,0.18)" }}
                thumbColor={colors.white}
              />
            }
          />
          <SettingsDivider />
          <SettingsRow label="Personalized coaching" value="On" showChevron={false} />
        </SettingsGroup>
      ) : null}

      {section === "delete-account" ? (
        <>
          <Text style={styles.copy}>
            Deleting your account removes your session, logs, and saved preferences on this device.
          </Text>
          <SettingsGroup>
            <SettingsRow
              icon="trash"
              label="Delete Account"
              destructive
              showChevron={false}
              onPress={() => setConfirmDelete(true)}
            />
          </SettingsGroup>
        </>
      ) : null}

      {section === "help" ? (
        <SettingsGroup>
          <SettingsRow label="How do I log a meal?" value="Open Meals, then add a bowl." showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Where is check-in?" value="On the Coach tab." showChevron={false} />
          <SettingsDivider />
          <SettingsRow label="Contact" value="hello@leanmindset.app" showChevron={false} />
        </SettingsGroup>
      ) : null}

      {section === "terms" ? (
        <SettingsGroup>
          <SettingsRow icon="file" label="Terms & Conditions" value="Opens in browser" onPress={() => void openLegalPage("terms")} />
          <SettingsDivider />
          <SettingsRow icon="shield" label="Privacy Policy" value="Opens in browser" onPress={() => void openLegalPage("privacy")} />
          <SettingsDivider />
          <SettingsRow icon="people" label="Community Guidelines" value="Opens in browser" onPress={() => void openLegalPage("community")} />
        </SettingsGroup>
      ) : null}

      {section === "achievements" ? (
        <View style={styles.grid}>
          {profile.achievements.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <HexBadge label={item.label} unlocked={item.unlocked} size={72} />
              <Text style={styles.detail}>{item.detail}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <ConfirmSheet
        visible={confirmDelete}
        title="Delete account"
        body="This signs you out and clears saved profile data on this device."
        confirmLabel="Delete account"
        destructive
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          logout();
          setConfirmDelete(false);
          router.replace("/login");
        }}
      />
    </ScrollableScreen>
  );
}

const styles = StyleSheet.create({
  copy: {
    ...typography.bodySmall,
    paddingHorizontal: spacing.xs,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.lg,
  },
  gridItem: {
    width: "30%",
    alignItems: "center",
    gap: spacing.sm,
  },
  detail: {
    ...typography.caption,
    textAlign: "center",
    textTransform: "none",
    letterSpacing: 0,
  },
});
