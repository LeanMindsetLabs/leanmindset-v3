import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type LayoutVariant = "classic" | "whoop";
export type MealsUiVariant = "classic" | "log" | "now";
export type CoachUiVariant = "chat" | "checkin" | "now";
export type HomeHeaderVariant = "standard" | "greeting";

type UiVariantContextValue = {
  layoutVariant: LayoutVariant;
  setLayoutVariant: (next: LayoutVariant) => void;
  mealsVariant: MealsUiVariant;
  setMealsVariant: (next: MealsUiVariant) => void;
  coachVariant: CoachUiVariant;
  setCoachVariant: (next: CoachUiVariant) => void;
  homeHeader: HomeHeaderVariant;
  setHomeHeader: (next: HomeHeaderVariant) => void;
  previewRoute: string;
  setPreviewRoute: (next: string) => void;
  composerOpen: boolean;
  setComposerOpen: (next: boolean) => void;
  logMenuOpen: boolean;
  setLogMenuOpen: (next: boolean) => void;
};

const UiVariantContext = createContext<UiVariantContextValue | null>(null);

export function UiVariantProvider({ children }: { children: ReactNode }) {
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>("whoop");
  const [mealsVariant, setMealsVariant] = useState<MealsUiVariant>("classic");
  const [coachVariant, setCoachVariant] = useState<CoachUiVariant>("chat");
  const [homeHeader, setHomeHeader] = useState<HomeHeaderVariant>("standard");
  const [previewRoute, setPreviewRoute] = useState("index");
  const [composerOpen, setComposerOpen] = useState(false);
  const [logMenuOpen, setLogMenuOpen] = useState(false);

  const value = useMemo(
    () => ({
      layoutVariant,
      setLayoutVariant,
      mealsVariant,
      setMealsVariant,
      coachVariant,
      setCoachVariant,
      homeHeader,
      setHomeHeader,
      previewRoute,
      setPreviewRoute,
      composerOpen,
      setComposerOpen,
      logMenuOpen,
      setLogMenuOpen,
    }),
    [layoutVariant, mealsVariant, coachVariant, homeHeader, previewRoute, composerOpen, logMenuOpen],
  );

  return <UiVariantContext.Provider value={value}>{children}</UiVariantContext.Provider>;
}

export function useUiVariant() {
  const ctx = useContext(UiVariantContext);
  if (!ctx) throw new Error("useUiVariant must be used within UiVariantProvider");
  return ctx;
}
