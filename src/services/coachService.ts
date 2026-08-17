export type CoachRole = "assistant" | "user";

export type CoachMessage = {
  id: string;
  role: CoachRole;
  text: string;
  time: string;
  status?: "sent" | "read";
};

export type ReflectionId =
  | "stress"
  | "time"
  | "hunger"
  | "social"
  | "cravings";

export const initialMessages: CoachMessage[] = [
  {
    id: "m1",
    role: "assistant",
    text: "You're 61g short on protein\ntoday. Want dinner ideas?",
    time: "9:20 AM",
  },
  {
    id: "m2",
    role: "user",
    text: "Yes, I need something quick.",
    time: "9:21 AM",
    status: "read",
  },
  {
    id: "m3",
    role: "assistant",
    text: "Try grilled chicken wraps,\nGreek yogurt with fruit,\nor tofu stir-fry.",
    time: "9:20 AM",
  },
];

export const quickActions = [
  {
    id: "eat-tonight",
    label: "What should\nI eat tonight?",
    message: "What should I eat tonight?",
    color: "#5B9DFF",
    icon: "utensils",
  },
  {
    id: "fifteen",
    label: "I only have\n15 min",
    message: "I only have 15 minutes. What's a good workout?",
    color: "#5B9DFF",
    icon: "clock",
  },
  {
    id: "sweets",
    label: "I'm craving\nsweets",
    message: "I'm craving sweets. What are some better options?",
    color: "#9A6CFF",
    icon: "cake",
  },
  {
    id: "adjust",
    label: "Adjust\nmy plan",
    message: "I need to adjust my plan. What should I change?",
    color: "#5B9DFF",
    icon: "sliders",
  },
  {
    id: "travel",
    label: "Travel day\nhelp",
    message: "It's a travel day. Help me with meals and a workout.",
    color: "#5B9DFF",
    icon: "plane",
  },
  {
    id: "energy",
    label: "Low energy\ntoday",
    message: "I have low energy today. What should I do?",
    color: "#19E68C",
    icon: "battery",
  },
] as const;

function formatTime(date = new Date()) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function nextId() {
  return `m-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function withReflection(base: string, reflection?: ReflectionId | null) {
  if (!reflection) return base;
  const note = {
    stress: "Keep it simple since you're stressed",
    time: "Keep it short since time is tight",
    hunger: "Make it filling since you're hungry",
    social: "Keep it flexible for the social event",
    cravings: "Build in a satisfying swap for cravings",
  }[reflection];
  return `${base} ${note}.`;
}

export function createUserMessage(text: string): CoachMessage {
  return {
    id: nextId(),
    role: "user",
    text,
    time: formatTime(),
    status: "sent",
  };
}

export function createAssistantMessage(text: string): CoachMessage {
  return {
    id: nextId(),
    role: "assistant",
    text,
    time: formatTime(),
  };
}

export function getCoachReply(
  message: string,
  reflection?: ReflectionId | null
): string {
  const m = message.toLowerCase();

  if (m.includes("eat tonight") || m.includes("dinner") || m.includes("protein")) {
    return withReflection(
      "Tonight, aim for 30–40g protein. Grilled chicken wraps or Greek yogurt with fruit are the fastest options.",
      reflection
    );
  }

  if (m.includes("15") || m.includes("workout") || m.includes("train")) {
    return withReflection(
      "Do Walk + Core A: 8 min brisk walk, 7 min of planks, dead bugs, and glute bridges.",
      reflection
    );
  }

  if (m.includes("sweet") || m.includes("craving")) {
    return withReflection(
      "Have Greek yogurt with berries, or dark chocolate with almonds. It curbs the craving without blowing dinner.",
      reflection
    );
  }

  if (m.includes("adjust") || m.includes("plan")) {
    return withReflection(
      "Tell me what slipped today — meals, training, or sleep — and I’ll tighten tomorrow’s plan around it.",
      reflection
    );
  }

  if (m.includes("travel")) {
    return withReflection(
      "Airport default: grilled chicken, yogurt, and water. Skip the long workout — do a 15 min hotel-room circuit.",
      reflection
    );
  }

  if (m.includes("energy") || m.includes("tired")) {
    return withReflection(
      "Drop intensity. Walk 20 minutes, eat a protein-forward meal, and get 500ml water in the next hour.",
      reflection
    );
  }

  return withReflection(
    "Got it. Prioritize protein, water, and a short workout. What do you want help with first?",
    reflection
  );
}

export function replyDelay() {
  return 700;
}
