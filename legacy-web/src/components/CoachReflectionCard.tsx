import { Info } from "lucide-react";
import type { ReactNode } from "react";
import CoachReflectionOption from "./CoachReflectionOption";
import {
  IconBrain,
  IconClock,
  IconLiver,
  IconMuffin,
  IconPeople,
} from "./coachIcons";
import type { ReflectionId } from "../services/coachService";
import "../styles/coach.css";

const options: {
  id: ReflectionId;
  label: string;
  color: string;
  icon: ReactNode;
}[] = [
  { id: "stress", label: "Stress", color: "#5B9DFF", icon: <IconBrain size={22} /> },
  { id: "time", label: "Time", color: "#19E68C", icon: <IconClock size={22} /> },
  { id: "hunger", label: "Hunger", color: "#F5B83D", icon: <IconLiver size={22} /> },
  { id: "social", label: "Social event", color: "#9A6CFF", icon: <IconPeople size={22} /> },
  { id: "cravings", label: "Cravings", color: "#FF5E72", icon: <IconMuffin size={22} /> },
];

type CoachReflectionCardProps = {
  selected: ReflectionId | null;
  onSelect: (id: ReflectionId) => void;
};

export default function CoachReflectionCard({
  selected,
  onSelect,
}: CoachReflectionCardProps) {
  return (
    <section className="coach-reflect">
      <div className="coach-reflect-head">
        <div>
          <h2>60-second reflection</h2>
          <p>How are you feeling right now?</p>
        </div>
        <button type="button" className="coach-info" aria-label="About reflection">
          <Info size={14} strokeWidth={1.7} />
        </button>
      </div>
      <div className="coach-reflect-row" role="group" aria-label="How are you feeling">
        {options.map((opt) => (
          <CoachReflectionOption
            key={opt.id}
            label={opt.label}
            color={opt.color}
            selected={selected === opt.id}
            onSelect={() => onSelect(opt.id)}
            icon={opt.icon}
          />
        ))}
      </div>
    </section>
  );
}
