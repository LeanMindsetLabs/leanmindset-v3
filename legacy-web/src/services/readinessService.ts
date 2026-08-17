export type ReadinessMetricId =
  | "sleep"
  | "energy"
  | "stress"
  | "soreness"
  | "hydration";

export type ReadinessMetric = {
  id: ReadinessMetricId;
  label: string;
  value: string;
  status: string;
  statusColor: string;
  iconColor: string;
  detail: string;
};

export type PlanReason = {
  id: string;
  tone: "up" | "neutral" | "drop";
  text: string;
};

export type ReadinessData = {
  score: number;
  headline: string;
  copy: string;
  signals: { label: string; color: string }[];
  metrics: ReadinessMetric[];
  reasons: PlanReason[];
  workoutIncomplete: boolean;
};

export const defaultReadiness: ReadinessData = {
  score: 72,
  headline: "Ready to train",
  copy: "You're in a good spot.\nLet's make it count.",
  signals: [
    { label: "Energy good", color: "#19E68C" },
    { label: "Recovery fair", color: "#F5B83D" },
    { label: "On track", color: "#5B9DFF" },
  ],
  metrics: [
    {
      id: "sleep",
      label: "Sleep",
      value: "7h 10m",
      status: "Good",
      statusColor: "#9A6CFF",
      iconColor: "#9A6CFF",
      detail: "You slept 7 hours 10 minutes. That is in your target range and is lifting today's readiness.",
    },
    {
      id: "energy",
      label: "Energy",
      value: "Good",
      status: "High",
      statusColor: "#19E68C",
      iconColor: "#19E68C",
      detail: "Energy is high enough for today's assigned session. Keep meals and water on schedule.",
    },
    {
      id: "stress",
      label: "Stress",
      value: "Fair",
      status: "Moderate",
      statusColor: "#F5B83D",
      iconColor: "#F5B83D",
      detail: "Stress is moderate. It is not blocking training, but it is slightly limiting recovery.",
    },
    {
      id: "soreness",
      label: "Soreness",
      value: "Low",
      status: "Mild",
      statusColor: "#5B9DFF",
      iconColor: "#5B9DFF",
      detail: "Soreness is mild. Walk + Core A is an appropriate load for today.",
    },
    {
      id: "hydration",
      label: "Hydration",
      value: "4/7",
      status: "Keep it up",
      statusColor: "#5B9DFF",
      iconColor: "#5B9DFF",
      detail: "You are at 4 of 7 hydration targets. Closing the gap will support energy and recovery.",
    },
  ],
  reasons: [
    { id: "sleep-energy", tone: "up", text: "Good sleep and energy are boosting your readiness." },
    { id: "stress", tone: "neutral", text: "Moderate stress slightly impacts your recovery." },
    { id: "hydration", tone: "drop", text: "Hydration can improve—aim for 7/7 today." },
  ],
  workoutIncomplete: true,
};
