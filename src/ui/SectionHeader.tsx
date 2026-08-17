import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/theme/colors";
import { typography } from "@/src/theme/typography";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
};

export default function SectionHeader({ title, actionLabel }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={typography.caption} maxFontSizeMultiplier={1.3}>
        {title}
      </Text>
      {actionLabel ? (
        <Text style={[typography.caption, { color: colors.highlightCta }]} maxFontSizeMultiplier={1.3}>
          {actionLabel}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
});
