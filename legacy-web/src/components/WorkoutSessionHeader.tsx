import { ChevronLeft, SlidersHorizontal } from "lucide-react";
import "../styles/session.css";

type WorkoutSessionHeaderProps = {
  title: string;
  onBack: () => void;
};

export default function WorkoutSessionHeader({ title, onBack }: WorkoutSessionHeaderProps) {
  return (
    <header className="session-header">
      <button type="button" className="session-icon-btn" onClick={onBack} aria-label="Back">
        <ChevronLeft size={22} strokeWidth={2} />
      </button>
      <h1>{title}</h1>
      <button type="button" className="session-icon-btn" aria-label="Workout settings">
        <SlidersHorizontal size={18} strokeWidth={1.8} />
      </button>
    </header>
  );
}
