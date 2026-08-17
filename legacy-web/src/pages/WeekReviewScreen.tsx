import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SubpageHeader from "../components/SubpageHeader";
import WeekReviewHero from "../components/WeekReviewHero";
import WeekReviewSummaryCard from "../components/WeekReviewSummaryCard";
import WeightTrendCard from "../components/WeightTrendCard";
import { useProfile } from "../hooks/useProfile";
import { useWeekState } from "../hooks/useWeekState";
import {
  getReview,
  isReviewReady,
  startNextWeek,
} from "../services/weekReviewService";
import "../styles/week-review.css";
import "../styles/profile.css";

type WeekReviewScreenProps = {
  week: number;
  onBack: () => void;
  onStartedNext: () => void;
};

export default function WeekReviewScreen({
  week,
  onBack,
  onStartedNext,
}: WeekReviewScreenProps) {
  const { profile } = useProfile();
  const weekState = useWeekState();
  const review = getReview(week);
  const [info, setInfo] = useState(false);

  if (!review) {
    return (
      <div className="week-review-root">
        <div className="week-review-screen">
          <SubpageHeader title="Week in Review" onBack={onBack} />
          <p className="week-hero-support">This review is not available.</p>
        </div>
      </div>
    );
  }

  const canStart = isReviewReady() && review.week === weekState.reviews[0]?.week;

  function start() {
    startNextWeek();
    onStartedNext();
  }

  return (
    <div className="week-review-root">
      <div className="week-review-screen">
      <SubpageHeader title="Week in Review" onBack={onBack} />
      <WeekReviewHero week={review.week} />
      <WeekReviewSummaryCard
        review={review}
        units={profile.preferences.units}
        onInfo={() => setInfo(true)}
      />
      <WeightTrendCard review={review} reviews={weekState.reviews} />
      {canStart && (
        <PrimaryButton label={`Start week ${review.week + 1}`} onClick={start} />
      )}
      </div>

      {info && (
        <div className="profile-sheet" onClick={() => setInfo(false)}>
          <div className="profile-sheet-card" onClick={(event) => event.stopPropagation()}>
            <h2>vs last 7 days</h2>
            <p>
              These numbers compare this program week against the seven days that just finished. Weight change is end-of-week minus start-of-week.
            </p>
            <div className="profile-sheet-actions">
              <button type="button" className="sheet-confirm" onClick={() => setInfo(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
