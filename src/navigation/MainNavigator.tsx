import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PriceBoardScreen, AIScreen, GroupHubScreen, DashboardScreen } from '@/screens';
import { MainTabParamList } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { Primary } from '@/constants';

const Tab = createBottomTabNavigator<MainTabParamList>();

const { width } = Dimensions.get('window');

// Custom Tab Bar Icons with SVG
const DashboardIcon: React.FC<{ focused: boolean; size: number }> = ({ focused, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
      fill={focused ? Primary[400] : 'rgba(156, 163, 175, 0.6)'}
    />
  </Svg>
);

const AIIcon: React.FC<{ focused: boolean; size: number }> = ({ focused, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2l2.4 7.4H22l-6.3 4.6 2.4 7.4L12 16.8 5.9 21.4l2.4-7.4L2 9.4h7.6L12 2z"
      fill="#ffffff"
    />
    <Path
      d="M6 2l1 3H4l2.5 1.8L5.5 10 8 8.2 10.5 10 9.5 6.8 12 5H9l-1-3-1 3H4l2.5 1.8z"
      fill="#ffffff"
      opacity="0.6"
    />
  </Svg>
);

const GroupHubIcon: React.FC<{ focused: boolean; size: number }> = ({ focused, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
      fill={focused ? Primary[400] : 'rgba(156, 163, 175, 0.6)'}
    />
  </Svg>
);

const DashboardIconV2: React.FC<{ focused: boolean; size: number }> = ({ focused, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
      fill="#ffffff"
    />
  </Svg>
);

const HexagonBackground: React.FC = () => (
  <Svg width="44" height="44" viewBox="0 0 44 44" style={{ position: 'absolute' }}>
    <Defs>
      <SvgLinearGradient id="hexGradient" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#a855f7" />
        <Stop offset="1" stopColor="#ec4899" />
      </SvgLinearGradient>
    </Defs>
    <Path
      d="M22 2L38.5 12V32L22 42L5.5 32V12L22 2Z"
      fill="url(#hexGradient)"
    />
  </Svg>
);

const RhombusBackground: React.FC = () => (
  <Svg width="44" height="44" viewBox="0 0 44 44" style={{ position: 'absolute' }}>
    <Defs>
      <SvgLinearGradient id="rhombusGradient" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#06b6d4" />
        <Stop offset="1" stopColor="#14b8a6" />
      </SvgLinearGradient>
    </Defs>
    <Path
      d="M22 4L40 22L22 40L4 22Z"
      fill="url(#rhombusGradient)"
    />
  </Svg>
);

// Custom Tab Bar with Glass Morphism Effect
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBarContainer}>
      <LinearGradient
        colors={['rgba(13, 13, 13, 0.95)', 'rgba(26, 26, 26, 0.98)']}
        style={styles.tabBarGradient}
      >
        {/* Top border glow */}
        <LinearGradient
          colors={[Primary[500], 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.topGlow}
        />
        
        <View style={styles.tabBarContent}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            // Special handling for center button (AI), Dashboard, and GroupHub
            if (route.name === 'AI' || route.name === 'Dashboard' || route.name === 'GroupHub') {
              const isAI = route.name === 'AI';
              const isDashboard = route.name === 'Dashboard';
              const isGroupHub = route.name === 'GroupHub';
              
              let gradientColors: [string, string];
              let IconComponent: React.ComponentType<{ focused: boolean; size: number }>;
              let BackgroundComponent: React.ComponentType | null = null;
              let backgroundSize = 44;
              
              if (isAI) {
                gradientColors = ['#ef4444', '#dc2626'];
                IconComponent = AIIcon;
              } else if (isDashboard) {
                gradientColors = ['#a855f7', '#ec4899'];
                IconComponent = DashboardIconV2;
                BackgroundComponent = HexagonBackground;
                backgroundSize = 52;
              } else {
                gradientColors = ['#06b6d4', '#14b8a6'];
                IconComponent = GroupHubIcon;
                BackgroundComponent = RhombusBackground;
                backgroundSize = 52;
              }
              
              return (
                <View key={index} style={styles.centerButtonWrapper}>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={styles.centerButtonContainer}
                  >
                    <View style={[styles.centerButtonOuter, isFocused && styles.centerButtonOuterActive]}>
                      {isFocused ? (
                        BackgroundComponent ? (
                          <View style={[styles.hexagonContainer, { width: backgroundSize, height: backgroundSize }]}>
                            <Svg width={backgroundSize} height={backgroundSize} viewBox="0 0 44 44" style={{ position: 'absolute' }}>
                              <Defs>
                                <SvgLinearGradient id={isDashboard ? "hexGradient" : "rhombusGradient"} x1="0" y1="0" x2="1" y2="1">
                                  <Stop offset="0" stopColor={gradientColors[0]} />
                                  <Stop offset="1" stopColor={gradientColors[1]} />
                                </SvgLinearGradient>
                              </Defs>
                              <Path
                                d={isDashboard ? "M22 2L38.5 12V32L22 42L5.5 32V12L22 2Z" : "M22 4L40 22L22 40L4 22Z"}
                                fill={`url(#${isDashboard ? "hexGradient" : "rhombusGradient"})`}
                              />
                            </Svg>
                            <View style={{ zIndex: 1 }}>
                              <IconComponent focused={isFocused} size={22} />
                            </View>
                          </View>
                        ) : (
                          <LinearGradient
                            colors={gradientColors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.centerButtonGradient}
                          >
                            <IconComponent focused={isFocused} size={22} />
                          </LinearGradient>
                        )
                      ) : (
                        <View style={styles.centerButtonGradient}>
                          <IconComponent focused={isFocused} size={22} />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabButton}
              >
                <View style={[styles.iconContainer, isFocused && styles.iconContainerActive]}>
                  {route.name === 'PriceBoard' && (
                    <LinearGradient
                      colors={isFocused ? [Primary[600], '#14b8a6'] : ['transparent', 'transparent']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <DashboardIcon focused={isFocused} size={24} />
                    </LinearGradient>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
};

export const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="PriceBoard"
        component={PriceBoardScreen}
        options={{
          tabBarLabel: 'Bảng giá',
        }}
      />
      <Tab.Screen
        name="AI"
        component={AIScreen}
        options={{
          tabBarLabel: 'AI',
        }}
      />
      <Tab.Screen
        name="GroupHub"
        component={GroupHubScreen}
        options={{
          tabBarLabel: 'Groups',
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    borderTopWidth: 0,
  },
  tabBarGradient: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  topGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    opacity: 0.3,
  },
  tabBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    left: '50%',
    marginLeft: -20,
    width: 40,
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  activeIndicatorGradient: {
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  centerButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  centerButtonOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  centerButtonOuterActive: {
    borderColor: 'transparent',
  },
  centerButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexagonContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});
