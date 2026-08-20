import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { typography } from "@/src/theme/typography";

const TICK = 12;
const MIN_CM = 140;
const MAX_CM = 210;
const MIN_IN = 54;
const MAX_IN = 84;
const RULER_H = 220;

type HeightRulerProps = {
  cm: number;
  unit: "cm" | "in";
  onChange: (cm: number) => void;
};

export default function HeightRuler({ cm, unit, onChange }: HeightRulerProps) {
  const ref = useRef<ScrollView>(null);
  const [pad, setPad] = useState(RULER_H / 2 - TICK / 2);
  const metric = unit === "cm";
  const min = metric ? MIN_CM : MIN_IN;
  const max = metric ? MAX_CM : MAX_IN;
  const ticks = useMemo(() => {
    const out: number[] = [];
    for (let value = max; value >= min; value -= 1) out.push(value);
    return out;
  }, [max, min]);
  const selected = metric ? Math.round(cm) : Math.round(cm / 2.54);
  const display = metric
    ? { main: String(selected), unit: "cm" }
    : { main: `${Math.floor(selected / 12)}'${selected % 12}"`, unit: "" };

  function scrollToValue() {
    const index = Math.max(0, ticks.indexOf(selected));
    ref.current?.scrollTo({ y: index * TICK, animated: false });
  }

  useEffect(() => {
    const id = requestAnimationFrame(scrollToValue);
    return () => cancelAnimationFrame(id);
  }, [selected, ticks, pad]);

  function commit(offsetY: number) {
    const index = Math.min(ticks.length - 1, Math.max(0, Math.round(offsetY / TICK)));
    onChange(metric ? ticks[index] : ticks[index] * 2.54);
  }

  return (
    <View style={styles.row}>
      <View
        style={styles.ruler}
        onLayout={(event) => {
          setPad(event.nativeEvent.layout.height / 2 - TICK / 2);
          requestAnimationFrame(scrollToValue);
        }}
      >
        <View style={[styles.hairline, { top: pad }]} pointerEvents="none" />
        <ScrollView
          ref={ref}
          showsVerticalScrollIndicator={false}
          snapToInterval={TICK}
          decelerationRate="fast"
          onMomentumScrollEnd={(event) => commit(event.nativeEvent.contentOffset.y)}
          onScrollEndDrag={(event) => commit(event.nativeEvent.contentOffset.y)}
        >
          <View style={{ height: pad }} />
          {ticks.map((tick) => {
            const major = tick % 5 === 0;
            const on = tick === selected;
            return (
              <View key={tick} style={styles.tickRow}>
                {major ? (
                  <Text style={[styles.tickLabel, on && styles.tickLabelOn]}>{tick}</Text>
                ) : (
                  <View style={styles.tickSpacer} />
                )}
                <View style={[styles.tick, major ? styles.tickMajor : styles.tickMinor, on && styles.tickOn]} />
              </View>
            );
          })}
          <View style={{ height: pad }} />
        </ScrollView>
        <LinearGradient colors={["rgba(15,17,18,1)", "rgba(15,17,18,0)"]} style={styles.fadeTop} pointerEvents="none" />
        <LinearGradient colors={["rgba(15,17,18,0)", "rgba(15,17,18,1)"]} style={styles.fadeBottom} pointerEvents="none" />
      </View>
      <View style={styles.readout} pointerEvents="none">
        <Text style={styles.value}>{display.main}</Text>
        {display.unit ? <Text style={styles.unit}>{display.unit}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: RULER_H,
    flexDirection: "row",
    alignItems: "center",
  },
  ruler: {
    width: 88,
    height: RULER_H,
    overflow: "hidden",
  },
  hairline: {
    position: "absolute",
    left: 40,
    right: 0,
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: colors.accentBlue,
    zIndex: 2,
  },
  tickRow: {
    height: TICK,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    paddingRight: 4,
  },
  tickLabel: {
    width: 32,
    textAlign: "right",
    color: "rgba(255,255,255,0.28)",
    fontSize: 11,
    letterSpacing: 0.2,
  },
  tickLabelOn: {
    color: colors.white,
    fontWeight: "600",
  },
  tickSpacer: {
    width: 32,
  },
  tick: {
    backgroundColor: "rgba(255,255,255,0.14)",
    height: StyleSheet.hairlineWidth,
  },
  tickMinor: {
    width: 10,
  },
  tickMajor: {
    width: 22,
    backgroundColor: "rgba(255,255,255,0.32)",
  },
  tickOn: {
    backgroundColor: colors.accentBlue,
  },
  fadeTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 48,
  },
  fadeBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 48,
  },
  readout: {
    flex: 1,
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
});
