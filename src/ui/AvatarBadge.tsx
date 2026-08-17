import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";

type Props = {
  letter?: string;
  size?: number;
};

export default function AvatarBadge({ letter = "M", size = 40 }: Props) {
  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.letter}>{letter}</Text>
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#2C2C2E",
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  dot: {
    position: "absolute",
    right: -1,
    bottom: -1,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.background,
  },
});
