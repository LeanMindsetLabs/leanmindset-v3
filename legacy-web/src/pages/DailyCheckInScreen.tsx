import { useMemo, useState } from "react";
import CheckInSelect from "../components/CheckInSelect";
import UiVariantToggle from "../components/UiVariantToggle";
import { useMealsLog } from "../context/MealsLogContext";
import "../styles/meals-log.css";

export type CoachUiVariant = "chat" | "checkin";

const YESTERDAY_LB = 178.9;
const START_LB = 191.4;
const MOODS = ["Rough", "Ok", "Good", "Great"] as const;
const SLEEP_QUALITY = ["Poor", "Fair", "Good", "Great"] as const;

type Props = {
  variant: CoachUiVariant;
  onVariantChange: (next: CoachUiVariant) => void;
  onOpenMealsLog: () => void;
};

export default function DailyCheckInScreen({
  variant,
  onVariantChange,
  onOpenMealsLog,
}: Props) {
  const { meals } = useMealsLog();
  const [weightText, setWeightText] = useState("178.4");
  const [mood, setMood] = useState<(typeof MOODS)[number]>("Ok");
  const [waterL, setWaterL] = useState("3");
  const [sleepHrs, setSleepHrs] = useState("7");
  const [sleepQuality, setSleepQuality] = useState<(typeof SLEEP_QUALITY)[number]>("Good");
  const [bm, setBm] = useState("1");
  const [exerciseHrs, setExerciseHrs] = useState("1");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  const weight = useMemo(() => {
    const n = Number.parseFloat(weightText);
    return Number.isFinite(n) ? n : null;
  }, [weightText]);

  const changeToday = weight == null ? null : +(weight - YESTERDAY_LB).toFixed(1);
  const lostTotal = weight == null ? null : +(START_LB - weight).toFixed(1);

  const foodLog = useMemo(
    () =>
      meals.map((m) => ({
        meal: m.name,
        time: m.time,
        items: m.logged
          ? (m.itemsSummary ?? "Logged · open Meals Log to edit")
          : "Not logged yet",
        logged: m.logged,
      })),
    [meals],
  );

  return (
    <div className="checkin-screen">
      <div className="checkin-head">
        <div>
          <h1>Daily check-in</h1>
          <div className="meals-log-sub">Summer Lab</div>
        </div>
        <UiVariantToggle
          label="Coach layout"
          value={variant}
          onChange={onVariantChange}
          options={[
            { id: "chat", label: "Chat" },
            { id: "checkin", label: "Daily Check-in" },
          ]}
        />
      </div>

      <section className="card checkin-field">
        <div className="sheet-label">
          <span className="eyebrow muted">Started</span>
          <span className="checkin-day-inline">Day 12th of 42 · Mon, Aug 3</span>
        </div>

        <label className="checkin-input-label">
          <span>
            Weight <span className="checkin-muted">(enter today)</span>
          </span>
          <div className="checkin-weight-box">
            <input
              type="number"
              inputMode="decimal"
              step={0.1}
              min={50}
              max={500}
              value={weightText}
              onChange={(e) => setWeightText(e.target.value)}
              aria-label="Today's weight in pounds"
            />
            <span>lb</span>
          </div>
        </label>

        <div className="checkin-kv checkin-kv-inline">
          <div className="checkin-kv-row">
            <span>Yesterday</span>
            <b className="checkin-calc">{YESTERDAY_LB.toFixed(1)} lb</b>
          </div>
          <div className="checkin-kv-row">
            <span>Change</span>
            <b
              className={
                changeToday == null
                  ? "checkin-calc"
                  : changeToday < 0
                    ? "checkin-down"
                    : changeToday > 0
                      ? "checkin-up"
                      : "checkin-calc"
              }
            >
              {changeToday == null
                ? "-"
                : `${changeToday > 0 ? "+" : ""}${changeToday.toFixed(1)} lb`}
            </b>
          </div>
          <div className="checkin-kv-row">
            <span>Total Lost</span>
            <b className="checkin-calc">
              {lostTotal == null ? "-" : `${lostTotal.toFixed(1)} lb`}
            </b>
          </div>
        </div>
      </section>

      <section className="card checkin-field checkin-metrics-card">
        <span className="eyebrow muted">Today</span>
        <div className="checkin-dd-grid">
          <div className="checkin-dd-row checkin-dd-row-4">
            <CheckInSelect
              label="Mood"
              value={mood}
              onChange={(v) => setMood(v as (typeof MOODS)[number])}
              options={MOODS.map((m) => ({ value: m, label: m }))}
            />
            <CheckInSelect
              label="Water"
              value={waterL}
              onChange={setWaterL}
              options={["1", "1.5", "2", "2.5", "3", "3.5", "4"].map((v) => ({
                value: v,
                label: `${v} L`,
              }))}
            />
            <CheckInSelect
              label="BM"
              value={bm}
              onChange={setBm}
              title="Bowel movement"
              options={["0", "1", "2", "3", "4"].map((v) => ({
                value: v,
                label: `${v}×`,
              }))}
            />
            <CheckInSelect
              label="Exercise"
              value={exerciseHrs}
              onChange={setExerciseHrs}
              options={["0", "0.5", "1", "1.5", "2"].map((v) => ({
                value: v,
                label: `${v} hr`,
              }))}
            />
          </div>

          <div className="checkin-dd-row checkin-dd-row-2">
            <CheckInSelect
              label="Sleep · hours"
              value={sleepHrs}
              onChange={setSleepHrs}
              options={["5", "6", "6.5", "7", "7.5", "8", "9"].map((h) => ({
                value: h,
                label: `${h} hrs`,
              }))}
            />
            <CheckInSelect
              label="Sleep · quality"
              value={sleepQuality}
              onChange={(v) => setSleepQuality(v as (typeof SLEEP_QUALITY)[number])}
              options={SLEEP_QUALITY.map((q) => ({ value: q, label: q }))}
            />
          </div>
        </div>
      </section>

      <section className="card checkin-field">
        <div className="sheet-label">
          <span className="eyebrow muted">Food log</span>
          <button type="button" className="link" onClick={onOpenMealsLog}>
            Meals Log →
          </button>
        </div>
        <div className="checkin-food-list">
          {foodLog.map((row) => (
            <div key={`${row.meal}-${row.time}`} className="checkin-food-row">
              <span className="checkin-food-meal">{row.meal}</span>
              <span className={`checkin-food-items${row.logged ? "" : " empty"}`}>
                {row.items}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="card checkin-field">
        <span className="eyebrow muted">Notes</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes for your coach..."
          rows={2}
        />
      </section>

      <button
        type="button"
        className="btn-primary full"
        onClick={() => setSent(true)}
      >
        {sent ? "Check-in sent" : "Send check-in"}
      </button>
    </div>
  );
}
