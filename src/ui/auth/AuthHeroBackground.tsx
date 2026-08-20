import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Platform, StyleSheet, View, type ViewStyle } from "react-native";
import { getHeroBgPosition } from "@/src/ui/auth/heroBackgroundPosition";

const HERO = require("../../../assets/images/onboarding-hero.png");

/** Overscale hero so silhouette reads larger; web uses imageStyle, native uses transform. */
const HERO_STRETCH = {
  scaleX: 1.08,
  scaleY: 1.16,
} as const;

type AuthHeroBackgroundProps = {
  style?: ViewStyle;
};

/** Shared mountain hero for welcome, login, and OTP. */
export default function AuthHeroBackground({ style }: AuthHeroBackgroundProps) {
  const position = getHeroBgPosition();

  const imageStyle =
    Platform.OS === "web"
      ? ({
          objectFit: "cover",
          objectPosition: position.objectPosition,
          width: `${HERO_STRETCH.scaleX * 100}%`,
          height: `${HERO_STRETCH.scaleY * 100}%`,
          marginLeft: `${((1 - HERO_STRETCH.scaleX) / 2) * 100}%`,
          marginTop: `${((1 - HERO_STRETCH.scaleY) / 2) * 100}%`,
        } as object)
      : undefined;

  return (
    <View style={[StyleSheet.absoluteFill, styles.clip, style]} pointerEvents="none">
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [
              { translateX: position.translateX },
              { translateY: position.translateY },
              { scaleX: HERO_STRETCH.scaleX },
              { scaleY: HERO_STRETCH.scaleY },
            ],
          },
        ]}
      >
        <ImageBackground source={HERO} style={StyleSheet.absoluteFill} resizeMode="cover" imageStyle={imageStyle} />
      </View>
      <LinearGradient
        colors={["rgba(0,0,0,0.88)", "rgba(0,0,0,0.05)", "rgba(0,0,0,0.32)", "rgba(0,0,0,0.94)"]}
        locations={[0, 0.38, 0.58, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  clip: { overflow: "hidden" },
});
