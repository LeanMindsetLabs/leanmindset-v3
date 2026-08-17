import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import "../styles/profile.css";

type SettingsRowProps = {
  icon: ReactNode;
  label: string;
  value?: string;
  onClick: () => void;
};

export default function SettingsRow({ icon, label, value, onClick }: SettingsRowProps) {
  return (
    <button type="button" className="settings-row" onClick={onClick} aria-label={label}>
      <span className="settings-row-icon">{icon}</span>
      <span className="settings-row-label">{label}</span>
      {value ? <span className="settings-row-value">{value}</span> : null}
      <ChevronRight className="settings-row-chevron" size={16} strokeWidth={2} />
    </button>
  );
}
