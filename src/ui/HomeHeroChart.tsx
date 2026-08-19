import { type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { type Href, router } from "expo-router";
import { colors } from "@/src/theme/colors";

const READY = 0.72;
const FUEL = 0.78;
const TRAIN = 8.4 / 10;
const READY_N = 72;
const FUEL_N = 78;
const TRAIN_N = 8.4;

export default function HomeHeroChart() {
  return (
    <View style={styles.dials}>
      <Pressable style={styles.dial} onPress={() => router.push("/(tabs)/profile/" as Href)}>
        <DualRing size={104} progress={READY} fillColor="#F5C400">
          <Text style={styles.num}>{READY_N}</Text>
          <Text style={styles.denom}>/100</Text>
        </DualRing>
        <Text style={[styles.label, { color: "#F5C400" }]}>READY ›</Text>
        <Text style={styles.sub}>Body & Mind</Text>
      </Pressable>
      <Pressable style={styles.dial} onPress={() => router.push("/(tabs)/meals")}>
        <DualRing size={104} progress={FUEL} fillColor="#7EB6FF">
          <Text style={styles.num}>{FUEL_N}</Text>
          <Text style={styles.denom}>/100</Text>
        </DualRing>
        <Text style={[styles.label, { color: "#7EB6FF" }]}>FUEL ›</Text>
        <Text style={styles.sub}>Nutrition</Text>
      </Pressable>
      <Pressable style={styles.dial} onPress={() => router.push("/(tabs)/train")}>
        <DualRing size={104} progress={TRAIN} fillColor="#3D7BFF">
          <Text style={styles.num}>{TRAIN_N}</Text>
          <Text style={styles.denom}>/10</Text>
        </DualRing>
        <Text style={[styles.label, { color: "#3D7BFF" }]}>TRAIN ›</Text>
        <Text style={styles.sub}>Performance</Text>
      </Pressable>
    </View>
  );
}

function DualRing({
  size,
  progress,
  fillColor,
  children,
}: {
  size: number;
  progress: number;
  fillColor: string;
  children?: ReactNode;
}) {
  const outerStroke = 5.5;
  const innerStroke = 1.5;
  const gap = 3;
  const outerR = (size - outerStroke) / 2;
  const innerR = outerR - outerStroke / 2 - gap - innerStroke / 2;
  const circ = 2 * Math.PI * outerR;
  const clamped = Math.min(1, Math.max(0, progress));
  const cx = size / 2;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size}>
        <Circle cx={cx} cy={cx} r={outerR} stroke={fillColor} strokeOpacity={0.18} strokeWidth={outerStroke} fill="none" />
        <Circle
          cx={cx}
          cy={cx}
          r={outerR}
          stroke={fillColor}
          strokeWidth={outerStroke}
          fill="none"
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={circ * (1 - clamped)}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cx})`}
        />
        <Circle cx={cx} cy={cx} r={innerR} stroke={fillColor} strokeWidth={innerStroke} fill="none" />
      </Svg>
      <View style={styles.center} pointerEvents="none">
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dials: { flexDirection: "row", gap: 8, marginBottom: 16 },
  dial: { flex: 1, alignItems: "center" },
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  num: { color: colors.white, fontSize: 25, fontWeight: "700", letterSpacing: -0.4, lineHeight: 27 },
  denom: { color: colors.white, fontSize: 11, fontWeight: "400", lineHeight: 13, marginTop: 1, opacity: 0.92 },
  label: { marginTop: 10, fontSize: 14, fontWeight: "800", letterSpacing: 1.7 },
  sub: { marginTop: 2, fontSize: 13, fontWeight: "400", color: "#AEAEB2" },
});
