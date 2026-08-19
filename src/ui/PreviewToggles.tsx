import { View, StyleSheet } from "react-native";
import { useUiVariant } from "@/src/context/UiVariantContext";
import UiVariantToggle from "@/src/ui/UiVariantToggle";

export default function PreviewToggles() {
  const { previewRoute, layoutVariant, setLayoutVariant, checkInPicker, setCheckInPicker } = useUiVariant();

  if (previewRoute === "checkin") {
    return (
      <UiVariantToggle
        compact
        label="Check-in pickers"
        value={checkInPicker}
        onChange={setCheckInPicker}
        options={[
          { id: "1", label: "1" },
          { id: "2", label: "2" },
          { id: "3", label: "3" },
        ]}
      />
    );
  }

  if (previewRoute === "meals" || previewRoute === "index" || previewRoute === "profile" || previewRoute === "login" || previewRoute === "workout" || previewRoute === "coach") {
    return null;
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
