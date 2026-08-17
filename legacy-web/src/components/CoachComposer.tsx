import { ArrowUp, Mic, Plus } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import "../styles/coach.css";

type CoachComposerProps = {
  onSend: (text: string) => void;
  onFocusChange?: (focused: boolean) => void;
};

export default function CoachComposer({
  onSend,
  onFocusChange,
}: CoachComposerProps) {
  const [value, setValue] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const canSend = value.trim().length > 0;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSend) return;
    onSend(value.trim());
    setValue("");
  }

  return (
    <div className="coach-composer-dock">
      <input
        ref={fileRef}
        type="file"
        accept="image/*,.pdf,.txt,.doc,.docx"
        hidden
        multiple
        onChange={() => {
          // Selection is available for future upload wiring.
          if (fileRef.current) fileRef.current.value = "";
        }}
      />

      <button
        type="button"
        className="coach-attach"
        aria-label="Upload image or other options"
        onClick={() => fileRef.current?.click()}
      >
        <Plus size={18} strokeWidth={2.2} />
      </button>

      <form className="coach-composer" onSubmit={handleSubmit}>
        <input
          className="coach-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => onFocusChange?.(true)}
          onBlur={() => onFocusChange?.(false)}
          placeholder="Ask your coach..."
          aria-label="Ask your coach"
          enterKeyHint="send"
        />
        <button
          type="button"
          className="coach-mic"
          aria-label="Voice memo"
          onMouseDown={(e) => e.preventDefault()}
        >
          <Mic size={16} strokeWidth={1.9} />
        </button>
        <button
          type="submit"
          className="coach-send"
          disabled={!canSend}
          aria-label="Send message"
        >
          <ArrowUp size={18} strokeWidth={2.4} />
        </button>
      </form>
    </div>
  );
}
