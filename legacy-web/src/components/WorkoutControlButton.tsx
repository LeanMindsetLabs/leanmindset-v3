import "../styles/session.css";

type WorkoutControlButtonProps = {
  label: string;
  variant: "prev" | "complete";
  onClick: () => void;
  disabled?: boolean;
};

export default function WorkoutControlButton({
  label,
  variant,
  onClick,
  disabled = false,
}: WorkoutControlButtonProps) {
  return (
    <button
      type="button"
      className={`workout-control ${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {label}
    </button>
  );
}
