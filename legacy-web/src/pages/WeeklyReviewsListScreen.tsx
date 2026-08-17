import SettingsGroup from "../components/SettingsGroup";
import SubpageHeader from "../components/SubpageHeader";
import WeeklyReviewListRow from "../components/WeeklyReviewListRow";
import { useProfile } from "../hooks/useProfile";
import { useWeekState } from "../hooks/useWeekState";
import "../styles/profile.css";
import "../styles/week-review.css";

type WeeklyReviewsListScreenProps = {
  onBack: () => void;
  onOpenWeek: (week: number) => void;
};

export default function WeeklyReviewsListScreen({
  onBack,
  onOpenWeek,
}: WeeklyReviewsListScreenProps) {
  const { profile } = useProfile();
  const weekState = useWeekState();

  return (
    <div className="subpage-screen">
      <SubpageHeader title="Weekly Reviews" onBack={onBack} />
      <SettingsGroup>
        {weekState.reviews.map((review) => (
          <WeeklyReviewListRow
            key={review.week}
            review={review}
            units={profile.preferences.units}
            onClick={() => onOpenWeek(review.week)}
          />
        ))}
      </SettingsGroup>
    </div>
  );
}
