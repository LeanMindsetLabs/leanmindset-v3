import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import AppTextInput from "@/src/ui/AppTextInput";
import { router } from "expo-router";
import KeyboardScreen from "@/src/layout/KeyboardScreen";
import { login } from "@/src/services/profileService";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import PrimaryButton from "@/src/ui/PrimaryButton";
import ScreenHeader from "@/src/ui/ScreenHeader";

/**
 * Login
 * Reusable: KeyboardScreen, ScreenHeader, PrimaryButton
 * Scrolls: yes. Safe area: top + bottom (no tab bar). Keyboard: field + Continue stay visible.
 */
export default function LoginScreen() {
  const [email, setEmail] = useState("mani.dev@gmail.com");

  function submit() {
    login(email);
    router.replace("/(tabs)");
  }

  return (
    <KeyboardScreen edges={["top", "bottom"]}>
      <ScreenHeader title="LeanMindset" subtitle="Sign in to continue your program, readiness, and progress." />
      <Text style={typography.caption}>Email</Text>
      <AppTextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        placeholder="you@email.com"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        accessibilityLabel="Email"
      />
      <PrimaryButton label="Continue" onPress={submit} />
    </KeyboardScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    paddingHorizontal: spacing.md,
  },
});
