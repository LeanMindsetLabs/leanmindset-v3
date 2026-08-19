import { type ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { spacing } from "@/src/theme/spacing";

type AppScreenProps = {
  children: ReactNode;
  edges?: ("top" | "right" | "bottom" | "left")[];
  padded?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
};

export default function AppScreen({
  children,
  edges = ["top"],
  padded = true,
  style,
  backgroundColor,
}: AppScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.safe, backgroundColor ? { backgroundColor } : null]}>
      <View style={[styles.body, padded ? styles.padded : null, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
  },
  padded: {
    paddingHorizontal: spacing.lg,
  },
});

