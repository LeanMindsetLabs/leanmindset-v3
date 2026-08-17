import "../styles/ring.css";

type LeanScoreRingProps = {
  score: number;
  max?: number;
};

export default function LeanScoreRing({ score, max = 100 }: LeanScoreRingProps) {
  const size = 146;
  const stroke = 11;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(score / max, 1));
  const dash = circumference * progress;

  const startDeg = 90;
  const endDeg = startDeg + 360 * progress;
  const endRad = (endDeg * Math.PI) / 180;
  const hx = center + radius * Math.cos(endRad);
  const hy = center + radius * Math.sin(endRad);

  return (
    <div className="lean-score-ring">
      <div className="lean-score-ring-halo" />
      <svg
        className="lean-score-ring-svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id="leanRingGradient" x1="50%" y1="0%" x2="100%" y2="85%">
            <stop offset="0%" stopColor="#C5DAFF" />
            <stop offset="18%" stopColor="#7EABFF" />
            <stop offset="55%" stopColor="#4A86FF" />
            <stop offset="100%" stopColor="#2E6AE8" />
          </linearGradient>
          <radialGradient id="leanCapGlow" cx="50%" cy="50%" r="50%">
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
          stroke="url(#leanRingGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          transform={`rotate(90 ${center} ${center})`}
        />
        <circle cx={hx} cy={hy} r={6.2} fill="url(#leanCapGlow)" />
        <circle cx={hx} cy={hy} r={3.2} fill="#FFFFFF" />
      </svg>
      <div className="lean-score-ring-center">
        <div className="score-number">{score}</div>
        <div className="score-denominator">/{max}</div>
        <div className="score-label">LEAN SCORE</div>
      </div>
    </div>
  );
}
