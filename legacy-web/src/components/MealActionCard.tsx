import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import "../styles/meals.css";

type MealActionCardProps = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  onClick: () => void;
};

export default function MealActionCard({
  title,
  subtitle,
  icon,
  onClick,
}: MealActionCardProps) {
  return (
    <button type="button" className="meal-action" onClick={onClick} aria-label={title}>
      <span className="meal-action-icon">{icon}</span>
      <span className="meal-action-copy">
        <strong>{title}</strong>
        <em>{subtitle}</em>
      </span>
      <ChevronRight size={14} strokeWidth={2} className="meal-action-chevron" />
    </button>
  );
}
