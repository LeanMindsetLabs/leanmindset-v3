import { useEffect, type ReactNode } from "react";
import "../styles/device.css";

type DeviceFrameProps = {
  children: ReactNode;
};

/** Locked browser preview: iPhone 15 · 393×852 · status bar always above app UI */
export const PHONE_PREVIEW = {
  device: "iPhone 15",
  width: 393,
  height: 852,
  safeTop: 59,
  safeBottom: 34,
  url: "http://localhost:5173/",
} as const;

function fitIphoneScale() {
  const scale = Math.min(
    1,
    (window.innerWidth - 48) / 430,
    (window.innerHeight - 72) / 920
  );
  document.documentElement.style.setProperty("--iphone-scale", scale.toFixed(4));
}

export default function DeviceFrame({ children }: DeviceFrameProps) {
  useEffect(() => {
    fitIphoneScale();
    window.addEventListener("resize", fitIphoneScale);
    return () => window.removeEventListener("resize", fitIphoneScale);
  }, []);

  return (
    <div className="iphone-stage">
      <div className="iphone-scale-slot">
        <div className="iphone-15">
          <div className="iphone-15-side iphone-15-side-left">
            <span className="iphone-15-silent" />
            <span className="iphone-15-btn" />
            <span className="iphone-15-btn" />
          </div>
          <div className="iphone-15-side iphone-15-side-right">
            <span className="iphone-15-power" />
          </div>
          <div className="iphone-15-bezel">
            <div className="iphone-15-screen" data-testid="iphone-screen">
              {/* In-flow status band — app UI cannot paint under time / island / battery */}
              <div className="ios-status" aria-hidden="true">
                <div className="ios-time">9:41</div>
                <div className="ios-island" />
                <div className="ios-status-right">
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                    <rect x="0" y="7.2" width="3" height="4.8" rx="0.55" fill="white" />
                    <rect x="4.4" y="5.2" width="3" height="6.8" rx="0.55" fill="white" />
                    <rect x="8.8" y="2.6" width="3" height="9.4" rx="0.55" fill="white" />
                    <rect x="13.2" y="0" width="3" height="12" rx="0.55" fill="white" />
                  </svg>
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path
                      d="M1.05 4.55C3.7 2.2 6.7 1.15 8 1.15c1.3 0 4.3 1.05 6.95 3.4"
                      stroke="white"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3.2 6.7C4.9 5.2 6.55 4.45 8 4.45c1.45 0 3.1.75 4.8 2.25"
                      stroke="white"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5.45 8.85C6.4 8.05 7.2 7.65 8 7.65c.8 0 1.6.4 2.55 1.2"
                      stroke="white"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                    <circle cx="8" cy="10.85" r="1.05" fill="white" />
                  </svg>
                  <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                    <rect
                      x="0.6"
                      y="0.6"
                      width="21.2"
                      height="11.8"
                      rx="2.6"
                      stroke="white"
                      strokeOpacity="0.38"
                      strokeWidth="1.1"
                    />
                    <rect x="2.15" y="2.1" width="18.1" height="8.8" rx="1.6" fill="white" />
                    <path
                      d="M23.7 4.15c.95.55 1.55 1.35 1.55 2.35s-.6 1.8-1.55 2.35V4.15Z"
                      fill="white"
                      fillOpacity="0.42"
                    />
                  </svg>
                </div>
              </div>

              <div className="iphone-15-body">{children}</div>

              <div className="ios-home-indicator" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <p className="iphone-caption">iPhone 15 · 393 × 852 pt · @3x 1179 × 2556 px</p>
    </div>
  );
}
