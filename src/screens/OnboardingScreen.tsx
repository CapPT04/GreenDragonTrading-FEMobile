/**
 * OnboardingScreen - Màn hình giới thiệu
 * Dark theme với màu xanh lá chủ đạo
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Primary, Spacing, Typography, BorderRadius } from '@/constants';

const { width, height } = Dimensions.get('window');

export const OnboardingScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 30,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f1419" />
      
      {/* Animated Graphic */}
      <Animated.View
        style={[
          styles.graphicContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Stock Chart Illustration */}
        <View style={styles.chartContainer}>
          {/* Background bars */}
          <View style={styles.barsContainer}>
            <View style={[styles.bar, { height: 60 }]} />
            <View style={[styles.bar, { height: 80 }]} />
            <View style={[styles.bar, { height: 100 }]} />
            <View style={[styles.bar, { height: 120 }]} />
          </View>
          
          {/* Arrows going up */}
          <View style={styles.arrowsContainer}>
            <View style={[styles.arrow, { left: 40, bottom: 80 }]}>
              <View style={styles.arrowHead} />
              <View style={styles.arrowLine} />
            </View>
            <View style={[styles.arrow, { left: 100, bottom: 100 }]}>
              <View style={styles.arrowHead} />
              <View style={styles.arrowLine} />
            </View>
            <View style={[styles.arrow, { left: 160, bottom: 120 }]}>
              <View style={styles.arrowHead} />
              <View style={styles.arrowLine} />
            </View>
          </View>

          {/* Growth line */}
          <View style={styles.growthLine} />
        </View>
      </Animated.View>

      {/* Content */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Chào mừng đến với{'\n'}thế giới Chứng khoán</Text>
        <Text style={styles.subtitle}>
          Đầu tư vào các cổ phiếu tạo nên sự khác biệt như{'\n'}
          với cách bạn muốn đầu tư và tăng trưởng
        </Text>

        {/* Pagination dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={onFinish}>
          <Text style={styles.skipText}>Bỏ qua</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={onFinish} activeOpacity={0.8}>
          <LinearGradient
            colors={[Primary[400], Primary[600]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>Tiếp theo</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
    paddingHorizontal: Spacing[6],
  },
  graphicContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  chartContainer: {
    width: width * 0.7,
    height: 280,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 20,
    position: 'absolute',
    bottom: 0,
  },
  bar: {
    width: 40,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderRadius: 8,
    borderTopWidth: 3,
    borderTopColor: Primary[400],
  },
  arrowsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  arrow: {
    position: 'absolute',
    alignItems: 'center',
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Primary[400],
  },
  arrowLine: {
    width: 4,
    height: 80,
    backgroundColor: Primary[400],
  },
  growthLine: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Primary[500],
    transform: [{ rotate: '15deg' }],
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: Spacing[8],
  },
  title: {
    ...Typography.h1,
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: Spacing[4],
    lineHeight: 36,
  },
  subtitle: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing[8],
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dotActive: {
    width: 24,
    backgroundColor: Primary[400],
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing[8],
  },
  skipText: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
  },
  nextButton: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    minWidth: 140,
  },
  nextButtonGradient: {
    paddingHorizontal: Spacing[8],
    paddingVertical: Spacing[4],
    alignItems: 'center',
  },
  nextButtonText: {
    ...Typography.body,
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
