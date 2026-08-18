import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type LayoutVariant = "classic" | "whoop";
export type CoachUiVariant = "chat" | "checkin" | "now";

type UiVariantContextValue = {
  layoutVariant: LayoutVariant;
  setLayoutVariant: (next: LayoutVariant) => void;
  coachVariant: CoachUiVariant;
  setCoachVariant: (next: CoachUiVariant) => void;
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
  const [coachVariant, setCoachVariant] = useState<CoachUiVariant>("chat");
  const [previewRoute, setPreviewRoute] = useState("index");
  const [composerOpen, setComposerOpen] = useState(false);
  const [logMenuOpen, setLogMenuOpen] = useState(false);

  const value = useMemo(
    () => ({
      layoutVariant,
      setLayoutVariant,
      coachVariant,
      setCoachVariant,
      previewRoute,
      setPreviewRoute,
      composerOpen,
      setComposerOpen,
      logMenuOpen,
      setLogMenuOpen,
    }),
    [layoutVariant, coachVariant, previewRoute, composerOpen, logMenuOpen],
  );

  return <UiVariantContext.Provider value={value}>{children}</UiVariantContext.Provider>;
}

export function useUiVariant() {
  const ctx = useContext(UiVariantContext);
  if (!ctx) throw new Error("useUiVariant must be used within UiVariantProvider");
  return ctx;
}
