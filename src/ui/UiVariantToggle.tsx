import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";

type Option<T extends string> = { id: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (next: T) => void;
  label: string;
  compact?: boolean;
};

export default function UiVariantToggle<T extends string>({
  options,
  value,
  onChange,
  label,
  compact,
}: Props<T>) {
  return (
    <View style={[styles.wrap, compact && styles.wrapCompact]} accessibilityRole="tablist" accessibilityLabel={label}>
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <Pressable
            key={opt.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(opt.id)}
            style={[styles.btn, compact && styles.btnCompact, active && styles.active]}
          >
            <Text style={[styles.text, compact && styles.textCompact, active && styles.activeText]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: "flex-end",
    flexDirection: "row",
    gap: 3,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 2,
  },
  wrapCompact: {
    alignSelf: "center",
    borderRadius: 8,
    padding: 1,
  },
  btn: {
    borderRadius: 7,
    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  btnCompact: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  active: {
    backgroundColor: colors.accentBlue,
  },
  text: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 9,
    fontWeight: "700",
  },
  textCompact: {
    fontSize: 8,
  },
  activeText: {
    color: colors.white,
  },
});
