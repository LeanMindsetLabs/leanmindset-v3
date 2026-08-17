import { View, StyleSheet } from "react-native";
import { useUiVariant } from "@/src/context/UiVariantContext";
import UiVariantToggle from "@/src/ui/UiVariantToggle";

export default function PreviewToggles() {
  const {
    previewRoute,
    layoutVariant,
    setLayoutVariant,
    mealsVariant,
    setMealsVariant,
    coachVariant,
    setCoachVariant,
    homeHeader,
    setHomeHeader,
  } = useUiVariant();

  if (previewRoute === "meals") {
    return (
      <UiVariantToggle
        compact
        label="Meals layout"
        value={mealsVariant}
        onChange={setMealsVariant}
        options={[
          { id: "classic", label: "Classic" },
          { id: "log", label: "Log" },
          { id: "now", label: "Now" },
        ]}
      />
    );
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

  if (previewRoute === "progress" || previewRoute === "login" || previewRoute === "workout") {
    return null;
  }

  if (previewRoute === "index" || previewRoute === "today") {
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
        {layoutVariant === "whoop" && previewRoute === "index" ? (
          <UiVariantToggle
            compact
            label="Home header"
            value={homeHeader}
            onChange={setHomeHeader}
            options={[
              { id: "standard", label: "A" },
              { id: "greeting", label: "B" },
            ]}
          />
        ) : null}
      </View>
    );
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  stack: { alignItems: "flex-end", gap: 3 },
});
