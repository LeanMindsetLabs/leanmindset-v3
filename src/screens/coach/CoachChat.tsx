import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type TextInput,
} from "react-native";
import AppTextInput from "@/src/ui/AppTextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
} from "@/src/services/coachService";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
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

const glassWeb = {
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
} as const;

const inputWeb = {
  borderWidth: 0,
} as const;

export default function CoachChat() {
  const { setComposerOpen, setLogMenuOpen } = useUiVariant();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<CoachMessage[]>(initialMessages);
  const [typing, setTyping] = useState(false);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState("");
  const [keyboardInset, setKeyboardInset] = useState(0);
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

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const show = Keyboard.addListener(showEvent, (event) => {
      setKeyboardInset(event.endCoordinates.height);
      setTimeout(() => endRef.current?.scrollToEnd({ animated: true }), 50);
    });
    const hide = Keyboard.addListener(hideEvent, () => setKeyboardInset(0));

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return;
    const viewport = window.visualViewport;
    if (!viewport) return;

    const sync = () => {
      const inset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      setKeyboardInset(inset);
    };

    sync();
    viewport.addEventListener("resize", sync);
    viewport.addEventListener("scroll", sync);
    return () => {
      viewport.removeEventListener("resize", sync);
      viewport.removeEventListener("scroll", sync);
    };
  }, []);

  const composerPadBottom =
    keyboardInset > 0
      ? Math.max(8, keyboardInset - insets.bottom)
      : composing
        ? insets.bottom + 8
        : layout.tabBarContentInset;

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
    const reply = getCoachReply(trimmed);
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
      <View style={styles.flex}>
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
          </View>
        ) : null}

        <View style={[styles.composerDock, { paddingBottom: composerPadBottom }]}>
          <View style={[styles.composer, Platform.OS === "web" ? glassWeb : null]}>
            <AppTextInput
              ref={inputRef}
              style={[styles.input, Platform.OS === "web" ? inputWeb : null]}
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
      </View>
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
  composerDock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingTop: 8,
    flexShrink: 0,
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
  input: {
    flex: 1,
    height: 34,
    color: "#F5F7FB",
    fontSize: 11,
    backgroundColor: "transparent",
    padding: 0,
  },
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
