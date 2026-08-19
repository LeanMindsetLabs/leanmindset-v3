import { useEffect, useState, useSyncExternalStore } from "react";
import { Keyboard, Platform } from "react-native";
import { getWebKeyboardHeight, subscribeWebKeyboard } from "@/src/lib/webKeyboard";

/** Keyboard overlap in px. Use as paddingBottom so sheets and footers stay visible. */
export function useKeyboardHeight() {
  const webHeight = useSyncExternalStore(subscribeWebKeyboard, getWebKeyboardHeight, () => 0);
  const [nativeHeight, setNativeHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === "web") return;
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const show = Keyboard.addListener(showEvent, (event) => {
      setNativeHeight(event.endCoordinates.height);
    });
    const hide = Keyboard.addListener(hideEvent, () => setNativeHeight(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return Platform.OS === "web" ? webHeight : nativeHeight;
}
