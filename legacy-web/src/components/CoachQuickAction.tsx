import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import "../styles/coach.css";

type CoachQuickActionProps = {
  label: string;
  color: string;
  icon: ReactNode;
  onClick: () => void;
};

export default function CoachQuickAction({
  label,
  color,
  icon,
  onClick,
}: CoachQuickActionProps) {
  return (
    <button
      type="button"
      className="coach-quick"
      onClick={onClick}
      aria-label={label.replace(/\n/g, " ")}
    >
      <span className="coach-quick-icon" style={{ color }}>
        {icon}
      </span>
      <span className="coach-quick-label">{label}</span>
      <ChevronRight size={12} strokeWidth={2} className="coach-quick-chevron" />
    </button>
  );
}
