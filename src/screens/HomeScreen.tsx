import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUiVariant } from "@/src/context/UiVariantContext";
import { homeContent as content } from "@/src/services/homeContent";
import { colors } from "@/src/theme/colors";
import BlueCta from "@/src/ui/BlueCta";
import InsightCard from "@/src/ui/InsightCard";
import HomeHeroChart from "@/src/ui/HomeHeroChart";
import { LeanMindsetWordmark } from "@/src/ui/LeanMindsetBrand";
import MetricRing from "@/src/ui/MetricRing";

export default function HomeScreen() {
  const { layoutVariant } = useUiVariant();

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <View style={styles.atmosphere} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {layoutVariant === "whoop" ? <WhoopHome /> : <ClassicHome />}
      </ScrollView>
    </SafeAreaView>
  );
}

function Avatar() {
  return (
    <View style={styles.avatar} accessibilityLabel="Profile avatar">
      <Text style={styles.avatarText}>{content.avatarInitial}</Text>
      <View style={styles.online} />
    </View>
  );
}

function WhoopHome() {
  const { homeHeader } = useUiVariant();

  return (
    <>
      {homeHeader === "greeting" ? (
        <>
          <View style={styles.greetTop}>
            <Pressable style={styles.iconBtn} accessibilityLabel="Notifications">
              <Ionicons name="notifications-outline" size={22} color={colors.white} />
            </Pressable>
            <LeanMindsetWordmark size={20} style={styles.greetBrand} />
            <Avatar />
          </View>
          <Text style={styles.greetTitle}>{content.greeting}</Text>
          <Text style={styles.greetSub}>{content.whoopSubgreeting}</Text>
        </>
      ) : (
        <>
          <View style={styles.whoopTop}>
            <Avatar />
            <View style={styles.whoopDate} accessibilityLabel="Today">
              <Text style={styles.muted}>‹</Text>
              <Text style={styles.whoopDateText}>TODAY</Text>
              <Text style={styles.muted}>›</Text>
            </View>
            <Text style={styles.whoopStatus}>Day 12</Text>
          </View>
          <LeanMindsetWordmark size={20} style={styles.brand} />
        </>
      )}

      <HomeHeroChart />

      {homeHeader === "greeting" ? (
        <View style={styles.greetInsight}>
          <InsightCard
            title="Moderate day"
            body="Ready is yellow. Keep protein high and finish Walk + Core A."
            cta="View plan"
            onPress={() => router.push("/(tabs)/today")}
          />
        </View>
      ) : (
        <View style={styles.pair}>
          <View style={styles.mini}>
            <Text style={styles.miniEm}>Plan</Text>
            <View style={styles.chip}>
              <View style={[styles.chipMark, styles.ok]}><Text style={styles.chipMarkText}>✓</Text></View>
              <View>
                <Text style={styles.chipTitle}>On track</Text>
                <Text style={styles.chipSmall}>Day 12 of 42</Text>
              </View>
            </View>
          </View>
          <View style={styles.mini}>
            <Text style={styles.miniEm}>Coach</Text>
            <View style={styles.chip}>
              <View style={[styles.chipMark, styles.warn]}><Text style={styles.chipMarkText}>!</Text></View>
              <View>
                <Text style={styles.chipTitle}>Moderate</Text>
                <Text style={styles.chipSmall}>Yellow ready</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View style={styles.stack}>
        <Text style={styles.stackTitle}>TODAY’S ACTIVITIES</Text>
        <Pressable style={styles.activity} onPress={() => router.push("/(tabs)/meals")}>
          <View style={[styles.mark, { backgroundColor: "#3d6aa8" }]}>
            <Ionicons name="restaurant-outline" size={16} color="#fff" />
            <Text style={styles.markText}>1/3</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.activityTitle}>BREAKFAST</Text>
            <Text style={styles.activityMeta}>Logged · protein-focused</Text>
          </View>
        </Pressable>
        <Pressable style={styles.activity} onPress={() => router.push("/(tabs)/train")}>
          <View style={[styles.mark, { backgroundColor: "#3d7bff" }]}>
            <Ionicons name="barbell-outline" size={16} color="#fff" />
            <Text style={styles.markText}>8.4</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.activityTitle}>WALK + CORE A</Text>
            <Text style={styles.activityMeta}>25 min · beginner</Text>
          </View>
        </Pressable>
        <Pressable style={styles.activity} onPress={() => router.push("/(tabs)/coach")}>
          <View style={[styles.mark, { backgroundColor: "#4a4d52" }]}>
            <Ionicons name="phone-portrait-outline" size={16} color="#fff" />
            <Text style={styles.markText}>—</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.activityTitle}>CHECK-IN</Text>
            <Text style={styles.activityMeta}>Weight · reflection</Text>
          </View>
        </Pressable>
      </View>

      {homeHeader === "standard" ? (
        <InsightCard
          title="Moderate day"
          body="Ready is yellow. Keep protein high and finish Walk + Core A."
          cta="View plan"
          onPress={() => router.push("/(tabs)/today")}
        />
      ) : null}
      <BlueCta label={content.continueLabel} onPress={() => router.push("/(tabs)/today")} />
    </>
  );
}

function ClassicHome() {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.flex}>
          <Text style={styles.date}>{content.dateLabel}</Text>
          <Text style={styles.greeting}>{content.greeting}</Text>
        </View>
        <Avatar />
      </View>

      <View style={styles.ready}>
        <View style={styles.readyRow}>
          <MetricRing size={110} strokeWidth={9} progress={content.readyPercent / 100} fillColor="#19E68C">
            <Text style={styles.readyNum}>{content.readyPercent}%</Text>
            <Text style={styles.readyCap}>READY</Text>
          </MetricRing>
          <View style={styles.flex}>
            <Text style={styles.readyHeadline}>{content.readyHeadline}</Text>
            <Text style={styles.readyP}>
              {content.energyLabel} <Text style={{ color: "#19E68C", fontWeight: "700" }}>{content.energyValue}</Text>
              {" · "}
              {content.recoveryLabel} <Text style={{ color: "#F5C400", fontWeight: "700" }}>{content.recoveryValue}</Text>
              {" · "}
              {content.onTrackLabel}
            </Text>
            <Text style={styles.badge}>{content.dayBadge}</Text>
          </View>
        </View>
        <BlueCta label={content.continueLabel} onPress={() => router.push("/(tabs)/today")} />
      </View>

      <View style={styles.stack}>
        <View style={styles.planHead}>
          <Text style={styles.planTitle}>{content.planTitle}</Text>
          <Pressable onPress={() => router.push("/(tabs)/progress")}>
            <Text style={styles.link}>{content.viewProgramLabel}</Text>
          </Pressable>
        </View>
        {content.tasks.map((task) => (
          <Pressable
            key={task.id}
            style={styles.task}
            onPress={() => {
              if (task.icon === "restaurant") router.push("/(tabs)/meals");
              if (task.icon === "barbell") router.push("/(tabs)/train");
              if (task.icon === "phone-portrait") router.push("/(tabs)/coach");
            }}
          >
            <View style={styles.taskNum}>
              <Text style={styles.taskNumText}>{task.number}</Text>
              {task.complete ? (
                <View style={styles.taskCheck}>
                  <Ionicons name="checkmark" size={8} color="#0B1220" />
                </View>
              ) : null}
            </View>
            <Ionicons
              name={task.icon === "restaurant" ? "restaurant-outline" : task.icon === "barbell" ? "barbell-outline" : "phone-portrait-outline"}
              size={18}
              color="#8E8E93"
            />
            <View style={styles.flex}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskMeta}>{task.meta}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6e7c93" />
          </Pressable>
        ))}
      </View>

      <View style={styles.twoUp}>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{content.leanScore.title}</Text>
          <View style={styles.scoreBody}>
            <MetricRing size={64} strokeWidth={6} progress={content.leanScore.value / content.leanScore.max} fillColor="#5B9DFF">
              <Text style={styles.smNum}>{content.leanScore.value}</Text>
              <Text style={styles.smCap}>/{content.leanScore.max}</Text>
            </MetricRing>
            <View style={styles.flex}>
              {content.leanScore.rows.map((row) => (
                <View key={row.id} style={styles.scoreRow}>
                  <Text style={styles.scoreRowEm} numberOfLines={1}>{row.label}</Text>
                  <Text style={styles.scoreRowStrong}>{row.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{content.thisWeek.title}</Text>
          <View style={{ marginTop: 12, gap: 10 }}>
            {content.thisWeek.bars.map((bar) => {
              const fill = bar.tone === "green" ? "#19E68C" : "#5B9DFF";
              const pct = Math.round((bar.value / bar.max) * 100);
              return (
                <View key={bar.id} style={styles.weekRow}>
                  <View style={styles.weekMeta}>
                    <Text style={styles.weekLabel}>{bar.label}</Text>
                    <Text style={{ color: colors.white, fontWeight: "600" }}>{bar.value}/{bar.max}</Text>
                  </View>
                  <View style={styles.barTrack}>
                    <View style={{ width: `${pct}%`, height: "100%", backgroundColor: fill, borderRadius: 999 }} />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <InsightCard
        title={`“${content.mindset.quote}”`}
        body={content.mindset.support}
        cta={content.mindset.label}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  atmosphere: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#121314",
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20, gap: 0 },
  toggleBar: { alignItems: "flex-end", marginBottom: 8 },
  flex: { flex: 1, minWidth: 0 },
  avatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: "#2c2c2e",
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: colors.white, fontSize: 18, fontWeight: "700" },
  online: {
    position: "absolute", right: 0, bottom: 0, width: 11, height: 11, borderRadius: 6,
    backgroundColor: "#19e68c", borderWidth: 2, borderColor: "#0f1112",
  },
  whoopTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
  whoopDate: {
    flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 7, paddingHorizontal: 12,
    borderRadius: 999, backgroundColor: "#222529",
  },
  whoopDateText: { color: colors.white, fontSize: 11, fontWeight: "700", letterSpacing: 1.8 },
  muted: { color: "#636366" },
  whoopStatus: { fontSize: 11, color: "#8e8e93", fontWeight: "600" },
  brand: {
    alignSelf: "center",
    marginVertical: 12,
  },
  greetTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  greetBrand: {
    flex: 1,
    textAlign: "center",
  },
  greetTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: -0.3,
  },
  greetSub: {
    marginTop: 4,
    marginBottom: 14,
    fontSize: 14,
    lineHeight: 20,
    color: "#AEAEB2",
  },
  dials: { flexDirection: "row", gap: 8, marginBottom: 16 },
  dial: { flex: 1, alignItems: "center", gap: 8 },
  dialNum: { color: colors.white, fontSize: 22, fontWeight: "500" },
  dialLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 1.6, color: "#8e8e93" },
  pair: { flexDirection: "row", gap: 8, marginBottom: 12 },
  greetInsight: { marginBottom: 12 },
  mini: { flex: 1, backgroundColor: "#222529", borderRadius: 16, padding: 12 },
  miniEm: { fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", color: "#8e8e93", fontWeight: "700", marginBottom: 10 },
  chip: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#2d3136", borderRadius: 10, padding: 8 },
  chipMark: { width: 22, height: 22, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  ok: { backgroundColor: "#19e68c" },
  warn: { backgroundColor: "#f5c400" },
  chipMarkText: { color: "#0f1112", fontWeight: "700", fontSize: 12 },
  chipTitle: { fontSize: 12, fontWeight: "600", color: "#f4f4f5" },
  chipSmall: { marginTop: 2, fontSize: 10, color: "#8e8e93" },
  stack: { backgroundColor: "#222529", borderRadius: 16, padding: 12, marginBottom: 12 },
  stackTitle: { fontSize: 11, letterSpacing: 1.6, color: "#8e8e93", marginBottom: 10, marginLeft: 4 },
  activity: { flexDirection: "row", alignItems: "center", gap: 10, padding: 8, backgroundColor: "#2d3136", borderRadius: 12, marginBottom: 8 },
  mark: { width: 52, height: 52, borderRadius: 10, alignItems: "center", justifyContent: "center", gap: 2 },
  markText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  activityTitle: { color: colors.white, fontSize: 13, letterSpacing: 0.5, fontWeight: "700" },
  activityMeta: { marginTop: 3, fontSize: 11, color: "#8e8e93" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 },
  date: { fontSize: 13, color: "#8e8e93" },
  greeting: { marginTop: 2, fontSize: 24, lineHeight: 30, fontWeight: "700", color: colors.white },
  ready: { padding: 14, borderRadius: 18, backgroundColor: "#222529", marginBottom: 12 },
  readyRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  readyNum: { color: colors.white, fontSize: 22, fontWeight: "700" },
  readyCap: { fontSize: 11, fontWeight: "700", letterSpacing: 1.4, color: "#8e8e93" },
  readyHeadline: { fontSize: 17, lineHeight: 22, fontWeight: "700", color: colors.white },
  readyP: { marginTop: 2, fontSize: 12, lineHeight: 16, color: "#8e8e93" },
  badge: {
    alignSelf: "flex-start", marginTop: 6, paddingVertical: 3, paddingHorizontal: 10,
    borderRadius: 999, backgroundColor: "rgba(255,255,255,0.06)", fontSize: 11, color: "#8e8e93",
  },
  planHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10, paddingHorizontal: 4 },
  planTitle: { fontSize: 17, fontWeight: "700", color: colors.white },
  link: { fontSize: 13, color: "#8e8e93" },
  task: {
    height: 61, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14,
    backgroundColor: "#2d3136", borderRadius: 12, marginBottom: 8,
  },
  taskNum: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: "#2c2c2e",
    alignItems: "center", justifyContent: "center",
  },
  taskNumText: { color: colors.white, fontSize: 13, fontWeight: "600" },
  taskCheck: {
    position: "absolute", right: -3, bottom: -3, width: 14, height: 14, borderRadius: 7,
    backgroundColor: "#19e68c", alignItems: "center", justifyContent: "center",
  },
  taskTitle: { fontSize: 16, fontWeight: "700", color: colors.white },
  taskMeta: { fontSize: 13, color: "#8e8e93" },
  twoUp: { flexDirection: "row", gap: 8, marginBottom: 11 },
  panel: { flex: 1, minHeight: 196, padding: 12, backgroundColor: "#222529", borderRadius: 14 },
  panelTitle: { color: "#8e8e93", fontSize: 11, fontWeight: "600", letterSpacing: 0.6 },
  scoreBody: { marginTop: 10, flexDirection: "row", alignItems: "center", gap: 8 },
  smNum: { color: colors.white, fontSize: 16, fontWeight: "700" },
  smCap: { fontSize: 11, color: "#8e8e93" },
  scoreRow: { flexDirection: "row", backgroundColor: "#2d3136", borderRadius: 8, paddingVertical: 4, paddingHorizontal: 6, marginBottom: 6, gap: 4 },
  scoreRowEm: { flex: 1, fontSize: 11, color: "#8e8e93" },
  scoreRowStrong: { fontSize: 11, fontWeight: "600", color: colors.white },
  weekRow: { backgroundColor: "#2d3136", borderRadius: 8, padding: 6 },
  weekMeta: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  weekLabel: { fontSize: 12, color: "#8e8e93" },
  barTrack: { height: 7, borderRadius: 999, backgroundColor: "#2c2c2e", overflow: "hidden" },
});
