import { router } from "expo-router";
import { useUiVariant } from "@/src/context/UiVariantContext";
import MealsClassic from "@/src/screens/meals/MealsClassic";
import MealsLogView from "@/src/screens/meals/MealsLogView";
import MealsNow from "@/src/screens/meals/MealsNow";

export default function MealsScreen() {
  const { mealsVariant, setMealsVariant, setCoachVariant } = useUiVariant();

  if (mealsVariant === "now") return <MealsNow />;
  if (mealsVariant === "log") {
    return (
      <MealsLogView
        onOpenCheckIn={() => {
          setCoachVariant("checkin");
          router.push("/(tabs)/coach");
        }}
        onOpenGrocery={() => setMealsVariant("classic")}
      />
    );
  }

  return (
    <MealsClassic
      onAskCoach={() => {
        setCoachVariant("chat");
        router.push("/(tabs)/coach");
      }}
    />
  );
}
