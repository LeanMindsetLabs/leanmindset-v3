import { ChevronLeft } from "lucide-react";
import Avatar from "./Avatar";
import "../styles/today.css";

type ReadinessHeaderProps = {
  onBack: () => void;
};

export default function ReadinessHeader({ onBack }: ReadinessHeaderProps) {
  return (
    <header className="readiness-header">
      <button type="button" className="readiness-back" onClick={onBack} aria-label="Back">
        <ChevronLeft size={20} strokeWidth={2.2} />
      </button>
      <div className="readiness-heading">
        <h1 className="readiness-title">Today's Readiness</h1>
        <p className="readiness-subtitle">Your body. Your mind. Your day.</p>
      </div>
      <Avatar letter="M" online />
    </header>
  );
}
