import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { typography } from "@/src/theme/typography";

const TICK = 8;
const STEP = 0.5;

type WeightScaleProps = {
  kg: number;
  unit: "kg" | "lb";
  onChange: (kg: number) => void;
};

export default function WeightScale({ kg, unit, onChange }: WeightScaleProps) {
  const ref = useRef<ScrollView>(null);
  const [pad, setPad] = useState(140);
  const metric = unit === "kg";
  const min = metric ? 40 : 90;
  const max = metric ? 180 : 400;
  const ticks = useMemo(() => {
    const out: number[] = [];
    for (let value = min; value <= max; value += STEP) out.push(Math.round(value * 10) / 10);
    return out;
  }, [max, min]);
  const selectedRaw = metric ? kg : kg * 2.2046;
  const selected = ticks.reduce(
    (best, tick) => (Math.abs(tick - selectedRaw) < Math.abs(best - selectedRaw) ? tick : best),
    ticks[0],
  );

  useEffect(() => {
    const index = Math.max(0, ticks.indexOf(selected));
    const id = requestAnimationFrame(() => {
      ref.current?.scrollTo({ x: index * TICK, animated: false });
    });
    return () => cancelAnimationFrame(id);
  }, [selected, ticks, pad]);

  function commit(offsetX: number) {
    const index = Math.min(ticks.length - 1, Math.max(0, Math.round(offsetX / TICK)));
    const next = ticks[index];
    onChange(metric ? next : next / 2.2046);
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.readout}>
        <Text style={styles.value}>{selected.toFixed(1)}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <View
        style={styles.stage}
        onLayout={(event) => setPad(Math.max(24, event.nativeEvent.layout.width / 2 - TICK / 2))}
      >
        <View style={styles.needle} pointerEvents="none">
          <View style={styles.needleCap} />
          <View style={styles.needleLine} />
        </View>
        <ScrollView
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={TICK}
          decelerationRate="fast"
          onMomentumScrollEnd={(event) => commit(event.nativeEvent.contentOffset.x)}
          onScrollEndDrag={(event) => commit(event.nativeEvent.contentOffset.x)}
          contentContainerStyle={{ paddingHorizontal: pad, height: 72, alignItems: "flex-end" }}
        >
          {ticks.map((tick) => {
            const major = tick % 10 === 0;
            const mid = tick % 5 === 0;
            return (
              <View key={tick} style={styles.col}>
                <View style={[styles.mark, major ? styles.markMajor : mid ? styles.markMid : styles.markMinor]} />
                {major ? <Text style={styles.label}>{Math.round(tick)}</Text> : null}
              </View>
            );
          })}
        </ScrollView>
        <LinearGradient colors={["rgba(15,17,18,1)", "rgba(15,17,18,0)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.fadeLeft} pointerEvents="none" />
        <LinearGradient colors={["rgba(15,17,18,0)", "rgba(15,17,18,1)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.fadeRight} pointerEvents="none" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 18,
    paddingTop: 8,
  },
  readout: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 6,
  },
  value: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "600",
    letterSpacing: -1.2,
    color: colors.white,
  },
  unit: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginBottom: 4,
  },
  stage: {
    height: 72,
    overflow: "hidden",
  },
  needle: {
    position: "absolute",
    left: "50%",
    top: 0,
    marginLeft: -0.5,
    alignItems: "center",
    zIndex: 3,
  },
  needleCap: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.accentBlue,
  },
  needleLine: {
    width: 1.5,
    height: 42,
    backgroundColor: colors.accentBlue,
    borderRadius: 1,
  },
  col: {
    width: TICK,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 64,
  },
  mark: {
    width: StyleSheet.hairlineWidth * 2,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 1,
  },
  markMinor: {
    height: 10,
  },
  markMid: {
    height: 16,
    backgroundColor: "rgba(255,255,255,0.28)",
  },
  markMajor: {
    height: 24,
    backgroundColor: "rgba(255,255,255,0.55)",
  },
  label: {
    marginTop: 6,
    color: "rgba(255,255,255,0.32)",
    fontSize: 10,
    letterSpacing: 0.2,
  },
  fadeLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 36,
    zIndex: 2,
  },
  fadeRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 36,
    zIndex: 2,
  },
});
