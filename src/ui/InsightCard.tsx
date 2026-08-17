import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { shadows } from "@/src/theme/shadows";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";

type InsightCardProps = {
  title: string;
  body: string;
  cta?: string;
  /** header = title row + right CTA. beside = CTA beside wrapped title (Meals). auto = measure first. */
  ctaLayout?: "header" | "beside" | "auto";
  onPress?: () => void;
};

export default function InsightCard({ title, body, cta, ctaLayout = "header", onPress }: InsightCardProps) {
  const [linesFull, setLinesFull] = useState(1);
  const [linesBeside, setLinesBeside] = useState(2);
  const [ctaWidth, setCtaWidth] = useState(96);

  const autoInline = linesFull > 1 || linesBeside === 1;
  const inline = Boolean(cta) && (ctaLayout === "header" || ctaLayout === "beside" || autoInline);
  const compact = inline && ctaLayout !== "header";
  const besideHead = ctaLayout === "beside" || ctaLayout === "auto";

  const ctaLabel = cta ? (
    <Text style={[styles.cta, inline && styles.ctaInline]} maxFontSizeMultiplier={1.2}>
      {cta} →
    </Text>
  ) : null;

  const inner = (
    <View style={[styles.inner, compact && styles.innerCompact]}>
      {cta && ctaLayout === "auto" ? (
        <View pointerEvents="none" style={styles.measure}>
          <Text
            style={[typography.heading3, styles.measureText]}
            maxFontSizeMultiplier={1.3}
            onTextLayout={(e) => setLinesFull(e.nativeEvent.lines.length)}
          >
            {title}
          </Text>
          <Text
            style={[typography.heading3, styles.measureText, { paddingRight: ctaWidth + 8 }]}
            maxFontSizeMultiplier={1.3}
            onTextLayout={(e) => setLinesBeside(e.nativeEvent.lines.length)}
          >
            {title}
          </Text>
          <Text
            style={styles.cta}
            maxFontSizeMultiplier={1.2}
            onLayout={(e) => setCtaWidth(e.nativeEvent.layout.width)}
          >
            {cta} →
          </Text>
        </View>
      ) : null}

      {inline ? (
        <View style={[styles.head, besideHead && styles.headAuto]}>
          <Text style={[typography.heading3, styles.title]} maxFontSizeMultiplier={1.3}>
            {title}
          </Text>
          {ctaLabel}
        </View>
      ) : (
        <Text style={typography.heading3} maxFontSizeMultiplier={1.3}>
          {title}
        </Text>
      )}
      <Text style={[typography.bodySmall, styles.body]} maxFontSizeMultiplier={1.4}>
        {body}
      </Text>
      {!inline ? ctaLabel : null}
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.highlightBorderStart, colors.highlightBorderEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.border, shadows.highlight]}
    >
      {onPress ? (
        <Pressable onPress={onPress} accessibilityRole="button" style={styles.fill}>
          {inner}
        </Pressable>
      ) : (
        inner
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  border: {
    borderRadius: radius.lg,
    padding: 1.15,
    alignSelf: "stretch",
    width: "100%",
  },
  fill: {
    borderRadius: radius.lg - 1,
  },
  inner: {
    backgroundColor: colors.highlightNote,
    borderRadius: radius.lg - 1,
    padding: spacing.lg,
    gap: spacing.sm,
    width: "100%",
  },
  innerCompact: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 6,
  },
  measure: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    opacity: 0,
  },
  measureText: {
    width: "100%",
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  headAuto: {
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    minWidth: 0,
  },
  body: {
    width: "100%",
  },
  cta: {
    marginTop: spacing.xs,
    color: colors.highlightCta,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  ctaInline: {
    marginTop: 0,
    flexShrink: 0,
    paddingTop: 3,
  },
});
