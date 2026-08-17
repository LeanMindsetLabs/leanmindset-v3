import StatusDot from "./StatusDot";
import "../styles/coach.css";
import "../styles/profile.css";

type AvatarProps = {
  letter?: string;
  online?: boolean;
  size?: number;
  label?: string;
};

export default function Avatar({
  letter = "M",
  online = true,
  size = 40,
  label,
}: AvatarProps) {
  return (
    <div
      className={`lm-avatar${size >= 44 ? " lm-avatar-lg" : ""}`}
      style={size === 40 ? undefined : { width: size, height: size }}
      aria-label={label ?? (online ? "Profile online" : "Profile")}
    >
      <span>{letter}</span>
      {online && <StatusDot />}
    </div>
  );
}
