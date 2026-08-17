import { ChevronLeft } from "lucide-react";
import "../styles/profile.css";

type SubpageHeaderProps = {
  title: string;
  onBack: () => void;
};

export default function SubpageHeader({ title, onBack }: SubpageHeaderProps) {
  return (
    <header className="subpage-header">
      <button type="button" className="subpage-back" onClick={onBack} aria-label="Back">
        <ChevronLeft size={22} strokeWidth={2} />
      </button>
      <h1>{title}</h1>
      <span />
    </header>
  );
}
