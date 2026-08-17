import { StyleSheet, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";

type ProgressBarProps = {
  progress: number;
  color?: string;
};

export default function ProgressBar({ progress, color = colors.accent }: ProgressBarProps) {
  const width = `${Math.round(Math.min(1, Math.max(0, progress)) * 100)}%` as const;

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: radius.pill,
  },
});
