import { Stack } from "expo-router";
import { colors } from "@/src/theme/colors";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function ProfileStackLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.profileBlack },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="account" />
      <Stack.Screen name="information" />
      <Stack.Screen name="app-settings" />
      <Stack.Screen name="membership" />
      <Stack.Screen name="[section]" />
    </Stack>
  );
}
