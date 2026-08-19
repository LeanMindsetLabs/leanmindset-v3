import { type Href, router } from "expo-router";

export function pushProfile(path: string) {
  const href = (path ? `/(tabs)/profile/${path}` : "/(tabs)/profile/") as Href;
  router.push(href);
}
