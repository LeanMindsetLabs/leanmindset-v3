import { CheckCheck, Sparkles } from "lucide-react";
import type { CoachMessage } from "../services/coachService";
import "../styles/coach.css";

type CoachMessageBubbleProps = {
  message: CoachMessage;
  typing?: boolean;
};

export default function CoachMessageBubble({
  message,
  typing = false,
}: CoachMessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`coach-msg ${isUser ? "user" : "assistant"}`}>
      {!isUser && (
        <div className="coach-msg-spark">
          <Sparkles size={11} strokeWidth={2} />
        </div>
      )}
      <div className="coach-msg-col">
        <div className="coach-bubble">
          {typing ? (
            <span className="coach-typing" aria-label="Coach is typing">
              <i />
              <i />
              <i />
            </span>
          ) : (
            message.text
          )}
        </div>
        {!typing && (
          <div className="coach-meta">
            <span>{message.time}</span>
            {isUser && (
              <CheckCheck size={11} strokeWidth={2.2} className="coach-checks" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
