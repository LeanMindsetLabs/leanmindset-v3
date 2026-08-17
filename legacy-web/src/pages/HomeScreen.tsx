import {
  Check,
  ChevronRight,
  CircleCheck,
  Droplets,
  Dumbbell,
  Info,
  Leaf,
  Moon,
  Quote,
  Smartphone,
  Star,
  Utensils,
} from "lucide-react";
import ScoreRing from "../components/ScoreRing";
import UiVariantToggle from "../components/UiVariantToggle";
import { homeContent as content } from "../services/homeContent";
import "../styles/home.css";
import "../styles/whoop.css";

export type LayoutVariant = "classic" | "whoop";

type HomeScreenProps = {
  variant?: LayoutVariant;
  onVariantChange?: (next: LayoutVariant) => void;
  onContinue?: () => void;
  onOpenProgram?: () => void;
  onOpenMeals?: () => void;
  onOpenTrain?: () => void;
};

const layoutOptions = [
  { id: "classic" as const, label: "Classic" },
  { id: "whoop" as const, label: "Whoop" },
];

export default function HomeScreen({
  variant = "classic",
  onVariantChange,
  onContinue,
  onOpenProgram,
  onOpenMeals,
  onOpenTrain,
}: HomeScreenProps) {
  return (
    <div className="home-screen">
      <div className="home-atmosphere" aria-hidden="true" />
      <div className="home-scroll">
        {onVariantChange ? (
          <div className="layout-toggle-bar">
            <UiVariantToggle
              label="Home layout"
              value={variant}
              onChange={onVariantChange}
              options={layoutOptions}
            />
          </div>
        ) : null}
        {variant === "whoop" ? (
          <WhoopHome
            onContinue={onContinue}
            onOpenMeals={onOpenMeals}
            onOpenTrain={onOpenTrain}
            onOpenProgram={onOpenProgram}
          />
        ) : (
          <ClassicHome
            onContinue={onContinue}
            onOpenMeals={onOpenMeals}
            onOpenTrain={onOpenTrain}
            onOpenProgram={onOpenProgram}
          />
        )}
      </div>
    </div>
  );
}

function WhoopHome({
  onContinue,
  onOpenMeals,
  onOpenTrain,
  onOpenProgram,
}: Omit<HomeScreenProps, "variant" | "onVariantChange">) {
  return (
    <>
      <div className="whoop-top">
        <div className="home-avatar" aria-label="Profile avatar">
          {content.avatarInitial}
          <span className="home-online" />
        </div>
        <div className="whoop-date" aria-label="Today">
          <span>‹</span>
          TODAY
          <span>›</span>
        </div>
        <div className="whoop-status">Day 12</div>
      </div>
      <p className="whoop-brand">LEANMINDSET</p>

      <section className="whoop-dials">
        <button type="button" className="whoop-dial" onClick={onContinue}>
          <ScoreRing size={104} strokeWidth={6} progress={0.72} fillColor="#F5C400">
            <strong>72</strong>
          </ScoreRing>
          <span className="whoop-dial-label">READY ›</span>
        </button>
        <button type="button" className="whoop-dial" onClick={onOpenMeals}>
          <ScoreRing size={104} strokeWidth={6} progress={0.78} fillColor="#7EB6FF">
            <strong>78</strong>
          </ScoreRing>
          <span className="whoop-dial-label">FUEL ›</span>
        </button>
        <button type="button" className="whoop-dial" onClick={onOpenTrain}>
          <ScoreRing size={104} strokeWidth={6} progress={8.4 / 14} fillColor="#3D7BFF">
            <strong>8.4</strong>
          </ScoreRing>
          <span className="whoop-dial-label">TRAIN ›</span>
        </button>
      </section>

      <div className="whoop-pair">
        <div className="whoop-mini">
          <em>Plan</em>
          <div className="whoop-chip">
            <b className="ok">✓</b>
            <div>
              <span>On track</span>
              <small>Day 12 of 42</small>
            </div>
          </div>
        </div>
        <div className="whoop-mini">
          <em>Coach</em>
          <div className="whoop-chip">
            <b className="warn">!</b>
            <div>
              <span>Moderate</span>
              <small>Yellow ready</small>
            </div>
          </div>
        </div>
      </div>

      <section className="whoop-stack">
        <h2>TODAY’S ACTIVITIES</h2>
        <button type="button" className="whoop-activity" onClick={onOpenMeals}>
          <span className="whoop-activity-mark fuel">
            <Utensils size={16} strokeWidth={1.8} />
            1/3
          </span>
          <span style={{ flex: 1 }}>
            <strong>BREAKFAST</strong>
            <em>Logged · protein-focused</em>
          </span>
        </button>
        <button type="button" className="whoop-activity" onClick={onOpenTrain}>
          <span className="whoop-activity-mark train">
            <Dumbbell size={16} strokeWidth={1.8} />
            8.4
          </span>
          <span style={{ flex: 1 }}>
            <strong>WALK + CORE A</strong>
            <em>25 min · beginner</em>
          </span>
        </button>
        <button type="button" className="whoop-activity" onClick={onOpenProgram}>
          <span className="whoop-activity-mark check">
            <Smartphone size={16} strokeWidth={1.8} />
            —
          </span>
          <span style={{ flex: 1 }}>
            <strong>CHECK-IN</strong>
            <em>Weight · reflection</em>
          </span>
        </button>
      </section>

      <div className="whoop-note">
        <h3>Moderate day</h3>
        <p>Ready is yellow. Keep protein high and finish Walk + Core A.</p>
        <span className="highlight-cta">View plan →</span>
      </div>

      <button type="button" className="home-cta" onClick={onContinue}>
        {content.continueLabel}
      </button>
    </>
  );
}

function ClassicHome({
  onContinue,
  onOpenMeals,
  onOpenTrain,
  onOpenProgram,
}: Omit<HomeScreenProps, "variant" | "onVariantChange">) {
  return (
    <>
      <header className="home-header">
        <div>
          <p className="home-date">{content.dateLabel}</p>
          <h1 className="home-greeting">{content.greeting}</h1>
        </div>
        <div className="home-avatar" aria-label="Profile avatar">
          {content.avatarInitial}
          <span className="home-online" />
        </div>
      </header>

      <section className="home-ready">
        <div className="home-ready-row">
          <ScoreRing
            size={110}
            strokeWidth={9}
            progress={content.readyPercent / 100}
            fillColor="#19E68C"
          >
            <strong>{content.readyPercent}%</strong>
            <span>READY</span>
          </ScoreRing>
          <div className="home-ready-copy">
            <h2>{content.readyHeadline}</h2>
            <p>
              {content.energyLabel} <em className="good">{content.energyValue}</em>
              {" · "}
              {content.recoveryLabel} <em className="fair">{content.recoveryValue}</em>
              {" · "}
              {content.onTrackLabel}
            </p>
            <span className="home-day-badge">{content.dayBadge}</span>
          </div>
        </div>
        <button type="button" className="home-cta" onClick={onContinue}>
          {content.continueLabel}
        </button>
      </section>

      <section className="home-stack">
        <div className="home-plan-head">
          <h2>{content.planTitle}</h2>
          <button type="button" className="home-link" onClick={onOpenProgram}>
            {content.viewProgramLabel}
          </button>
        </div>
        <div className="home-tasks">
          {content.tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              className="home-task"
              onClick={() => {
                if (task.icon === "restaurant") onOpenMeals?.();
                if (task.icon === "barbell") onOpenTrain?.();
              }}
            >
              <span className="home-task-num">
                {task.number}
                {task.complete ? (
                  <span className="home-task-check">
                    <Check size={8} strokeWidth={3} color="#0B1220" />
                  </span>
                ) : null}
              </span>
              <span className="home-task-icon">
                {task.icon === "restaurant" ? (
                  <Utensils size={18} strokeWidth={1.8} />
                ) : task.icon === "barbell" ? (
                  <Dumbbell size={18} strokeWidth={1.8} />
                ) : (
                  <span className="home-phone-wrap">
                    <Smartphone size={18} strokeWidth={1.8} />
                    <i />
                  </span>
                )}
              </span>
              <span className="home-task-copy">
                <strong>{task.title}</strong>
                <em>{task.meta}</em>
              </span>
              <ChevronRight size={18} strokeWidth={2} className="home-chevron" />
            </button>
          ))}
        </div>
      </section>

      <div className="home-two-up">
        <section className="home-panel">
          <div className="home-panel-title">
            <span>{content.leanScore.title}</span>
            <Info size={13} strokeWidth={1.8} />
          </div>
          <div className="home-score-body">
            <ScoreRing
              size={64}
              strokeWidth={6}
              progress={content.leanScore.value / content.leanScore.max}
              fillColor="#5B9DFF"
            >
              <strong className="sm">{content.leanScore.value}</strong>
              <span className="sm">/{content.leanScore.max}</span>
            </ScoreRing>
            <div className="home-score-rows">
              {content.leanScore.rows.map((row) => (
                <div key={row.id} className="home-score-row">
                  {row.icon === "nutrition" ? (
                    <Leaf size={13} color="#19E68C" />
                  ) : row.icon === "barbell" ? (
                    <Dumbbell size={13} color="#8E8E93" />
                  ) : row.icon === "moon" ? (
                    <Moon size={13} color="#7EB6FF" />
                  ) : (
                    <CircleCheck size={13} color="#19E68C" />
                  )}
                  <em>{row.label}</em>
                  <strong>{row.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <p className="home-win">
            <Star size={13} fill="#D4A017" color="#D4A017" />
            {content.leanScore.win}
          </p>
        </section>

        <section className="home-panel">
          <div className="home-panel-title">
            <span>{content.thisWeek.title}</span>
            <Info size={13} strokeWidth={1.8} />
          </div>
          <div className="home-week-bars">
            {content.thisWeek.bars.map((bar) => {
              const fill = bar.tone === "green" ? "#19E68C" : "#5B9DFF";
              const pct = Math.round((bar.value / bar.max) * 100);
              return (
                <div key={bar.id} className="home-week-row">
                  <div className="home-week-meta">
                    <span className="home-week-label">
                      {bar.id === "workouts" ? (
                        <Dumbbell size={13} color="#8E8E93" />
                      ) : bar.id === "meals" ? (
                        <Utensils size={13} color="#8E8E93" />
                      ) : (
                        <Droplets size={13} color="#7EB6FF" />
                      )}
                      {bar.label}
                    </span>
                    <strong>
                      {bar.value}/{bar.max}
                    </strong>
                  </div>
                  <div className="home-bar-track">
                    <i style={{ width: `${pct}%`, background: fill }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <button type="button" className="home-mindset">
        <span className="home-quote-mark">
          <Quote size={20} color="#F7F8FA" />
        </span>
        <span className="home-mindset-copy">
          <em>{content.mindset.label}</em>
          <strong>“{content.mindset.quote}”</strong>
          <span>{content.mindset.support}</span>
        </span>
        <ChevronRight size={18} strokeWidth={2} className="home-chevron" />
      </button>
    </>
  );
}
