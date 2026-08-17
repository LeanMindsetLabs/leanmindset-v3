import { ChevronLeft } from "lucide-react";
import "../styles/profile.css";

type ProfileHeaderProps = {
  onBack: () => void;
};

export default function ProfileHeader({ onBack }: ProfileHeaderProps) {
  return (
    <header className="profile-header">
      <button type="button" className="profile-back" onClick={onBack} aria-label="Back">
        <ChevronLeft size={22} strokeWidth={2} />
      </button>
      <h1 className="profile-header-title">Profile / Settings</h1>
      <span />
    </header>
  );
}
