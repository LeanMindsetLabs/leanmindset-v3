import { appStorage } from "@/src/lib/storage";

export type HeroBgPosition = {
  translateX: number;
  translateY: number;
  objectPosition: string;
};

/** Head above Log in button, near email field gold border (~932px web viewport). */
export const DEFAULT_HERO_BG: HeroBgPosition = {
  translateX: 0,
  translateY: -135,
  objectPosition: "50% 56%",
};

const STORAGE_KEY = "lm-hero-bg-position";

export function getHeroBgPosition(): HeroBgPosition {
  const raw = appStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_HERO_BG;
  try {
    const parsed = JSON.parse(raw) as HeroBgPosition;
    return {
      translateX: parsed.translateX ?? 0,
      translateY: parsed.translateY ?? 0,
      objectPosition: parsed.objectPosition ?? DEFAULT_HERO_BG.objectPosition,
    };
  } catch {
    return DEFAULT_HERO_BG;
  }
}

export function setHeroBgPosition(position: HeroBgPosition): void {
  appStorage.setItem(STORAGE_KEY, JSON.stringify(position));
}

export function clearHeroBgPosition(): void {
  appStorage.removeItem(STORAGE_KEY);
}
