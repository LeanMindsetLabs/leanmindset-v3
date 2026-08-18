import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeContent as content } from "@/src/services/homeContent";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import BlueCta from "@/src/ui/BlueCta";
import InsightCard from "@/src/ui/InsightCard";
import HomeHeroChart from "@/src/ui/HomeHeroChart";
import { LeanMindsetWordmark } from "@/src/ui/LeanMindsetBrand";

export default function HomeScreen() {
  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <View style={styles.atmosphere} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        <View style={styles.greetTop}>
          <Pressable style={styles.iconBtn} accessibilityLabel="Notifications">
            <Ionicons name="notifications-outline" size={22} color={colors.white} />
          </Pressable>
          <LeanMindsetWordmark size={20} style={styles.greetBrand} />
          <Avatar />
        </View>
        <Text style={styles.greetTitle}>{content.greeting}</Text>
        <Text style={styles.greetSub}>{content.whoopSubgreeting}</Text>

        <HomeHeroChart />

        <View style={styles.greetInsight}>
          <InsightCard
            title="Moderate day"
            body="Ready is yellow. Keep protein high and finish Walk + Core A."
            cta="View plan"
            onPress={() => router.push("/(tabs)/train")}
          />
        </View>

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
        </View>

        <BlueCta label={content.continueLabel} onPress={() => router.push("/(tabs)/train")} />
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

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  atmosphere: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#121314",
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: layout.tabBarContentInset },
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
  greetInsight: { marginBottom: 12 },
  stack: { backgroundColor: "#222529", borderRadius: 16, padding: 12, marginBottom: 4 },
  stackTitle: { fontSize: 11, letterSpacing: 1.6, color: "#8e8e93", marginBottom: 10, marginLeft: 4 },
  activity: { flexDirection: "row", alignItems: "center", gap: 10, padding: 8, backgroundColor: "#2d3136", borderRadius: 12, marginBottom: 8 },
  mark: { width: 52, height: 52, borderRadius: 10, alignItems: "center", justifyContent: "center", gap: 2 },
  markText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  activityTitle: { color: colors.white, fontSize: 13, letterSpacing: 0.5, fontWeight: "700" },
  activityMeta: { marginTop: 3, fontSize: 11, color: "#8e8e93" },
});
