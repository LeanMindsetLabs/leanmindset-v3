import Svg, { Circle, Path, Polyline, Rect } from "react-native-svg";
import { colors } from "@/src/theme/colors";

export const ICON_STROKE = 1.65;

export type ProfileIconName =
  | "gear"
  | "back"
  | "chevron"
  | "flame"
  | "target"
  | "dumbbell"
  | "flag"
  | "utensils"
  | "coach"
  | "heart"
  | "download"
  | "bell"
  | "moon"
  | "ruler"
  | "user"
  | "mail"
  | "lock"
  | "crown"
  | "card"
  | "shield"
  | "trash"
  | "help"
  | "file"
  | "logout"
  | "people"
  | "pencil"
  | "receipt"
  | "check"
  | "hex"
  | "close"
  | "search";

type ProfileIconProps = {
  name: ProfileIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export default function ProfileIcon({
  name,
  size = 18,
  color = colors.textPrimary,
  strokeWidth = ICON_STROKE,
}: ProfileIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "gear":
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="3" />
          <Path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        </Svg>
      );
    case "back":
      return (
        <Svg {...common}>
          <Path d="M15 18l-6-6 6-6" />
        </Svg>
      );
    case "chevron":
      return (
        <Svg {...common}>
          <Path d="M9 18l6-6-6-6" />
        </Svg>
      );
    case "flame":
      return (
        <Svg {...common}>
          <Path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 2 7.5a4.5 4.5 0 1 1-9 0c0-.486.092-1.12.276-1.742C5.326 8.954 6.5 10 6.5 12a2.5 2.5 0 0 0 2 2.5z" />
        </Svg>
      );
    case "target":
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="10" />
          <Circle cx="12" cy="12" r="6" />
          <Circle cx="12" cy="12" r="2" />
        </Svg>
      );
    case "dumbbell":
      return (
        <Svg {...common}>
          <Path d="M6.5 6.5v11" />
          <Path d="M17.5 6.5v11" />
          <Path d="M4 8.5v7" />
          <Path d="M2.5 9.5v5" />
          <Path d="M20 8.5v7" />
          <Path d="M21.5 9.5v5" />
          <Path d="M6.5 12h11" />
        </Svg>
      );
    case "flag":
      return (
        <Svg {...common}>
          <Path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <Path d="M4 22V15" />
        </Svg>
      );
    case "utensils":
      return (
        <Svg {...common}>
          <Path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <Path d="M7 2v20" />
          <Path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
        </Svg>
      );
    case "coach":
      return (
        <Svg {...common}>
          <Path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </Svg>
      );
    case "heart":
      return (
        <Svg {...common}>
          <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </Svg>
      );
    case "download":
      return (
        <Svg {...common}>
          <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <Polyline points="7 10 12 15 17 10" />
          <Path d="M12 15V3" />
        </Svg>
      );
    case "bell":
      return (
        <Svg {...common}>
          <Path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <Path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </Svg>
      );
    case "moon":
      return (
        <Svg {...common}>
          <Path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </Svg>
      );
    case "ruler":
      return (
        <Svg {...common}>
          <Path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
          <Path d="m14.5 12.5 2-2" />
          <Path d="m11.5 9.5 2-2" />
          <Path d="m8.5 6.5 2-2" />
          <Path d="m17.5 15.5 2-2" />
        </Svg>
      );
    case "user":
      return (
        <Svg {...common}>
          <Circle cx="12" cy="8" r="4" />
          <Path d="M20 21a8 8 0 0 0-16 0" />
        </Svg>
      );
    case "mail":
      return (
        <Svg {...common}>
          <Rect x="2" y="4" width="20" height="16" rx="2" />
          <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </Svg>
      );
    case "lock":
      return (
        <Svg {...common}>
          <Rect x="3" y="11" width="18" height="11" rx="2" />
          <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </Svg>
      );
    case "crown":
      return (
        <Svg {...common}>
          <Path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" />
          <Path d="M5 16h14" />
        </Svg>
      );
    case "card":
      return (
        <Svg {...common}>
          <Rect x="2" y="5" width="20" height="14" rx="2" />
          <Path d="M2 10h20" />
        </Svg>
      );
    case "shield":
      return (
        <Svg {...common}>
          <Path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-3 8 3z" />
        </Svg>
      );
    case "trash":
      return (
        <Svg {...common}>
          <Path d="M3 6h18" />
          <Path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <Path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </Svg>
      );
    case "help":
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="10" />
          <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <Path d="M12 17h.01" />
        </Svg>
      );
    case "file":
      return (
        <Svg {...common}>
          <Path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <Path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </Svg>
      );
    case "logout":
      return (
        <Svg {...common}>
          <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <Polyline points="16 17 21 12 16 7" />
          <Path d="M21 12H9" />
        </Svg>
      );
    case "people":
      return (
        <Svg {...common}>
          <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <Circle cx="9" cy="7" r="4" />
          <Path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </Svg>
      );
    case "pencil":
      return (
        <Svg {...common}>
          <Path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <Path d="m15 5 4 4" />
        </Svg>
      );
    case "receipt":
      return (
        <Svg {...common}>
          <Path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <Path d="M8 7h8" />
          <Path d="M8 11h8" />
          <Path d="M8 15h5" />
        </Svg>
      );
    case "check":
      return (
        <Svg {...common}>
          <Path d="M20 6 9 17l-5-5" />
        </Svg>
      );
    case "hex":
      return (
        <Svg {...common}>
          <Path d="M12 2 20.5 7v10L12 22 3.5 17V7Z" />
        </Svg>
      );
    case "close":
      return (
        <Svg {...common}>
          <Path d="M18 6 6 18" />
          <Path d="M6 6l12 12" />
        </Svg>
      );
    case "search":
      return (
        <Svg {...common}>
          <Circle cx="11" cy="11" r="7" />
          <Path d="M20 20l-3.5-3.5" />
        </Svg>
      );
    default:
      return null;
  }
}
