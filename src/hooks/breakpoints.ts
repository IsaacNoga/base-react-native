export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export const getCurrentBreakpoint = (width: number): Breakpoint => {
  if (width >= BREAKPOINTS.xxl) return "xxl";
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
};

export const BREAKPOINT_ORDER: Breakpoint[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "xxl",
];
