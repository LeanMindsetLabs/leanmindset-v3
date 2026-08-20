import { useEffect, useState } from "react";
import { DarkTheme, Stack, ThemeProvider, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MealsLogProvider } from "@/src/context/MealsLogContext";
import { UiVariantProvider } from "@/src/context/UiVariantContext";
import { hydrateStorage } from "@/src/lib/storage";
import { OverlayHost } from "@/src/layout/PhoneOverlay";
import WebPhonePreview from "@/src/layout/WebPhonePreview";
import LogMenuHost from "@/src/ui/LogMenuHost";
import AppBootScreen from "@/src/ui/AppBootScreen";
import { rehydrateCoachThread } from "@/src/services/coachService";
import { rehydrateProfile } from "@/src/services/profileService";
import { rehydrateWeek } from "@/src/services/weekReviewService";
import { installWebInputFocusReset } from "@/src/lib/webInputFocus";
import { colors } from "@/src/theme/colors";

SplashScreen.preventAutoHideAsync().catch(() => undefined);

const webInsets = {
  frame: { x: 0, y: 0, width: 393, height: 793 },
  insets: { top: 0, left: 0, right: 0, bottom: 34 },
};

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.accentBlue,
  },
};

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const isLegal = pathname.startsWith("/legal");

  useEffect(() => {
    installWebInputFocusReset();
    void hydrateStorage()
      .then(() => {
        rehydrateProfile();
        rehydrateWeek();
        rehydrateCoachThread();
      })
      .finally(() => {
        setReady(true);
        void SplashScreen.hideAsync();
      });
  }, []);

  if (isLegal) {
    return (
      <ThemeProvider value={navTheme}>
        <View style={styles.app}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0F1112" } }}>
            <Stack.Screen name="legal" />
          </Stack>
        </View>
      </ThemeProvider>
    );
  }

  if (!ready) {
    return (
      <UiVariantProvider>
        <WebPhonePreview>
          <AppBootScreen />
        </WebPhonePreview>
      </UiVariantProvider>
    );
  }

  const app = (
    <SafeAreaProvider initialMetrics={Platform.OS === "web" ? webInsets : undefined}>
      <MealsLogProvider>
        <ThemeProvider value={navTheme}>
          <StatusBar style="light" />
          <View style={styles.app}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="welcome" />
              <Stack.Screen name="login" />
              <Stack.Screen name="otp" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="workout" />
              <Stack.Screen name="legal" />
            </Stack>
            <LogMenuHost />
            <OverlayHost />
          </View>
        </ThemeProvider>
      </MealsLogProvider>
    </SafeAreaProvider>
  );

  return (
    <UiVariantProvider>
      {isLegal ? app : <WebPhonePreview>{app}</WebPhonePreview>}
    </UiVariantProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
