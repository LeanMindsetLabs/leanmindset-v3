import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMealsLog } from "@/src/context/MealsLogContext";
import type { MealLogId } from "@/src/services/mealsLogService";
import { colors } from "@/src/theme/colors";
import AppScreen from "@/src/layout/AppScreen";
import LogMealSheet from "@/src/ui/LogMealSheet";
import MetricRing from "@/src/ui/MetricRing";

type Props = {
  onOpenCheckIn: () => void;
  onOpenGrocery?: () => void;
};

export default function MealsLogView({ onOpenCheckIn, onOpenGrocery }: Props) {
  const { meals, saveMealLog } = useMealsLog();
  const [logMealId, setLogMealId] = useState<MealLogId | null>(null);
  const loggedCount = meals.filter((m) => m.logged).length;
  const activeMeal = meals.find((m) => m.id === logMealId) ?? null;

  return (
    <AppScreen edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Meals Log</Text>
          <Text style={styles.sub}>Today · your meal plan</Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.outline} onPress={() => setLogMealId("breakfast")}>
            <Text style={styles.outlineText}>+ Log a meal</Text>
          </Pressable>
          <Pressable style={styles.outline} onPress={onOpenGrocery}>
            <Text style={styles.outlineText}>Grocery list →</Text>
          </Pressable>
        </View>

        <View style={styles.fuel}>
          <MetricRing size={72} strokeWidth={7} progress={0.73} fillColor={colors.accentBlue}>
            <Text style={styles.fuelKcal}>1,600{"\n"}<Text style={styles.fuelSmall}>kcal</Text></Text>
          </MetricRing>
          <View style={styles.fuelDetails}>
            <Text style={styles.fuelTarget}>TARGET 2,200 KCAL</Text>
            <Text style={styles.fuelCopy}>Room left in today's fuel budget.</Text>
            <Macro label="Protein" width="56%" value="79/140g" color={colors.accentBlue} />
            <Macro label="Fat" width="48%" value="31/65g" color="#F5A623" />
            <Macro label="Carbs" width="69%" value="125/180g" color={colors.accentBlue} />
          </View>
        </View>

        <View style={styles.stats}>
          <View style={[styles.card, styles.compact]}>
            <MetricRing size={48} strokeWidth={5} progress={0.4} fillColor={colors.accentBlue}>
              <Text style={styles.smRing}>2/5</Text>
            </MetricRing>
            <View>
              <Text style={styles.eyebrow}>Next meal</Text>
              <Text style={styles.cardTitle}>Breakfast</Text>
              <Text style={styles.cardSub}>8:00 AM · Water 66%</Text>
            </View>
          </View>
          <View style={[styles.card, styles.compact]}>
            <View style={styles.score}>
              <Text style={styles.scoreText}>84</Text>
            </View>
            <View>
              <Text style={styles.eyebrow}>Recovery</Text>
              <Text style={styles.cardTitle}>7h 10m</Text>
              <Text style={styles.cardSub}>Wind-down 22:30</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Today's meals</Text>
            <Text style={styles.tag}>
              {loggedCount}/{meals.length} logged
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hscroll}>
            {meals.map((m) => (
              <View key={m.id} style={[styles.mealCard, m.logged && styles.mealDone]}>
                <View style={[styles.mealCheck, !m.logged && styles.mealPending]}>
                  {m.logged ? <Text style={styles.checkMark}>✓</Text> : null}
                </View>
                <View>
                  <Text style={styles.mealName}>{m.name}</Text>
                  <Text style={styles.mealDesc}>{m.desc}</Text>
                </View>
                <View style={styles.mealFoot}>
                  <Text style={styles.mealTime}>{m.time}</Text>
                  <Pressable
                    style={[styles.pill, m.logged ? styles.pillEdit : styles.pillLog]}
                    onPress={() => setLogMealId(m.id)}
                  >
                    <Text style={[styles.pillText, m.logged ? styles.pillEditText : styles.pillLogText]}>
                      {m.logged ? "Edit" : "Log"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <Pressable style={styles.checkinCta} onPress={onOpenCheckIn}>
          <Text style={styles.outlineText}>Send meals in daily check-in →</Text>
        </Pressable>
      </ScrollView>

      {activeMeal ? (
        <LogMealSheet
          mealName={activeMeal.name}
          mealTime={activeMeal.time}
          onClose={() => setLogMealId(null)}
          onSave={(summary) => {
            saveMealLog(activeMeal.id, summary);
            setLogMealId(null);
          }}
        />
      ) : null}
    </AppScreen>
  );
}

function Macro({
  label,
  width,
  value,
  color,
}: {
  label: string;
  width: `${number}%`;
  value: string;
  color: string;
}) {
  return (
    <View style={styles.macro}>
      <Text style={styles.macroLabel}>{label}</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width, backgroundColor: color }]} />
      </View>
      <Text style={styles.macroVal}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { gap: 10, paddingBottom: 18 },
  title: { fontSize: 19, fontWeight: "800", letterSpacing: -0.3, color: colors.white },
  sub: { marginTop: 2, fontSize: 12, fontWeight: "600", color: "#8EA0B8" },
  actions: { flexDirection: "row", gap: 10 },
  outline: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },
  outlineText: { color: colors.metricBlueSoft, fontSize: 12.5, fontWeight: "700" },
  fuel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  fuelKcal: { color: colors.white, fontSize: 13, fontWeight: "800", textAlign: "center", lineHeight: 15 },
  fuelSmall: { fontSize: 10, fontWeight: "600", color: "#8EA0B8" },
  fuelDetails: { flex: 1, minWidth: 0, gap: 5 },
  fuelTarget: { fontSize: 9.5, fontWeight: "700", letterSpacing: 0.6, color: colors.metricBlueSoft },
  fuelCopy: { fontSize: 11, color: "#8EA0B8", marginBottom: 2 },
  macro: { flexDirection: "row", alignItems: "center", gap: 7 },
  macroLabel: { width: 36, fontSize: 10, color: "#8EA0B8", fontWeight: "600" },
  macroVal: { width: 56, textAlign: "right", fontSize: 10, color: "#F5F7FB", fontWeight: "600" },
  bar: { flex: 1, height: 5, borderRadius: 6, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 6 },
  stats: { flexDirection: "row", gap: 10 },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 12,
  },
  compact: { flexDirection: "row", alignItems: "center", gap: 10 },
  eyebrow: { fontSize: 10, fontWeight: "700", letterSpacing: 0.6, textTransform: "uppercase", color: colors.metricBlueSoft },
  cardTitle: { fontSize: 13.5, fontWeight: "800", color: colors.white },
  cardSub: { fontSize: 10.5, color: "#8EA0B8", fontWeight: "500" },
  smRing: { color: colors.white, fontSize: 12, fontWeight: "800" },
  score: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(34,197,94,0.14)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: { color: "#35D07F", fontWeight: "800", fontSize: 15 },
  sectionHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  sectionTitle: { fontSize: 14, fontWeight: "800", color: colors.white },
  tag: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.metricBlueSoft,
    backgroundColor: "rgba(47,111,237,0.16)",
    borderWidth: 1,
    borderColor: "rgba(47,111,237,0.28)",
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  hscroll: { gap: 10 },
  mealCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 14,
    width: 140,
    height: 128,
    justifyContent: "space-between",
  },
  mealDone: { borderColor: "rgba(47,111,237,0.4)" },
  mealCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  mealPending: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  checkMark: { color: colors.white, fontSize: 12, fontWeight: "700" },
  mealName: { fontSize: 13.5, fontWeight: "800", color: colors.white },
  mealDesc: { fontSize: 10.5, color: "#8EA0B8", marginTop: 1 },
  mealFoot: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  mealTime: { fontSize: 10, color: "#8EA0B8", fontWeight: "600" },
  pill: { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4 },
  pillLog: { backgroundColor: "rgba(47,111,237,0.18)" },
  pillEdit: { backgroundColor: "rgba(255,255,255,0.06)" },
  pillText: { fontSize: 9.5, fontWeight: "700" },
  pillLogText: { color: colors.metricBlueSoft },
  pillEditText: { color: "#8EA0B8" },
  checkinCta: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },
});
