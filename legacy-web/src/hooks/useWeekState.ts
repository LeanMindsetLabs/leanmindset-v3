import { useEffect, useState } from "react";
import { getWeekState, subscribeWeek } from "../services/weekReviewService";

export function useWeekState() {
  const [weekState, setWeekState] = useState(getWeekState);

  useEffect(() => {
    const unsubscribe = subscribeWeek(() => setWeekState({ ...getWeekState() }));
    return () => {
      unsubscribe();
    };
  }, []);

  return weekState;
}
