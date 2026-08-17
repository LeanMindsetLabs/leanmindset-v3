import type { ReactNode } from "react";
import "../styles/coach.css";

type CoachReflectionOptionProps = {
  label: string;
  color: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
};

export default function CoachReflectionOption({
  label,
  color,
  icon,
  selected,
  onSelect,
}: CoachReflectionOptionProps) {
  return (
    <button
      type="button"
      className={`coach-reflect-opt${selected ? " selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="coach-reflect-icon" style={{ color }}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
