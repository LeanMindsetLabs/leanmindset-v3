import { Dumbbell, PersonStanding } from "lucide-react";
import { walkCoreA, walkMobility } from "../services/trainService";
import RecommendedPlanRow from "./RecommendedPlanRow";
import "../styles/today.css";

type RecommendedPlanCardProps = {
  onPrimary: () => void;
  onLighter: () => void;
};

export default function RecommendedPlanCard({
  onPrimary,
  onLighter,
}: RecommendedPlanCardProps) {
  return (
    <section className="plan-card">
      <h2>Recommended plan</h2>
      <RecommendedPlanRow
        emphasized
        eyebrow="Best choice today"
        title={walkCoreA.title}
        meta="25–30 min · Beginner · NEAT + midline"
        icon={<Dumbbell size={16} strokeWidth={2} />}
        onClick={onPrimary}
      />
      <RecommendedPlanRow
        eyebrow="If you want lighter"
        title={walkMobility.title}
        meta="20 min · Easy · Recovery focus"
        icon={<PersonStanding size={16} strokeWidth={2} />}
        onClick={onLighter}
      />
    </section>
  );
}
