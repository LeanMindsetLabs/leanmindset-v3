import Avatar from "./Avatar";
import "../styles/coach.css";

export default function CoachHeader() {
  return (
    <header className="coach-header">
      <div>
        <h1 className="coach-title">Coach</h1>
        <p className="coach-subtitle">Ask for help, ideas, or a plan</p>
      </div>
      <Avatar letter="M" online />
    </header>
  );
}
