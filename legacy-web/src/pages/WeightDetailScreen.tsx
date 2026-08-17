import { useState } from "react";
import SubpageHeader from "../components/SubpageHeader";
import {
  formatWeight,
  updateWeight,
  type ProfileState,
} from "../services/profileService";
import "../styles/profile.css";

type WeightDetailScreenProps = {
  profile: ProfileState;
  onBack: () => void;
};

export default function WeightDetailScreen({ profile, onBack }: WeightDetailScreenProps) {
  const [value, setValue] = useState(String(profile.weightLb));
  const start = profile.weightHistory[0]?.lb ?? profile.weightLb;
  const units = profile.preferences.units;

  function save() {
    const next = Number(value);
    if (!Number.isFinite(next) || next <= 0) return;
    updateWeight(units === "kg" ? next * 2.2046 : next);
  }

  return (
    <div className="subpage-screen">
      <SubpageHeader title="Weight" onBack={onBack} />
      <section className="subpage-card">
        <h2>{formatWeight(profile.weightLb, units)}</h2>
        <p>
          Started at {formatWeight(start, units)}. Change{" "}
          {profile.weightDeltaLb.toFixed(1)} {units} since the first logged weigh-in.
        </p>
        <div className="subpage-list">
          {profile.weightHistory.map((entry) => (
            <div className="subpage-line" key={entry.date}>
              {entry.label}
              <span>{formatWeight(entry.lb, units)}</span>
            </div>
          ))}
        </div>
      </section>
      <div className="subpage-field">
        <label htmlFor="weight-input">Update weight ({units})</label>
        <input
          id="weight-input"
          type="number"
          inputMode="decimal"
          step="0.1"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <button type="button" className="subpage-cta" onClick={save}>
        Save weight
      </button>
    </div>
  );
}
