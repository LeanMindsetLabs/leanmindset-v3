import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AppTextInput from "@/src/ui/AppTextInput";
import { useMealsLog } from "@/src/context/MealsLogContext";
import AppScreen from "@/src/layout/AppScreen";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import CheckInSelect from "@/src/ui/CheckInSelect";

const YESTERDAY_LB = 178.9;
const START_LB = 191.4;
const MOODS = ["Rough", "Ok", "Good", "Great"] as const;
const SLEEP_QUALITY = ["Poor", "Fair", "Good", "Great"] as const;

type Props = {
  onOpenMealsLog: () => void;
};

export default function DailyCheckIn({ onOpenMealsLog }: Props) {
  const { meals } = useMealsLog();
  const [weightText, setWeightText] = useState("178.4");
  const [mood, setMood] = useState<(typeof MOODS)[number]>("Ok");
  const [waterL, setWaterL] = useState("3");
  const [sleepHrs, setSleepHrs] = useState("7");
  const [sleepQuality, setSleepQuality] = useState<(typeof SLEEP_QUALITY)[number]>("Good");
  const [bm, setBm] = useState("1");
  const [exerciseHrs, setExerciseHrs] = useState("1");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  const weight = useMemo(() => {
    const n = Number.parseFloat(weightText);
    return Number.isFinite(n) ? n : null;
  }, [weightText]);
  const changeToday = weight == null ? null : +(weight - YESTERDAY_LB).toFixed(1);
  const lostTotal = weight == null ? null : +(START_LB - weight).toFixed(1);

  return (
    <AppScreen edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.title}>Daily check-in</Text>
          <Text style={styles.sub}>Summer Lab</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.sheetLabel}>
            <Text style={styles.eyebrowMuted}>Started</Text>
            <Text style={styles.day}>Day 12th of 42 · Mon, Aug 3</Text>
          </View>
          <Text style={styles.inputLabel}>
            Weight <Text style={styles.muted}>(enter today)</Text>
          </Text>
          <View style={styles.weightBox}>
            <AppTextInput
              value={weightText}
              onChangeText={setWeightText}
              keyboardType="decimal-pad"
              style={styles.weightInput}
              accessibilityLabel="Today's weight in pounds"
            />
            <Text style={styles.lb}>lb</Text>
          </View>
          <View style={styles.kv}>
            <Kv label="Yesterday" value={`${YESTERDAY_LB.toFixed(1)} lb`} />
            <Kv
              label="Change"
              value={
                changeToday == null ? "-" : `${changeToday > 0 ? "+" : ""}${changeToday.toFixed(1)} lb`
              }
              tone={changeToday == null ? "calc" : changeToday < 0 ? "down" : changeToday > 0 ? "up" : "calc"}
            />
            <Kv label="Total Lost" value={lostTotal == null ? "-" : `${lostTotal.toFixed(1)} lb`} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.eyebrowMuted}>Today</Text>
          <View style={styles.ddRow4}>
            <CheckInSelect
              label="Mood"
              value={mood}
              onChange={(v) => setMood(v as (typeof MOODS)[number])}
              options={MOODS.map((m) => ({ value: m, label: m }))}
            />
            <CheckInSelect
              label="Water"
              value={waterL}
              onChange={setWaterL}
              options={["1", "1.5", "2", "2.5", "3", "3.5", "4"].map((v) => ({ value: v, label: `${v} L` }))}
            />
            <CheckInSelect
              label="BM"
              value={bm}
              onChange={setBm}
              options={["0", "1", "2", "3", "4"].map((v) => ({ value: v, label: `${v}×` }))}
            />
            <CheckInSelect
              label="Exercise"
              value={exerciseHrs}
              onChange={setExerciseHrs}
              options={["0", "0.5", "1", "1.5", "2"].map((v) => ({ value: v, label: `${v} hr` }))}
            />
          </View>
          <View style={styles.ddRow2}>
            <CheckInSelect
              label="Sleep · hours"
              value={sleepHrs}
              onChange={setSleepHrs}
              options={["5", "6", "6.5", "7", "7.5", "8", "9"].map((h) => ({ value: h, label: `${h} hrs` }))}
            />
            <CheckInSelect
              label="Sleep · quality"
              value={sleepQuality}
              onChange={(v) => setSleepQuality(v as (typeof SLEEP_QUALITY)[number])}
              options={SLEEP_QUALITY.map((q) => ({ value: q, label: q }))}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sheetLabel}>
            <Text style={styles.eyebrowMuted}>Food log</Text>
            <Pressable onPress={onOpenMealsLog}>
              <Text style={styles.link}>Meals Log →</Text>
            </Pressable>
          </View>
          {meals.map((m) => (
            <View key={`${m.name}-${m.time}`} style={styles.foodRow}>
              <Text style={styles.foodMeal}>{m.name}</Text>
              <Text style={[styles.foodItems, !m.logged && styles.foodEmpty]}>
                {m.logged ? (m.itemsSummary ?? "Logged · open Meals Log to edit") : "Not logged yet"}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.eyebrowMuted}>Notes</Text>
          <AppTextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Notes for your coach..."
            placeholderTextColor="#6E7D92"
            style={styles.notes}
            multiline
          />
        </View>

        <Pressable style={styles.send} onPress={() => setSent(true)}>
          <Text style={styles.sendText}>{sent ? "Check-in sent" : "Send check-in"}</Text>
        </Pressable>
      </ScrollView>
    </AppScreen>
  );
}

function Kv({ label, value, tone = "calc" }: { label: string; value: string; tone?: "calc" | "down" | "up" }) {
  const color = tone === "down" ? "#35D07F" : tone === "up" ? "#F5A623" : "#8EA0B8";
  return (
    <View style={styles.kvRow}>
      <Text style={styles.kvLabel}>{label}</Text>
      <Text style={[styles.kvVal, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { gap: 10, paddingBottom: layout.tabBarContentInset },
  title: { fontSize: 19, fontWeight: "800", letterSpacing: -0.3, color: colors.white },
  sub: { marginTop: 2, fontSize: 12, fontWeight: "600", color: "#8EA0B8" },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  sheetLabel: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  eyebrowMuted: { fontSize: 10, fontWeight: "700", letterSpacing: 0.4, textTransform: "uppercase", color: "#6E7D92" },
  day: { fontSize: 11, fontWeight: "700", color: "#8EA0B8" },
  inputLabel: { fontSize: 11, fontWeight: "700", color: "#8EA0B8" },
  muted: { fontSize: 10.5, fontWeight: "600", color: "#6E7D92" },
  weightBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  weightInput: { flex: 1, fontSize: 17, fontWeight: "800", color: colors.white },
  lb: { fontSize: 12, fontWeight: "700", color: "#6E7D92" },
  kv: {
    flexDirection: "row",
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },
  kvRow: { flex: 1, alignItems: "center", gap: 3 },
  kvLabel: { color: "#6E7D92", fontWeight: "600", fontSize: 9.5, letterSpacing: 0.3, textTransform: "uppercase" },
  kvVal: { fontSize: 13, fontWeight: "800" },
  ddRow4: { flexDirection: "row", gap: 8 },
  ddRow2: { flexDirection: "row", gap: 8 },
  link: { color: colors.metricBlueSoft, fontSize: 11, fontWeight: "700" },
  foodRow: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  foodMeal: { width: 72, fontSize: 11, fontWeight: "800", color: colors.white },
  foodItems: { flex: 1, fontSize: 11, fontWeight: "600", color: "#8E8E93", lineHeight: 15 },
  foodEmpty: { color: "#6E7D92", fontStyle: "italic" },
  notes: {
    minHeight: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "rgba(0,0,0,0.28)",
    color: colors.white,
    padding: 12,
    fontSize: 13,
    fontWeight: "600",
  },
  send: {
    borderRadius: 14,
    paddingVertical: 13,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
  },
  sendText: { color: colors.white, fontSize: 14, fontWeight: "800" },
});
