import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AppTextInput from "@/src/ui/AppTextInput";
import { router } from "expo-router";
import KeyboardScreen from "@/src/layout/KeyboardScreen";
import { login } from "@/src/services/profileService";
import { openLegalPage } from "@/src/lib/legal";
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
      <View style={styles.legal}>
        <Text style={styles.legalNote}>By continuing you agree to our</Text>
        <View style={styles.legalRow}>
          <Pressable onPress={() => void openLegalPage("terms")} accessibilityRole="link">
            <Text style={styles.legalLink}>Terms & Conditions</Text>
          </Pressable>
          <Text style={styles.legalNote}> · </Text>
          <Pressable onPress={() => void openLegalPage("privacy")} accessibilityRole="link">
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => void openLegalPage("community")} accessibilityRole="link">
          <Text style={styles.legalLink}>Community Guidelines</Text>
        </Pressable>
      </View>
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
  legal: {
    marginTop: spacing.md,
    alignItems: "center",
    gap: 6,
  },
  legalRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  legalNote: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: "center",
  },
  legalLink: {
    ...typography.caption,
    color: colors.accentBlue,
    fontWeight: "600",
  },
});
