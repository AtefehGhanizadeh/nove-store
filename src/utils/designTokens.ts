const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const designTokens = {
  breakpoints,
  media: {
    sm: `@media (min-width: ${breakpoints.sm}px)`,
    md: `@media (min-width: ${breakpoints.md}px)`,
    lg: `@media (min-width: ${breakpoints.lg}px)`,
    xl: `@media (min-width: ${breakpoints.xl}px)`,
  },
  space: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radius: {
    sm: '8px',
    button: '10px',
    card: '12px',
    lg: '20px',
    pill: '999px',
  },
  shadow: {
    card: '0 1px 2px rgba(15, 27, 51, 0.04), 0 4px 16px rgba(15, 27, 51, 0.06)',
    raised: '0 8px 32px rgba(15, 27, 51, 0.14)',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.375rem',
    xxl: '1.75rem',
    display: '2.25rem',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
    extraBold: 800,
  },
  layout: {
    containerWidth: '1200px',
    gutter: '16px',
    headerHeight: '64px',
    touchTarget: '44px',
  },
  zIndex: {
    header: 50,
    overlay: 100,
  },
  transition: '160ms ease',
} as const;

export type DesignTokens = typeof designTokens;
