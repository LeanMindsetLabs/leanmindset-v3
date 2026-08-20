import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ALL_GENDERS } from "@/src/content/onboarding";
import { range } from "@/src/lib/onboardingMath";
import { InPhoneModal } from "@/src/layout/PhoneOverlay";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { spacing } from "@/src/theme/spacing";
import OnboardingWheel from "@/src/ui/onboarding/OnboardingWheel";
import { UnitToggle } from "@/src/ui/onboarding/OnboardingChrome";

export type BasicsModal = "gender" | "age" | "height" | "weight" | null;

type OnboardingBasicsModalProps = {
  modal: BasicsModal;
  gender: string;
  age: number;
  heightCm: number;
  heightUnit: "cm" | "in";
  weightKg: number;
  weightUnit: "kg" | "lb";
  onClose: () => void;
  onSaveGender: (value: string) => void;
  onSaveAge: (value: number) => void;
  onSaveHeight: (cm: number, unit: "cm" | "in") => void;
  onSaveWeight: (kg: number, unit: "kg" | "lb") => void;
};

export default function OnboardingBasicsModal({
  modal,
  gender,
  age,
  heightCm,
  heightUnit,
  weightKg,
  weightUnit,
  onClose,
  onSaveGender,
  onSaveAge,
  onSaveHeight,
  onSaveWeight,
}: OnboardingBasicsModalProps) {
  const insets = useSafeAreaInsets();
  const [draftGender, setDraftGender] = useState(gender);
  const [draftAge, setDraftAge] = useState(String(age));
  const [draftHeightUnit, setDraftHeightUnit] = useState(heightUnit);
  const [draftHeight, setDraftHeight] = useState(
    heightUnit === "cm" ? String(Math.round(heightCm)) : String(Math.round(heightCm / 2.54)),
  );
  const [draftWeightUnit, setDraftWeightUnit] = useState(weightUnit);
  const [draftWeight, setDraftWeight] = useState(
    weightUnit === "kg" ? String(Math.round(weightKg)) : String(Math.round(weightKg * 2.2046)),
  );

  const ages = useMemo(() => range(18, 80).map(String), []);
  const heights = useMemo(
    () => (draftHeightUnit === "cm" ? range(140, 210) : range(54, 84)).map(String),
    [draftHeightUnit],
  );
  const weights = useMemo(
    () => (draftWeightUnit === "kg" ? range(40, 160) : range(90, 360)).map(String),
    [draftWeightUnit],
  );

  useEffect(() => {
    if (!modal) return;
    setDraftGender(gender);
    setDraftAge(String(age));
    setDraftHeightUnit(heightUnit);
    setDraftHeight(heightUnit === "cm" ? String(Math.round(heightCm)) : String(Math.round(heightCm / 2.54)));
    setDraftWeightUnit(weightUnit);
    setDraftWeight(weightUnit === "kg" ? String(Math.round(weightKg)) : String(Math.round(weightKg * 2.2046)));
  }, [modal, gender, age, heightCm, heightUnit, weightKg, weightUnit]);

  const titles: Record<Exclude<BasicsModal, null>, string> = {
    gender: "Gender",
    age: "Age",
    height: "Height",
    weight: "Current weight",
  };

  function save() {
    if (modal === "gender") onSaveGender(draftGender);
    if (modal === "age") onSaveAge(Number(draftAge));
    if (modal === "height") {
      const numeric = Number(draftHeight);
      onSaveHeight(draftHeightUnit === "cm" ? numeric : numeric * 2.54, draftHeightUnit);
    }
    if (modal === "weight") {
      const numeric = Number(draftWeight);
      onSaveWeight(draftWeightUnit === "kg" ? numeric : numeric / 2.2046, draftWeightUnit);
    }
    onClose();
  }

  return (
    <InPhoneModal visible={modal !== null}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 12) }]} onPress={(event) => event.stopPropagation()}>
          <Text style={styles.title}>{modal ? titles[modal] : ""}</Text>

          {modal === "gender" ? (
            <View style={styles.list}>
              {ALL_GENDERS.map((item) => (
                <Pressable key={item} onPress={() => setDraftGender(item)} style={styles.radioRow} accessibilityRole="radio" accessibilityState={{ selected: draftGender === item }}>
                  <Text style={styles.radioLabel}>{item}</Text>
                  <View style={[styles.radio, draftGender === item && styles.radioOn]}>
                    {draftGender === item ? <View style={styles.radioDot} /> : null}
                  </View>
                </Pressable>
              ))}
            </View>
          ) : null}

          {modal === "age" ? (
            <View style={styles.wheelBox}>
              <OnboardingWheel values={ages} value={draftAge} onChange={setDraftAge} />
            </View>
          ) : null}

          {modal === "height" ? (
            <View style={styles.wheelBlock}>
              <UnitToggle options={["cm", "ft"]} value={draftHeightUnit === "cm" ? "cm" : "ft"} onChange={(next) => setDraftHeightUnit(next === "cm" ? "cm" : "in")} />
              <View style={styles.wheelBox}>
                <OnboardingWheel values={heights} value={draftHeight} onChange={setDraftHeight} />
              </View>
            </View>
          ) : null}

          {modal === "weight" ? (
            <View style={styles.wheelBlock}>
              <UnitToggle options={["kg", "lbs"]} value={draftWeightUnit === "kg" ? "kg" : "lbs"} onChange={(next) => setDraftWeightUnit(next === "kg" ? "kg" : "lb")} />
              <View style={styles.wheelBox}>
                <OnboardingWheel values={weights} value={draftWeight} onChange={setDraftWeight} />
              </View>
            </View>
          ) : null}

          <View style={styles.actions}>
            <Pressable onPress={onClose} accessibilityRole="button" style={styles.actionBtn}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
            <Pressable onPress={save} accessibilityRole="button" style={styles.actionBtn}>
              <Text style={styles.done}>Done</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </InPhoneModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#121417",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    minHeight: 360,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
    letterSpacing: 0.4,
  },
  list: { gap: 2 },
  radioRow: {
    minHeight: layout.minTouchTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  radioLabel: { fontSize: 15, color: colors.white },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOn: { borderColor: colors.accentBlue },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accentBlue },
  wheelBlock: { gap: spacing.md },
  wheelBox: { height: 180, alignSelf: "stretch" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.sm,
  },
  actionBtn: { minHeight: layout.minTouchTarget, justifyContent: "center", paddingHorizontal: spacing.sm },
  cancel: { fontSize: 16, color: colors.white },
  done: { fontSize: 16, fontWeight: "700", color: colors.accentBlue },
});
