import { ArrowRight } from "lucide-react";
import "../styles/today.css";

type PrimaryCTAProps = {
  label: string;
  onClick: () => void;
};

export default function PrimaryCTA({ label, onClick }: PrimaryCTAProps) {
  return (
    <button type="button" className="today-cta" onClick={onClick} aria-label={label}>
      {label}
      <ArrowRight size={16} strokeWidth={2.2} />
    </button>
  );
}
