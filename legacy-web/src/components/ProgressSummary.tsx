import ProgressSummaryCard, { GoodStatus, WeightDelta } from "./ProgressSummaryCard";
import type { ProfileState } from "../services/profileService";
import "../styles/profile.css";

type ProgressSummaryProps = {
  profile: ProfileState;
  onSeeAll: () => void;
  onLeanScore: () => void;
  onWeight: () => void;
};

export default function ProgressSummary({
  profile,
  onSeeAll,
  onLeanScore,
  onWeight,
}: ProgressSummaryProps) {
  const lost = Math.abs(profile.weightDeltaLb).toFixed(1);

  return (
    <section>
      <div className="progress-head">
        <h2>My Progress</h2>
        <button type="button" className="see-all" onClick={onSeeAll} aria-label="See all progress">
          See all →
        </button>
      </div>
      <div className="progress-cards">
        <ProgressSummaryCard
          label="Lean Score"
          value={String(profile.leanScore)}
          status={<GoodStatus />}
          onClick={onLeanScore}
        />
        <ProgressSummaryCard
          label="Weight"
          value={
            profile.preferences.units === "kg"
              ? (profile.weightLb / 2.2046).toFixed(1)
              : profile.weightLb.toFixed(1)
          }
          unit={profile.preferences.units}
          status={<WeightDelta value={`${lost} ${profile.preferences.units}`} />}
          onClick={onWeight}
        />
      </div>
    </section>
  );
}
