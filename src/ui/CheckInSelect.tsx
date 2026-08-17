import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { InPhoneModal } from "@/src/layout/PhoneOverlay";
import { colors } from "@/src/theme/colors";

type Option = { value: string; label: string };

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function CheckInSelect({ label, value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.trigger} onPress={() => setOpen(true)} accessibilityRole="button">
        <Text style={styles.triggerText} numberOfLines={1}>
          {selected?.label ?? value}
        </Text>
        <Text style={styles.caret}>▾</Text>
      </Pressable>
      <InPhoneModal visible={open}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            <Text style={styles.menuTitle}>{label}</Text>
            <ScrollView style={styles.menuList}>
              {options.map((o) => (
                <Pressable
                  key={o.value}
                  style={[styles.option, o.value === value && styles.optionActive]}
                  onPress={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                >
                  <Text style={[styles.optionText, o.value === value && styles.optionTextActive]}>{o.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </InPhoneModal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, minWidth: 0, gap: 4 },
  label: { fontSize: 9.5, fontWeight: "700", color: "#6E7D92", letterSpacing: 0.2 },
  trigger: {
    minHeight: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(0,0,0,0.28)",
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  triggerText: { color: colors.white, fontSize: 11, fontWeight: "700", flex: 1 },
  caret: { color: "#8EA0B8", fontSize: 10 },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 28,
  },
  menu: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 8,
    maxHeight: 280,
  },
  menuTitle: { color: "#8EA0B8", fontSize: 11, fontWeight: "700", padding: 8 },
  menuList: { maxHeight: 220 },
  option: { borderRadius: 8, paddingVertical: 9, paddingHorizontal: 10 },
  optionActive: { backgroundColor: "rgba(47,111,237,0.22)" },
  optionText: { color: "#C5D0E0", fontSize: 13, fontWeight: "700" },
  optionTextActive: { color: colors.white },
});
