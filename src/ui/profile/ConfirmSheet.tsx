import { Pressable, StyleSheet, Text } from "react-native";
import { InPhoneModal } from "@/src/layout/PhoneOverlay";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";

type ConfirmSheetProps = {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmSheet({
  visible,
  title,
  body,
  confirmLabel,
  destructive,
  onConfirm,
  onCancel,
}: ConfirmSheetProps) {
  return (
    <InPhoneModal visible={visible}>
      <Pressable style={styles.sheet} onPress={onCancel}>
        <Pressable style={styles.card} onPress={(event) => event.stopPropagation()}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
          <Pressable
            style={[styles.confirm, destructive && styles.danger]}
            onPress={onConfirm}
            accessibilityRole="button"
          >
            <Text style={styles.confirmText}>{confirmLabel}</Text>
          </Pressable>
          <Pressable onPress={onCancel} accessibilityRole="button">
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </InPhoneModal>
  );
}

const styles = StyleSheet.create({
  sheet: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.md,
  },
  title: typography.heading2,
  body: typography.bodySmall,
  confirm: {
    minHeight: layout.minTouchTarget,
    borderRadius: radius.md,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  danger: {
    backgroundColor: colors.danger,
  },
  confirmText: typography.button,
  cancel: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    padding: spacing.sm,
  },
});
