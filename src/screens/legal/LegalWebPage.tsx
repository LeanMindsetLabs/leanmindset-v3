import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { legalPages } from "@/src/content/legalPages";
import { colors } from "@/src/theme/colors";
import { useRouter } from "expo-router";

const titles = {
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  community: "Community Guidelines",
} as const;

export default function LegalWebPage({ page }: { page: keyof typeof legalPages }) {
  const router = useRouter();
  const blocks = legalPages[page];

  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <Text style={styles.brand}>LeanMindset</Text>
        <View style={styles.nav}>
          <NavLink label="Terms" onPress={() => router.replace("/legal/terms")} />
          <NavLink label="Privacy" onPress={() => router.replace("/legal/privacy")} />
          <NavLink label="Community" onPress={() => router.replace("/legal/community-guidelines")} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.main}>
        {blocks.map((block, index) => {
          if (block.tag === "h1") return <Text key={index} style={styles.h1}>{block.text}</Text>;
          if (block.tag === "h2") return <Text key={index} style={styles.h2}>{block.text}</Text>;
          if (block.tag === "h3") return <Text key={index} style={styles.h3}>{block.text}</Text>;
          return <Text key={index} style={styles.p}>{block.text}</Text>;
        })}
        <Text style={styles.foot}>© {new Date().getFullYear()} VERIXLABS · {titles[page]}</Text>
      </ScrollView>
    </View>
  );
}

function NavLink({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="link">
      <Text style={styles.link}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0F1112",
  },
  top: {
    maxWidth: 760,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
    gap: 12,
  },
  brand: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  nav: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  link: {
    color: colors.accentBlue,
    fontSize: 14,
    fontWeight: "600",
  },
  main: {
    maxWidth: 760,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 64,
  },
  h1: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 16,
  },
  h2: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 28,
    marginBottom: 10,
  },
  h3: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
  },
  p: {
    color: "#D4D4D8",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  foot: {
    marginTop: 32,
    color: colors.textMuted,
    fontSize: 13,
  },
});
