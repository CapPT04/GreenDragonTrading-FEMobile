# KafiStock Mobile

Ứng dụng quản lý kho hàng di động được xây dựng với Expo, React Native, và NativeWind (Tailwind CSS).

## 🚀 Công nghệ sử dụng

- **Expo SDK 52** - Framework React Native
- **Expo Router v4** - File-based routing
- **NativeWind v4** - Tailwind CSS cho React Native
- **TypeScript** - Type safety
- **React Native Reanimated** - Animations
- **Expo Vector Icons** - Icon library

## 📁 Cấu trúc thư mục

```
KafiStockMobile/
├── app/                      # Expo Router (file-based routing)
│   ├── (tabs)/              # Tab navigation group
│   │   ├── _layout.tsx      # Tab layout configuration
│   │   ├── home.tsx         # Home screen
│   │   ├── explore.tsx      # Explore screen
│   │   └── profile.tsx      # Profile screen
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx            # Entry point
│   └── +not-found.tsx       # 404 screen
├── assets/                   # Static assets
│   ├── fonts/               # Custom fonts
│   └── images/              # Images & icons
├── components/              # Reusable components
│   └── ui/                  # UI components
│       ├── Button.tsx       # Button component
│       ├── Card.tsx         # Card component
│       ├── Input.tsx        # Input component
│       └── index.ts         # Exports
├── constants/               # App constants
│   ├── theme.ts            # Theme colors & styles
│   └── index.ts            # General constants
├── hooks/                   # Custom React hooks
│   ├── useDebounce.ts      # Debounce hook
│   └── useColorScheme.ts   # Color scheme hook
├── types/                   # TypeScript types
│   └── index.ts            # Type definitions
├── utils/                   # Utility functions
│   ├── formatters.ts       # Format helpers
│   └── validation.ts       # Validation helpers
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── metro.config.js         # Metro bundler config
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── global.css              # Global styles
├── nativewind-env.d.ts     # NativeWind types
└── package.json            # Dependencies

```

## 🛠️ Cài đặt

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Khởi động development server:**
   ```bash
   npm start
   ```

3. **Chạy trên nền tảng cụ thể:**
   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 💡 Features

### ✅ Đã triển khai
- 🎨 NativeWind v4 (Tailwind CSS)
- 🧭 File-based routing với Expo Router
- 📱 Tab navigation (Home, Explore, Profile)
- 🎯 TypeScript support
- 🧩 Reusable UI components (Button, Card, Input)
- 🎨 Custom theme với Tailwind
- 🔧 Utility functions & custom hooks
- 📦 Type-safe routing

### 🎨 UI Components

#### Button
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md" onPress={() => {}}>
  Click Me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`
Sizes: `sm`, `md`, `lg`

#### Card
```tsx
import { Card } from '@/components/ui/Card';

<Card>
  <Text>Card Content</Text>
</Card>
```

#### Input
```tsx
import { Input } from '@/components/ui/Input';

<Input 
  label="Email"
  placeholder="Enter email"
  error="Invalid email"
/>
```

## 📝 Scripts

- `npm start` - Khởi động Expo development server
- `npm run android` - Chạy trên Android
- `npm run ios` - Chạy trên iOS  
- `npm run web` - Chạy trên web browser
- `npm run lint` - Chạy ESLint
- `npm test` - Chạy tests

## 🎨 Customization

### Theme Colors
Chỉnh sửa [tailwind.config.js](tailwind.config.js) để thay đổi theme:

```js
theme: {
  extend: {
    colors: {
      primary: { ... },
      secondary: { ... }
    }
  }
}
```

### Path Aliases
Đã cấu hình path aliases trong [tsconfig.json](tsconfig.json):

- `@/*` - Root directory
- `@/components/*` - Components
- `@/constants/*` - Constants
- `@/hooks/*` - Custom hooks
- `@/utils/*` - Utilities
- `@/types/*` - Types
- `@/assets/*` - Assets

## 📦 Dependencies

### Main
- expo ~52.0.0
- react-native 0.76.5
- expo-router ~4.0.0
- nativewind ^4.0.1
- tailwindcss ^3.4.0

### Dev
- typescript ~5.3.3
- @types/react ~18.3.12

## 🔗 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

MIT

---

Phát triển bởi KafiStock Team ☕
