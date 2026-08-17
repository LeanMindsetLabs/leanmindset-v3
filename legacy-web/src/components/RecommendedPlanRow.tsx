import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import "../styles/today.css";

type RecommendedPlanRowProps = {
  eyebrow: string;
  title: string;
  meta: string;
  icon: ReactNode;
  emphasized?: boolean;
  onClick: () => void;
};

export default function RecommendedPlanRow({
  eyebrow,
  title,
  meta,
  icon,
  emphasized = false,
  onClick,
}: RecommendedPlanRowProps) {
  return (
    <button
      type="button"
      className={`plan-row${emphasized ? " emphasized" : ""}`}
      onClick={onClick}
      aria-label={`${title}. ${meta}`}
    >
      <span className="plan-icon">{icon}</span>
      <span className="plan-copy">
        <em>{eyebrow}</em>
        <strong>{title}</strong>
        <span>{meta}</span>
      </span>
      <span className="plan-chevron">
        <ChevronRight size={16} strokeWidth={2.2} />
      </span>
    </button>
  );
}
