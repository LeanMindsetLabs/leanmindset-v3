import { Camera, ClipboardCheck, Ruler, Scale, Sparkles } from "lucide-react";
import SettingsGroup from "../components/SettingsGroup";
import SettingsRow from "../components/SettingsRow";
import SubpageHeader from "../components/SubpageHeader";
import type { ProgressView } from "../types";
import "../styles/profile.css";

type ProgressSeeAllScreenProps = {
  onBack: () => void;
  onOpen: (view: ProgressView) => void;
};

export default function ProgressSeeAllScreen({ onBack, onOpen }: ProgressSeeAllScreenProps) {
  return (
    <div className="subpage-screen">
      <SubpageHeader title="My Progress" onBack={onBack} />
      <SettingsGroup>
        <SettingsRow
          icon={<Sparkles size={18} strokeWidth={1.8} />}
          label="Lean Score"
          onClick={() => onOpen("lean-score")}
        />
        <SettingsRow
          icon={<Scale size={18} strokeWidth={1.8} />}
          label="Weight"
          onClick={() => onOpen("weight")}
        />
        <SettingsRow
          icon={<Ruler size={18} strokeWidth={1.8} />}
          label="Measurements"
          onClick={() => onOpen("measurements")}
        />
        <SettingsRow
          icon={<Camera size={18} strokeWidth={1.8} />}
          label="Progress Photos"
          onClick={() => onOpen("photos")}
        />
        <SettingsRow
          icon={<ClipboardCheck size={18} strokeWidth={1.8} />}
          label="Weekly Reviews"
          onClick={() => onOpen("reviews")}
        />
      </SettingsGroup>
    </div>
  );
}
