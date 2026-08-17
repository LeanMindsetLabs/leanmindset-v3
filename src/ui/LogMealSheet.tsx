import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { InPhoneModal } from "@/src/layout/PhoneOverlay";
import {
  DEFAULT_BOWLS,
  GROCERY_FILTERS,
  MEAL_FOODS,
  bowlSub,
  formatMealSummary,
  type AddedLine,
  type FoodItem,
  type GroceryFilter,
  type SavedBowl,
} from "@/src/services/mealsLogService";
import { colors } from "@/src/theme/colors";

type Props = {
  mealName: string;
  mealTime: string;
  onClose: () => void;
  onSave: (summary: string) => void;
  onOpenGrocery?: () => void;
};

export default function LogMealSheet({ mealName, mealTime, onClose, onSave, onOpenGrocery }: Props) {
  const [bowls, setBowls] = useState<SavedBowl[]>(DEFAULT_BOWLS);
  const [filter, setFilter] = useState<GroceryFilter>("bowls");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [added, setAdded] = useState<AddedLine[]>([]);

  const summary = useMemo(() => formatMealSummary(added), [added]);
  const foods = useMemo(() => {
    if (filter === "bowls") return [];
    const q = query.trim().toLowerCase();
    return MEAL_FOODS.filter((f) => f.cat === filter && (!q || f.name.toLowerCase().includes(q)));
  }, [filter, query]);
  const bowlCards = useMemo(() => {
    if (filter !== "bowls") return [];
    const q = query.trim().toLowerCase();
    return bowls.filter((b) => !q || b.name.toLowerCase().includes(q));
  }, [filter, query, bowls]);
  const lines = added.filter((a) => a.qty > 0);

  function bumpLine(line: AddedLine) {
    setSelectedId(line.id);
    setAdded((prev) => {
      const hit = prev.find((a) => a.id === line.id);
      if (hit) return prev.map((a) => (a.id === line.id ? { ...a, qty: a.qty + 1 } : a));
      return [...prev, { ...line, qty: 1 }];
    });
  }

  function dropLine(id: string) {
    setAdded((prev) =>
      prev.map((a) => (a.id === id ? { ...a, qty: a.qty - 1 } : a)).filter((a) => a.qty > 0),
    );
  }

  function addFood(f: FoodItem) {
    bumpLine({ id: f.id, name: f.name, sub: `${f.kcal} kcal`, qty: 1 });
  }

  function addSavedBowl(b: SavedBowl) {
    bumpLine({ id: b.id, name: b.name, sub: bowlSub(b.items), qty: 1 });
  }

  function buildBowl() {
    const next: SavedBowl = {
      id: `custom-${Date.now()}`,
      name: `Custom bowl ${bowls.length + 1}`,
      cat: "protein",
      items: ["Chicken breast", "Broccoli"],
      emoji: "🥗",
    };
    setBowls((prev) => [...prev, next]);
    addSavedBowl(next);
  }

  return (
    <InPhoneModal visible>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <View>
              <Text style={styles.time}>{mealTime}</Text>
              <Text style={styles.title}>Log {mealName}</Text>
            </View>
            <Pressable style={styles.close} onPress={onClose} accessibilityLabel="Close">
              <Text style={styles.closeX}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.labelRow}>
            <Text style={styles.eyebrow}>Add from your lab's grocery list</Text>
            {onOpenGrocery ? (
              <Pressable onPress={onOpenGrocery}>
                <Text style={styles.link}>Grocery list →</Text>
              </Pressable>
            ) : null}
          </View>

          <View style={styles.search}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search bowls, chicken, broccoli..."
              placeholderTextColor="#6E7D92"
              style={styles.searchInput}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
            {GROCERY_FILTERS.map(({ id, label }) => (
              <Pressable key={id} style={[styles.pill, filter === id && styles.pillActive]} onPress={() => setFilter(id)}>
                <Text style={[styles.pillText, filter === id && styles.pillTextActive]}>{label}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tiles}>
            {filter === "bowls" ? (
              <>
                <Pressable style={[styles.tile, styles.tileCta]} onPress={buildBowl}>
                  <Text style={styles.emoji}>+</Text>
                  <Text style={[styles.foodName, { color: colors.metricBlueSoft }]}>Build Your Bowl</Text>
                  <Text style={styles.kcal}>Custom</Text>
                </Pressable>
                {bowlCards.map((b) => (
                  <Pressable
                    key={b.id}
                    style={[styles.tile, selectedId === b.id && styles.tileSelected]}
                    onPress={() => addSavedBowl(b)}
                  >
                    <Text style={styles.emoji}>{b.emoji}</Text>
                    <Text style={styles.foodName}>{b.name}</Text>
                    <Text style={styles.kcal}>{bowlSub(b.items)}</Text>
                  </Pressable>
                ))}
              </>
            ) : (
              foods.map((f) => (
                <Pressable
                  key={f.id}
                  style={[styles.tile, selectedId === f.id && styles.tileSelected]}
                  onPress={() => addFood(f)}
                >
                  <Text style={styles.emoji}>{f.emoji}</Text>
                  <Text style={styles.foodName}>{f.name}</Text>
                  <Text style={styles.kcal}>{f.kcal} kcal</Text>
                </Pressable>
              ))
            )}
          </ScrollView>

          {lines.length === 0 ? (
            <Text style={styles.summary}>{summary}</Text>
          ) : (
            <View style={styles.summaryBox}>
              {lines.map((a, i) => (
                <Text key={a.id} style={styles.summaryText}>
                  {i > 0 ? " + " : ""}
                  <Text style={styles.summaryPart} onPress={() => dropLine(a.id)}>
                    {a.qty === 1 ? "1x" : `${a.qty}x`} {a.name}
                  </Text>
                </Text>
              ))}
            </View>
          )}

          <Pressable style={styles.save} onPress={() => onSave(summary)}>
            <Text style={styles.saveText}>Save meal</Text>
          </Pressable>
        </View>
      </View>
    </InPhoneModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderBottomWidth: 0,
    paddingHorizontal: 14,
    paddingBottom: 52,
    paddingTop: 8,
    gap: 10,
    maxHeight: "88%",
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignSelf: "center",
    marginVertical: 4,
  },
  head: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  time: { fontSize: 11, fontWeight: "700", color: "#8EA0B8" },
  title: { fontSize: 18, fontWeight: "800", color: colors.white },
  close: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeX: { color: "#C5D0E0", fontSize: 14 },
  labelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  eyebrow: { fontSize: 10, fontWeight: "700", letterSpacing: 0.4, textTransform: "uppercase", color: "#6E7D92", flex: 1 },
  link: { color: colors.metricBlueSoft, fontSize: 11, fontWeight: "700" },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: { color: "#6E7D92", fontSize: 16 },
  searchInput: { flex: 1, color: colors.white, fontSize: 13, fontWeight: "600" },
  pills: { gap: 6 },
  pill: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillActive: { backgroundColor: "rgba(47,111,237,0.2)", borderColor: "rgba(47,111,237,0.45)" },
  pillText: { color: "#8EA0B8", fontSize: 11, fontWeight: "700" },
  pillTextActive: { color: "#9EC4FF" },
  tiles: { gap: 8, paddingBottom: 2 },
  tile: {
    width: 104,
    minHeight: 96,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: colors.surface,
    padding: 10,
    gap: 4,
  },
  tileSelected: { borderColor: "rgba(74,158,255,0.7)" },
  tileCta: { borderStyle: "dashed" },
  emoji: { fontSize: 18 },
  foodName: { fontSize: 11.5, fontWeight: "800", color: colors.white },
  kcal: { fontSize: 10, fontWeight: "600", color: "#8EA0B8" },
  summary: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "rgba(47,111,237,0.1)",
    color: "#9EC4FF",
    padding: 12,
    fontSize: 12,
    fontWeight: "700",
  },
  summaryBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "rgba(47,111,237,0.1)",
    padding: 12,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  summaryText: { color: "#9EC4FF", fontSize: 12, fontWeight: "700" },
  summaryPart: { textDecorationLine: "underline" },
  save: {
    borderRadius: 14,
    paddingVertical: 13,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
  },
  saveText: { color: colors.white, fontSize: 14, fontWeight: "800" },
});
