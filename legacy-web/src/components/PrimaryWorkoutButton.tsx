import "../styles/train.css";

type PrimaryWorkoutButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function PrimaryWorkoutButton({
  label,
  onClick,
  disabled = false,
  loading = false,
}: PrimaryWorkoutButtonProps) {
  return (
    <button
      type="button"
      className="train-primary"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Opening…" : label}
    </button>
  );
}
