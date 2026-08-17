import WorkoutIllustration from "./WorkoutIllustration";
import type { WorkoutSession } from "../services/trainService";
import "../styles/train.css";

type WorkoutSessionCardProps = {
  session: WorkoutSession;
};

export default function WorkoutSessionCard({ session }: WorkoutSessionCardProps) {
  return (
    <section className="workout-card">
      <div className="workout-copy">
        <p className="workout-kicker">Today's session</p>
        <h2>{session.title}</h2>
        <p className="workout-meta">
          {session.durationMin}–{session.durationMax} min · {session.difficulty}
          <br />
          {session.tags.join(" · ")}
        </p>
      </div>
      <WorkoutIllustration src={session.illustration} alt="" />
    </section>
  );
}
