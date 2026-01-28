/**
 * MoreScreen - Trang More (tạm thời để trống)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Primary } from '@/constants';

export const MoreScreen: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#0d0d0d', '#1a1a1a']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.placeholder}>More Content</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 24,
    fontWeight: '600',
    color: Primary[400],
  },
});
