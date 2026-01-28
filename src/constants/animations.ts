/**
 * KafiStock Design System - Animations
 * Animation durations và easing functions
 */

export const AnimationDuration = {
  instant: 0,
  fast: 150,
  base: 200,
  normal: 300,
  slow: 400,
  slower: 500,
};

export const AnimationEasing = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
};

// Spring animation config
export const SpringConfig = {
  default: {
    damping: 15,
    stiffness: 150,
  },
  gentle: {
    damping: 20,
    stiffness: 100,
  },
  wobbly: {
    damping: 10,
    stiffness: 200,
  },
  stiff: {
    damping: 26,
    stiffness: 400,
  },
};

// Timing configs for React Native Animated
export const TimingConfig = {
  fast: {
    duration: AnimationDuration.fast,
    useNativeDriver: true,
  },
  base: {
    duration: AnimationDuration.base,
    useNativeDriver: true,
  },
  normal: {
    duration: AnimationDuration.normal,
    useNativeDriver: true,
  },
};

export default {
  AnimationDuration,
  AnimationEasing,
  SpringConfig,
  TimingConfig,
};
