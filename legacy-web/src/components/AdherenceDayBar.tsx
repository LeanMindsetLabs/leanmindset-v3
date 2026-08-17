import "../styles/train.css";

type AdherenceDayBarProps = {
  label: string;
  completed: boolean;
  height?: number;
};

export default function AdherenceDayBar({
  label,
  completed,
  height = 56,
}: AdherenceDayBarProps) {
  return (
    <div className="adherence-day">
      <span
        className={`adherence-bar${completed ? " done" : ""}`}
        style={{ height }}
        aria-label={`${label} ${completed ? "complete" : "incomplete"}`}
      />
      <span>{label}</span>
    </div>
  );
}
