import type { ReactNode } from "react";
import "../styles/profile.css";

type SettingsGroupProps = {
  children: ReactNode;
};

export default function SettingsGroup({ children }: SettingsGroupProps) {
  return <div className="settings-group">{children}</div>;
}
