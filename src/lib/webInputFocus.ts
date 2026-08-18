import { Platform } from "react-native";

const STYLE_ID = "lm-web-input-focus-reset";

/** One-time global CSS so every native text field loses the browser default focus ring on web. */
export function installWebInputFocusReset() {
  if (Platform.OS !== "web" || typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    input:focus,
    input:focus-visible,
    textarea:focus,
    textarea:focus-visible {
      outline: none !important;
      outline-width: 0 !important;
      box-shadow: none !important;
    }
  `;
  document.head.appendChild(style);
}
