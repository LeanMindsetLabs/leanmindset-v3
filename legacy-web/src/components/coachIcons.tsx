import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };
}

/** High-clarity anatomical brain (two hemispheres + folds) */
export function IconBrain({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path
        d="M8.6 4.6C7 4.85 5.75 6.2 5.75 7.9c0 .55.15 1.05.4 1.5-.7.5-1.15 1.3-1.15 2.2 0 1.15.7 2.15 1.75 2.55v.2c0 1.55 1.05 2.9 2.5 3.25.4.85 1.25 1.45 2.25 1.45.55 0 1.05-.15 1.45-.45.4.3.9.45 1.45.45 1 0 1.85-.6 2.25-1.45 1.45-.35 2.5-1.7 2.5-3.25v-.2c1.05-.4 1.75-1.4 1.75-2.55 0-.9-.45-1.7-1.15-2.2.25-.45.4-.95.4-1.5 0-1.7-1.25-3.05-2.85-3.3C15.8 3.55 14.5 3 13 3c-1.35 0-2.55.45-3.4 1.2-.35-.25-.75-.4-1.2-.45-.25-.05-.55-.1-.8-.15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 4.2v13.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.9 8.15c.95-1.05 2.05-1.55 3.25-1.55M16.1 8.15c-.95-1.05-2.05-1.55-3.25-1.55"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.75 11.4c1.05.9 2.35 1.4 4.25 1.4s3.2-.5 4.25-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.35 14.55c.9.7 2 1.1 3.65 1.1s2.75-.4 3.65-1.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Anatomical liver — large left lobe, smaller right lobe, clear fissure */
export function IconLiver({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path
        d="M4.6 11.1c.25-3.1 2.55-5.55 5.35-5.95 1.55-.2 3.05.35 4.15 1.45.55.55 1.2.85 1.95.85 2.35 0 4.25 1.85 4.35 4.25.08 1.85-.85 3.5-2.35 4.45-1.05.65-2.25.95-3.5.95h-.85c-1.15 0-2.2.5-2.95 1.3-.7.75-1.7 1.2-2.8 1.2-2.55 0-4.5-2.2-4.15-4.8.2-1.55.75-3 1.75-4.15.3-.35.5-.8.55-1.25.05-.4 0-.8-.2-1.15-.1-.2-.2-.4-.3-.55Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M13.15 6.85c-.15 2.1-.95 3.85-2.35 5.2-1 1-1.55 2.25-1.75 3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.6 8.35c.55 1.35.65 2.8.25 4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Bakery muffin — pleated liner + domed top (not cupcake, no cherry) */
export function IconMuffin({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path
        d="M7.25 11.1c0-3.15 2.15-5.6 4.75-5.6s4.75 2.45 4.75 5.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.2 8.05c.85-.55 1.75-.35 2.45.25.7.6 1.65.65 2.4.1.8-.55 1.75-.45 2.5.25"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <path
        d="M6.35 11.1h11.3c.45 0 .75.45.6.85-.55 2.15-1.45 4.55-2.3 5.85-.4.6-1.05.95-1.75.95H9.8c-.7 0-1.35-.35-1.75-.95-.85-1.3-1.75-3.7-2.3-5.85-.15-.4.15-.85.6-.85Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.15 11.1v7.05M10.7 11.1v7.4M13.3 11.1v7.4M15.85 11.1v7.05"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <circle cx="10.2" cy="7.15" r="0.7" fill="currentColor" />
      <circle cx="12.55" cy="6.45" r="0.7" fill="currentColor" />
      <circle cx="14.7" cy="7.35" r="0.7" fill="currentColor" />
    </svg>
  );
}

export function IconClock({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="12" cy="13" r="7.15" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 9.1v4.15l2.9 1.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 3.8h5.5M12 3.8v1.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconPeople({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="9" cy="8" r="2.6" fill="currentColor" />
      <circle cx="15.6" cy="8.55" r="2.15" fill="currentColor" />
      <path
        d="M3.75 18.5c.4-2.95 2.55-4.7 5.25-4.7s4.85 1.75 5.25 4.7"
        fill="currentColor"
      />
      <path
        d="M13.55 14.25c1.4-.55 3.05-.35 4.4.65 1 .75 1.6 1.9 1.8 3.15h-5.95c0-.95-.35-1.85-1-2.5-.55-.6-1.2-1-1.9-1.25.2-.05.4-.05.65-.05Z"
        fill="currentColor"
      />
    </svg>
  );
}
