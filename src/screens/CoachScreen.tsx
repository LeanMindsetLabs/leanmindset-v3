import { router } from "expo-router";
import { useUiVariant } from "@/src/context/UiVariantContext";
import CoachChat from "@/src/screens/coach/CoachChat";
import CoachNow from "@/src/screens/coach/CoachNow";
import DailyCheckIn from "@/src/screens/coach/DailyCheckIn";

export default function CoachScreen() {
  const { coachVariant } = useUiVariant();

  if (coachVariant === "now") return <CoachNow />;
  if (coachVariant === "checkin") {
    return (
      <DailyCheckIn
        onOpenMealsLog={() => {
          router.push("/(tabs)/meals");
        }}
      />
    );
  }

  return <CoachChat />;
}
