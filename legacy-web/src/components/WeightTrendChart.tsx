import type { DailyWeight } from "../services/weekReviewService";
import "../styles/week-review.css";

type WeightTrendChartProps = {
  points: DailyWeight[];
};

export default function WeightTrendChart({ points }: WeightTrendChartProps) {
  const width = 330;
  const height = 128;
  const padL = 8;
  const padR = 8;
  const padT = 10;
  const padB = 22;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const values = points.map((point) => point.lb);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 0.6);

  const plotted = points.map((point, index) => {
    const x = padL + (index * plotW) / Math.max(points.length - 1, 1);
    const y = padT + plotH * (1 - (point.lb - min) / span);
    return { ...point, x, y };
  });

  const line = plotted
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(" ");
  const first = plotted[0];
  const last = plotted[plotted.length - 1];
  const area = `${line} L ${last.x.toFixed(2)} ${padT + plotH} L ${first.x.toFixed(2)} ${padT + plotH} Z`;

  return (
    <div className="weight-trend-chart">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="weekWeightFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3778FF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3778FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#weekWeightFill)" />
        <path
          d={line}
          fill="none"
          stroke="#3778FF"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {plotted.map((point) => (
          <g key={`${point.day}-${point.lb}`}>
            <circle cx={point.x} cy={point.y} r="4.2" fill="#3778FF" />
            <circle cx={point.x} cy={point.y} r="2.1" fill="#F7F9FF" />
          </g>
        ))}
        {plotted.map((point) => (
          <text
            key={`label-${point.day}-${point.x}`}
            x={point.x}
            y={height - 4}
            textAnchor="middle"
            fill="#6D7B91"
            fontSize="8"
            fontFamily="Inter, -apple-system, sans-serif"
          >
            {point.day}
          </text>
        ))}
      </svg>
    </div>
  );
}
