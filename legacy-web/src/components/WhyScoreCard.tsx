import { ArrowUp, Droplet, Minus } from "lucide-react";
import type { PlanReason } from "../services/readinessService";
import "../styles/today.css";

type WhyScoreRowProps = {
  reason: PlanReason;
};

export function WhyScoreRow({ reason }: WhyScoreRowProps) {
  const icon =
    reason.tone === "up" ? (
      <ArrowUp size={14} strokeWidth={2.4} color="#19E68C" />
    ) : reason.tone === "neutral" ? (
      <Minus size={14} strokeWidth={2.4} color="#F5B83D" />
    ) : (
      <Droplet size={14} strokeWidth={2.2} color="#5B9DFF" />
    );

  return (
    <div className="why-row">
      <span className="why-icon">{icon}</span>
      <p>{reason.text}</p>
    </div>
  );
}

type WhyScoreCardProps = {
  reasons: PlanReason[];
};

export default function WhyScoreCard({ reasons }: WhyScoreCardProps) {
  return (
    <section className="why-card">
      <h2>Why this score?</h2>
      {reasons.map((reason) => (
        <WhyScoreRow key={reason.id} reason={reason} />
      ))}
      <span className="highlight-cta">View details →</span>
    </section>
  );
}
