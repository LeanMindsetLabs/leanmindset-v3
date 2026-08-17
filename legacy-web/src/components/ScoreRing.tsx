import type { ReactNode } from "react";

type ScoreRingProps = {
  size: number;
  strokeWidth: number;
  progress: number;
  fillColor: string;
  trackColor?: string;
  children?: ReactNode;
};

export default function ScoreRing({
  size,
  strokeWidth,
  progress,
  fillColor,
  trackColor = "rgba(255, 255, 255, 0.1)",
  children,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(1, Math.max(0, progress));
  const offset = circumference * (1 - clamped);
  const center = size / 2;

  return (
    <div className="home-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} aria-hidden="true">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={fillColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="home-ring-center">{children}</div>
    </div>
  );
}
