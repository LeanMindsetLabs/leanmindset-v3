import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AppTextInput from "@/src/ui/AppTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createAssistantMessage,
  createUserMessage,
  getCoachReply,
  initialMessages,
  quickActions,
  type CoachMessage,
} from "@/src/services/coachService";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import InsightCard from "@/src/ui/InsightCard";

/** Current simplified Expo coach layout, kept as the Now toggle. */
export default function CoachNow() {
  const [messages, setMessages] = useState<CoachMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const user = createUserMessage(trimmed);
    setMessages((current) => [...current, user, createAssistantMessage(getCoachReply(trimmed, null))]);
    setDraft("");
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <Text style={styles.kicker}>COACH</Text>
      <Text style={styles.title}>LeanMindset</Text>
      <ScrollView style={styles.flex} contentContainerStyle={styles.thread} keyboardShouldPersistTaps="handled">
        <InsightCard
          title="Today's coaching focus"
          body="You're doing well. Prioritize hydration and complete your workout."
          cta="View tips"
        />
        {messages.map((message) => (
          <View key={message.id} style={[styles.bubble, message.role === "user" ? styles.user : styles.assistant]}>
            <Text style={{ color: colors.white }}>{message.text}</Text>
          </View>
        ))}
        <Text style={styles.ask}>Ask your coach</Text>
        <View style={styles.quick}>
          {quickActions.map((action) => (
            <Pressable key={action.id} style={styles.quickBtn} onPress={() => send(action.message)}>
              <Text style={styles.quickText}>{action.label.replace("\n", " ")}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View style={styles.composer}>
        <AppTextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Message"
          placeholderTextColor="#636366"
          style={styles.input}
          accessibilityLabel="Message the coach"
        />
        <Pressable style={styles.send} onPress={() => send(draft)}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 },
  flex: { flex: 1 },
  kicker: { fontSize: 11, letterSpacing: 1.6, color: "#8e8e93", fontWeight: "700" },
  title: { fontSize: 24, fontWeight: "700", color: colors.white },
  thread: { gap: 10, paddingBottom: layout.tabBarContentInset },
  bubble: { maxWidth: "86%", borderRadius: 16, padding: 12 },
  assistant: { alignSelf: "flex-start", backgroundColor: "#222529" },
  user: { alignSelf: "flex-end", backgroundColor: "#3d7bff" },
  ask: { color: colors.white, fontWeight: "700", marginTop: 8 },
  quick: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  quickBtn: { backgroundColor: "#222529", borderRadius: 12, padding: 10, width: "48%" },
  quickText: { color: colors.white, fontSize: 12 },
  composer: { flexDirection: "row", gap: 8, paddingVertical: 10, alignItems: "flex-end" },
  input: { flex: 1, minHeight: 44, borderRadius: 12, backgroundColor: "#222529", color: colors.white, paddingHorizontal: 12 },
  send: { backgroundColor: "#3d7bff", borderRadius: 12, paddingHorizontal: 14, height: 44, justifyContent: "center" },
  sendText: { color: colors.white, fontWeight: "700" },
});
