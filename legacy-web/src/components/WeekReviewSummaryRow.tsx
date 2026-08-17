import type { ReactNode } from "react";
import "../styles/week-review.css";

type WeekReviewSummaryRowProps = {
  label: string;
  value: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  positive?: boolean;
};

export default function WeekReviewSummaryRow({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  positive = false,
}: WeekReviewSummaryRowProps) {
  return (
    <div className="week-summary-row">
      <span className="week-summary-icon" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </span>
      <p>{label}</p>
      <strong className={positive ? "down" : undefined}>{value}</strong>
    </div>
  );
}
