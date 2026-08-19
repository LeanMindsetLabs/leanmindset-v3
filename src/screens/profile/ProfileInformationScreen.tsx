import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { InPhoneModal } from "@/src/layout/PhoneOverlay";
import ScrollableScreen from "@/src/layout/ScrollableScreen";
import { useProfile } from "@/src/hooks/useProfile";
import { formatHeight, formatWeight } from "@/src/services/profileService";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";
import ProfileIcon from "@/src/ui/profile/ProfileIcon";
import ProfileFieldEditor, { type ProfileField } from "@/src/ui/profile/ProfileFieldEditor";
import ProfileNavHeader from "@/src/ui/profile/ProfileNavHeader";
import { SettingsDivider } from "@/src/ui/profile/SettingsGroup";
import SettingsRow from "@/src/ui/profile/SettingsRow";

const ACCENT = colors.accentBlue;

export default function ProfileInformationScreen() {
  const { profile } = useProfile();
  const [field, setField] = useState<ProfileField | null>(null);
  const units = profile.preferences.units;
  const heightUnit = profile.preferences.heightUnit;

  return (
    <ScrollableScreen backgroundColor="#000000">
      <ProfileNavHeader title="Profile Information" onBack={() => router.back()} />

      <View style={styles.photoBlock}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profile.user.initial}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Change photo">
          <Text style={styles.changePhoto}>Change Photo</Text>
        </Pressable>
      </View>

      <View>
        <SettingsRow layout="stack" flush label="Full Name" trailing={profile.user.name} onPress={() => setField("name")} />
        <SettingsDivider inset={0} />
        <SettingsRow layout="stack" flush label="Email" trailing={profile.user.email} onPress={() => setField("email")} />
        <SettingsDivider inset={0} />
        <SettingsRow layout="stack" flush label="Birthday" trailing={profile.user.birthdayLabel} onPress={() => setField("birthday")} />
        <SettingsDivider inset={0} />
        <SettingsRow layout="stack" flush label="Gender" trailing={profile.user.gender} onPress={() => setField("gender")} />
        <SettingsDivider inset={0} />
        <SettingsRow
          layout="stack"
          flush
          label="Height"
          trailing={formatHeight(profile.user.heightCm, heightUnit)}
          onPress={() => setField("height")}
        />
        <SettingsDivider inset={0} />
        <SettingsRow
          layout="stack"
          flush
          label="Weight"
          trailing={formatWeight(profile.weightLb, units)}
          onPress={() => setField("weight")}
        />
        <SettingsDivider inset={0} />
        <SettingsRow layout="stack" flush label="Country" trailing={profile.user.country} onPress={() => setField("country")} />
        <SettingsDivider inset={0} />
        <SettingsRow
          layout="stack"
          flush
          label="Units"
          trailing={units === "kg" ? "Metric (kg, cm)" : "Imperial (lb, ft/in)"}
          onPress={() => setField("units")}
        />
      </View>

      <View style={styles.privacy}>
        <ProfileIcon name="lock" size={14} color={colors.white} strokeWidth={1.65} />
        <Text style={styles.privacyText}>This information is private and only visible to you.</Text>
      </View>

      <InPhoneModal visible={field !== null}>
        {field ? <ProfileFieldEditor key={field} field={field} onClose={() => setField(null)} /> : <View />}
      </InPhoneModal>
    </ScrollableScreen>
  );
}

const styles = StyleSheet.create({
  photoBlock: {
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#2A2A30",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.white,
    fontSize: 36,
    fontWeight: "700",
  },
  changePhoto: {
    color: ACCENT,
    fontSize: 15,
    fontWeight: "600",
  },
  privacy: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: spacing.xl,
  },
  privacyText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});
