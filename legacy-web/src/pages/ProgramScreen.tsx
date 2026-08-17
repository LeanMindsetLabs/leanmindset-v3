import SubpageHeader from "../components/SubpageHeader";
import type { ProgramInfo } from "../services/profileService";
import "../styles/profile.css";

type ProgramScreenProps = {
  program: ProgramInfo;
  onBack: () => void;
};

export default function ProgramScreen({ program, onBack }: ProgramScreenProps) {
  return (
    <div className="subpage-screen">
      <SubpageHeader title="My Program" onBack={onBack} />
      <section className="subpage-card">
        <h2>{program.name}</h2>
        <p>
          Day {program.day} of {program.totalDays} · Current phase {program.phase}. Upcoming:{" "}
          {program.upcoming}.
        </p>
        <div className="subpage-list">
          {program.schedule.map((row) => (
            <div className="subpage-line" key={row.week}>
              {row.week}
              <span>{row.focus}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
