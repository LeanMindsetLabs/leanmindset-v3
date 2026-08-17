type PlaceholderScreenProps = {
  title: string;
  copy: string;
};

export default function PlaceholderScreen({ title, copy }: PlaceholderScreenProps) {
  return (
    <div className="placeholder-screen">
      <h1>{title}</h1>
      <p>{copy}</p>
    </div>
  );
}
