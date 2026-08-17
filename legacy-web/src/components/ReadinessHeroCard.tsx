import ReadinessRing from "./ReadinessRing";
import type { ReadinessData } from "../services/readinessService";
import "../styles/today.css";

type ReadinessHeroCardProps = {
  data: ReadinessData;
};

export default function ReadinessHeroCard({ data }: ReadinessHeroCardProps) {
  return (
    <section className="readiness-hero">
      <ReadinessRing score={data.score} />
      <div className="hero-copy-wrap">
        <h2 className="hero-title">{data.headline}</h2>
        <p className="hero-copy">{data.copy}</p>
        <p className="hero-signals">
          {data.signals.map((signal, index) => (
            <span key={signal.label}>
              <i style={{ background: signal.color }} />
              {signal.label}
              {index < data.signals.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
