import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type LayoutVariant = "classic" | "whoop";
export type CoachUiVariant = "chat" | "checkin" | "now";
export type CheckInPickerVariant = "1" | "2" | "3";

type UiVariantContextValue = {
  layoutVariant: LayoutVariant;
  setLayoutVariant: (next: LayoutVariant) => void;
  coachVariant: CoachUiVariant;
  setCoachVariant: (next: CoachUiVariant) => void;
  checkInPicker: CheckInPickerVariant;
  setCheckInPicker: (next: CheckInPickerVariant) => void;
  previewRoute: string;
  setPreviewRoute: (next: string) => void;
  composerOpen: boolean;
  setComposerOpen: (next: boolean) => void;
  logMenuOpen: boolean;
  setLogMenuOpen: (next: boolean) => void;
  pendingCoachMessage: string | null;
  setPendingCoachMessage: (next: string | null) => void;
};

const UiVariantContext = createContext<UiVariantContextValue | null>(null);

export function UiVariantProvider({ children }: { children: ReactNode }) {
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>("whoop");
  const [coachVariant, setCoachVariant] = useState<CoachUiVariant>("chat");
  const [checkInPicker, setCheckInPicker] = useState<CheckInPickerVariant>("2");
  const [previewRoute, setPreviewRoute] = useState("index");
  const [composerOpen, setComposerOpen] = useState(false);
  const [logMenuOpen, setLogMenuOpen] = useState(false);
  const [pendingCoachMessage, setPendingCoachMessage] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      layoutVariant,
      setLayoutVariant,
      coachVariant,
      setCoachVariant,
      checkInPicker,
      setCheckInPicker,
      previewRoute,
      setPreviewRoute,
      composerOpen,
      setComposerOpen,
      logMenuOpen,
      setLogMenuOpen,
      pendingCoachMessage,
      setPendingCoachMessage,
    }),
    [layoutVariant, coachVariant, checkInPicker, previewRoute, composerOpen, logMenuOpen, pendingCoachMessage],
  );

  return <UiVariantContext.Provider value={value}>{children}</UiVariantContext.Provider>;
}

export function useUiVariant() {
  const ctx = useContext(UiVariantContext);
  if (!ctx) throw new Error("useUiVariant must be used within UiVariantProvider");
  return ctx;
}
