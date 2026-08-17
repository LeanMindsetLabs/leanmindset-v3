import "../styles/chart.css";

type TrendChartProps = {
  title: string;
  values: number[];
  labels: string[];
};

export default function TrendChart({ title, values, labels }: TrendChartProps) {
  const width = 348;
  const height = 100;
  const padL = 24;
  const padR = 14;
  const padT = 18;
  const padB = 16;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const yMax = 80;
  const yTicks = [80, 60, 40, 20, 0];

  const points = values.map((value, i) => {
    const x = padL + (i * plotW) / Math.max(values.length - 1, 1);
    const y = padT + plotH * (1 - value / yMax);
    return { x, y, value, label: labels[i] };
  });

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  const last = points[points.length - 1];
  const first = points[0];
  const area = `${line} L ${last.x.toFixed(2)} ${padT + plotH} L ${first.x.toFixed(2)} ${padT + plotH} Z`;

  return (
    <div className="trend-chart">
      <div className="trend-chart-title">{title}</div>
      <div className="trend-chart-body">
        <svg
          className="trend-chart-svg"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3778FF" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#3778FF" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#3778FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => {
            const y = padT + plotH * (1 - tick / yMax);
            return (
              <g key={tick}>
                <text
                  x={padL - 7}
                  y={y + 2.5}
                  textAnchor="end"
                  fill="#5E6E84"
                  fontSize="7.5"
                  fontFamily="Inter, -apple-system, sans-serif"
                >
                  {tick}
                </text>
                {tick > 0 && (
                  <line
                    x1={padL}
                    x2={width - padR}
                    y1={y}
                    y2={y}
                    stroke="rgba(130,150,180,0.13)"
                    strokeWidth="1"
                  />
                )}
              </g>
            );
          })}

          <path d={area} fill="url(#trendFill)" />
          <path
            d={line}
            fill="none"
            stroke="#3778FF"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {points.map((p, i) => {
            const isLast = i === points.length - 1;
            return (
              <g key={p.label}>
                {!isLast && (
                  <text
                    x={p.x}
                    y={p.y - 8}
                    textAnchor="middle"
                    fill="#C9D3E0"
                    fontSize="8"
                    fontWeight="500"
                    fontFamily="Inter, -apple-system, sans-serif"
                  >
                    {p.value}
                  </text>
                )}
                <circle cx={p.x} cy={p.y} r={4.1} fill="#3778FF" />
                <circle cx={p.x} cy={p.y} r={2.15} fill="#F7F9FF" />
                {isLast && (
                  <g>
                    <rect
                      x={p.x - 11}
                      y={p.y - 23}
                      width="22"
                      height="14"
                      rx="7"
                      fill="#3778FF"
                    />
                    <text
                      x={p.x}
                      y={p.y - 12.6}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="700"
                      fontFamily="Inter, -apple-system, sans-serif"
                    >
                      {p.value}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {points.map((p) => (
            <text
              key={`x-${p.label}`}
              x={p.x}
              y={height - 1}
              textAnchor="middle"
              fill="#6B7B90"
              fontSize="7.5"
              fontFamily="Inter, -apple-system, sans-serif"
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
