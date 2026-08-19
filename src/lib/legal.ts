import { Linking, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";

export const LEGAL_SITE = "https://leanmindset-v3.vercel.app";

export const legalSlugs = {
  terms: "terms",
  privacy: "privacy",
  community: "community-guidelines",
} as const;

export type LegalPage = keyof typeof legalSlugs;

export function legalUrl(page: LegalPage) {
  const path = `/legal/${legalSlugs[page]}/`;
  if (Platform.OS === "web" && typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${path}`;
  }
  return `${LEGAL_SITE}${path}`;
}

export async function openLegalPage(page: LegalPage) {
  const url = legalUrl(page);
  if (Platform.OS === "web") {
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.assign(url);
    return;
  }
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      return;
    }
  } catch {
    // Fall through to in-browser Safari/Chrome sheet if the system handler fails.
  }
  await WebBrowser.openBrowserAsync(url);
}
