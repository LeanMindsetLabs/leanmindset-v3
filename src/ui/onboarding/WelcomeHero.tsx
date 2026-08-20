import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient as SvgGradient, Path, Rect, Stop } from "react-native-svg";

/** Moody ridge hero — overlay only. */
export default function WelcomeHero() {
  return (
    <View style={styles.wrap}>
      <LinearGradient colors={["#1a2744", "#0f1520", "#0F1112"]} style={StyleSheet.absoluteFill} />
      <Svg width="100%" height="100%" viewBox="0 0 393 280" preserveAspectRatio="none">
        <Defs>
          <SvgGradient id="skyGlow" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#35507a" stopOpacity="0.55" />
            <Stop offset="55%" stopColor="#10151c" stopOpacity="0.2" />
            <Stop offset="100%" stopColor="#0F1112" stopOpacity="1" />
          </SvgGradient>
        </Defs>
        <Rect x="0" y="0" width="393" height="280" fill="url(#skyGlow)" />
        <Path d="M0 210 L58 150 L118 178 L176 118 L236 160 L292 132 L348 168 L393 142 L393 280 L0 280 Z" fill="#07090d" opacity="0.95" />
        <Path d="M0 240 L96 188 L168 214 L228 176 L300 206 L393 184 L393 280 L0 280 Z" fill="#0F1112" />
        <Path d="M188 118 C188 118 194 96 206 88 C214 82 220 88 220 96 C220 104 212 112 206 118 Z" fill="#050608" opacity="0.85" />
      </Svg>
      <LinearGradient colors={["rgba(15,17,18,0)", "#0F1112"]} style={styles.bottomFade} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 280,
    marginHorizontal: -16,
    marginTop: -8,
    overflow: "hidden",
    backgroundColor: "#0F1112",
  },
  bottomFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 96,
  },
});
