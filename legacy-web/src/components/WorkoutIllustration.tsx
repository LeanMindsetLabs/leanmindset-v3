import "../styles/train.css";

type WorkoutIllustrationProps = {
  src: string;
  alt: string;
};

export default function WorkoutIllustration({ src, alt }: WorkoutIllustrationProps) {
  return (
    <div className="workout-illustration">
      <img src={src} alt={alt} />
    </div>
  );
}
