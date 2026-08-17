import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useUiVariant } from "@/src/context/UiVariantContext";
import { defaultReadiness } from "@/src/services/readinessService";
import { walkCoreA, walkMobility } from "@/src/services/trainService";
import { colors } from "@/src/theme/colors";
import BlueCta from "@/src/ui/BlueCta";
import InsightCard from "@/src/ui/InsightCard";
import MetricRing from "@/src/ui/MetricRing";

export default function TodayScreen() {
  const { layoutVariant } = useUiVariant();
  const data = defaultReadiness;

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {layoutVariant === "whoop" ? <WhoopToday /> : <ClassicToday data={data} />}
      </ScrollView>
    </SafeAreaView>
  );
}

function ClassicToday({ data }: { data: typeof defaultReadiness }) {
  return (
    <>
      <Text style={styles.kicker}>TODAY</Text>
      <Text style={styles.title}>Readiness</Text>
      <View style={styles.hero}>
        <MetricRing size={110} strokeWidth={9} progress={data.score / 100} fillColor="#19E68C">
          <Text style={styles.heroNum}>{data.score}</Text>
        </MetricRing>
        <View style={styles.flex}>
          <Text style={styles.heroTitle}>{data.headline}</Text>
          <Text style={styles.heroCopy}>{data.copy.replace("\n", " ")}</Text>
          <Text style={styles.signals}>
            {data.signals.map((s) => s.label).join(" · ")}
          </Text>
        </View>
      </View>

      <Text style={styles.section}>Readiness breakdown</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.metrics}>
        {data.metrics.map((metric) => (
          <View key={metric.id} style={styles.metricCard}>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={[styles.metricStatus, { color: metric.statusColor }]}>{metric.status}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.planCard}>
        <Text style={styles.planH}>Recommended plan</Text>
        <Pressable
          style={({ hovered, pressed }) => [
            styles.planRow,
            styles.planRowEm,
            (hovered || pressed) && styles.planRowHover,
          ]}
          onPress={() => router.push("/workout")}
        >
          <Text style={[styles.planEyebrow, styles.planEyebrowEm]}>Best choice today</Text>
          <Text style={styles.planTitle}>{walkCoreA.title}</Text>
          <Text style={styles.planMeta}>25–30 min · Beginner · NEAT + midline</Text>
        </Pressable>
        <Pressable
          style={({ hovered, pressed }) => [styles.planRow, (hovered || pressed) && styles.planRowHover]}
          onPress={() => router.push("/workout")}
        >
          <Text style={styles.planEyebrow}>If you want lighter</Text>
          <Text style={styles.planTitle}>{walkMobility.title}</Text>
          <Text style={styles.planMeta}>20 min · Easy · Recovery focus</Text>
        </Pressable>
      </View>

      <InsightCard
        title="Why this score?"
        body={data.reasons.map((r) => r.text).join(" ")}
        cta="View details"
      />
      <BlueCta label="Continue with today's plan" onPress={() => router.push("/workout")} />
    </>
  );
}

function WhoopToday() {
  const [lens, setLens] = useState<"ready" | "fuel" | "train">("ready");
  const data = defaultReadiness;

  return (
    <>
      <View style={styles.whoopTabs}>
        {(["ready", "fuel", "train"] as const).map((id) => (
          <Pressable key={id} onPress={() => setLens(id)} style={styles.whoopTab}>
            <Text style={[styles.whoopTabText, lens === id && styles.whoopTabActive]}>{id.toUpperCase()}</Text>
            {lens === id ? <View style={styles.whoopTabLine} /> : null}
          </Pressable>
        ))}
      </View>

      {lens === "ready" ? (
        <>
          <View style={styles.whoopHero}>
            <MetricRing size={196} strokeWidth={8} progress={0.72} fillColor="#F5C400">
              <Text style={styles.whoopCap}>READY</Text>
              <Text style={styles.whoopBig}>72%</Text>
            </MetricRing>
          </View>
          <View style={styles.pills}>
            <View style={styles.pill}>
              <Text style={[styles.pillStrong, { color: "#7EB6FF" }]}>7h 12m</Text>
              <Text style={styles.pillEm}>SLEEP</Text>
            </View>
            <View style={styles.pill}>
              <Text style={[styles.pillStrong, { color: "#19E68C" }]}>7h 40m</Text>
              <Text style={[styles.pillEm, { color: "#19E68C" }]}>SLEEP NEED</Text>
            </View>
          </View>
          <View style={styles.rows}>
            {data.metrics.map((metric) => (
              <View key={metric.id} style={styles.row}>
                <Text style={styles.rowLabel}>{metric.label.toUpperCase()}</Text>
                <Text style={styles.rowValue}>{metric.value}</Text>
              </View>
            ))}
          </View>
          <InsightCard
            title="Moderate day"
            body="Your body can take a moderate day. Keep protein high and finish Walk + Core A."
            cta="View plan"
          />
        </>
      ) : lens === "fuel" ? (
        <>
          <View style={styles.whoopHero}>
            <MetricRing size={196} strokeWidth={8} progress={0.78} fillColor="#7EB6FF">
              <Text style={styles.whoopCap}>FUEL</Text>
              <Text style={styles.whoopBig}>78%</Text>
            </MetricRing>
          </View>
          <View style={styles.pills}>
            <View style={styles.pill}>
              <Text style={[styles.pillStrong, { color: "#19E68C" }]}>94g</Text>
              <Text style={[styles.pillEm, { color: "#19E68C" }]}>PROTEIN</Text>
            </View>
            <View style={styles.pill}>
              <Text style={[styles.pillStrong, { color: "#7EB6FF" }]}>1:00</Text>
              <Text style={styles.pillEm}>NEXT MEAL</Text>
            </View>
          </View>
          <BlueCta label="Log meal" onPress={() => router.push("/(tabs)/meals")} />
        </>
      ) : (
        <>
          <View style={styles.whoopHero}>
            <MetricRing size={196} strokeWidth={8} progress={8.4 / 14} fillColor="#3D7BFF">
              <Text style={styles.whoopCap}>TRAIN</Text>
              <Text style={styles.whoopBig}>8.4</Text>
            </MetricRing>
          </View>
          <InsightCard
            title="Walk + Core A"
            body="Target 14.0. Ready is yellow, so keep this session easy and finish it."
            cta="View session"
          />
          <BlueCta label="Start session" onPress={() => router.push("/workout")} />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24 },
  toggleBar: { alignItems: "flex-end", marginBottom: 8 },
  flex: { flex: 1, minWidth: 0 },
  kicker: { fontSize: 11, letterSpacing: 1.6, color: "#8e8e93", fontWeight: "700" },
  title: { fontSize: 24, fontWeight: "700", color: colors.white, marginBottom: 12 },
  hero: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#222529", borderRadius: 18, padding: 14, marginBottom: 16 },
  heroNum: { color: colors.white, fontSize: 26, fontWeight: "700" },
  heroTitle: { fontSize: 17, fontWeight: "700", color: colors.white },
  heroCopy: { marginTop: 4, fontSize: 13, color: "#8e8e93" },
  signals: { marginTop: 8, fontSize: 12, color: "#8e8e93" },
  section: { fontSize: 12, fontWeight: "600", color: colors.white, marginBottom: 8 },
  metrics: { gap: 8, paddingBottom: 12 },
  metricCard: { width: 108, backgroundColor: "#222529", borderRadius: 14, padding: 10 },
  metricLabel: { fontSize: 11, color: "#8e8e93" },
  metricValue: { marginTop: 6, fontSize: 16, fontWeight: "700", color: colors.white },
  metricStatus: { marginTop: 4, fontSize: 11, fontWeight: "600" },
  planCard: { backgroundColor: "#222529", borderRadius: 16, padding: 12, marginBottom: 12 },
  planH: { fontSize: 17, fontWeight: "700", color: colors.white, marginBottom: 10 },
  planRow: {
    backgroundColor: "#2d3136",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "transparent",
    outlineWidth: 0,
  },
  planRowEm: { marginBottom: 8 },
  planRowHover: { borderColor: "#3d7bff" },
  planEyebrow: { fontSize: 11, color: "#8e8e93", marginBottom: 4 },
  planEyebrowEm: { color: "#7EABFF" },
  planTitle: { fontSize: 16, fontWeight: "700", color: colors.white },
  planMeta: { marginTop: 2, fontSize: 13, color: "#8e8e93" },
  whoopTabs: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.08)", marginBottom: 16 },
  whoopTab: { flex: 1, alignItems: "center", paddingBottom: 10 },
  whoopTabText: { fontSize: 11, fontWeight: "700", letterSpacing: 1.4, color: "#636366" },
  whoopTabActive: { color: colors.white },
  whoopTabLine: { position: "absolute", bottom: 0, height: 2, width: "70%", backgroundColor: colors.white },
  whoopHero: { alignItems: "center", marginBottom: 18 },
  whoopCap: { letterSpacing: 2.2, color: "#8e8e93", fontSize: 11, fontWeight: "700" },
  whoopBig: { color: colors.white, fontSize: 42, fontWeight: "400" },
  pills: { flexDirection: "row", gap: 10, marginBottom: 16 },
  pill: { flex: 1, backgroundColor: "#222529", borderRadius: 16, padding: 14, alignItems: "center" },
  pillStrong: { fontSize: 28, fontWeight: "500", color: colors.white },
  pillEm: {
    marginTop: 8, fontSize: 10, letterSpacing: 1.2, color: "#8e8e93",
    borderWidth: 1, borderColor: "#8e8e93", borderRadius: 999, paddingVertical: 4, paddingHorizontal: 8,
  },
  rows: { backgroundColor: "#222529", borderRadius: 16, padding: 8, marginBottom: 14 },
  row: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#2d3136", borderRadius: 10, marginBottom: 8 },
  rowLabel: { flex: 1, fontSize: 11, letterSpacing: 0.8, color: "#8e8e93", fontWeight: "700" },
  rowValue: { fontSize: 14, color: colors.white, fontWeight: "600" },
});
