import { useEffect, useRef, useState } from "react";
import {
  BatteryLow,
  Clock3,
  Plane,
  SlidersHorizontal,
  Utensils,
} from "lucide-react";
import CoachComposer from "../components/CoachComposer";
import CoachFocusCard from "../components/CoachFocusCard";
import CoachHeader from "../components/CoachHeader";
import CoachMessageBubble from "../components/CoachMessageBubble";
import CoachQuickAction from "../components/CoachQuickAction";
import CoachReflectionCard from "../components/CoachReflectionCard";
import { IconMuffin } from "../components/coachIcons";
import UiVariantToggle from "../components/UiVariantToggle";
import {
  createAssistantMessage,
  createUserMessage,
  getCoachReply,
  initialMessages,
  quickActions,
  replyDelay,
  type CoachMessage,
  type ReflectionId,
} from "../services/coachService";
import type { CoachUiVariant } from "./DailyCheckInScreen";
import "../styles/coach.css";
import "../styles/meals-log.css";

const actionIcons = {
  utensils: Utensils,
  clock: Clock3,
  sliders: SlidersHorizontal,
  plane: Plane,
  battery: BatteryLow,
} as const;

type CoachScreenProps = {
  onComposerFocusChange?: (focused: boolean) => void;
  incomingMessage?: string | null;
  onIncomingHandled?: () => void;
  coachVariant?: CoachUiVariant;
  onCoachVariantChange?: (next: CoachUiVariant) => void;
};

export default function CoachScreen({
  onComposerFocusChange,
  incomingMessage,
  onIncomingHandled,
  coachVariant = "chat",
  onCoachVariantChange,
}: CoachScreenProps) {
  const [messages, setMessages] = useState<CoachMessage[]>(initialMessages);
  const [typing, setTyping] = useState(false);
  const [reflection, setReflection] = useState<ReflectionId | null>(null);
  const [composerFocused, setComposerFocused] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const blurTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!composerFocused) return;
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, typing, composerFocused]);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const sync = () => {
      const inset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      document.documentElement.style.setProperty("--keyboard-inset", `${inset}px`);
    };

    sync();
    viewport.addEventListener("resize", sync);
    viewport.addEventListener("scroll", sync);
    return () => {
      viewport.removeEventListener("resize", sync);
      viewport.removeEventListener("scroll", sync);
      document.documentElement.classList.remove("keyboard-open");
      document.documentElement.style.removeProperty("--keyboard-inset");
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (blurTimerRef.current) window.clearTimeout(blurTimerRef.current);
    };
  }, []);

  function handleComposerFocusChange(focused: boolean) {
    if (blurTimerRef.current) {
      window.clearTimeout(blurTimerRef.current);
      blurTimerRef.current = null;
    }

    if (focused) {
      setComposerFocused(true);
      onComposerFocusChange?.(true);
      return;
    }

    // Delay blur so send tap still works; then restore panels.
    blurTimerRef.current = window.setTimeout(() => {
      setComposerFocused(false);
      onComposerFocusChange?.(false);
    }, 160);
  }

  function sendMessage(text: string) {
    if (typing) return;
    const userMessage = createUserMessage(text);
    setMessages((current) => [...current, userMessage]);
    setTyping(true);

    const reply = getCoachReply(text, reflection);
    timerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current.map((msg) =>
          msg.id === userMessage.id ? { ...msg, status: "read" as const } : msg
        ),
        createAssistantMessage(reply),
      ]);
      setTyping(false);
    }, replyDelay());
  }

  useEffect(() => {
    if (!incomingMessage) return;
    sendMessage(incomingMessage);
    onIncomingHandled?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingMessage]);

  return (
    <div className={`coach-screen${composerFocused ? " is-composing" : ""}`}>
      {onCoachVariantChange ? (
        <div className="coach-classic-bar">
          <UiVariantToggle
            label="Coach layout"
            value={coachVariant}
            onChange={onCoachVariantChange}
            options={[
              { id: "chat", label: "Chat" },
              { id: "checkin", label: "Daily Check-in" },
            ]}
          />
        </div>
      ) : null}
      <div className="coach-top">
        <CoachHeader />
        <div className="coach-header-rule" aria-hidden="true" />
      </div>

      <div className="coach-scroll">
        {!composerFocused && <CoachFocusCard />}

        <div className="coach-thread">
          {messages.map((message) => (
            <CoachMessageBubble key={message.id} message={message} />
          ))}
          {typing && (
            <CoachMessageBubble
              message={{
                id: "typing",
                role: "assistant",
                text: "",
                time: "",
              }}
              typing
            />
          )}
          <div ref={endRef} />
        </div>

        {!composerFocused && (
          <>
            <h2 className="coach-ask-heading">Ask your coach</h2>
            <div className="coach-quick-grid">
              {quickActions.map((action) => {
                const icon =
                  action.icon === "cake" ? (
                    <IconMuffin size={15} />
                  ) : (
                    (() => {
                      const LucideIcon = actionIcons[action.icon];
                      return <LucideIcon size={15} strokeWidth={1.9} />;
                    })()
                  );

                return (
                  <CoachQuickAction
                    key={action.id}
                    label={action.label}
                    color={action.color}
                    icon={icon}
                    onClick={() => sendMessage(action.message)}
                  />
                );
              })}
            </div>

            <CoachReflectionCard
              selected={reflection}
              onSelect={(id) => setReflection((current) => (current === id ? null : id))}
            />
          </>
        )}
      </div>

      <CoachComposer
        onSend={sendMessage}
        onFocusChange={handleComposerFocusChange}
      />
    </div>
  );
}
