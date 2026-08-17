import "../styles/meals.css";

type GroceryChipProps = {
  name: string;
};

export default function GroceryChip({ name }: GroceryChipProps) {
  return <span className="grocery-chip">{name}</span>;
}
