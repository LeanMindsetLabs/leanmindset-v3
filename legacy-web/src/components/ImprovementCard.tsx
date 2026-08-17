import "../styles/improvement.css";

type ImprovementCardProps = {
  title: string;
  copy: string;
};

export default function ImprovementCard({ title, copy }: ImprovementCardProps) {
  return (
    <button type="button" className="improvement-card">
      <div className="improvement-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8.9 1.2 2.6 8.6h4.55L6.3 14.8l6.55-7.7H8.35L8.9 1.2Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="improvement-copy">
        <div className="card-eyebrow">{title}</div>
        <div className="card-copy">{copy}</div>
      </div>
      <div className="improvement-chevron">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
          <path
            d="M1.2 1.2L6.6 7L1.2 12.8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}
