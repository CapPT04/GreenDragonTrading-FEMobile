/**
 * KafiStock Design System - Spacing
 * Hệ thống spacing dựa trên base unit 4px
 * Tất cả giá trị đều là bội số của 4
 */

export const Spacing = {
  0: 0,
  1: 4,     // 0.25rem
  2: 8,     // 0.5rem
  3: 12,    // 0.75rem
  4: 16,    // 1rem - Base unit
  5: 20,    // 1.25rem
  6: 24,    // 1.5rem
  8: 32,    // 2rem
  10: 40,   // 2.5rem
  12: 48,   // 3rem
  16: 64,   // 4rem
  20: 80,   // 5rem
  24: 96,   // 6rem
};

// Semantic spacing aliases
export const ComponentSpacing = {
  // Padding
  screenPadding: Spacing[4],        // 16px
  cardPadding: Spacing[5],          // 20px
  buttonPaddingH: Spacing[5],       // 20px
  buttonPaddingV: Spacing[3],       // 12px
  inputPadding: Spacing[4],         // 16px
  
  // Margins
  sectionMargin: Spacing[6],        // 24px
  listItemMargin: Spacing[3],       // 12px
  elementMargin: Spacing[2],        // 8px
  
  // Gaps
  gap: Spacing[2],                  // 8px
  gapLarge: Spacing[4],             // 16px
};

export default Spacing;
