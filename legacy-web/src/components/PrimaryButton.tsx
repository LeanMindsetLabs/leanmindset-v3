import { ArrowRight } from "lucide-react";
import "../styles/week-review.css";

type PrimaryButtonProps = {
  label: string;
  onClick: () => void;
};

export default function PrimaryButton({ label, onClick }: PrimaryButtonProps) {
  return (
    <button type="button" className="week-primary-btn" onClick={onClick} aria-label={label}>
      {label}
      <ArrowRight size={16} strokeWidth={2.2} />
    </button>
  );
}
