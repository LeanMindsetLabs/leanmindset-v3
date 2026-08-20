import { layout } from "@/src/theme/layout";
import { ONBOARDING_FOOTER_LIFT } from "@/src/ui/onboarding/OnboardingChrome";

/** ~1 inch extra top inset for auth content below the status bar. */
export const AUTH_CONTENT_DROP = 160;

export const AUTH_SHELL_TOP_MIN = 12;
export const AUTH_NAV_HEIGHT = layout.minTouchTarget;
export const AUTH_CENTER_GAP = 16;

/**
 * Stacked height of EmailLoginScreen center content (brand through social buttons).
 * Tuned to match that screen's StyleSheet — used to anchor Welcome brand at the same Y.
 */
export const AUTH_LOGIN_CENTER_CONTENT_HEIGHT = 456;

/** Brand + welcome headline + subcopy + gaps (matches WelcomeScreen typography). */
export const AUTH_WELCOME_VISIBLE_CONTENT_HEIGHT = 181;

/** Legal footer block height as laid out on EmailLoginScreen (content + bottom inset). */
export function authLoginFooterHeight(insetsBottom: number): number {
  const legalBlockHeight = 48;
  return legalBlockHeight + Math.max(insetsBottom, 8) + ONBOARDING_FOOTER_LIFT;
}

/** Welcome footer: CTA + gap + legal + bottom inset. */
export function authWelcomeFooterHeight(insetsBottom: number): number {
  const ctaHeight = 52;
  const footerGap = 14;
  const legalBlockHeight = 48;
  return ctaHeight + footerGap + legalBlockHeight + Math.max(insetsBottom, 8) + ONBOARDING_FOOTER_LIFT;
}

/**
 * Invisible spacer below welcome copy so AuthBrandHeader lands at the same Y as
 * EmailLoginScreen when both use justifyContent: "center" on the center column.
 */
export function authWelcomeCenterSpacerHeight(
  screenHeight: number,
  insetsTop: number,
  insetsBottom: number,
): number {
  const shellTop = Math.max(insetsTop, AUTH_SHELL_TOP_MIN);
  const loginCenterAreaHeight =
    screenHeight - shellTop - AUTH_NAV_HEIGHT - authLoginFooterHeight(insetsBottom);
  const welcomeCenterAreaHeight =
    screenHeight - shellTop - AUTH_NAV_HEIGHT - authWelcomeFooterHeight(insetsBottom);
  return Math.max(
    0,
    AUTH_LOGIN_CENTER_CONTENT_HEIGHT -
      AUTH_WELCOME_VISIBLE_CONTENT_HEIGHT -
      (loginCenterAreaHeight - welcomeCenterAreaHeight),
  );
}

/** Safe-area top + content drop for auth screens. */
export function authContentPaddingTop(insetsTop: number, screenHeight: number): number {
  const drop = Math.max(AUTH_CONTENT_DROP, Math.round(screenHeight * 0.12));
  return Math.max(insetsTop, AUTH_SHELL_TOP_MIN) + drop;
}
