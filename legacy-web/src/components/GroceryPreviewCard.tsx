import { ArrowRight } from "lucide-react";
import "../styles/meals.css";

type GroceryPreviewCardProps = {
  onGenerate: () => void;
};

export default function GroceryPreviewCard({ onGenerate }: GroceryPreviewCardProps) {
  return (
    <div className="grocery-cta-wrap">
      <button type="button" className="grocery-cta" onClick={onGenerate}>
        Generate full grocery list
        <ArrowRight size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
}
