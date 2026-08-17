import type { ReactNode } from "react";
import "../styles/today.css";

type ReadinessMetricCardProps = {
  label: string;
  value: string;
  status: string;
  statusColor: string;
  iconColor: string;
  icon: ReactNode;
  onClick: () => void;
};

export default function ReadinessMetricCard({
  label,
  value,
  status,
  statusColor,
  iconColor,
  icon,
  onClick,
}: ReadinessMetricCardProps) {
  return (
    <button
      type="button"
      className="ready-metric"
      onClick={onClick}
      aria-label={`${label} ${value}, ${status}`}
    >
      <span className="ready-metric-icon" style={{ color: iconColor }}>
        {icon}
      </span>
      <span className="ready-metric-label">{label}</span>
      <strong>{value}</strong>
      <em style={{ color: statusColor }}>{status}</em>
    </button>
  );
}
