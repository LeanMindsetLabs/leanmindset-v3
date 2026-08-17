import "../styles/breakdown.css";

type ScoreProgressBarProps = {
  value: number;
  color: string;
};

export default function ScoreProgressBar({ value, color }: ScoreProgressBarProps) {
  const width = Math.max(0, Math.min(value, 100));

  return (
    <div className="score-progress">
      <div
        className="score-progress-fill"
        style={{ width: `${width}%`, background: color }}
      />
    </div>
  );
}
