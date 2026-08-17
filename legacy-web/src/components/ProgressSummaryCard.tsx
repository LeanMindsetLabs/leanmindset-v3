import { ArrowDown, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import "../styles/profile.css";

type ProgressSummaryCardProps = {
  label: string;
  value: string;
  unit?: string;
  status: ReactNode;
  onClick: () => void;
};

export default function ProgressSummaryCard({
  label,
  value,
  unit,
  status,
  onClick,
}: ProgressSummaryCardProps) {
  return (
    <button
      type="button"
      className="progress-summary-card"
      onClick={onClick}
      aria-label={`${label} ${value}${unit ? ` ${unit}` : ""}`}
    >
      <span className="progress-summary-copy">
        <em>{label}</em>
        <strong>
          {value}
          {unit ? <small>{unit}</small> : null}
        </strong>
        <span>{status}</span>
      </span>
      <ChevronRight className="card-chevron" size={16} strokeWidth={2} />
    </button>
  );
}

export function GoodStatus() {
  return (
    <>
      <i className="progress-dot" />
      Good
    </>
  );
}

export function WeightDelta({ value }: { value: string }) {
  return (
    <>
      <ArrowDown size={10} strokeWidth={2.4} />
      {value}
    </>
  );
}
