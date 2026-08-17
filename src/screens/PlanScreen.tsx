import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import ScrollableScreen from "@/src/layout/ScrollableScreen";
import { defaultNutrition, dinnerIdeas, formatKcal, proteinShort } from "@/src/services/mealsService";
import { walkCoreA } from "@/src/services/trainService";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import InsightCard from "@/src/ui/InsightCard";
import PlanCard from "@/src/ui/PlanCard";
import PrimaryButton from "@/src/ui/PrimaryButton";
import ProgressBar from "@/src/ui/ProgressBar";
import ProgressCard from "@/src/ui/ProgressCard";
import ScreenHeader from "@/src/ui/ScreenHeader";
import SectionHeader from "@/src/ui/SectionHeader";

/**
 * Plan
 * Reusable: ScrollableScreen, PlanCard, ProgressCard, InsightCard, PrimaryButton
 * Scrolls: yes. Safe area: top. Small/large: flex stack + max width.
 * Keyboard: meal entry is a separate KeyboardScreen.
 */
export default function PlanScreen() {
  const short = proteinShort(defaultNutrition);

  return (
    <ScrollableScreen>
      <ScreenHeader title="Plan" subtitle="Fuel and training for today" />

      <PlanCard
        title={walkCoreA.title}
        meta={`${walkCoreA.durationMin} min · ${walkCoreA.difficulty}`}
        onPress={() => router.push("/workout")}
        icon={<Ionicons name="barbell-outline" size={18} color={colors.textPrimary} />}
      />

      <ProgressCard title="Nutrition">
        <Text style={typography.heading2} maxFontSizeMultiplier={1.2}>
          {formatKcal(defaultNutrition.kcalLogged)} / {formatKcal(defaultNutrition.kcalTarget)} kcal
        </Text>
        {[defaultNutrition.protein, defaultNutrition.fat, defaultNutrition.carbs].map((macro) => (
          <View key={macro.label} style={styles.macro}>
            <View style={styles.macroRow}>
              <Text style={typography.bodySmall}>{macro.label}</Text>
              <Text style={typography.body}>
                {macro.consumed}g / {macro.target}g
              </Text>
            </View>
            <ProgressBar progress={macro.consumed / macro.target} color={macro.color} />
          </View>
        ))}
      </ProgressCard>

      {short > 0 ? (
        <InsightCard
          title={`You're ${short}g short on protein today.`}
          body="Best next step: choose a high-protein dinner."
          cta="Log a meal"
          onPress={() => router.push("/meals")}
        />
      ) : null}

      <View style={styles.stack}>
        <SectionHeader title="Dinner ideas" />
        {dinnerIdeas.map((meal) => (
          <View key={meal.id} style={styles.meal}>
            <View style={styles.thumb} />
            <View style={styles.copy}>
              <Text style={typography.heading3}>{meal.name}</Text>
              <Text style={typography.bodySmall}>
                {meal.kcal} kcal · {meal.protein}g protein
              </Text>
            </View>
          </View>
        ))}
      </View>

      <PrimaryButton label="Log meal" onPress={() => router.push("/meals")} />
    </ScrollableScreen>
  );
}

const styles = StyleSheet.create({
  macro: {
    gap: spacing.xs,
  },
  macroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  stack: {
    gap: spacing.sm,
  },
  meal: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  thumb: {
    width: 56,
    aspectRatio: 1,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceElevated,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
});
