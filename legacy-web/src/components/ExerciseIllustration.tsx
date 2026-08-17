import "../styles/session.css";

type ExerciseIllustrationProps = {
  src: string;
  alt: string;
};

export default function ExerciseIllustration({ src, alt }: ExerciseIllustrationProps) {
  return (
    <div className="exercise-illustration">
      <img src={src} alt={alt} />
    </div>
  );
}
