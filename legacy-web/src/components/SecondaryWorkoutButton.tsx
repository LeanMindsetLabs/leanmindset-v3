import "../styles/train.css";

type SecondaryWorkoutButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function SecondaryWorkoutButton({
  label,
  onClick,
  disabled = false,
}: SecondaryWorkoutButtonProps) {
  return (
    <button type="button" className="train-secondary" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
