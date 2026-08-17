import Avatar from "./Avatar";
import "../styles/meals.css";

export default function MealsHeader() {
  return (
    <header className="meals-header">
      <div>
        <h1 className="meals-title">Meals</h1>
        <p className="meals-subtitle">Eat with clarity, not guesswork</p>
      </div>
      <Avatar letter="M" online />
    </header>
  );
}
