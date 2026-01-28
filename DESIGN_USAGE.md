# 🎨 KafiStock Design System

## Hướng Dẫn Sử Dụng Nhanh

### 📦 Import Constants

```typescript
import { 
  Colors, 
  Spacing, 
  Typography,
  Shadows,
  BorderRadius,
  Button,
  Stock,
} from '@/constants';
```

### 🎨 Sử Dụng Màu Sắc

#### Màu cơ bản
```typescript
import { Colors } from '@/constants';

// Light mode
<View style={{ backgroundColor: Colors.light.background }}>
  <Text style={{ color: Colors.light.text }}>Hello</Text>
</View>

// Dark mode
<View style={{ backgroundColor: Colors.dark.background }}>
  <Text style={{ color: Colors.dark.text }}>Hello</Text>
</View>
```

#### Màu chứng khoán
```typescript
import { Stock } from '@/constants';

// Hiển thị giá tăng (màu xanh lá)
<Text style={{ color: Stock.increase }}>+2.5%</Text>

// Hiển thị giá giảm (màu đỏ)
<Text style={{ color: Stock.decrease }}>-1.8%</Text>

// Giá tham chiếu (màu vàng)
<Text style={{ color: Stock.reference }}>45.50</Text>

// Giá trần (màu tím)
<Text style={{ color: Stock.ceiling }}>50.00</Text>

// Giá sàn (màu cyan)
<Text style={{ color: Stock.floor }}>40.00</Text>
```

### 📏 Sử Dụng Spacing

```typescript
import { Spacing, ComponentSpacing } from '@/constants';

<View style={{
  padding: Spacing[4],              // 16px
  marginBottom: Spacing[6],         // 24px
  gap: Spacing[3],                  // 12px
}}>
  {/* Content */}
</View>

// Hoặc sử dụng semantic spacing
<View style={{
  padding: ComponentSpacing.screenPadding,  // 16px
  marginBottom: ComponentSpacing.sectionMargin, // 24px
}}>
  {/* Content */}
</View>
```

### ✏️ Sử Dụng Typography

```typescript
import { Typography, FontSizes, FontWeights } from '@/constants';

// Sử dụng preset
<Text style={Typography.h1}>Heading 1</Text>
<Text style={Typography.body}>Body text</Text>

// Custom
<Text style={{
  fontSize: FontSizes.lg,
  fontWeight: FontWeights.semibold,
  lineHeight: 24,
}}>
  Custom text
</Text>

// Hiển thị giá cổ phiếu
<Text style={Typography.stockPrice}>125,500</Text>
<Text style={Typography.stockPriceLarge}>125,500</Text>
```

### 🃏 Tạo Card

```typescript
import { Card, BorderRadius, Shadows, Colors } from '@/constants';

<View style={{
  padding: Card.padding,
  borderRadius: Card.borderRadius,
  backgroundColor: Colors.light.card,
  ...Shadows.base,
}}>
  {/* Card content */}
</View>
```

### 🔘 Tạo Button

```typescript
import { Button, BorderRadius, Colors, Typography } from '@/constants';

// Primary button
<TouchableOpacity style={{
  height: Button.medium.height,
  paddingHorizontal: Button.medium.paddingHorizontal,
  backgroundColor: Colors.light.primary,
  borderRadius: Button.medium.borderRadius,
  justifyContent: 'center',
  alignItems: 'center',
}}>
  <Text style={{
    fontSize: Button.medium.fontSize,
    color: Colors.light.textInverse,
    fontWeight: '600',
  }}>
    Mua
  </Text>
</TouchableOpacity>

// Outline button
<TouchableOpacity style={{
  height: Button.medium.height,
  paddingHorizontal: Button.medium.paddingHorizontal,
  backgroundColor: 'transparent',
  borderRadius: Button.medium.borderRadius,
  borderWidth: 1,
  borderColor: Colors.light.primary,
  justifyContent: 'center',
  alignItems: 'center',
}}>
  <Text style={{
    fontSize: Button.medium.fontSize,
    color: Colors.light.primary,
    fontWeight: '600',
  }}>
    Bán
  </Text>
</TouchableOpacity>
```

### 📝 Tạo Input

```typescript
import { Input, BorderRadius, Colors } from '@/constants';

<TextInput
  style={{
    height: Input.height,
    paddingHorizontal: Input.paddingHorizontal,
    borderRadius: Input.borderRadius,
    borderWidth: Input.borderWidth,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.background,
    fontSize: Input.fontSize,
    color: Colors.light.text,
  }}
  placeholder="Nhập mã cổ phiếu"
  placeholderTextColor={Colors.light.textSecondary}
/>
```

### 🎭 Animation

```typescript
import { Animated } from 'react-native';
import { AnimationDuration, TimingConfig } from '@/constants';

const fadeAnim = useRef(new Animated.Value(0)).current;

Animated.timing(fadeAnim, {
  toValue: 1,
  duration: AnimationDuration.base, // 200ms
  useNativeDriver: true,
}).start();

// Hoặc sử dụng config có sẵn
Animated.timing(fadeAnim, {
  toValue: 1,
  ...TimingConfig.base,
}).start();
```

### 📊 Component Chứng Khoán

#### Price Display với màu động
```typescript
import { Stock, Typography } from '@/constants';

const PriceDisplay = ({ price, referencePrice }) => {
  const getColor = () => {
    if (price > referencePrice) return Stock.increase;
    if (price < referencePrice) return Stock.decrease;
    return Stock.reference;
  };

  return (
    <Text style={[
      Typography.stockPrice,
      { color: getColor() }
    ]}>
      {price.toFixed(2)}
    </Text>
  );
};
```

#### Order Book Cell
```typescript
import { Stock, Spacing } from '@/constants';

// Bid cell (lệnh mua)
<View style={{
  backgroundColor: Stock.bidBg,
  padding: Spacing[3],
}}>
  <Text style={{ color: Stock.bidText }}>45.50</Text>
</View>

// Ask cell (lệnh bán)
<View style={{
  backgroundColor: Stock.askBg,
  padding: Spacing[3],
}}>
  <Text style={{ color: Stock.askText }}>45.70</Text>
</View>

// Matched cell (khớp lệnh)
<View style={{
  backgroundColor: Stock.matchedBg,
  padding: Spacing[3],
}}>
  <Text style={{ color: Stock.matchedText }}>45.60</Text>
</View>
```

### 💡 Tips

1. **Nhất quán**: Luôn sử dụng constants thay vì hardcode giá trị
2. **Semantic naming**: Ưu tiên `ComponentSpacing.screenPadding` hơn `Spacing[4]`
3. **Dark mode**: Chuẩn bị sẵn cho cả light và dark theme
4. **Accessibility**: Đảm bảo touch target tối thiểu 44x44
5. **Performance**: Sử dụng `useNativeDriver: true` khi có thể

### 📚 Tài Liệu Đầy Đủ

Xem file [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) để biết thêm chi tiết về:
- Nguyên tắc thiết kế
- Bảng màu đầy đủ
- Typography system
- Component specs
- Animation guidelines
- Stock market specific rules

---

Made with 💚 for KafiStock
