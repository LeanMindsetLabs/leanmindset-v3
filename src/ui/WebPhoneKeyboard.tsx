import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  deleteFromFocusedField,
  getWebKeyboardState,
  hideWebKeyboard,
  insertIntoFocusedField,
  isWebTextField,
  setWebKeyboardMeasuredHeight,
  showWebKeyboard,
  submitFocusedField,
  subscribeWebKeyboard,
  webKeyboardModeFromInput,
} from "@/src/lib/webKeyboard";
import { colors } from "@/src/theme/colors";

const LETTERS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
] as const;

const NUMBERS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
] as const;

function holdFocus(event: { preventDefault?: () => void }) {
  event.preventDefault?.();
}

const webHold = {
  onMouseDown: (event: { preventDefault: () => void }) => event.preventDefault(),
} as const;

export default function WebPhoneKeyboard() {
  const [state, setState] = useState(getWebKeyboardState);
  const [shifted, setShifted] = useState(false);

  useEffect(() => subscribeWebKeyboard(() => setState(getWebKeyboardState())), []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onFocusIn = (event: FocusEvent) => {
      if (!isWebTextField(event.target)) return;
      showWebKeyboard(webKeyboardModeFromInput(event.target));
    };
    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget;
      if (next instanceof HTMLElement && next.closest("#lm-web-keyboard")) return;
      window.setTimeout(() => {
        if (!isWebTextField(document.activeElement)) hideWebKeyboard();
      }, 40);
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  if (!state.visible) return null;

  const typeChar = (char: string) => {
    insertIntoFocusedField(shifted ? char.toUpperCase() : char);
    if (shifted) setShifted(false);
  };

  return (
    <View nativeID="lm-web-keyboard" style={styles.wrap} pointerEvents="box-none">
      <View
        nativeID="lm-web-keyboard"
        style={styles.board}
        onStartShouldSetResponder={() => true}
        onLayout={(event) => setWebKeyboardMeasuredHeight(event.nativeEvent.layout.height)}
      >
        {state.mode === "decimal" ? (
          <>
            {NUMBERS.map((row) => (
              <View key={row[0]} style={styles.row}>
                {row.map((key) => (
                  <Key key={key} label={key} wide onPress={() => insertIntoFocusedField(key)} />
                ))}
              </View>
            ))}
            <View style={styles.row}>
              <Key label="." wide onPress={() => insertIntoFocusedField(".")} />
              <Key label="0" wide onPress={() => insertIntoFocusedField("0")} />
              <Key label="⌫" wide onPress={deleteFromFocusedField} />
            </View>
            <View style={styles.row}>
              <Key label="ABC" muted flex={1.2} onPress={() => showWebKeyboard("default")} />
              <View style={{ flex: 5 }} />
              <Pressable onPress={submitFocusedField} onPressIn={holdFocus} {...webHold} style={styles.go} accessibilityLabel="Go">
                <Text style={styles.goText}>→</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <View style={styles.suggest}>
              <Text style={styles.suggestItem}>I</Text>
              <Text style={styles.suggestItem}>The</Text>
              <Text style={styles.suggestItem}>I'm</Text>
            </View>
            {LETTERS.map((row, index) => (
              <View key={index} style={[styles.row, index === 1 && styles.rowPad]}>
                {index === 2 ? <Key label="⇧" muted onPress={() => setShifted((on) => !on)} /> : null}
                {row.map((key) => (
                  <Key key={key} label={shifted ? key.toUpperCase() : key} onPress={() => typeChar(key)} />
                ))}
                {index === 2 ? <Key label="⌫" muted onPress={deleteFromFocusedField} /> : null}
              </View>
            ))}
            <View style={styles.row}>
              <Key label="123" muted flex={1.2} onPress={() => showWebKeyboard("decimal")} />
              <Key label="space" flex={5} onPress={() => insertIntoFocusedField(" ")} />
              <Pressable onPress={submitFocusedField} onPressIn={holdFocus} {...webHold} style={styles.go} accessibilityLabel="Go">
                <Text style={styles.goText}>→</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

function Key({
  label,
  onPress,
  wide,
  muted,
  flex,
}: {
  label: string;
  onPress: () => void;
  wide?: boolean;
  muted?: boolean;
  flex?: number;
}) {
  return (
    <Pressable
      onPress={onPress}
      onPressIn={holdFocus}
      {...webHold}
      style={[styles.key, wide && styles.keyWide, muted && styles.keyMuted, flex ? { flex } : null]}
      accessibilityLabel={label}
    >
      <Text style={styles.keyText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFill,
    justifyContent: "flex-end",
    zIndex: 80,
  },
  board: {
    backgroundColor: "#1c1c1e",
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 10,
    gap: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255,255,255,0.12)",
  },
  suggest: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  suggestItem: {
    color: colors.white,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  rowPad: {
    paddingHorizontal: 16,
  },
  key: {
    flex: 1,
    height: 42,
    borderRadius: 6,
    backgroundColor: "#3a3a3c",
    alignItems: "center",
    justifyContent: "center",
  },
  keyWide: {
    flex: 1,
    height: 46,
  },
  keyMuted: {
    backgroundColor: "#2c2c2e",
    flexGrow: 0,
    width: 44,
    flex: 0,
    paddingHorizontal: 10,
  },
  keyText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "500",
  },
  go: {
    width: 74,
    height: 42,
    borderRadius: 6,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  goText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
  },
});
