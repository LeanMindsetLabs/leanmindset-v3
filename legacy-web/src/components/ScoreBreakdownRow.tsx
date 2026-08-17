import type { ReactNode } from "react";
import ScoreProgressBar from "./ScoreProgressBar";
import "../styles/breakdown.css";

type ScoreBreakdownRowProps = {
  icon: ReactNode;
  label: string;
  value: number;
  color: string;
};

export default function ScoreBreakdownRow({
  icon,
  label,
  value,
  color,
}: ScoreBreakdownRowProps) {
  return (
    <div className="breakdown-row">
      <div className="breakdown-icon" style={{ color }}>
        {icon}
      </div>
      <div className="breakdown-label">{label}</div>
      <div className="breakdown-bar-slot">
        <ScoreProgressBar value={value} color={color} />
      </div>
      <div className="breakdown-value">{value}</div>
    </div>
  );
}
