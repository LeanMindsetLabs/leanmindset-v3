import { ChevronLeft, SlidersHorizontal } from "lucide-react";
import "../styles/train.css";

type TrainHeaderProps = {
  onBack: () => void;
  onSettings?: () => void;
};

export default function TrainHeader({ onBack, onSettings }: TrainHeaderProps) {
  return (
    <header className="train-header">
      <button type="button" className="train-icon-btn" onClick={onBack} aria-label="Back">
        <ChevronLeft size={22} strokeWidth={2} />
      </button>
      <h1>Train</h1>
      <button
        type="button"
        className="train-icon-btn"
        onClick={onSettings}
        aria-label="Workout settings"
      >
        <SlidersHorizontal size={18} strokeWidth={1.8} />
      </button>
    </header>
  );
}
