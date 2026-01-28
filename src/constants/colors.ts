/**
 * KafiStock Design System - Colors
 * Màu sắc cho ứng dụng chứng khoán
 * Tuân thủ WCAG 2.1 AA contrast ratio
 */

// Primary - Green (Màu xanh lá - Tăng giá)
export const Primary = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',  // Main brand color
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
};

// Accent - Purple (Màu tím - Phụ)
export const Accent = {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',  // Main accent
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
};

// Semantic Colors
export const Semantic = {
  success: '#22c55e',     // Tăng giá
  danger: '#ef4444',      // Giảm giá
  warning: '#f59e0b',     // Tham chiếu
  info: '#3b82f6',        // Thông tin
  ceiling: '#a855f7',     // Giá trần (tím)
  floor: '#06b6d4',       // Giá sàn (cyan)
  reference: '#f59e0b',   // Giá tham chiếu (vàng)
};

// Neutral - Gray Scale
export const Neutral = {
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  black: '#000000',
  
  // Dark mode specific
  dark50: '#18181b',
  dark100: '#27272a',
  dark200: '#3f3f46',
  dark300: '#52525b',
  dark400: '#71717a',
  dark500: '#a1a1aa',
};

// Stock Market Specific Colors
export const Stock = {
  increase: '#22c55e',           // Tăng
  decrease: '#ef4444',           // Giảm
  reference: '#f59e0b',          // Tham chiếu
  ceiling: '#a855f7',            // Trần
  floor: '#06b6d4',              // Sàn
  
  // Chart colors
  candleUp: '#22c55e',
  candleDown: '#ef4444',
  volumeBar: '#a855f7',
  
  // Order book
  bidBg: 'rgba(34, 197, 94, 0.1)',
  bidText: '#22c55e',
  askBg: 'rgba(239, 68, 68, 0.1)',
  askText: '#ef4444',
  matchedBg: 'rgba(168, 85, 247, 0.1)',
  matchedText: '#a855f7',
};

// Theme Colors
export const Colors = {
  light: {
    // Primary colors
    primary: Primary[500],
    primaryLight: Primary[100],
    primaryDark: Primary[700],
    
    // Accent colors
    accent: Accent[500],
    accentLight: Accent[100],
    accentDark: Accent[700],
    
    // Background
    background: Neutral.white,
    surface: Neutral.gray50,
    card: Neutral.white,
    modal: Neutral.white,
    
    // Text
    text: Neutral.gray900,
    textSecondary: Neutral.gray500,
    textDisabled: Neutral.gray400,
    textInverse: Neutral.white,
    
    // Border
    border: Neutral.gray200,
    borderFocus: Primary[500],
    divider: Neutral.gray200,
    
    // Semantic
    success: Semantic.success,
    error: Semantic.danger,
    warning: Semantic.warning,
    info: Semantic.info,
    
    // Stock specific
    increase: Stock.increase,
    decrease: Stock.decrease,
    reference: Stock.reference,
    ceiling: Stock.ceiling,
    floor: Stock.floor,
  },
  
  dark: {
    // Primary colors
    primary: Primary[400],
    primaryLight: Primary[300],
    primaryDark: Primary[600],
    
    // Accent colors
    accent: Accent[400],
    accentLight: Accent[300],
    accentDark: Accent[600],
    
    // Background
    background: '#0f1419',
    surface: '#1a1f2e',
    card: Neutral.gray800,
    modal: Neutral.gray800,
    
    // Text
    text: Neutral.gray50,
    textSecondary: Neutral.gray400,
    textDisabled: Neutral.gray500,
    textInverse: Neutral.gray900,
    
    // Border
    border: Neutral.gray700,
    borderFocus: Primary[400],
    divider: Neutral.gray700,
    
    // Semantic
    success: '#4ade80',
    error: '#f87171',
    warning: '#fbbf24',
    info: '#60a5fa',
    
    // Stock specific
    increase: '#4ade80',
    decrease: '#f87171',
    reference: '#fbbf24',
    ceiling: '#c084fc',
    floor: '#22d3ee',
  },
};

export default Colors;
