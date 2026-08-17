import { ChevronRight, TrendingUp } from "lucide-react";
import "../styles/meals.css";

type NutritionInsightCardProps = {
  gramsShort: number;
  onClick: () => void;
};

export default function NutritionInsightCard({
  gramsShort,
  onClick,
}: NutritionInsightCardProps) {
  return (
    <button type="button" className="insight-protein" onClick={onClick}>
      <span className="insight-protein-icon">
        <TrendingUp size={16} strokeWidth={2} />
      </span>
      <span className="insight-protein-copy">
        <strong>You're {gramsShort}g short on protein today.</strong>
        <em>Best next step: choose a high-protein dinner.</em>
      </span>
      <ChevronRight size={16} strokeWidth={2} className="insight-protein-chevron" />
    </button>
  );
}
