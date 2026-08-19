import { type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import ProfileIcon from "./ProfileIcon";
import { profileIcon } from "./iconSpec";

type ProfileNavHeaderProps = {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
};

export default function ProfileNavHeader({ title, onBack, right }: ProfileNavHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={styles.iconBtn}
          >
            <ProfileIcon name="back" size={profileIcon.header} color={colors.white} strokeWidth={profileIcon.stroke} />
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.title} maxFontSizeMultiplier={1.2}>
        {title}
      </Text>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: layout.minTouchTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  side: {
    width: layout.minTouchTarget,
    minHeight: layout.minTouchTarget,
    justifyContent: "center",
  },
  right: {
    alignItems: "flex-end",
  },
  iconBtn: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
