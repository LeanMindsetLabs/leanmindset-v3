import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "@/src/theme/colors";

type HexBadgeProps = {
  label: string;
  unlocked?: boolean;
  size?: number;
};

export default function HexBadge({ label, unlocked = true, size = 64 }: HexBadgeProps) {
  const fill = unlocked ? "rgba(61, 123, 255, 0.22)" : "rgba(255,255,255,0.04)";
  const stroke = unlocked ? colors.accentBlue : colors.border;
  return (
    <View style={[styles.wrap, { width: size, height: size * 1.1 }]}>
      <Svg width={size} height={size * 1.1} viewBox="0 0 80 88">
        <Path
          d="M40 4 L74 22 L74 66 L40 84 L6 66 L6 22 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
        />
      </Svg>
      <View style={styles.labelWrap} pointerEvents="none">
        <Text style={[styles.label, !unlocked && styles.muted]} numberOfLines={2} maxFontSizeMultiplier={1.1}>
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelWrap: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  label: {
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  muted: {
    color: colors.textMuted,
  },
});
