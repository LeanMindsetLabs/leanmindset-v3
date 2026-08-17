import { useState } from "react";
import LogMealSheet from "../components/LogMealSheet";
import UiVariantToggle from "../components/UiVariantToggle";
import { useMealsLog } from "../context/MealsLogContext";
import type { MealLogId } from "../services/mealsLogService";
import "../styles/meals-log.css";

export type MealsUiVariant = "classic" | "log";

type Props = {
  variant: MealsUiVariant;
  onVariantChange: (next: MealsUiVariant) => void;
  onOpenCheckIn: () => void;
  onOpenGrocery?: () => void;
};

export default function MealsLogScreen({
  variant,
  onVariantChange,
  onOpenCheckIn,
  onOpenGrocery,
}: Props) {
  const { meals, saveMealLog } = useMealsLog();
  const [logMealId, setLogMealId] = useState<MealLogId | null>(null);
  const loggedCount = meals.filter((m) => m.logged).length;
  const activeMeal = meals.find((m) => m.id === logMealId) ?? null;

  return (
    <div className="meals-log-screen">
      <div className="meals-log-head">
        <div className="meals-log-titles">
          <h1>Meals Log</h1>
          <div className="meals-log-sub">Today · your meal plan</div>
        </div>
        <UiVariantToggle
          label="Meals layout"
          value={variant}
          onChange={onVariantChange}
          options={[
            { id: "classic", label: "Classic" },
            { id: "log", label: "Meals Log" },
          ]}
        />
      </div>

      <div className="meals-log-actions">
        <button type="button" className="cta-outline" onClick={() => setLogMealId("breakfast")}>
          + Log a meal
        </button>
        <button type="button" className="cta-outline" onClick={() => onOpenGrocery?.()}>
          Grocery list →
        </button>
      </div>

      <div className="card fuel-card">
        <div className="ring lg" style={{ ["--pct" as string]: 73 }}>
          <span>
            1,600
            <br />
            <small>kcal</small>
          </span>
        </div>
        <div className="fuel-details">
          <div className="fuel-target">TARGET 2,200 KCAL</div>
          <div className="fuel-copy">Room left in today&apos;s fuel budget.</div>
          <div className="macro-row">
            <span>Protein</span>
            <div className="bar">
              <div className="fill blue" style={{ width: "56%" }} />
            </div>
            <span>79/140g</span>
          </div>
          <div className="macro-row">
            <span>Fat</span>
            <div className="bar">
              <div className="fill orange" style={{ width: "48%" }} />
            </div>
            <span>31/65g</span>
          </div>
          <div className="macro-row">
            <span>Carbs</span>
            <div className="bar">
              <div className="fill blue" style={{ width: "69%" }} />
            </div>
            <span>125/180g</span>
          </div>
        </div>
      </div>

      <div className="meals-log-stats">
        <div className="card compact">
          <div className="ring sm" style={{ ["--pct" as string]: 40 }}>
            <span>2/5</span>
          </div>
          <div>
            <div className="eyebrow">Next meal</div>
            <div className="card-title">Breakfast</div>
            <div className="card-sub">8:00 AM · Water 66%</div>
          </div>
        </div>
        <div className="card compact">
          <div className="score-pill">84</div>
          <div>
            <div className="eyebrow">Recovery</div>
            <div className="card-title">7h 10m</div>
            <div className="card-sub">Wind-down 22:30</div>
          </div>
        </div>
      </div>

      <section className="meals-log-section">
        <div className="section-head">
          <h2>Today&apos;s meals</h2>
          <span className="tag">
            {loggedCount}/{meals.length} logged
          </span>
        </div>
        <div className="hscroll">
          {meals.map((m) => (
            <div key={m.id} className={`meal-card${m.logged ? " done" : ""}`}>
              <div className={`meal-check${m.logged ? "" : " pending"}`}>
                {m.logged ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                ) : null}
              </div>
              <div>
                <div className="meal-name">{m.name}</div>
                <div className="meal-desc">{m.desc}</div>
              </div>
              <div className="meal-foot">
                <span className="meal-time">{m.time}</span>
                <button
                  type="button"
                  className={`meal-pill ${m.logged ? "edit" : "log"}`}
                  onClick={() => setLogMealId(m.id)}
                >
                  {m.logged ? "Edit" : "Log"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button type="button" className="cta-outline full" onClick={onOpenCheckIn}>
        Send meals in daily check-in →
      </button>

      {activeMeal ? (
        <LogMealSheet
          mealName={activeMeal.name}
          mealTime={activeMeal.time}
          onClose={() => setLogMealId(null)}
          onSave={(summary) => {
            saveMealLog(activeMeal.id, summary);
            setLogMealId(null);
          }}
          onOpenGrocery={onOpenGrocery}
        />
      ) : null}
    </div>
  );
}
