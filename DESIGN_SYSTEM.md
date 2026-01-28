# Design System - KafiStock Mobile App

## 🎨 Tổng Quan
Design system này được xây dựng cho ứng dụng chứng khoán KafiStock, lấy cảm hứng từ VNDirect với focus vào tính chuyên nghiệp, dễ đọc và trải nghiệm người dùng mượt mà.

---

## 📐 Nguyên Tắc Thiết Kế

### 1. **Nhất Quán (Consistency)**
- Sử dụng đúng màu sắc theo từng mục đích
- Áp dụng spacing đồng nhất trong toàn bộ ứng dụng
- Typography phải nhất quán trên mọi màn hình

### 2. **Rõ Ràng (Clarity)**
- Số liệu chứng khoán phải dễ đọc
- Màu tăng/giảm phải rõ ràng (xanh lá tăng, đỏ giảm, vàng tham chiếu)
- Tránh quá nhiều màu sắc trên một màn hình

### 3. **Khả Dụng (Accessibility)**
- Tỷ lệ tương phản tối thiểu 4.5:1 cho text
- Icon có kích thước tối thiểu 24x24
- Touch target tối thiểu 44x44

### 4. **Hiệu Suất (Performance)**
- Animation mượt mà (60fps)
- Thời gian transition: 200-300ms
- Lazy loading cho danh sách dài

---

## 🎨 Màu Sắc (Color Palette)

### Primary Colors (Màu Chủ Đạo)

#### Green (Xanh Lá) - Màu Tăng Giá
```typescript
primary: {
  50: '#f0fdf4',   // Background nhẹ
  100: '#dcfce7',  // Hover states
  200: '#bbf7d0',  // Borders, dividers
  300: '#86efac',  // Secondary elements
  400: '#4ade80',  // Interactive elements
  500: '#22c55e',  // Main brand color - Tăng giá
  600: '#16a34a',  // Hover, active states
  700: '#15803d',  // Pressed states
  800: '#166534',  // Deep contrast
  900: '#14532d',  // Maximum contrast
}
```

#### Purple (Tím) - Màu Phụ
```typescript
accent: {
  50: '#faf5ff',   // Lightest
  100: '#f3e8ff',  // Very light
  200: '#e9d5ff',  // Light
  300: '#d8b4fe',  // Medium light
  400: '#c084fc',  // Medium
  500: '#a855f7',  // Main accent - Promotions, highlights
  600: '#9333ea',  // Hover states
  700: '#7e22ce',  // Active states
  800: '#6b21a8',  // Deep
  900: '#581c87',  // Deepest
}
```

### Semantic Colors (Màu Ngữ Nghĩa)

#### Success (Tăng Giá)
- **Light Mode**: `#22c55e` (Green 500)
- **Dark Mode**: `#4ade80` (Green 400)
- **Usage**: Giá tăng, lợi nhuận dương, thông báo thành công

#### Danger/Error (Giảm Giá)
- **Light Mode**: `#ef4444` (Red 500)
- **Dark Mode**: `#f87171` (Red 400)
- **Usage**: Giá giảm, lỗ, cảnh báo, lỗi

#### Warning (Tham Chiếu)
- **Light Mode**: `#f59e0b` (Amber 500)
- **Dark Mode**: `#fbbf24` (Amber 400)
- **Usage**: Giá tham chiếu, cảnh báo nhẹ

#### Info (Thông Tin)
- **Light Mode**: `#3b82f6` (Blue 500)
- **Dark Mode**: `#60a5fa` (Blue 400)
- **Usage**: Thông báo, tooltips, helper text

### Neutral Colors (Màu Trung Tính)

#### Gray Scale
```typescript
neutral: {
  // Light Mode - Background
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
  
  // Dark Mode - Background
  dark50: '#18181b',
  dark100: '#27272a',
  dark200: '#3f3f46',
  dark300: '#52525b',
  dark400: '#71717a',
  dark500: '#a1a1aa',
}
```

### Background Colors

#### Light Mode
- **Background**: `#ffffff` (White)
- **Surface**: `#f9fafb` (Gray 50)
- **Card**: `#ffffff` with shadow
- **Modal**: `#ffffff` with overlay

#### Dark Mode
- **Background**: `#0f1419` (Custom Dark)
- **Surface**: `#1a1f2e` (Custom)
- **Card**: `#1f2937` (Gray 800)
- **Modal**: `#1f2937` with overlay

### Text Colors

#### Light Mode
- **Primary Text**: `#111827` (Gray 900)
- **Secondary Text**: `#6b7280` (Gray 500)
- **Disabled Text**: `#9ca3af` (Gray 400)
- **Link**: `#16a34a` (Green 600)

#### Dark Mode
- **Primary Text**: `#f9fafb` (Gray 50)
- **Secondary Text**: `#9ca3af` (Gray 400)
- **Disabled Text**: `#6b7280` (Gray 500)
- **Link**: `#4ade80` (Green 400)

---

## 📏 Spacing System

```typescript
spacing: {
  0: 0,
  1: 4,    // 0.25rem
  2: 8,    // 0.5rem
  3: 12,   // 0.75rem
  4: 16,   // 1rem - Base unit
  5: 20,   // 1.25rem
  6: 24,   // 1.5rem
  8: 32,   // 2rem
  10: 40,  // 2.5rem
  12: 48,  // 3rem
  16: 64,  // 4rem
  20: 80,  // 5rem
  24: 96,  // 6rem
}
```

### Spacing Usage Guidelines

- **Component Padding**: `16px` (spacing[4])
- **Card Padding**: `20px` (spacing[5])
- **Screen Padding**: `16px - 20px`
- **Section Spacing**: `24px - 32px` (spacing[6] - spacing[8])
- **List Item Spacing**: `12px` (spacing[3])
- **Button Padding**: Horizontal `20px`, Vertical `12px`

---

## 📝 Typography

### Font Families
```typescript
fonts: {
  regular: 'System', // iOS: San Francisco, Android: Roboto
  medium: 'System-Medium',
  semibold: 'System-Semibold',
  bold: 'System-Bold',
  mono: 'Menlo, Monaco, Courier New', // For stock prices
}
```

### Font Sizes & Weights

```typescript
typography: {
  // Display - Hero sections
  display: {
    size: 36,
    lineHeight: 44,
    weight: '700', // Bold
  },
  
  // Headings
  h1: {
    size: 30,
    lineHeight: 38,
    weight: '700',
  },
  h2: {
    size: 24,
    lineHeight: 32,
    weight: '600', // Semibold
  },
  h3: {
    size: 20,
    lineHeight: 28,
    weight: '600',
  },
  h4: {
    size: 18,
    lineHeight: 26,
    weight: '600',
  },
  
  // Body text
  bodyLarge: {
    size: 16,
    lineHeight: 24,
    weight: '400', // Regular
  },
  body: {
    size: 14,
    lineHeight: 20,
    weight: '400',
  },
  bodySmall: {
    size: 12,
    lineHeight: 18,
    weight: '400',
  },
  
  // Labels & captions
  label: {
    size: 14,
    lineHeight: 20,
    weight: '500', // Medium
  },
  caption: {
    size: 12,
    lineHeight: 16,
    weight: '400',
  },
  overline: {
    size: 10,
    lineHeight: 14,
    weight: '500',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  
  // Stock-specific
  stockPrice: {
    size: 18,
    lineHeight: 24,
    weight: '600',
    fontFamily: 'mono', // Monospace for alignment
  },
  stockPriceLarge: {
    size: 24,
    lineHeight: 32,
    weight: '700',
    fontFamily: 'mono',
  },
}
```

### Typography Guidelines

1. **Giá Cổ Phiếu**: Sử dụng font monospace để căn chỉnh số
2. **Percentage**: Luôn hiển thị dấu +/- và %
3. **Line Height**: Tối thiểu 1.4 cho text dài
4. **Letter Spacing**: Tăng nhẹ cho text uppercase

---

## 🔘 Components

### Buttons

#### Sizes
```typescript
button: {
  small: {
    height: 32,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  medium: {
    height: 40,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  large: {
    height: 48,
    paddingHorizontal: 24,
    fontSize: 16,
  },
}
```

#### Variants
1. **Primary**: Background `green.500`, Text `white`
2. **Secondary**: Background `purple.500`, Text `white`
3. **Outline**: Border `green.500`, Text `green.500`
4. **Ghost**: No background, Text `green.500`
5. **Danger**: Background `red.500`, Text `white`

### Cards

```typescript
card: {
  padding: 16,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3, // Android
}
```

### Inputs

```typescript
input: {
  height: 48,
  paddingHorizontal: 16,
  borderRadius: 8,
  borderWidth: 1,
  fontSize: 14,
  
  // States
  default: {
    borderColor: 'gray.300',
    backgroundColor: 'white',
  },
  focus: {
    borderColor: 'green.500',
    borderWidth: 2,
  },
  error: {
    borderColor: 'red.500',
  },
  disabled: {
    backgroundColor: 'gray.100',
    borderColor: 'gray.200',
    opacity: 0.6,
  },
}
```

### Border Radius

```typescript
borderRadius: {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
}
```

### Shadows

```typescript
shadows: {
  // Light shadows for elevation
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
}
```

---

## 📱 Stock Market Specific Rules

### 1. Stock Price Display
- **Màu xanh lá**: Giá tăng so với tham chiếu
- **Màu đỏ**: Giá giảm so với tham chiếu
- **Màu vàng/amber**: Giá tham chiếu, không đổi
- **Màu tím**: Giá trần
- **Màu cyan**: Giá sàn

### 2. Volume & Value Display
- **Format số**: Sử dụng K, M, B cho rút gọn (VD: 1.2M)
- **Alignment**: Căn phải cho các cột số
- **Decimal**: Giá cổ phiếu 2 chữ số thập phân

### 3. Chart Colors
```typescript
chart: {
  candlestick: {
    up: '#22c55e',      // Green 500
    down: '#ef4444',    // Red 500
  },
  line: {
    primary: '#22c55e', // Green 500
    volume: '#a855f7',  // Purple 500
  },
  grid: {
    light: '#e5e7eb',   // Gray 200
    dark: '#374151',    // Gray 700
  },
}
```

### 4. Order Book (Sổ lệnh)
```typescript
orderBook: {
  bid: {
    background: 'rgba(34, 197, 94, 0.1)',  // Green with opacity
    text: '#22c55e',
  },
  ask: {
    background: 'rgba(239, 68, 68, 0.1)',  // Red with opacity
    text: '#ef4444',
  },
  matched: {
    background: 'rgba(168, 85, 247, 0.1)', // Purple with opacity
    text: '#a855f7',
  },
}
```

---

## 🎭 Animations & Transitions

### Duration
```typescript
animation: {
  fast: 150,       // Quick feedback
  base: 200,       // Standard transitions
  slow: 300,       // Complex animations
  slower: 500,     // Page transitions
}
```

### Easing
```typescript
easing: {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: { tension: 180, friction: 20 },
}
```

### Common Animations
1. **Fade In/Out**: Duration 200ms
2. **Slide**: Duration 300ms
3. **Scale**: Duration 150ms
4. **Color Change**: Duration 200ms
5. **Real-time Price Update**: Flash effect 300ms

---

## 🔔 Notifications & Alerts

### Types
1. **Success**: Green background, white text
2. **Error**: Red background, white text
3. **Warning**: Amber background, dark text
4. **Info**: Blue background, white text

### Position
- **Toast**: Top center, auto-dismiss 3s
- **Alert**: Full width, manual dismiss
- **Badge**: Top right of icon/avatar

---

## 📊 Layout Guidelines

### Screen Padding
- **Mobile**: `16px` left/right
- **Tablet**: `24px` left/right
- **Safe Area**: Respect device safe area insets

### Grid System
- **Base**: 4px grid system
- **Columns**: Flexible based on content
- **Gutter**: `16px` between columns

### Lists
```typescript
list: {
  itemHeight: 64,
  itemPadding: 16,
  itemSpacing: 0,
  sectionHeaderHeight: 40,
  sectionHeaderPadding: 12,
}
```

---

## 🎯 Icon Guidelines

### Sizes
```typescript
iconSize: {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 32,
  xl: 40,
}
```

### Style
- **Line**: 2px stroke width
- **Filled**: For active/selected states
- **Outlined**: For inactive states

### Color
- Follow text color in most cases
- Use semantic colors for status icons

---

## ✅ Checklist Thiết Kế

Khi thiết kế một màn hình mới, đảm bảo:

- [ ] Sử dụng đúng màu sắc từ design system
- [ ] Áp dụng spacing nhất quán (bội số của 4)
- [ ] Typography đúng hierarchy
- [ ] Touch target tối thiểu 44x44
- [ ] Tương thích cả Light & Dark mode
- [ ] Animation mượt mà (không giật lag)
- [ ] Hiển thị loading state
- [ ] Xử lý error state
- [ ] Empty state có thiết kế
- [ ] Responsive trên nhiều kích thước màn hình

---

## 📦 File Structure

```
src/
  constants/
    colors.ts          // Color constants
    spacing.ts         // Spacing values
    typography.ts      // Font sizes, weights
    shadows.ts         // Shadow definitions
    animations.ts      // Animation configs
    index.ts          // Export all
  
  theme/
    theme.ts          // Main theme object
    darkTheme.ts      // Dark mode overrides
    lightTheme.ts     // Light mode overrides
  
  styles/
    common.ts         // Common styles
    stock.ts          // Stock-specific styles
```

---

## 🚀 Next Steps

1. **Implement constants files** theo design system này
2. **Create theme provider** with React Context
3. **Build reusable components** (Button, Card, Input, etc.)
4. **Setup dark mode toggle**
5. **Add animation library** (react-native-reanimated)
6. **Create stock-specific components** (PriceDisplay, OrderBook, Chart)

---

## 📚 References

- Material Design 3
- Apple Human Interface Guidelines
- VNDirect Mobile App
- SSI iBoard
- Robinhood Design System

