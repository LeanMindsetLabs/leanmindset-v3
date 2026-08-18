import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useUiVariant } from "@/src/context/UiVariantContext";
import { useWorkoutRuntime } from "@/src/hooks/useWorkoutRuntime";
import { trainPhoto } from "@/src/lib/media";
import { markWorkoutDone, startSession } from "@/src/services/workoutSessionService";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import BlueCta from "@/src/ui/BlueCta";
import InsightCard from "@/src/ui/InsightCard";
import MetricRing from "@/src/ui/MetricRing";
import SecondaryButton from "@/src/ui/SecondaryButton";

export default function TrainScreen() {
  const { layoutVariant } = useUiVariant();
  const runtime = useWorkoutRuntime();
  const [loading, setLoading] = useState(false);

  function openSession() {
    if (runtime.session.completed) return;
    setLoading(true);
    setTimeout(() => {
      startSession();
      setLoading(false);
      router.push("/workout");
    }, 220);
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {layoutVariant === "whoop" ? (
          <>
            <View style={styles.hero}>
              <MetricRing size={196} strokeWidth={8} progress={8.4 / 14} fillColor="#3D7BFF">
                <Text style={styles.cap}>LOAD</Text>
                <Text style={styles.big}>8.4</Text>
              </MetricRing>
            </View>
            <View style={styles.rows}>
              <Row label="SESSION" value={runtime.session.title ?? "Walk + Core A"} />
              <Row label="TARGET" value="14.0" />
              <Row label="DURATION" value="25 min" />
            </View>
            <InsightCard
              title="Keep this session easy"
              body="Ready is yellow, so stay in the target zone and finish Walk + Core A."
              cta="View session"
            />
            <BlueCta
              label={runtime.session.inProgress ? "Resume session" : "Start session"}
              disabled={runtime.session.completed || loading}
              onPress={openSession}
            />
          </>
        ) : (
          <>
            <Text style={styles.title}>Train</Text>
            <View style={styles.card}>
              <View style={styles.sessionRow}>
                <View style={styles.flex}>
                  <Text style={styles.cardH}>{runtime.session.title}</Text>
                  <Text style={styles.meta}>{runtime.session.durationMin}–{runtime.session.durationMax} min · {runtime.session.difficulty}</Text>
                  <Text style={styles.meta}>{runtime.session.tags.join(" · ")}</Text>
                </View>
                {trainPhoto(runtime.session.illustration) ? (
                  <Image source={trainPhoto(runtime.session.illustration)} style={styles.sessionArt} contentFit="contain" />
                ) : null}
              </View>
            </View>
            <BlueCta
              label={runtime.session.inProgress ? "Resume session" : "Start session"}
              disabled={runtime.session.completed || loading}
              onPress={openSession}
            />
            <SecondaryButton
              label={runtime.session.completed ? "Completed ✓" : "Mark as done"}
              disabled={runtime.session.completed}
              onPress={markWorkoutDone}
            />
            <View style={styles.card}>
              <Text style={styles.cardH}>Training adherence</Text>
              <View style={styles.week}>
                {runtime.week.map((day) => (
                  <View key={day.date} style={styles.day}>
                    <View style={[styles.bar, day.completed && styles.barDone]} />
                    <Text style={styles.dayLabel}>{day.dayLabel}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: layout.tabBarContentInset, gap: 12 },
  toggleBar: { alignItems: "flex-end" },
  hero: { alignItems: "center", marginVertical: 8 },
  cap: { letterSpacing: 2, color: "#8e8e93", fontSize: 11, fontWeight: "700" },
  big: { color: colors.white, fontSize: 42, fontWeight: "400" },
  rows: { backgroundColor: "#222529", borderRadius: 16, padding: 8 },
  row: { flexDirection: "row", padding: 10, backgroundColor: "#2d3136", borderRadius: 10, marginBottom: 8 },
  rowLabel: { flex: 1, color: "#8e8e93", fontSize: 11, fontWeight: "700", letterSpacing: 0.8 },
  rowValue: { color: colors.white, fontSize: 14, fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "700", color: colors.white },
  flex: { flex: 1, minWidth: 0 },
  sessionRow: { flexDirection: "row", alignItems: "flex-end", gap: 10 },
  sessionArt: { width: 120, height: 110 },
  card: { backgroundColor: "#222529", borderRadius: 16, padding: 14, gap: 6 },
  cardH: { color: colors.white, fontSize: 17, fontWeight: "700" },
  meta: { color: "#8e8e93", fontSize: 13 },
  week: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", height: 78, marginTop: 8 },
  day: { alignItems: "center", gap: 6, flex: 1 },
  bar: { width: 10, height: 28, borderRadius: 6, backgroundColor: "#2c2c2e" },
  barDone: { height: 54, backgroundColor: "#19e68c" },
  dayLabel: { color: "#8e8e93", fontSize: 10 },
});
