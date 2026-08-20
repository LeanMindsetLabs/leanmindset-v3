import { Pressable, StyleSheet, Text, View } from "react-native";
import { openLegalPage } from "@/src/lib/legal";

/** Footer copy — light neutral top line, vibrant link blue on Terms/Privacy/Community. */
const LEGAL_NOTE = "rgba(244, 244, 245, 0.88)";
const LEGAL_LINK = "#4285F4";

export default function AuthLegalFooter() {
  return (
    <View style={styles.legal}>
      <Text style={styles.legalNote}>By continuing you agree to our</Text>
      <View style={styles.legalRow}>
        <Pressable onPress={() => void openLegalPage("terms")} accessibilityRole="link">
          <Text style={styles.legalLink}>Terms</Text>
        </Pressable>
        <Text style={styles.legalDot}> • </Text>
        <Pressable onPress={() => void openLegalPage("privacy")} accessibilityRole="link">
          <Text style={styles.legalLink}>Privacy</Text>
        </Pressable>
        <Text style={styles.legalDot}> • </Text>
        <Pressable onPress={() => void openLegalPage("community")} accessibilityRole="link">
          <Text style={styles.legalLink}>Community</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legal: { alignItems: "center", gap: 4 },
  legalRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  legalNote: { fontSize: 14, lineHeight: 20, color: LEGAL_NOTE },
  legalLink: { fontSize: 14, lineHeight: 20, color: LEGAL_LINK, fontWeight: "500" },
  legalDot: { fontSize: 14, lineHeight: 20, color: LEGAL_LINK },
});
