import { Sparkles } from "lucide-react";
import "../styles/coach.css";

export default function CoachFocusCard() {
  return (
    <section className="coach-focus">
      <div className="coach-focus-icon">
        <Sparkles size={18} strokeWidth={1.9} />
      </div>
      <div>
        <h2 className="focus-title">Today's coaching focus</h2>
        <p className="focus-copy">
          You're doing well.
          <br />
          Prioritize hydration and
          <br />
          complete your workout.
        </p>
        <span className="highlight-cta">View tips →</span>
      </div>
    </section>
  );
}
