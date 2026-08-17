import type { ReactNode } from "react";
import "../styles/insight.css";

type InsightCardProps = {
  eyebrow: string;
  tone: "purple" | "blue";
  icon: ReactNode;
  heading: string;
  body: string;
};

export default function InsightCard({
  eyebrow,
  tone,
  icon,
  heading,
  body,
}: InsightCardProps) {
  return (
    <div className="insight-card">
      <div className={`insight-eyebrow ${tone}`}>{eyebrow}</div>
      <div className="insight-heading">
        {icon}
        <div className="insight-heading-text">{heading}</div>
      </div>
      <div className="insight-body">{body}</div>
    </div>
  );
}
