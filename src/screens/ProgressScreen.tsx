import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { InPhoneModal } from "@/src/layout/PhoneOverlay";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useProfile } from "@/src/hooks/useProfile";
import { formatWeight, logout } from "@/src/services/profileService";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import MetricRing from "@/src/ui/MetricRing";

export default function ProgressScreen() {
  const { profile } = useProfile();
  const [confirm, setConfirm] = useState(false);

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>PROGRESS</Text>
        <View style={styles.identity}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{profile.user.initial}</Text></View>
          <View>
            <Text style={styles.name}>{profile.user.name}</Text>
            <Text style={styles.email}>{profile.user.email}</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <Pressable style={styles.summaryItem} onPress={() => router.push("/workout")}>
            <MetricRing size={64} strokeWidth={6} progress={profile.leanScore / 100} fillColor="#5B9DFF">
              <Text style={styles.score}>{profile.leanScore}</Text>
            </MetricRing>
            <Text style={styles.summaryLabel}>Lean score</Text>
          </Pressable>
          <View style={styles.summaryItem}>
            <Text style={styles.weight}>{formatWeight(profile.weightLb, profile.preferences.units)}</Text>
            <Text style={styles.summaryLabel}>Weight</Text>
          </View>
        </View>

        <View style={styles.group}>
          <Row icon="fitness-outline" label="My Program" value={profile.program.name} />
          <Row icon="resize-outline" label="Measurements" />
          <Row icon="pulse-outline" label="Integrations" value="Apple Health" />
          <Row icon="settings-outline" label="Settings" />
          <Row icon="help-circle-outline" label="Help & Support" />
          <Row icon="log-out-outline" label="Log out" onPress={() => setConfirm(true)} />
        </View>
      </ScrollView>

      <InPhoneModal visible={confirm}>
        <Pressable style={styles.sheet} onPress={() => setConfirm(false)}>
          <Pressable style={styles.sheetCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetH}>Log out</Text>
            <Text style={styles.sheetP}>This will clear your session and return you to sign in.</Text>
            <Pressable style={styles.confirm} onPress={() => { logout(); setConfirm(false); router.replace("/login"); }}>
              <Text style={styles.confirmText}>Log out</Text>
            </Pressable>
            <Pressable onPress={() => setConfirm(false)}><Text style={styles.cancel}>Cancel</Text></Pressable>
          </Pressable>
        </Pressable>
      </InPhoneModal>
    </SafeAreaView>
  );
}

function Row({ icon, label, value, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; value?: string; onPress?: () => void }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Ionicons name={icon} size={18} color={colors.white} />
      <Text style={styles.rowLabel}>{label}</Text>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={16} color="#8e8e93" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: layout.tabBarContentInset, gap: 16 },
  kicker: { fontSize: 11, letterSpacing: 1.6, color: "#8e8e93", fontWeight: "700" },
  identity: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: "#2c2c2e", alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.white, fontSize: 20, fontWeight: "700" },
  name: { color: colors.white, fontSize: 20, fontWeight: "700" },
  email: { color: "#8e8e93", fontSize: 13 },
  summary: { flexDirection: "row", gap: 8 },
  summaryItem: { flex: 1, backgroundColor: "#222529", borderRadius: 16, padding: 14, alignItems: "center", gap: 8 },
  score: { color: colors.white, fontWeight: "700" },
  weight: { color: colors.white, fontSize: 22, fontWeight: "700" },
  summaryLabel: { color: "#8e8e93", fontSize: 12 },
  group: { backgroundColor: "#222529", borderRadius: 16, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, minHeight: 52, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "rgba(255,255,255,0.06)" },
  rowLabel: { flex: 1, color: colors.white, fontSize: 15 },
  rowValue: { color: "#8e8e93", fontSize: 13 },
  sheet: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.55)", justifyContent: "flex-end" },
  sheetCard: { backgroundColor: "#222529", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, gap: 10 },
  sheetH: { color: colors.white, fontSize: 18, fontWeight: "700" },
  sheetP: { color: "#8e8e93" },
  confirm: { backgroundColor: "#3d7bff", borderRadius: 12, height: 44, alignItems: "center", justifyContent: "center" },
  confirmText: { color: colors.white, fontWeight: "700" },
  cancel: { color: "#8e8e93", textAlign: "center", padding: 8 },
});
