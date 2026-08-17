import type { TabId } from "../types";
import {
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Dumbbell,
  Home,
  Utensils,
} from "lucide-react";
import "../styles/nav.css";

function CoachBubbleIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <circle cx="9" cy="12" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

const items: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "today", label: "Today", icon: CalendarDays },
  { id: "meals", label: "Meals", icon: Utensils },
  { id: "coach", label: "Coach", icon: Home },
  { id: "train", label: "Train", icon: Dumbbell },
  { id: "progress", label: "Progress", icon: ChartNoAxesColumnIncreasing },
];

type BottomNavigationProps = {
  activeId: TabId;
  onChange: (id: TabId) => void;
};

export default function BottomNavigation({
  activeId,
  onChange,
}: BottomNavigationProps) {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-items">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.id === activeId;
          const isCoach = item.id === "coach";
          return (
            <button
              key={item.id}
              type="button"
              className={`bottom-nav-item${active ? " active" : ""}${isCoach ? " coach-fab" : ""}${isCoach && active ? " coach-glow" : ""}`}
              onClick={() => onChange(item.id)}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
            >
              {isCoach ? (
                <span className={`coach-orb${active ? " active" : ""}`}>
                  <CoachBubbleIcon />
                </span>
              ) : (
                <Icon size={20} strokeWidth={active ? 2.15 : 1.8} />
              )}
              <span className={isCoach ? "fab-label" : undefined}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
