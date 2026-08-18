import { StyleSheet, Text, View, type TextStyle, type ViewStyle } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop, Text as SvgText } from "react-native-svg";

export const brandColors = {
  mindset: "#5B8DEF",
  gradientStart: "#5B8DEF",
  gradientEnd: "#2F5FD1",
  lean: "#FFFFFF",
} as const;

type WordmarkProps = {
  size?: number;
  style?: TextStyle;
};

export function LeanMindsetWordmark({ size = 16, style }: WordmarkProps) {
  return (
    <Text style={[styles.wordmark, { fontSize: size, lineHeight: size + 2 }, style]} maxFontSizeMultiplier={1.2}>
      <Text style={styles.lean}>lean</Text>
      <Text style={styles.mindset}>mindset</Text>
    </Text>
  );
}

type IconProps = {
  size?: number;
  style?: ViewStyle;
  dimmed?: boolean;
  textScale?: number;
};

export function LeanMindsetIcon({ size = 24, style, dimmed = false, textScale = 1 }: IconProps) {
  const radius = Math.round(size * 0.23);
  const fontSize = Math.round(size * 0.42 * textScale);
  const y = Math.round(size * 0.66);

  return (
    <View style={[style, dimmed && styles.dimmed]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="lmIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={brandColors.gradientStart} />
            <Stop offset="100%" stopColor={brandColors.gradientEnd} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={size} height={size} rx={radius} fill="url(#lmIconGrad)" />
        <SvgText
          x={size / 2}
          y={y}
          fill={brandColors.lean}
          fontSize={fontSize}
          fontWeight="700"
          textAnchor="middle"
        >
          lm
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  lean: {
    color: brandColors.lean,
  },
  mindset: {
    color: brandColors.mindset,
  },
  dimmed: {
    opacity: 0.55,
  },
});
