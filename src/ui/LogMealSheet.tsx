import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, Platform } from "react-native";
import AppTextInput from "@/src/ui/AppTextInput";
import { InPhoneModal } from "@/src/layout/PhoneOverlay";
import {
  DEFAULT_BOWLS,
  FOOD_FILTERS,
  GROCERY_FILTERS,
  MEAL_FOODS,
  bowlSub,
  filterForSearchHit,
  formatMealSummary,
  searchMealCatalog,
  type AddedLine,
  type FoodCat,
  type FoodItem,
  type GroceryFilter,
  type SavedBowl,
  type SearchHit,
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
  const [building, setBuilding] = useState(false);
  const [bowlName, setBowlName] = useState("");
  const [bowlCat, setBowlCat] = useState<FoodCat>("protein");
  const [bowlItems, setBowlItems] = useState<FoodItem[]>([]);

  const summary = useMemo(() => formatMealSummary(added), [added]);
  const suggestions = useMemo(() => searchMealCatalog(query, bowls), [query, bowls]);
  const topSuggestion = suggestions[0] ?? null;
  const topSuggestionName = topSuggestion
    ? topSuggestion.kind === "food"
      ? topSuggestion.item.name
      : topSuggestion.item.name
    : "";
  const ghostRemainder = useMemo(() => {
    const typed = query;
    if (!typed || !topSuggestionName) return "";
    if (!topSuggestionName.toLowerCase().startsWith(typed.toLowerCase())) return "";
    if (topSuggestionName.toLowerCase() === typed.toLowerCase()) return "";
    return topSuggestionName.slice(typed.length);
  }, [query, topSuggestionName]);
  const foods = useMemo(() => {
    if (filter === "bowls") return [];
    const q = query.trim().toLowerCase();
    return MEAL_FOODS.filter((f) => f.cat === filter && (!q || f.name.toLowerCase().includes(q)));
  }, [filter, query]);
  const bowlCards = useMemo(() => {
    if (filter !== "bowls") return [];
    const q = query.trim().toLowerCase();
    return bowls.filter(
      (b) => !q || b.name.toLowerCase().includes(q) || b.items.some((item) => item.toLowerCase().includes(q)),
    );
  }, [filter, query, bowls]);
  const builderFoods = useMemo(
    () => MEAL_FOODS.filter((f) => f.cat === bowlCat),
    [bowlCat],
  );
  const lines = added.filter((a) => a.qty > 0);
  const canSaveBowl = bowlName.trim().length > 0 && bowlItems.length > 0;

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

  function onSearchChange(text: string) {
    setQuery(text);
    const hits = searchMealCatalog(text, bowls);
    const top = hits[0];
    if (top) setFilter(filterForSearchHit(top));
  }

  function pickSuggestion(hit: SearchHit) {
    const name = hit.kind === "food" ? hit.item.name : hit.item.name;
    setQuery(name);
    setFilter(filterForSearchHit(hit));
    setSelectedId(hit.item.id);
  }

  function openBuilder() {
    setBuilding(true);
    setBowlName("");
    setBowlCat("protein");
    setBowlItems([]);
  }

  function toggleBowlItem(f: FoodItem) {
    setBowlItems((prev) => (prev.some((item) => item.id === f.id) ? prev.filter((item) => item.id !== f.id) : [...prev, f]));
  }

  function saveBuiltBowl() {
    if (!canSaveBowl) return;
    const first = bowlItems[0];
    const next: SavedBowl = {
      id: `custom-${Date.now()}`,
      name: bowlName.trim(),
      cat: first.cat === "veggie" || first.cat === "fruit" ? first.cat : "protein",
      items: bowlItems.map((item) => item.name),
      emoji: first.emoji ?? "🥗",
    };
    setBowls((prev) => [...prev, next]);
    setBuilding(false);
    setFilter("bowls");
    setQuery("");
    setSelectedId(next.id);
  }

  return (
    <InPhoneModal visible>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheetWrap}>
          <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <View>
              <Text style={styles.time}>{mealTime}</Text>
              <Text style={styles.title}>{building ? "Build your bowl" : `Log ${mealName}`}</Text>
            </View>
            <Pressable style={styles.close} onPress={onClose} accessibilityLabel="Close">
              <Text style={styles.closeX}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.labelRow}>
            <Text style={styles.eyebrow}>
              {building ? "Save a bowl to reuse later" : "Add from your lab's grocery list"}
            </Text>
            {onOpenGrocery && !building ? (
              <Pressable onPress={onOpenGrocery}>
                <Text style={styles.link}>Grocery list →</Text>
              </Pressable>
            ) : null}
          </View>

          {building ? (
            <>
              <View style={styles.search}>
                <AppTextInput
                  value={bowlName}
                  onChangeText={setBowlName}
                  placeholder="Name your bowl"
                  placeholderTextColor="#8EA0B8"
                  style={styles.searchInput}
                />
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
                {FOOD_FILTERS.map(({ id, label }) => (
                  <Pressable key={id} style={[styles.pill, bowlCat === id && styles.pillActive]} onPress={() => setBowlCat(id)}>
                    <Text style={[styles.pillText, bowlCat === id && styles.pillTextActive]}>{label}</Text>
                  </Pressable>
                ))}
              </ScrollView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tiles}>
                {builderFoods.map((f) => {
                  const picked = bowlItems.some((item) => item.id === f.id);
                  return (
                    <Pressable
                      key={f.id}
                      style={[styles.tile, picked && styles.tileSelected]}
                      onPress={() => toggleBowlItem(f)}
                    >
                      <Text style={styles.emoji}>{f.emoji}</Text>
                      <Text style={styles.foodName}>{f.name}</Text>
                      <Text style={styles.kcal}>{picked ? "Added" : `${f.kcal} kcal`}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
              {bowlItems.length === 0 ? (
                <Text style={styles.summary}>Tap foods from each category to build this bowl.</Text>
              ) : (
                <View style={styles.summaryBox}>
                  {bowlItems.map((item, i) => (
                    <Text key={item.id} style={styles.summaryText}>
                      {i > 0 ? " + " : ""}
                      <Text style={styles.summaryPart} onPress={() => toggleBowlItem(item)}>
                        {item.name}
                      </Text>
                    </Text>
                  ))}
                </View>
              )}
              <View style={styles.buildActions}>
                <Pressable style={styles.ghost} onPress={() => setBuilding(false)}>
                  <Text style={styles.ghostText}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.save, styles.saveFlex, !canSaveBowl && styles.saveOff]} disabled={!canSaveBowl} onPress={saveBuiltBowl}>
                  <Text style={styles.saveText}>Save bowl</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
          <View style={styles.search}>
            <Text style={styles.searchIcon}>⌕</Text>
            <View style={styles.searchField}>
              {query.length > 0 && ghostRemainder ? (
                <Text style={styles.searchGhost} pointerEvents="none">
                  <Text style={styles.searchGhostTyped}>{query}</Text>
                  <Text style={styles.searchGhostRest}>{ghostRemainder}</Text>
                </Text>
              ) : null}
              <AppTextInput
                value={query}
                onChangeText={onSearchChange}
                placeholder="Search bowls, chicken, broccoli..."
                placeholderTextColor="#8EA0B8"
                style={styles.searchInput}
                returnKeyType="go"
                onSubmitEditing={() => {
                  if (topSuggestion) pickSuggestion(topSuggestion);
                }}
              />
            </View>
            {topSuggestion && query.trim().length > 0 && query.trim().toLowerCase() !== topSuggestionName.toLowerCase() ? (
              <Pressable style={styles.searchHint} onPress={() => pickSuggestion(topSuggestion)}>
                <Text style={styles.searchHintText} numberOfLines={1}>
                  {topSuggestionName}
                </Text>
              </Pressable>
            ) : null}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
            {GROCERY_FILTERS.map(({ id, label }) => (
              <Pressable
                key={id}
                style={[styles.pill, filter === id && styles.pillActive]}
                onPress={() => setFilter(id)}
              >
                <Text style={[styles.pillText, filter === id && styles.pillTextActive]}>{label}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tiles}>
            {filter === "bowls" ? (
              <>
                <Pressable style={[styles.tile, styles.tileCta]} onPress={openBuilder}>
                  <Ionicons name="add" size={22} color={colors.metricBlueSoft} />
                  <Text style={[styles.foodName, { color: colors.metricBlueSoft }]}>Build Your Bowl</Text>
                  <Text style={styles.kcal}>Save for later</Text>
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
            ) : foods.length === 0 ? (
              <Text style={styles.emptyHint}>No matches in this category.</Text>
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
            </>
          )}
          </View>
        </View>
      </View>
    </InPhoneModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  sheetWrap: {
    width: "100%",
    maxHeight: "88%",
  },
  sheet: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(126,182,255,0.24)",
    paddingHorizontal: 14,
    paddingBottom: 16,
    paddingTop: 8,
    gap: 10,
    ...Platform.select({
      web: { boxShadow: "0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(126,182,255,0.08)" as const },
      default: {
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: -4 },
        elevation: 12,
      },
    }),
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 99,
    backgroundColor: "rgba(126,182,255,0.35)",
    alignSelf: "center",
    marginVertical: 4,
  },
  head: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  time: { fontSize: 11, fontWeight: "700", color: colors.metricBlueSoft },
  title: { fontSize: 18, fontWeight: "800", color: colors.textPrimary },
  close: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(126,182,255,0.22)",
    backgroundColor: "rgba(47,111,237,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeX: { color: colors.metricBlueSoft, fontSize: 14, fontWeight: "700" },
  labelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: "#9EB0C8",
    flex: 1,
  },
  link: { color: colors.metricBlueSoft, fontSize: 11, fontWeight: "700" },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(47,111,237,0.1)",
    borderWidth: 1,
    borderColor: "rgba(126,182,255,0.22)",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: { color: colors.metricBlueSoft, fontSize: 16 },
  searchField: { flex: 1, minWidth: 0, justifyContent: "center" },
  searchGhost: {
    position: "absolute",
    left: 0,
    right: 0,
    fontSize: 13,
    fontWeight: "600",
  },
  searchGhostTyped: { color: "transparent" },
  searchGhostRest: { color: "rgba(174, 196, 222, 0.55)" },
  searchInput: { color: colors.textPrimary, fontSize: 13, fontWeight: "600", backgroundColor: "transparent", padding: 0, margin: 0 },
  searchHint: {
    maxWidth: 92,
    borderRadius: 8,
    backgroundColor: "rgba(126,182,255,0.16)",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  searchHintText: { color: colors.metricBlueSoft, fontSize: 11, fontWeight: "800" },
  pills: { gap: 6 },
  pill: {
    borderWidth: 1,
    borderColor: "rgba(126,182,255,0.18)",
    backgroundColor: "rgba(47,111,237,0.06)",
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillActive: {
    backgroundColor: "rgba(47,111,237,0.24)",
    borderColor: "rgba(126,182,255,0.55)",
  },
  pillText: { color: "#A8B8CE", fontSize: 11, fontWeight: "700" },
  pillTextActive: { color: "#B8D4FF" },
  tiles: { gap: 8, paddingBottom: 2 },
  tile: {
    width: 104,
    minHeight: 96,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(126,182,255,0.32)",
    backgroundColor: colors.surface,
    padding: 10,
    gap: 4,
  },
  tileSelected: {
    borderColor: colors.metricBlueSoft,
    backgroundColor: "rgba(47,111,237,0.14)",
    ...Platform.select({
      web: { boxShadow: "0 0 0 1px rgba(126,182,255,0.35)" as const },
      default: {
        shadowColor: colors.accentBlue,
        shadowOpacity: 0.35,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 0 },
        elevation: 3,
      },
    }),
  },
  tileCta: {
    borderStyle: "dashed",
    borderColor: "rgba(126,182,255,0.5)",
    backgroundColor: "rgba(47,111,237,0.08)",
  },
  emoji: { fontSize: 18 },
  foodName: { fontSize: 11.5, fontWeight: "800", color: colors.textPrimary },
  kcal: { fontSize: 10, fontWeight: "600", color: "#A8B8CE" },
  summary: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(126,182,255,0.28)",
    backgroundColor: "rgba(47,111,237,0.14)",
    color: "#B8D4FF",
    padding: 12,
    fontSize: 12,
    fontWeight: "700",
  },
  summaryBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(126,182,255,0.28)",
    backgroundColor: "rgba(47,111,237,0.14)",
    padding: 12,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  summaryText: { color: "#B8D4FF", fontSize: 12, fontWeight: "700" },
  summaryPart: { textDecorationLine: "underline", textDecorationColor: "rgba(184,212,255,0.45)" },
  emptyHint: { color: "#A8B8CE", fontSize: 12, fontWeight: "600", paddingVertical: 18, paddingHorizontal: 4 },
  save: {
    borderRadius: 14,
    paddingVertical: 13,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
    marginTop: 2,
  },
  saveFlex: { flex: 1 },
  saveOff: { opacity: 0.45 },
  buildActions: { flexDirection: "row", gap: 8 },
  ghost: {
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(126,182,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },
  ghostText: { color: colors.metricBlueSoft, fontSize: 14, fontWeight: "800" },
  saveText: { color: colors.white, fontSize: 14, fontWeight: "800" },
});
