/**
 * KafiStock Design System - Typography
 * Font sizes, weights, và line heights
 */

export const FontSizes = {
  // Base sizes
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 36,
};

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const LineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
};

// Typography presets
export const Typography = {
  // Display
  display: {
    fontSize: FontSizes.display,
    lineHeight: 44,
    fontWeight: FontWeights.bold,
  },
  
  // Headings
  h1: {
    fontSize: FontSizes.xxxl,
    lineHeight: 38,
    fontWeight: FontWeights.bold,
  },
  h2: {
    fontSize: FontSizes.xxl,
    lineHeight: 32,
    fontWeight: FontWeights.semibold,
  },
  h3: {
    fontSize: FontSizes.xl,
    lineHeight: 28,
    fontWeight: FontWeights.semibold,
  },
  h4: {
    fontSize: FontSizes.lg,
    lineHeight: 26,
    fontWeight: FontWeights.semibold,
  },
  
  // Body text
  bodyLarge: {
    fontSize: FontSizes.md,
    lineHeight: 24,
    fontWeight: FontWeights.regular,
  },
  body: {
    fontSize: FontSizes.base,
    lineHeight: 20,
    fontWeight: FontWeights.regular,
  },
  bodySmall: {
    fontSize: FontSizes.sm,
    lineHeight: 18,
    fontWeight: FontWeights.regular,
  },
  
  // Labels
  label: {
    fontSize: FontSizes.base,
    lineHeight: 20,
    fontWeight: FontWeights.medium,
  },
  caption: {
    fontSize: FontSizes.sm,
    lineHeight: 16,
    fontWeight: FontWeights.regular,
  },
  overline: {
    fontSize: FontSizes.xs,
    lineHeight: 14,
    fontWeight: FontWeights.medium,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  
  // Stock-specific
  stockPrice: {
    fontSize: FontSizes.lg,
    lineHeight: 24,
    fontWeight: FontWeights.semibold,
    fontFamily: 'monospace',
  },
  stockPriceLarge: {
    fontSize: FontSizes.xxl,
    lineHeight: 32,
    fontWeight: FontWeights.bold,
    fontFamily: 'monospace',
  },
  stockChange: {
    fontSize: FontSizes.base,
    lineHeight: 20,
    fontWeight: FontWeights.medium,
    fontFamily: 'monospace',
  },
};

export default {
  FontSizes,
  FontWeights,
  LineHeights,
  Typography,
};
