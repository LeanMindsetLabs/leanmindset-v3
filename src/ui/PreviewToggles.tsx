import { View, StyleSheet } from "react-native";
import { useUiVariant } from "@/src/context/UiVariantContext";
import UiVariantToggle from "@/src/ui/UiVariantToggle";

export default function PreviewToggles() {
  const { previewRoute, layoutVariant, setLayoutVariant, coachVariant, setCoachVariant } = useUiVariant();

  if (previewRoute === "meals" || previewRoute === "index" || previewRoute === "progress" || previewRoute === "login" || previewRoute === "workout") {
    return null;
  }

  if (previewRoute === "coach") {
    return (
      <UiVariantToggle
        compact
        label="Coach layout"
        value={coachVariant}
        onChange={setCoachVariant}
        options={[
          { id: "chat", label: "Chat" },
          { id: "checkin", label: "Check-in" },
          { id: "now", label: "Now" },
        ]}
      />
    );
  }

  return (
    <View style={styles.stack}>
      <UiVariantToggle
        compact
        label="Layout"
        value={layoutVariant}
        onChange={setLayoutVariant}
        options={[
          { id: "classic", label: "Classic" },
          { id: "whoop", label: "Whoop" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { alignItems: "flex-end", gap: 3 },
});
