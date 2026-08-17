import SubpageHeader from "../components/SubpageHeader";
import { setAppleHealthConnected, type ProfileState } from "../services/profileService";
import "../styles/profile.css";

type IntegrationsScreenProps = {
  profile: ProfileState;
  onBack: () => void;
};

export default function IntegrationsScreen({ profile, onBack }: IntegrationsScreenProps) {
  return (
    <div className="subpage-screen">
      <SubpageHeader title="Integrations" onBack={onBack} />
      <section className="subpage-card">
        <div className="toggle-row">
          <div>
            <p>Apple Health</p>
            <span>{profile.appleHealthConnected ? "Connected" : "Not connected"}</span>
          </div>
          <button
            type="button"
            className={`toggle${profile.appleHealthConnected ? " on" : ""}`}
            aria-label="Apple Health connection"
            aria-pressed={profile.appleHealthConnected}
            onClick={() => setAppleHealthConnected(!profile.appleHealthConnected)}
          >
            <i />
          </button>
        </div>
      </section>
    </div>
  );
}
