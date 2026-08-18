import { useEffect, useState } from "react";
import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MealsLogProvider } from "@/src/context/MealsLogContext";
import { UiVariantProvider } from "@/src/context/UiVariantContext";
import { hydrateStorage } from "@/src/lib/storage";
import { OverlayHost } from "@/src/layout/PhoneOverlay";
import WebPhonePreview from "@/src/layout/WebPhonePreview";
import LogMenuHost from "@/src/ui/LogMenuHost";
import { rehydrateProfile } from "@/src/services/profileService";
import { rehydrateWeek } from "@/src/services/weekReviewService";
import { installWebInputFocusReset } from "@/src/lib/webInputFocus";
import { colors } from "@/src/theme/colors";

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

  useEffect(() => {
    installWebInputFocusReset();
    void hydrateStorage()
      .then(() => {
        rehydrateProfile();
        rehydrateWeek();
      })
      .finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <UiVariantProvider>
        <WebPhonePreview>
          <View style={styles.boot}>
            <ActivityIndicator color={colors.accentBlue} />
          </View>
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
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="login" />
              <Stack.Screen name="workout" />
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
      <WebPhonePreview>{app}</WebPhonePreview>
    </UiVariantProvider>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  app: {
    flex: 1,
  },
});
