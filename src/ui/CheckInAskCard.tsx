import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
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
        <SvgText
          x={CX}
          y={25}
          fill="#F5F7FB"
          fontSize={10}
          fontWeight="700"
          textAnchor="middle"
        >
          Check
        </SvgText>
        <SvgText
          x={CX}
          y={37}
          fill="#F5F7FB"
          fontSize={10}
          fontWeight="700"
          textAnchor="middle"
        >
          in
        </SvgText>
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    width: SIZE,
    height: SIZE,
    flexShrink: 0,
  },
});
