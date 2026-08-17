import SubpageHeader from "../components/SubpageHeader";
import { updatePreferences, type ProfileState } from "../services/profileService";
import "../styles/profile.css";

type AppSettingsScreenProps = {
  profile: ProfileState;
  onBack: () => void;
};

export default function AppSettingsScreen({ profile, onBack }: AppSettingsScreenProps) {
  const prefs = profile.preferences;

  return (
    <div className="subpage-screen">
      <SubpageHeader title="Settings" onBack={onBack} />
      <section className="subpage-card">
        <div className="toggle-row">
          <div>
            <p>Notifications</p>
            <span>Reminders for check-ins and training</span>
          </div>
          <button
            type="button"
            className={`toggle${prefs.notifications ? " on" : ""}`}
            aria-label="Notifications"
            aria-pressed={prefs.notifications}
            onClick={() => updatePreferences({ notifications: !prefs.notifications })}
          >
            <i />
          </button>
        </div>
        <div className="toggle-row">
          <div>
            <p>Use kilograms</p>
            <span>Currently {prefs.units === "kg" ? "kg" : "lb"}</span>
          </div>
          <button
            type="button"
            className={`toggle${prefs.units === "kg" ? " on" : ""}`}
            aria-label="Use kilograms"
            aria-pressed={prefs.units === "kg"}
            onClick={() => updatePreferences({ units: prefs.units === "kg" ? "lb" : "kg" })}
          >
            <i />
          </button>
        </div>
        <div className="toggle-row">
          <div>
            <p>Share progress</p>
            <span>Privacy control for weekly summaries</span>
          </div>
          <button
            type="button"
            className={`toggle${prefs.shareProgress ? " on" : ""}`}
            aria-label="Share progress"
            aria-pressed={prefs.shareProgress}
            onClick={() => updatePreferences({ shareProgress: !prefs.shareProgress })}
          >
            <i />
          </button>
        </div>
      </section>
      <section className="subpage-card">
        <h2>Account</h2>
        <div className="subpage-line">
          {profile.user.name}
          <span>{profile.user.email}</span>
        </div>
      </section>
    </div>
  );
}
