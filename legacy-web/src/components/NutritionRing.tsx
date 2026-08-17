import "../styles/meals.css";

type NutritionRingProps = {
  logged: number;
  target: number;
};

export default function NutritionRing({ logged, target }: NutritionRingProps) {
  const size = 108;
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(logged / target, 1));
  const dash = circumference * progress;
  const startDeg = -90;
  const endDeg = startDeg + 360 * progress;
  const endRad = (endDeg * Math.PI) / 180;
  const hx = center + radius * Math.cos(endRad);
  const hy = center + radius * Math.sin(endRad);

  return (
    <div className="nutrition-ring">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="kcalRing" x1="50%" y1="0%" x2="90%" y2="80%">
            <stop offset="0%" stopColor="#C5DAFF" />
            <stop offset="40%" stopColor="#5B9DFF" />
            <stop offset="100%" stopColor="#2E6AE8" />
          </linearGradient>
          <radialGradient id="kcalCap" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
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
          stroke="url(#kcalRing)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          transform={`rotate(-90 ${center} ${center})`}
        />
        <circle cx={hx} cy={hy} r={4.8} fill="url(#kcalCap)" />
        <circle cx={center} cy={center - radius} r={3.4} fill="#F4F8FF" />
      </svg>
      <div className="nutrition-ring-center">
        <div className="nutrition-number">{logged.toLocaleString("en-US")}</div>
        <div className="nutrition-kcal">kcal</div>
        <div className="nutrition-logged">logged</div>
      </div>
    </div>
  );
}
