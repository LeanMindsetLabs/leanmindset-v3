import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AppScreen from "@/src/layout/AppScreen";
import { useUiVariant } from "@/src/context/UiVariantContext";
import {
  createAssistantMessage,
  createUserMessage,
  getCoachReply,
  initialMessages,
  quickActions,
  replyDelay,
  type CoachMessage,
  type ReflectionId,
} from "@/src/services/coachService";
import { colors } from "@/src/theme/colors";
import AvatarBadge from "@/src/ui/AvatarBadge";
import InsightCard from "@/src/ui/InsightCard";
import LogFab from "@/src/ui/LogFab";

const actionIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  utensils: "restaurant-outline",
  clock: "time-outline",
  cake: "ice-cream-outline",
  sliders: "options-outline",
  plane: "airplane-outline",
  battery: "battery-half-outline",
};

const reflections: { id: ReflectionId; label: string; color: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "stress", label: "Stress", color: "#5B9DFF", icon: "flash-outline" },
  { id: "time", label: "Time", color: "#19E68C", icon: "time-outline" },
  { id: "hunger", label: "Hunger", color: "#F5B83D", icon: "nutrition-outline" },
  { id: "social", label: "Social event", color: "#9A6CFF", icon: "people-outline" },
  { id: "cravings", label: "Cravings", color: "#FF5E72", icon: "ice-cream-outline" },
];

const glassWeb = {
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
} as const;

export default function CoachChat() {
  const { setComposerOpen, setLogMenuOpen } = useUiVariant();
  const [messages, setMessages] = useState<CoachMessage[]>(initialMessages);
  const [typing, setTyping] = useState(false);
  const [reflection, setReflection] = useState<ReflectionId | null>(null);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<TextInput>(null);
  const endRef = useRef<ScrollView>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (blurTimer.current) clearTimeout(blurTimer.current);
      setComposerOpen(false);
    };
  }, [setComposerOpen]);

  function enterChat() {
    if (blurTimer.current) clearTimeout(blurTimer.current);
    setComposing(true);
    setComposerOpen(true);
  }

  function leaveChat() {
    setComposing(false);
    setComposerOpen(false);
  }

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const userMessage = createUserMessage(trimmed);
    setMessages((current) => [...current, userMessage]);
    setTyping(true);
    setDraft("");
    const reply = getCoachReply(trimmed, reflection);
    timerRef.current = setTimeout(() => {
      setMessages((current) => [
        ...current.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "read" as const } : msg)),
        createAssistantMessage(reply),
      ]);
      setTyping(false);
    }, replyDelay());
  }

  return (
    <AppScreen edges={["top"]} padded={false}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {!composing ? (
          <View style={styles.top}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Coach</Text>
                <Text style={styles.subtitle}>Ask for help, ideas, or a plan</Text>
              </View>
              <AvatarBadge />
            </View>
            <View style={styles.rule} />
          </View>
        ) : null}

        {!composing ? (
          <View style={styles.focusWrap}>
            <InsightCard
              title="Today's coaching focus"
              body="You're doing well. Prioritize hydration and complete your workout."
              cta="View tips"
            />
          </View>
        ) : null}

        <ScrollView
          ref={endRef}
          style={styles.threadScroll}
          contentContainerStyle={styles.thread}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => endRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <Bubble key={message.id} message={message} />
          ))}
          {typing ? (
            <Bubble message={{ id: "typing", role: "assistant", text: "", time: "" }} typing />
          ) : null}
        </ScrollView>

        {!composing ? (
          <View style={styles.fixedAsk}>
            <Text style={styles.ask}>Ask your coach</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
              {quickActions.map((action) => (
                <Pressable
                  key={action.id}
                  style={styles.quick}
                  onPress={() => sendMessage(action.message)}
                  accessibilityLabel={action.label.replace("\n", " ")}
                >
                  <Ionicons name={actionIcons[action.icon] ?? "help-outline"} size={15} color={action.color} />
                  <Text style={styles.quickLabel}>{action.label}</Text>
                  <Ionicons name="chevron-forward" size={12} color="#6E7D92" />
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.reflect}>
              <View style={styles.reflectHead}>
                <View>
                  <Text style={styles.reflectTitle}>60-second reflection</Text>
                  <Text style={styles.reflectSub}>How are you feeling right now?</Text>
                </View>
                <Ionicons name="information-circle-outline" size={14} color="#8495AD" />
              </View>
              <View style={styles.reflectRow}>
                {reflections.map((opt) => {
                  const selected = reflection === opt.id;
                  return (
                    <Pressable
                      key={opt.id}
                      style={[styles.reflectOpt, selected && styles.reflectSelected]}
                      onPress={() => setReflection((current) => (current === opt.id ? null : opt.id))}
                    >
                      <Ionicons name={opt.icon} size={18} color={opt.color} />
                      <Text style={[styles.reflectLabel, selected && styles.reflectLabelOn]}>{opt.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        ) : null}

        <View style={[styles.composerDock, composing && styles.composerDockActive]}>
          <View style={[styles.composer, Platform.OS === "web" ? glassWeb : null]}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={draft}
              onChangeText={setDraft}
              onFocus={enterChat}
              onBlur={() => {
                blurTimer.current = setTimeout(leaveChat, 180);
              }}
              placeholder="Ask your coach..."
              placeholderTextColor="#6E7D92"
              accessibilityLabel="Ask your coach"
              returnKeyType="send"
              onSubmitEditing={() => sendMessage(draft)}
            />
            <Pressable style={styles.mic} accessibilityLabel="Voice memo">
              <Ionicons name="mic-outline" size={16} color="#C5D4EA" />
            </Pressable>
            <Pressable
              style={[styles.send, !draft.trim() && styles.sendOff]}
              disabled={!draft.trim()}
              onPress={() => sendMessage(draft)}
              accessibilityLabel="Send message"
            >
              <Ionicons name="arrow-up" size={18} color={colors.white} />
            </Pressable>
          </View>
          {!composing ? <LogFab onPress={() => setLogMenuOpen(true)} /> : null}
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

function Bubble({ message, typing }: { message: CoachMessage; typing?: boolean }) {
  const isUser = message.role === "user";
  return (
    <View style={[styles.msg, isUser && styles.msgUser]}>
      {!isUser ? (
        <View style={styles.spark}>
          <Ionicons name="sparkles" size={11} color="#7EABFF" />
        </View>
      ) : null}
      <View style={[styles.msgCol, isUser && styles.msgColUser]}>
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleCoach]}>
          {typing ? (
            <Text style={styles.typing}>● ● ●</Text>
          ) : (
            <Text style={styles.bubbleText}>{message.text}</Text>
          )}
        </View>
        {!typing && message.time ? (
          <View style={[styles.meta, isUser && styles.metaUser]}>
            <Text style={styles.metaText}>{message.time}</Text>
            {isUser ? <Ionicons name="checkmark-done" size={12} color="#8E8E93" /> : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  top: { paddingHorizontal: 16, paddingTop: 8 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  title: { fontSize: 26, lineHeight: 31, fontWeight: "700", letterSpacing: -0.4, color: "#F5F7FB" },
  subtitle: { marginTop: 1, fontSize: 11, lineHeight: 15, color: "#8E8E93" },
  rule: { height: 1, marginTop: 10, backgroundColor: "rgba(255,255,255,0.08)" },
  focusWrap: { paddingHorizontal: 16, paddingTop: 8, flexShrink: 0 },
  threadScroll: { flex: 1, minHeight: 72 },
  thread: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 8, gap: 8 },
  msg: { flexDirection: "row", alignItems: "flex-end", gap: 6, width: "100%" },
  msgUser: { justifyContent: "flex-end" },
  spark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  msgCol: { maxWidth: "78%", flexShrink: 1 },
  msgColUser: { alignItems: "flex-end", marginLeft: "auto" },
  bubble: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  bubbleCoach: {
    backgroundColor: "#3A3A3C",
    borderBottomLeftRadius: 4,
    alignSelf: "flex-start",
  },
  bubbleUser: {
    backgroundColor: "#0A84FF",
    borderBottomRightRadius: 4,
    alignSelf: "flex-end",
  },
  bubbleText: { fontSize: 15, lineHeight: 20, color: "#FFFFFF", fontWeight: "400" },
  typing: { color: "rgba(255,255,255,0.55)", fontSize: 15, letterSpacing: 3 },
  meta: { marginTop: 4, flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 4 },
  metaUser: { justifyContent: "flex-end" },
  metaText: { fontSize: 11, lineHeight: 13, color: "#8E8E93" },
  fixedAsk: { flexShrink: 0, paddingHorizontal: 16, paddingTop: 8, gap: 8 },
  ask: { fontSize: 11, fontWeight: "500", color: "#A6B4C8" },
  quickRow: { gap: 8, paddingBottom: 2 },
  quick: {
    minWidth: 118,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 11,
  },
  quickLabel: { fontSize: 10, lineHeight: 13, fontWeight: "500", color: "#E8EEF6" },
  reflect: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 8,
  },
  reflectHead: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8, paddingHorizontal: 2 },
  reflectTitle: { fontSize: 13, fontWeight: "600", color: "#F5F7FB" },
  reflectSub: { marginTop: 2, fontSize: 10, color: "#8B9BB0" },
  reflectRow: { flexDirection: "row", gap: 5 },
  reflectOpt: {
    flex: 1,
    minHeight: 62,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
  },
  reflectSelected: { backgroundColor: "rgba(255,255,255,0.06)" },
  reflectLabel: { fontSize: 8.5, fontWeight: "500", color: "#B7C3D4", textAlign: "center" },
  reflectLabelOn: { color: "#DCE6F5" },
  composerDock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    flexShrink: 0,
  },
  composerDockActive: {
    paddingBottom: 10,
  },
  composer: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minHeight: 48,
    paddingLeft: 14,
    paddingRight: 6,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(44,44,46,0.38)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },
  input: { flex: 1, height: 34, color: "#F5F7FB", fontSize: 11 },
  mic: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  send: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  sendOff: { opacity: 0.38 },
});
