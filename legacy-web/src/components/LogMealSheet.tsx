import { useMemo, useState } from "react";
import {
  DEFAULT_BOWLS,
  GROCERY_FILTERS,
  MEAL_FOODS,
  bowlSub,
  formatMealSummary,
  type AddedLine,
  type FoodItem,
  type GroceryFilter,
  type SavedBowl,
} from "../services/mealsLogService";

type Props = {
  mealName: string;
  mealTime: string;
  onClose: () => void;
  onSave: (summary: string) => void;
  onOpenGrocery?: () => void;
};

export default function LogMealSheet({
  mealName,
  mealTime,
  onClose,
  onSave,
  onOpenGrocery,
}: Props) {
  const [bowls, setBowls] = useState<SavedBowl[]>(DEFAULT_BOWLS);
  const [filter, setFilter] = useState<GroceryFilter>("bowls");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [added, setAdded] = useState<AddedLine[]>([]);

  const summary = useMemo(() => formatMealSummary(added), [added]);

  const foods = useMemo(() => {
    if (filter === "bowls") return [];
    const q = query.trim().toLowerCase();
    return MEAL_FOODS.filter((f) => {
      if (f.cat !== filter) return false;
      if (q && !f.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, query]);

  const bowlCards = useMemo(() => {
    if (filter !== "bowls") return [];
    const q = query.trim().toLowerCase();
    return bowls.filter((b) => !q || b.name.toLowerCase().includes(q));
  }, [filter, query, bowls]);

  function bumpLine(line: AddedLine) {
    setSelectedId(line.id);
    setAdded((prev) => {
      const hit = prev.find((a) => a.id === line.id);
      if (hit) {
        return prev.map((a) => (a.id === line.id ? { ...a, qty: a.qty + 1 } : a));
      }
      return [...prev, { ...line, qty: 1 }];
    });
  }

  function dropLine(id: string) {
    setAdded((prev) =>
      prev
        .map((a) => (a.id === id ? { ...a, qty: a.qty - 1 } : a))
        .filter((a) => a.qty > 0),
    );
  }

  function addFood(f: FoodItem) {
    bumpLine({ id: f.id, name: f.name, sub: `${f.kcal} kcal`, qty: 1 });
  }

  function addSavedBowl(b: SavedBowl) {
    bumpLine({ id: b.id, name: b.name, sub: bowlSub(b.items), qty: 1 });
  }

  function buildBowl() {
    const next: SavedBowl = {
      id: `custom-${Date.now()}`,
      name: `Custom bowl ${bowls.length + 1}`,
      cat: "protein",
      items: ["Chicken breast", "Broccoli"],
      emoji: "🥗",
    };
    setBowls((prev) => [...prev, next]);
    addSavedBowl(next);
  }

  const lines = added.filter((a) => a.qty > 0);

  return (
    <div className="sheet-overlay active" onClick={onClose} role="presentation">
      <div
        className="sheet log-meal-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={`Log ${mealName}`}
      >
        <div className="sheet-handle" />
        <div className="sheet-head">
          <div>
            <div className="sheet-time">{mealTime}</div>
            <div className="sheet-title">Log {mealName}</div>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="sheet-label">
          <span className="eyebrow muted">Add from your lab&apos;s grocery list</span>
          <button
            type="button"
            className="link"
            onClick={() => onOpenGrocery?.()}
          >
            Grocery list →
          </button>
        </div>

        <label className="search-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bowls, chicken, broccoli..."
          />
        </label>

        <div className="pill-row">
          {GROCERY_FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`pill${filter === id ? " active" : ""}`}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="food-hscroll" role="list">
          {filter === "bowls" ? (
            <>
              <button
                type="button"
                role="listitem"
                className="food-tile food-tile-sm food-tile-cta"
                onClick={buildBowl}
              >
                <span className="food-emoji" aria-hidden>
                  +
                </span>
                <span className="food-name">Build Your Bowl</span>
                <span className="food-kcal">Custom</span>
              </button>
              {bowlCards.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  role="listitem"
                  className={`food-tile food-tile-sm${selectedId === b.id ? " selected" : ""}`}
                  onClick={() => addSavedBowl(b)}
                >
                  <span className="food-emoji" aria-hidden>
                    {b.emoji}
                  </span>
                  <span className="food-name">{b.name}</span>
                  <span className="food-kcal">{bowlSub(b.items)}</span>
                </button>
              ))}
            </>
          ) : (
            foods.map((f) => (
              <button
                key={f.id}
                type="button"
                role="listitem"
                className={`food-tile food-tile-sm${selectedId === f.id ? " selected" : ""}`}
                onClick={() => addFood(f)}
              >
                <span className="food-emoji" aria-hidden>
                  {f.emoji}
                </span>
                <span className="food-name">{f.name}</span>
                <span className="food-kcal">{f.kcal} kcal</span>
              </button>
            ))
          )}
        </div>

        {lines.length === 0 ? (
          <div className="summary-chip summary-plus">{summary}</div>
        ) : (
          <div
            className="summary-chip summary-plus summary-editable"
            role="list"
            aria-label="Meal summary. Tap an item to remove one."
          >
            {lines.map((a, i) => (
              <span key={a.id} role="listitem">
                {i > 0 ? (
                  <span className="summary-sep" aria-hidden>
                    {" "}
                    +{" "}
                  </span>
                ) : null}
                <button
                  type="button"
                  className="summary-part"
                  onClick={() => dropLine(a.id)}
                  aria-label={`Remove one ${a.name}`}
                >
                  {a.qty === 1 ? "1x" : `${a.qty}x`} {a.name}
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="sheet-cta">
          <button type="button" className="btn-primary full" onClick={() => onSave(summary)}>
            Save meal
          </button>
        </div>
      </div>
    </div>
  );
}
