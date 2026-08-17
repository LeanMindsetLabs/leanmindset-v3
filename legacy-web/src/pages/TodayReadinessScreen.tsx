import { Activity, Droplet, Info, Moon, UserRound, Zap } from "lucide-react";
import { useState } from "react";
import PrimaryCTA from "../components/PrimaryCTA";
import ReadinessHeader from "../components/ReadinessHeader";
import ReadinessHeroCard from "../components/ReadinessHeroCard";
import ReadinessMetricCard from "../components/ReadinessMetricCard";
import RecommendedPlanCard from "../components/RecommendedPlanCard";
import ScoreRing from "../components/ScoreRing";
import UiVariantToggle from "../components/UiVariantToggle";
import WeekReadyCard from "../components/WeekReadyCard";
import WhyScoreCard from "../components/WhyScoreCard";
import { useWeekState } from "../hooks/useWeekState";
import {
  defaultReadiness,
  type ReadinessMetric,
} from "../services/readinessService";
import { walkCoreA, walkMobility } from "../services/trainService";
import { completedWeekNumber } from "../services/weekReviewService";
import type { LayoutVariant } from "./HomeScreen";
import "../styles/today.css";
import "../styles/whoop.css";

const metricIcons = {
  sleep: Moon,
  energy: Zap,
  stress: UserRound,
  soreness: Activity,
  hydration: Droplet,
} as const;

type TodayReadinessScreenProps = {
  onBack: () => void;
  onOpenWorkout: (workoutId: string) => void;
  onOpenMeals: () => void;
  onOpenWeekReview: (week: number) => void;
  variant?: LayoutVariant;
  onVariantChange?: (next: LayoutVariant) => void;
};

export default function TodayReadinessScreen({
  onBack,
  onOpenWorkout,
  onOpenMeals,
  onOpenWeekReview,
  variant = "classic",
  onVariantChange,
}: TodayReadinessScreenProps) {
  const data = defaultReadiness;
  const weekState = useWeekState();
  const reviewReady =
    weekState.reviewPending && weekState.dayInWeek >= weekState.weekLength;
  const [sheet, setSheet] = useState<"how" | ReadinessMetric | null>(null);

  function continuePlan() {
    if (data.workoutIncomplete) {
      onOpenWorkout(walkCoreA.id);
      return;
    }
    onOpenMeals();
  }

  return (
    <div className="today-screen">
      <div className="today-scroll">
        {onVariantChange ? (
          <div className="layout-toggle-bar">
            <UiVariantToggle
              label="Today layout"
              value={variant}
              onChange={onVariantChange}
              options={[
                { id: "classic", label: "Classic" },
                { id: "whoop", label: "Whoop" },
              ]}
            />
          </div>
        ) : null}
        {variant === "whoop" ? (
          <WhoopToday onOpenWorkout={onOpenWorkout} onOpenMeals={onOpenMeals} />
        ) : (
          <>
        <ReadinessHeader onBack={onBack} />
        <ReadinessHeroCard data={data} />
        {reviewReady && (
          <WeekReadyCard
            week={completedWeekNumber()}
            onClick={() => onOpenWeekReview(completedWeekNumber())}
          />
        )}

        <div className="breakdown-head">
          <h2>Readiness breakdown</h2>
          <button
            type="button"
            className="how-works"
            onClick={() => setSheet("how")}
            aria-label="How it works"
          >
            How it works
            <Info size={12} strokeWidth={2} />
          </button>
        </div>

        <div className="metric-row">
          {data.metrics.map((metric) => {
            const Icon = metricIcons[metric.id];
            return (
              <ReadinessMetricCard
                key={metric.id}
                label={metric.label}
                value={metric.value}
                status={metric.status}
                statusColor={metric.statusColor}
                iconColor={metric.iconColor}
                icon={<Icon size={15} strokeWidth={1.9} />}
                onClick={() => setSheet(metric)}
              />
            );
          })}
        </div>

        <RecommendedPlanCard
          onPrimary={() => onOpenWorkout(walkCoreA.id)}
          onLighter={() => onOpenWorkout(walkMobility.id)}
        />
        <WhyScoreCard reasons={data.reasons} />
        <PrimaryCTA label="Continue with today's plan" onClick={continuePlan} />
          </>
        )}
      </div>

      {sheet && (
        <div className="today-sheet" onClick={() => setSheet(null)}>
          <div
            className="today-sheet-card"
            onClick={(event) => event.stopPropagation()}
          >
            {sheet === "how" ? (
              <>
                <h2>How it works</h2>
                <p>
                  Readiness blends last night's sleep, today's energy, stress, soreness, and hydration. A higher score means your body is better prepared for the assigned session.
                </p>
              </>
            ) : (
              <>
                <h2>{sheet.label}</h2>
                <p>{sheet.detail}</p>
              </>
            )}
            <button type="button" onClick={() => setSheet(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function WhoopToday({
  onOpenWorkout,
  onOpenMeals,
}: {
  onOpenWorkout: (workoutId: string) => void;
  onOpenMeals: () => void;
}) {
  const [lens, setLens] = useState<"ready" | "fuel" | "train">("ready");
  const data = defaultReadiness;

  return (
    <>
      <div className="whoop-tabs">
        <button type="button" className={lens === "ready" ? "active" : ""} onClick={() => setLens("ready")}>
          READY
        </button>
        <button type="button" className={lens === "fuel" ? "active" : ""} onClick={() => setLens("fuel")}>
          FUEL
        </button>
        <button type="button" className={lens === "train" ? "active" : ""} onClick={() => setLens("train")}>
          TRAIN
        </button>
      </div>

      {lens === "ready" ? (
        <>
          <div className="whoop-hero">
            <ScoreRing size={196} strokeWidth={8} progress={0.72} fillColor="#F5C400">
              <span>READY</span>
              <strong>72%</strong>
            </ScoreRing>
          </div>
          <div className="whoop-pills">
            <div className="whoop-pill blue">
              <strong>7h 12m</strong>
              <em>SLEEP</em>
            </div>
            <div className="whoop-pill green">
              <strong>7h 40m</strong>
              <em>SLEEP NEED</em>
            </div>
          </div>
          <div className="whoop-rows">
            {data.metrics.map((metric) => (
              <div key={metric.id} className="whoop-row">
                <span>{metric.label.toUpperCase()}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
          <div className="whoop-note">
            <h3>Moderate day</h3>
            <p>Your body can take a moderate day. Keep protein high and finish Walk + Core A.</p>
            <span className="highlight-cta">View plan →</span>
          </div>
        </>
      ) : lens === "fuel" ? (
        <>
          <div className="whoop-hero">
            <ScoreRing size={196} strokeWidth={8} progress={0.78} fillColor="#7EB6FF">
              <span>FUEL</span>
              <strong>78%</strong>
            </ScoreRing>
          </div>
          <div className="whoop-pills">
            <div className="whoop-pill green">
              <strong>94g</strong>
              <em>PROTEIN</em>
            </div>
            <div className="whoop-pill blue">
              <strong>1:00</strong>
              <em>NEXT MEAL</em>
            </div>
          </div>
          <button type="button" className="whoop-cta" onClick={onOpenMeals}>
            Log meal
          </button>
        </>
      ) : (
        <>
          <div className="whoop-hero">
            <ScoreRing size={196} strokeWidth={8} progress={8.4 / 14} fillColor="#3D7BFF">
              <span>TRAIN</span>
              <strong>8.4</strong>
            </ScoreRing>
          </div>
          <div className="whoop-note">
            <h3>Walk + Core A</h3>
            <p>Target 14.0. Ready is yellow, so keep this session easy and finish it.</p>
            <span className="highlight-cta">View session →</span>
          </div>
          <button type="button" className="whoop-cta" onClick={() => onOpenWorkout(walkCoreA.id)}>
            Start session
          </button>
        </>
      )}
    </>
  );
}
