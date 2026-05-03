import { useMemo, type CSSProperties, type FC, type ReactNode } from "react";

import { generateAnimatedDots } from "./utils/animation";

type Props = {
  /** Content to render above the dots background */
  children: ReactNode;
  /** Number of dots to generate (default: 40) */
  count?: number;
  /** Color of the dots (default: "white") - supports any valid CSS color */
  color?: string;
  /** Size of each dot in Tailwind classes (default: "w-1 h-1") */
  size?: string;
  /** Animation type (default: "animate-pulse") - any Tailwind animation class */
  animation?: string;
  /** Maximum animation delay in seconds (default: 5) */
  maxDelay?: number;
  /** Minimum opacity (default: 0.5) */
  minOpacity?: number;
  /** Maximum opacity (default: 1.0) */
  maxOpacity?: number;
  /** Additional CSS classes for the container */
  className?: string;
  /** Custom inline styles for the container */
  style?: CSSProperties;
  /** Z-index value for layering (default: auto) */
  zIndex?: number;
  /** Container positioning (default: "relative") - set to "fixed" for full viewport coverage */
  position?: "relative" | "absolute" | "fixed";
  /** Whether to add default padding to content (default: true) */
  padContent?: boolean;
  /** Custom z-index for content layer (default: 10) */
  contentZIndex?: number;
};

/**
 * Animated dots background container component that wraps content with a starfield effect.
 * Renders randomly positioned dots behind any content you provide as children.
 * Perfect for hero sections, landing pages, or any area that needs visual enhancement.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DotsBackground>
 *   <h1>Welcome to our site</h1>
 *   <p>Content appears above the animated dots</p>
 * </DotsBackground>
 *
 * // Customized for hero section
 * <DotsBackground
 *   count={80}
 *   color="rgb(59 130 246)"
 *   className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900"
 * >
 *   <div className="flex items-center justify-center min-h-screen">
 *     <h1 className="text-4xl text-white">Hero Content</h1>
 *   </div>
 * </DotsBackground>
 *
 * // Full viewport overlay
 * <DotsBackground position="fixed" className="bg-black/50">
 *   <YourAppContent />
 * </DotsBackground>
 * ```
 */
export const DotsBackground: FC<Props> = ({
  children,
  count = 40,
  color = "white",
  size = "w-1 h-1",
  animation = "animate-pulse",
  maxDelay = 5,
  minOpacity = 0.5,
  maxOpacity = 1.0,
  className = "",
  style,
  zIndex,
  position = "relative",
  padContent = true,
  contentZIndex = 10,
}) => {
  const dots = useMemo(
    () => generateAnimatedDots(count, maxDelay, minOpacity, maxOpacity),
    [count, maxDelay, minOpacity, maxOpacity]
  );

  const containerStyle: CSSProperties = {
    ...style,
    ...(zIndex !== undefined && { zIndex }),
  };

  const contentPadding = padContent ? "p-4 sm:p-6 md:p-8" : "";

  return (
    <div className={`${position} inset-0 overflow-hidden ${className}`} style={containerStyle}>
      {/* Animated dots layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {dots.map(({ left, top, animationDelay, opacity }, index) => (
          <div
            key={index}
            className={`absolute ${size} rounded-full ${animation}`}
            style={{
              left,
              top,
              animationDelay,
              opacity,
              backgroundColor: color,
            }}
          />
        ))}
      </div>

      {/* Content layer */}
      <div className={`relative ${contentPadding}`} style={{ zIndex: contentZIndex }}>
        {children}
      </div>
    </div>
  );
};
