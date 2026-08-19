import { useEffect, useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";

const ROW = 44;

type WheelPickerProps = {
  values: string[];
  value: string;
  onChange: (next: string) => void;
  width?: number;
};

export default function WheelPicker({ values, value, onChange, width }: WheelPickerProps) {
  const ref = useRef<ScrollView>(null);
  const pad = ROW * 2;

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const start = Math.max(0, values.indexOf(value));
      ref.current?.scrollTo({ y: start * ROW, animated: false });
    });
    return () => cancelAnimationFrame(id);
  }, [values, value]);

  const marks = useMemo(() => values, [values]);

  function commit(offsetY: number) {
    const next = Math.round(offsetY / ROW);
    const clamped = Math.min(marks.length - 1, Math.max(0, next));
    onChange(marks[clamped]);
  }

  return (
    <View style={[styles.wrap, width ? { width } : styles.flex]}>
      <View style={styles.highlight} pointerEvents="none" />
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
            <Text style={[styles.label, item === value && styles.active]}>{item}</Text>
          </View>
        ))}
        <View style={{ height: pad }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: ROW * 5,
    overflow: "hidden",
  },
  flex: {
    flex: 1,
  },
  highlight: {
    position: "absolute",
    left: 0,
    right: 0,
    top: ROW * 2,
    height: ROW,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 8,
  },
  row: {
    height: ROW,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    color: colors.textMuted,
  },
  active: {
    color: colors.white,
    fontWeight: "700",
  },
});
