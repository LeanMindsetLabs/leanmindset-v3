import {
  Activity,
  Atom,
  CircleHelp,
  LogOut,
  Ruler,
  Settings,
} from "lucide-react";
import { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileIdentity from "../components/ProfileIdentity";
import ProgressSummary from "../components/ProgressSummary";
import SettingsGroup from "../components/SettingsGroup";
import SettingsRow from "../components/SettingsRow";
import { logout } from "../services/profileService";
import type { ProfileState } from "../services/profileService";
import type { ProgressView } from "../types";
import "../styles/profile.css";

type ProfileSettingsScreenProps = {
  profile: ProfileState;
  onBack: () => void;
  onOpen: (view: ProgressView) => void;
};

export default function ProfileSettingsScreen({
  profile,
  onBack,
  onOpen,
}: ProfileSettingsScreenProps) {
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <div className="profile-screen">
      <div className="profile-scroll">
      <ProfileHeader onBack={onBack} />
      <ProfileIdentity user={profile.user} />
      <ProgressSummary
        profile={profile}
        onSeeAll={() => onOpen("see-all")}
        onLeanScore={() => onOpen("lean-score")}
        onWeight={() => onOpen("weight")}
      />
      <SettingsGroup>
        <SettingsRow
          icon={<Atom size={18} strokeWidth={1.8} />}
          label="My Program"
          value={profile.program.name}
          onClick={() => onOpen("program")}
        />
        <SettingsRow
          icon={<Ruler size={18} strokeWidth={1.8} />}
          label="Measurements"
          onClick={() => onOpen("measurements")}
        />
        <SettingsRow
          icon={<Activity size={18} strokeWidth={1.8} />}
          label="Integrations"
          value="Apple Health"
          onClick={() => onOpen("integrations")}
        />
        <SettingsRow
          icon={<Settings size={18} strokeWidth={1.8} />}
          label="Settings"
          onClick={() => onOpen("settings")}
        />
        <SettingsRow
          icon={<CircleHelp size={18} strokeWidth={1.8} />}
          label="Help & Support"
          onClick={() => onOpen("help")}
        />
        <SettingsRow
          icon={<LogOut size={18} strokeWidth={1.8} />}
          label="Log out"
          onClick={() => setConfirmLogout(true)}
        />
      </SettingsGroup>
      </div>

      {confirmLogout && (
        <div className="profile-sheet" onClick={() => setConfirmLogout(false)}>
          <div className="profile-sheet-card" onClick={(event) => event.stopPropagation()}>
            <h2>Log out</h2>
            <p>This will clear your session and return you to sign in.</p>
            <div className="profile-sheet-actions">
              <button type="button" className="sheet-confirm" onClick={logout}>
                Log out
              </button>
              <button type="button" className="sheet-cancel" onClick={() => setConfirmLogout(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
