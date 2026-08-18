import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "@/src/theme/colors";

const SIZE = 56;
const CX = 28;
const CY = 28;

export default function CheckInAskCard() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Log check-in"
      onPress={() => router.push("/(tabs)/checkin")}
      style={styles.hit}
    >
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <Circle cx={CX} cy={CY} r={26} fill={colors.surface} stroke={colors.accentBlue} strokeWidth={2} />
        <Circle cx={CX} cy={CY} r={22} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
      </Svg>
      <View style={styles.center} pointerEvents="none">
        <Text style={styles.stack}>Check</Text>
        <Text style={styles.stack}>in</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    width: SIZE,
    height: SIZE,
    flexShrink: 0,
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  stack: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "800",
    color: "#F5F7FB",
    letterSpacing: -0.2,
  },
});
