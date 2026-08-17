import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  defaultNutrition,
  dinnerIdeas,
  formatKcal,
  parseMealDescription,
  percent,
  proteinShort,
} from "@/src/services/mealsService";
import { colors } from "@/src/theme/colors";
import BlueCta from "@/src/ui/BlueCta";
import InsightCard from "@/src/ui/InsightCard";
import MealThumb from "@/src/ui/MealThumb";
import MetricRing from "@/src/ui/MetricRing";
import ProgressBar from "@/src/ui/ProgressBar";

/** Current simplified Expo meals layout, kept as the Now toggle. */
export default function MealsNow() {
  const [description, setDescription] = useState("");
  const parsed = parseMealDescription(description);
  const nutrition = defaultNutrition;
  const short = proteinShort(nutrition);

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Meals</Text>
        <Text style={styles.sub}>Log food and stay on protein.</Text>
        <View style={styles.actions}>
          <Pressable style={styles.action}>
            <Ionicons name="camera-outline" size={16} color={colors.white} />
            <View>
              <Text style={styles.actionTitle}>Photo log meal</Text>
              <Text style={styles.actionSub}>Snap a photo to log</Text>
            </View>
          </Pressable>
          <Pressable style={styles.action}>
            <Ionicons name="create-outline" size={16} color={colors.white} />
            <View style={styles.flex}>
              <Text style={styles.actionTitle}>Describe a meal</Text>
              <Text style={styles.actionSub}>Type what you ate</Text>
            </View>
          </Pressable>
        </View>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="e.g. grilled chicken, rice, and broccoli"
          placeholderTextColor="#636366"
          style={styles.input}
          multiline
        />
        {description.trim() ? (
          <InsightCard title={parsed.name} body={`${parsed.kcal} kcal · ${parsed.protein}g protein`} />
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardH}>Today's nutrition</Text>
          <View style={styles.nutriRow}>
            <MetricRing size={88} strokeWidth={8} progress={percent(nutrition.kcalLogged, nutrition.kcalTarget) / 100} fillColor="#5B9DFF">
              <Text style={styles.kcal}>{formatKcal(nutrition.kcalLogged)}</Text>
            </MetricRing>
            <View style={styles.flex}>
              <Text style={styles.target}>Target {formatKcal(nutrition.kcalTarget)} kcal</Text>
              {[nutrition.protein, nutrition.fat, nutrition.carbs].map((macro) => (
                <View key={macro.label} style={{ marginTop: 8 }}>
                  <View style={styles.macroHead}>
                    <Text style={styles.macroLabel}>{macro.label}</Text>
                    <Text style={styles.macroVal}>{macro.consumed}/{macro.target}g</Text>
                  </View>
                  <ProgressBar progress={macro.consumed / macro.target} color={macro.color} />
                </View>
              ))}
            </View>
          </View>
        </View>

        <InsightCard
          title={`You're ${short}g short on protein today.`}
          body="Best next step: choose a high-protein dinner."
          cta="Ask coach"
          ctaLayout="beside"
          onPress={() => router.push("/(tabs)/coach")}
        />

        <Text style={styles.section}>Dinner ideas</Text>
        {dinnerIdeas.map((meal) => (
          <View key={meal.id} style={styles.meal}>
            <MealThumb meal={meal} height={56} width={56} radius={10} />
            <View style={styles.flex}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealMeta}>{meal.kcal} kcal · {meal.protein}g protein</Text>
            </View>
          </View>
        ))}
        <BlueCta label="Log meal" disabled={!description.trim()} onPress={() => setDescription("")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 10 },
  flex: { flex: 1, minWidth: 0 },
  title: { fontSize: 24, fontWeight: "700", color: colors.white },
  sub: { fontSize: 13, color: "#8e8e93", marginTop: -4 },
  actions: { flexDirection: "row", gap: 8 },
  action: { flex: 1, flexDirection: "row", gap: 8, alignItems: "center", backgroundColor: "#222529", borderRadius: 14, padding: 12 },
  actionTitle: { color: colors.white, fontWeight: "700", fontSize: 13 },
  actionSub: { color: "#8e8e93", fontSize: 11 },
  input: { minHeight: 88, borderRadius: 14, backgroundColor: "#222529", color: colors.white, padding: 12 },
  card: { backgroundColor: "#222529", borderRadius: 16, padding: 12 },
  cardH: { color: colors.white, fontSize: 17, fontWeight: "700", marginBottom: 10 },
  nutriRow: { flexDirection: "row", gap: 12, alignItems: "center" },
  kcal: { color: colors.white, fontSize: 12, fontWeight: "700" },
  target: { color: "#8e8e93", fontSize: 12 },
  macroHead: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  macroLabel: { color: "#8e8e93", fontSize: 12 },
  macroVal: { color: colors.white, fontSize: 12 },
  section: { color: "#8e8e93", fontSize: 11, letterSpacing: 1.4, fontWeight: "700" },
  meal: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#222529", borderRadius: 12, padding: 12 },
  thumb: { width: 56, height: 56, borderRadius: 10, backgroundColor: "#2d3136" },
  mealName: { color: colors.white, fontWeight: "700" },
  mealMeta: { color: "#8e8e93", fontSize: 12, marginTop: 2 },
});
