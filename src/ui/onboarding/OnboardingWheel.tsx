import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";

const ROW = 36;

type OnboardingWheelProps = {
  values: string[];
  value: string;
  onChange: (next: string) => void;
};

export default function OnboardingWheel({ values, value, onChange }: OnboardingWheelProps) {
  const ref = useRef<ScrollView>(null);
  const pad = ROW * 2;
  const marks = useMemo(() => values, [values]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const start = Math.max(0, marks.indexOf(value));
      ref.current?.scrollTo({ y: start * ROW, animated: false });
    });
    return () => cancelAnimationFrame(id);
  }, [marks, value]);

  function commit(offsetY: number) {
    const next = Math.round(offsetY / ROW);
    const clamped = Math.min(marks.length - 1, Math.max(0, next));
    onChange(marks[clamped]);
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.band} pointerEvents="none" />
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={ROW}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => commit(event.nativeEvent.contentOffset.y)}
        onScrollEndDrag={(event) => commit(event.nativeEvent.contentOffset.y)}
      >
        <View style={{ height: pad }} />
        {marks.map((item) => (
          <View key={item} style={styles.row}>
            <Text style={[styles.label, item === value && styles.active]} numberOfLines={1}>
              {item}
            </Text>
          </View>
        ))}
        <View style={{ height: pad }} />
      </ScrollView>
      <LinearGradient colors={["rgba(15,17,18,0.96)", "rgba(15,17,18,0)"]} style={styles.fadeTop} pointerEvents="none" />
      <LinearGradient colors={["rgba(15,17,18,0)", "rgba(15,17,18,0.96)"]} style={styles.fadeBottom} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    height: ROW * 5,
    overflow: "hidden",
  },
  band: {
    position: "absolute",
    left: 6,
    right: 6,
    top: ROW * 2,
    height: ROW,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.16)",
  },
  row: {
    height: ROW,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    color: "rgba(255,255,255,0.28)",
    letterSpacing: -0.2,
  },
  active: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  fadeTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: ROW * 1.6,
  },
  fadeBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: ROW * 1.6,
  },
});
