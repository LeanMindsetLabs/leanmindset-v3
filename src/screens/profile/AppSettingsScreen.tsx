import { StyleSheet, Switch, View } from "react-native";
import { router } from "expo-router";
import ScrollableScreen from "@/src/layout/ScrollableScreen";
import { useProfile } from "@/src/hooks/useProfile";
import { updatePreferences } from "@/src/services/profileService";
import { colors } from "@/src/theme/colors";
import ProfileNavHeader from "@/src/ui/profile/ProfileNavHeader";
import ProfileIcon from "@/src/ui/profile/ProfileIcon";
import SettingsGroup, { SettingsDivider } from "@/src/ui/profile/SettingsGroup";
import SettingsRow from "@/src/ui/profile/SettingsRow";

export default function AppSettingsScreen() {
  const { profile } = useProfile();
  const prefs = profile.preferences;

  return (
    <ScrollableScreen backgroundColor={colors.profileBlack}>
      <ProfileNavHeader title="App Settings" onBack={() => router.back()} />

      <SettingsGroup title="Notifications">
        <ToggleRow
          label="Coaching Reminders"
          value={prefs.coachingReminders}
          onValueChange={(coachingReminders) => updatePreferences({ coachingReminders, notifications: coachingReminders || prefs.workoutReminders })}
        />
        <SettingsDivider />
        <ToggleRow
          label="Workout Reminders"
          value={prefs.workoutReminders}
          onValueChange={(workoutReminders) => updatePreferences({ workoutReminders })}
        />
        <SettingsDivider />
        <ToggleRow
          label="Meal Reminders"
          value={prefs.mealReminders}
          onValueChange={(mealReminders) => updatePreferences({ mealReminders })}
        />
        <SettingsDivider />
        <ToggleRow
          label="Achievement Alerts"
          value={prefs.achievementAlerts}
          onValueChange={(achievementAlerts) => updatePreferences({ achievementAlerts })}
        />
      </SettingsGroup>

      <SettingsGroup title="Appearance">
        <ToggleRow label="Dark Mode" value={prefs.darkMode} onValueChange={(darkMode) => updatePreferences({ darkMode })} />
        <SettingsDivider />
        <SettingsRow
          label="App Theme"
          value="Blue"
          showChevron={false}
          accessory={
            <View style={styles.theme}>
              <View style={styles.swatch}>
                <ProfileIcon name="check" size={11} color={colors.white} strokeWidth={2} />
              </View>
            </View>
          }
        />
      </SettingsGroup>

      <SettingsGroup title="Units & Measurements">
        <SettingsRow
          label="Weight"
          trailing={prefs.units === "kg" ? "Kilograms (kg)" : "Pounds (lb)"}
          onPress={() => updatePreferences({ units: prefs.units === "kg" ? "lb" : "kg" })}
        />
        <SettingsDivider inset={16} />
        <SettingsRow
          label="Height"
          trailing={prefs.heightUnit === "cm" ? "Centimeters (cm)" : "Feet / inches"}
          onPress={() => updatePreferences({ heightUnit: prefs.heightUnit === "cm" ? "in" : "cm" })}
        />
        <SettingsDivider inset={16} />
        <SettingsRow
          label="Temperature"
          trailing={prefs.temperatureUnit === "c" ? "Celsius (°C)" : "Fahrenheit (°F)"}
          onPress={() => updatePreferences({ temperatureUnit: prefs.temperatureUnit === "c" ? "f" : "c" })}
        />
      </SettingsGroup>
    </ScrollableScreen>
  );
}

function ToggleRow({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
}) {
  return (
    <SettingsRow
      label={label}
      showChevron={false}
      accessory={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ true: colors.profilePurple, false: "rgba(255,255,255,0.18)" }}
          thumbColor={colors.white}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  theme: {
    alignItems: "center",
    justifyContent: "center",
  },
  swatch: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.profilePurple,
    alignItems: "center",
    justifyContent: "center",
  },
});
