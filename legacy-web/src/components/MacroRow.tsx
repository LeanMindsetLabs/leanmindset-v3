import type { Macro } from "../services/mealsService";
import { percent } from "../services/mealsService";
import "../styles/meals.css";

type MacroRowProps = {
  macro: Macro;
};

export default function MacroRow({ macro }: MacroRowProps) {
  const pct = percent(macro.consumed, macro.target);
  return (
    <div className="macro-row">
      <div className="macro-top">
        <span className="macro-label">{macro.label}</span>
        <span className="macro-value">
          {macro.consumed} / {macro.target}g
        </span>
        <span className="macro-pct">{pct}%</span>
      </div>
      <div className="macro-track">
        <div
          className="macro-fill"
          style={{ width: `${Math.min(pct, 100)}%`, background: macro.color }}
        />
      </div>
    </div>
  );
}
