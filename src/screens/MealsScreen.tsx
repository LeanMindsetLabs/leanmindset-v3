import { router } from "expo-router";
import { useUiVariant } from "@/src/context/UiVariantContext";
import MealsClassic from "@/src/screens/meals/MealsClassic";

export default function MealsScreen() {
  const { setCoachVariant } = useUiVariant();

  return (
    <MealsClassic
      onAskCoach={() => {
        setCoachVariant("chat");
        router.push("/(tabs)/coach");
      }}
    />
  );
}
