type AnimatedDot = {
  /** Horizontal position as a percentage string (e.g., "45.2341%") */
  left: string;
  /** Vertical position as a percentage string (e.g., "78.9876%") */
  top: string;
  /** CSS animation delay in seconds (e.g., "2.3456s") */
  animationDelay: string;
  /** Opacity value between 0.5 and 1.0 as a string (e.g., "0.847") */
  opacity: string;
};

/**
 * Generates an array of randomly positioned animated dots for background decoration.
 * Each dot has random positioning, animation timing, and opacity for a dynamic effect.
 *
 * @param count - Number of dots to generate
 * @param maxDelay - Maximum animation delay in seconds
 * @param minOpacity - Minimum opacity value (0-1)
 * @param maxOpacity - Maximum opacity value (0-1)
 * @returns Array of dot configuration objects with position and animation properties
 */
export const generateAnimatedDots = (
  count: number,
  maxDelay: number = 5,
  minOpacity: number = 0.5,
  maxOpacity: number = 1.0
): AnimatedDot[] => {
  const dots: AnimatedDot[] = [];
  const opacityRange = maxOpacity - minOpacity;

  for (let i = 0; i < count; i++) {
    const left = (Math.random() * 100).toFixed(4) + "%";
    const top = (Math.random() * 100).toFixed(4) + "%";
    const animationDelay = (Math.random() * maxDelay).toFixed(4) + "s";
    const opacity = (minOpacity + Math.random() * opacityRange).toFixed(3);

    dots.push({ left, top, animationDelay, opacity });
  }

  return dots;
};
