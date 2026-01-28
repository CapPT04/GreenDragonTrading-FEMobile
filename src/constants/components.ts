/**
 * KafiStock Design System - Component Specs
 * Kích thước và specs cho components
 */

import { Spacing } from './spacing';
import { BorderRadius } from './borderRadius';
import { FontSizes, FontWeights } from './Fonts';

// Button specs
export const Button = {
  small: {
    height: 32,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    fontSize: FontSizes.sm,
    borderRadius: BorderRadius.base,
  },
  medium: {
    height: 40,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    fontSize: FontSizes.base,
    borderRadius: BorderRadius.base,
  },
  large: {
    height: 48,
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[4],
    fontSize: FontSizes.md,
    borderRadius: BorderRadius.md,
  },
};

// Input specs
export const Input = {
  height: 48,
  paddingHorizontal: Spacing[4],
  paddingVertical: Spacing[3],
  fontSize: FontSizes.base,
  borderRadius: BorderRadius.base,
  borderWidth: 1,
};

// Card specs
export const Card = {
  padding: Spacing[4],
  borderRadius: BorderRadius.md,
  gap: Spacing[3],
};

// Icon sizes
export const IconSize = {
  xs: 16,
  sm: 20,
  base: 24,
  md: 28,
  lg: 32,
  xl: 40,
  xxl: 48,
};

// Touch target (accessibility)
export const TouchTarget = {
  minimum: 44,  // Apple HIG minimum
  recommended: 48,  // Material Design recommendation
};

// List items
export const ListItem = {
  height: 64,
  padding: Spacing[4],
  gap: Spacing[3],
};

// Avatar sizes
export const Avatar = {
  xs: 24,
  sm: 32,
  base: 40,
  md: 48,
  lg: 64,
  xl: 80,
};

// Badge specs
export const Badge = {
  small: {
    height: 20,
    minWidth: 20,
    paddingHorizontal: Spacing[2],
    fontSize: FontSizes.xs,
    borderRadius: BorderRadius.full,
  },
  medium: {
    height: 24,
    minWidth: 24,
    paddingHorizontal: Spacing[2],
    fontSize: FontSizes.sm,
    borderRadius: BorderRadius.full,
  },
};

// Chip specs
export const Chip = {
  small: {
    height: 24,
    paddingHorizontal: Spacing[2],
    fontSize: FontSizes.xs,
    borderRadius: BorderRadius.full,
  },
  medium: {
    height: 32,
    paddingHorizontal: Spacing[3],
    fontSize: FontSizes.sm,
    borderRadius: BorderRadius.full,
  },
};

export default {
  Button,
  Input,
  Card,
  IconSize,
  TouchTarget,
  ListItem,
  Avatar,
  Badge,
  Chip,
};
