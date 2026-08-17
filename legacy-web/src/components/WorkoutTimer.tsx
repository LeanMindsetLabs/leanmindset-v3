import "../styles/session.css";

type WorkoutTimerProps = {
  remaining: number;
  total: number;
};

export default function WorkoutTimer({ remaining, total }: WorkoutTimerProps) {
  const size = 84;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0;
  const dash = circumference * progress;

  return (
    <div className="workout-timer" aria-label={`${remaining} seconds`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#2C2C2E" strokeWidth={stroke} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#3778FF"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="workout-timer-center">
        <div className="timer-number">{remaining}</div>
        <div className="timer-label">sec</div>
      </div>
    </div>
  );
}
