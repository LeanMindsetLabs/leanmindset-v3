import { useState } from "react";
import SubpageHeader from "../components/SubpageHeader";
import {
  updateMeasurement,
  type MeasurementKey,
  type ProfileState,
} from "../services/profileService";
import "../styles/profile.css";

const fields: { key: MeasurementKey; label: string; unit: string }[] = [
  { key: "weight", label: "Weight", unit: "lb" },
  { key: "waist", label: "Waist", unit: "in" },
  { key: "chest", label: "Chest", unit: "in" },
  { key: "hips", label: "Hips", unit: "in" },
];

type MeasurementsScreenProps = {
  profile: ProfileState;
  onBack: () => void;
};

export default function MeasurementsScreen({ profile, onBack }: MeasurementsScreenProps) {
  const [draft, setDraft] = useState({
    weight: String(profile.measurements.weight),
    waist: String(profile.measurements.waist),
    chest: String(profile.measurements.chest),
    hips: String(profile.measurements.hips),
  });

  function save() {
    fields.forEach(({ key }) => {
      const next = Number(draft[key]);
      if (Number.isFinite(next) && next > 0) updateMeasurement(key, next);
    });
  }

  return (
    <div className="subpage-screen">
      <SubpageHeader title="Measurements" onBack={onBack} />
      {fields.map((field) => (
        <div className="subpage-field" key={field.key}>
          <label htmlFor={field.key}>
            {field.label} ({field.key === "weight" ? profile.preferences.units : field.unit})
          </label>
          <input
            id={field.key}
            type="number"
            inputMode="decimal"
            step="0.1"
            value={draft[field.key]}
            onChange={(event) =>
              setDraft((current) => ({ ...current, [field.key]: event.target.value }))
            }
          />
        </div>
      ))}
      <button type="button" className="subpage-cta" onClick={save}>
        Save measurements
      </button>
    </div>
  );
}
