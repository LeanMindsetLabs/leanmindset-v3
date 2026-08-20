import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { colors } from "@/src/theme/colors";

/** Quiet top wash — overlay only. */
export default function GridBackdrop() {
  return (
    <View pointerEvents="none" style={styles.wrap}>
      <LinearGradient
        colors={["rgba(61,123,255,0.10)", "rgba(15,17,18,0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.42 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
  },
});
