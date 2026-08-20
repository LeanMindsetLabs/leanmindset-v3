import { StyleSheet, Text, View } from "react-native";
import { LeanMindsetIcon, brandColors } from "@/src/ui/LeanMindsetBrand";

export default function AuthBrandHeader() {
  return (
    <View style={styles.brand}>
      <LeanMindsetIcon size={44} textScale={1.15} />
      <Text style={styles.wordmark}>
        <Text style={styles.lean}>lean</Text>
        <Text style={styles.mindset}>mindset</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: { alignItems: "center", gap: 10, marginBottom: 14 },
  wordmark: {
    fontSize: 19,
    lineHeight: 23,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  lean: { color: brandColors.mindset },
  mindset: { color: "rgba(244,244,245,0.72)" },
});
