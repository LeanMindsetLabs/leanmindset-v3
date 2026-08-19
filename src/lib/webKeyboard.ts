import { Keyboard } from "react-native";

export type WebKeyboardMode = "default" | "decimal";

type State = {
  visible: boolean;
  mode: WebKeyboardMode;
};

const QWERTY_HEIGHT = 336;
const DECIMAL_HEIGHT = 292;

let state: State = { visible: false, mode: "default" };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

let measuredHeight = 0;

export function getWebKeyboardHeight() {
  if (!state.visible) return 0;
  if (measuredHeight > 0) return measuredHeight;
  return state.mode === "decimal" ? DECIMAL_HEIGHT : QWERTY_HEIGHT;
}

export function setWebKeyboardMeasuredHeight(height: number) {
  const next = Math.round(height);
  if (next <= 0 || next === measuredHeight) return;
  measuredHeight = next;
  emit();
}

export function getWebKeyboardState() {
  return state;
}

export function subscribeWebKeyboard(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function showWebKeyboard(mode: WebKeyboardMode = "default") {
  state = { visible: true, mode };
  emit();
}

export function hideWebKeyboard() {
  if (!state.visible) return;
  state = { ...state, visible: false };
  emit();
}

export function webKeyboardModeFromInput(el: HTMLElement): WebKeyboardMode {
  const input = el as HTMLInputElement;
  const mode = (input.inputMode || input.getAttribute("inputmode") || "").toLowerCase();
  const type = (input.type || "").toLowerCase();
  if (mode === "decimal" || mode === "numeric" || type === "number" || type === "tel") return "decimal";
  return "default";
}

export function isWebTextField(el: EventTarget | null): el is HTMLInputElement | HTMLTextAreaElement {
  if (!(el instanceof HTMLElement)) return false;
  if (el instanceof HTMLTextAreaElement) return true;
  if (!(el instanceof HTMLInputElement)) return false;
  if (el.type === "file" || el.type === "checkbox" || el.type === "radio" || el.type === "button" || el.type === "submit") {
    return false;
  }
  return true;
}

export function insertIntoFocusedField(text: string) {
  if (typeof document === "undefined") return;
  const el = document.activeElement;
  if (!isWebTextField(el)) return;
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  const next = el.value.slice(0, start) + text + el.value.slice(end);
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  setter?.call(el, next);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  const caret = start + text.length;
  el.setSelectionRange(caret, caret);
}

export function deleteFromFocusedField() {
  if (typeof document === "undefined") return;
  const el = document.activeElement;
  if (!isWebTextField(el)) return;
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  const from = start === end ? Math.max(0, start - 1) : start;
  const next = el.value.slice(0, from) + el.value.slice(end);
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  setter?.call(el, next);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.setSelectionRange(from, from);
}

export function submitFocusedField() {
  if (typeof document === "undefined") return;
  const el = document.activeElement;
  if (!isWebTextField(el)) return;
  el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }));
  el.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", bubbles: true }));
}

const originalDismiss = Keyboard.dismiss.bind(Keyboard);
Keyboard.dismiss = () => {
  hideWebKeyboard();
  originalDismiss();
};
