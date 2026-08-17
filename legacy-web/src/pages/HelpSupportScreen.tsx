import SubpageHeader from "../components/SubpageHeader";
import "../styles/profile.css";

type HelpSupportScreenProps = {
  onBack: () => void;
};

export default function HelpSupportScreen({ onBack }: HelpSupportScreenProps) {
  return (
    <div className="subpage-screen">
      <SubpageHeader title="Help & Support" onBack={onBack} />
      <section className="subpage-card">
        <h2>Get help</h2>
        <p>Questions about readiness, meals, or training can go to Coach from the tab bar.</p>
        <div className="subpage-list">
          <div className="subpage-line">
            Email
            <span>support@leanmindset.app</span>
          </div>
          <div className="subpage-line">
            Hours
            <span>Mon–Fri, 9–5 ET</span>
          </div>
        </div>
      </section>
      <a className="subpage-cta" href="mailto:support@leanmindset.app" style={{ display: "grid", placeItems: "center", textDecoration: "none" }}>
        Email support
      </a>
    </div>
  );
}
