import { Redirect } from "expo-router";
import { useProfile } from "@/src/hooks/useProfile";
import { hasStoredAccount } from "@/src/services/profileService";

export default function Index() {
  const { session, profile } = useProfile();

  if (session) {
    if (profile.onboardingComplete) return <Redirect href="/(tabs)" />;
    return <Redirect href="/onboarding" />;
  }

  if (hasStoredAccount()) return <Redirect href="/login" />;
  return <Redirect href="/welcome" />;
}
