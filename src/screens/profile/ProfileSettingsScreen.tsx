import { router } from "expo-router";
import ScrollableScreen from "@/src/layout/ScrollableScreen";
import SettingsGroup, { SettingsDivider } from "@/src/ui/profile/SettingsGroup";
import SettingsRow from "@/src/ui/profile/SettingsRow";
import ProfileNavHeader from "@/src/ui/profile/ProfileNavHeader";
import { pushProfile } from "./nav";
import { openLegalPage } from "@/src/lib/legal";
import { colors } from "@/src/theme/colors";
import { profileRowDividerInset } from "@/src/ui/profile/iconSpec";

export default function ProfileSettingsScreen() {
  return (
    <ScrollableScreen backgroundColor={colors.profileBlack}>
      <ProfileNavHeader title="Settings" onBack={() => router.back()} />

      <SettingsGroup title="Fitness & Coaching">
        <SettingsRow icon="flag" label="Goals & Targets" value="Weight, body, timeline" onPress={() => pushProfile("goals")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="dumbbell" label="Workout Preferences" value="Days, duration, equipment" onPress={() => pushProfile("workout-prefs")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="utensils" label="Nutrition Preferences" value="Calories, diet style" onPress={() => pushProfile("nutrition-prefs")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="coach" label="Lean Coach" value="Check-ins and tone" onPress={() => pushProfile("lean-coach")} />
      </SettingsGroup>

      <SettingsGroup title="Data & Connections">
        <SettingsRow icon="heart" label="Health & Wearables" value="Apple Health, Health Connect" onPress={() => pushProfile("health")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="download" label="Export My Data" value="Download a copy" onPress={() => pushProfile("export-data")} />
      </SettingsGroup>

      <SettingsGroup title="App">
        <SettingsRow icon="bell" label="Notifications" value="Reminders and alerts" onPress={() => pushProfile("app-settings")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="moon" label="Appearance" value="Dark mode and theme" onPress={() => pushProfile("app-settings")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="ruler" label="Units & Measurements" value="Weight, height, temperature" onPress={() => pushProfile("app-settings")} />
      </SettingsGroup>

      <SettingsGroup title="Legal & Policies">
        <SettingsRow icon="file" label="Privacy Policy" onPress={() => void openLegalPage("privacy")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="file" label="Terms of Service" onPress={() => void openLegalPage("terms")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="file" label="Community Guidelines" onPress={() => void openLegalPage("community")} />
      </SettingsGroup>
    </ScrollableScreen>
  );
}
