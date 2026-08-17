import "../styles/today.css";

type ReadinessRingProps = {
  score: number;
};

export default function ReadinessRing({ score }: ReadinessRingProps) {
  const size = 110;
  const stroke = 10.5;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(score / 100, 1));
  const dash = circumference * progress;
  const startDeg = 90;
  const endDeg = startDeg + 360 * progress;
  const endRad = (endDeg * Math.PI) / 180;
  const hx = center + radius * Math.cos(endRad);
  const hy = center + radius * Math.sin(endRad);

  return (
    <div className="readiness-ring" aria-hidden="true">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="readyRing" x1="50%" y1="0%" x2="90%" y2="80%">
            <stop offset="0%" stopColor="#C5DAFF" />
            <stop offset="40%" stopColor="#5B9DFF" />
            <stop offset="100%" stopColor="#2E6AE8" />
          </linearGradient>
          <radialGradient id="readyCap" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#D7E6FF" />
            <stop offset="100%" stopColor="#7EA6FF" />
          </radialGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#2C2C2E"
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#readyRing)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          transform={`rotate(90 ${center} ${center})`}
        />
        <circle cx={hx} cy={hy} r={5.2} fill="url(#readyCap)" />
        <circle cx={hx} cy={hy} r={2.8} fill="#FFFFFF" />
      </svg>
      <div className="readiness-ring-center">
        <div className="readiness-percent">{score}%</div>
        <div className="readiness-label">READY</div>
      </div>
    </div>
  );
}
