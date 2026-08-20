import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";

const KEYBOARD_BG = "rgba(0, 0, 0, 0.74)";
const KEY_BG = "#2A2A2A";
const KEY_BG_PRESSED = "#3A3A3A";

const KEY_LETTERS: Record<string, string | undefined> = {
  "2": "ABC",
  "3": "DEF",
  "4": "GHI",
  "5": "JKL",
  "6": "MNO",
  "7": "PQRS",
  "8": "TUV",
  "9": "WXYZ",
};

const ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
] as const;

type OtpKeypadProps = {
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  autofillCode?: string;
  onAutofill?: () => void;
};

export default function OtpKeypad({
  onDigit,
  onBackspace,
  autofillCode,
  onAutofill,
}: OtpKeypadProps) {
  const showAutofill = Boolean(autofillCode && onAutofill);

  return (
    <View style={styles.wrap}>
      {showAutofill ? (
        <Pressable
          onPress={onAutofill}
          style={styles.autofillBar}
          accessibilityRole="button"
          accessibilityLabel={`Fill verification code ${autofillCode}`}
        >
          <Text style={styles.autofillCode}>{autofillCode}</Text>
        </Pressable>
      ) : null}

      <View style={styles.grid}>
        {ROWS.map((row) => (
          <View key={row[0]} style={styles.row}>
            {row.map((key) => (
              <Key key={key} label={key} letters={KEY_LETTERS[key]} onPress={() => onDigit(key)} />
            ))}
          </View>
        ))}
        <View style={styles.row}>
          <View style={styles.spacer} />
          <Key label="0" onPress={() => onDigit("0")} />
          <Pressable
            onPress={onBackspace}
            style={styles.backspace}
            accessibilityRole="button"
            accessibilityLabel="Backspace"
          >
            <Ionicons name="backspace-outline" size={28} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function Key({
  label,
  letters,
  onPress,
}: {
  label: string;
  letters?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.keyDigit, !letters && styles.keyDigitSolo]}>{label}</Text>
      {letters ? <Text style={styles.keyLetters}>{letters}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: KEYBOARD_BG,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255,255,255,0.1)",
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    overflow: "hidden",
  },
  autofillBar: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 2,
    minHeight: 22,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  autofillCode: {
    color: "rgba(255, 255, 255, 0.92)",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.4,
  },
  grid: {
    paddingHorizontal: 6,
    paddingTop: 8,
    paddingBottom: 10,
    gap: 7,
  },
  row: {
    flexDirection: "row",
    gap: 7,
  },
  key: {
    flex: 1,
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: KEY_BG,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
  },
  keyPressed: {
    backgroundColor: KEY_BG_PRESSED,
  },
  keyDigit: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 32,
  },
  keyDigitSolo: {
    paddingTop: 0,
  },
  keyLetters: {
    color: "rgba(255, 255, 255, 0.92)",
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 1.8,
    lineHeight: 12,
    marginTop: -2,
  },
  spacer: {
    flex: 1,
  },
  backspace: {
    flex: 1,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
  },
});
