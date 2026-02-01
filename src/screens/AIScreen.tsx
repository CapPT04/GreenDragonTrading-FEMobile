/**
 * AIScreen - Màn hình AI Assistant
 * Hỗ trợ phân tích và tư vấn đầu tư chứng khoán
 */

import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const AIScreen: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <SafeAreaView className="flex-1 bg-[#0d0d0d]">
        <LinearGradient
          colors={['#0d0d0d', '#1a1a1a']}
          className="flex-1"
        >
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-semibold text-primary-400">AI Assistant</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};
