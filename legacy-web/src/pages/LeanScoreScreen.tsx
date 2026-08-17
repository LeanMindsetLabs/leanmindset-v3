import {
  Apple,
  CheckCircle2,
  ChevronLeft,
  CircleCheck,
  Droplet,
  Dumbbell,
  Info,
  Moon,
} from "lucide-react";
import ImprovementCard from "../components/ImprovementCard";
import InsightCard from "../components/InsightCard";
import LeanScoreRing from "../components/LeanScoreRing";
import ScoreBreakdownRow from "../components/ScoreBreakdownRow";
import TrendChart from "../components/TrendChart";
import "../styles/screen.css";

const breakdown = [
  { label: "Nutrition", value: 78, color: "#35D07F", icon: Apple },
  { label: "Training", value: 60, color: "#3E82FF", icon: Dumbbell },
  { label: "Recovery", value: 71, color: "#F3BC40", icon: Moon },
  { label: "Consistency", value: 82, color: "#9D6CFF", icon: CircleCheck },
  { label: "Hydration", value: 55, color: "#5B9DFF", icon: Droplet },
];

const trendValues = [43, 48, 52, 57, 60, 62, 65];
const trendLabels = ["7d ago", "6d", "5d", "4d", "3d", "2d", "Today"];

type LeanScoreScreenProps = {
  onBack?: () => void;
};

export default function LeanScoreScreen({ onBack }: LeanScoreScreenProps) {
  return (
    <div className="screen-scroll">
      <header className="header">
        {onBack && (
          <button type="button" className="header-back" onClick={onBack} aria-label="Back">
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
        )}
        <div className="header-copy">
          <h1 className="header-title">Lean Score</h1>
          <p className="header-subtitle">Know what's driving your progress</p>
        </div>
        <button type="button" className="header-info" aria-label="About Lean Score">
          <Info size={20} strokeWidth={1.6} />
        </button>
      </header>

      <div className="score-ring-wrap">
        <LeanScoreRing score={65} />
      </div>

      <h2 className="breakdown-heading">Score breakdown</h2>
      <div className="breakdown-list">
        {breakdown.map((row) => {
          const Icon = row.icon;
          return (
            <ScoreBreakdownRow
              key={row.label}
              label={row.label}
              value={row.value}
              color={row.color}
              icon={<Icon size={18} strokeWidth={1.9} />}
            />
          );
        })}
      </div>

      <div className="improvement-slot">
        <ImprovementCard
          title="Fastest way to improve today"
          copy={"Drink 1.2L more water and complete\nWalk + Core A to gain +6 points."}
        />
      </div>

      <div className="chart-slot">
        <TrendChart
          title="Last 7 days"
          values={trendValues}
          labels={trendLabels}
        />
      </div>

      <div className="insights-row">
        <InsightCard
          eyebrow="YOUR STRONGEST HABIT"
          tone="purple"
          heading="Consistency · 82"
          body={"Keep it up. You're\nbuilding momentum."}
          icon={<CheckCircle2 size={16} color="#9D6CFF" strokeWidth={2.1} />}
        />
        <InsightCard
          eyebrow="AREA TO IMPROVE"
          tone="blue"
          heading="Hydration · 55"
          body={"Small daily changes\nlead to big results."}
          icon={<Droplet size={16} color="#5B9DFF" strokeWidth={2.1} />}
        />
      </div>
    </div>
  );
}
