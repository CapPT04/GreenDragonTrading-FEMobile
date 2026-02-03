/**
 * FAAdvisorModule - Module Tư vấn phân tích cơ bản
 * Hiển thị điểm số 4 trụ cột FA của cổ phiếu
 */

import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G } from 'react-native-svg';

export const FAAdvisorModule: React.FC = () => {
  return (
    <View className="bg-[#1a1a1a] rounded-lg overflow-hidden">
      {/* Header Section */}
      <View className="flex-row justify-between items-start p-4">
        <View className="flex-1">
          <Text className="text-2xl font-bold" style={{ color: '#34C85E' }}>
            Fundamental
          </Text>
          <Text className="text-xs text-gray-400 mt-1">Analysis</Text>
          <Text className="text-sm text-gray-300 mt-2">Tứ trụ FA</Text>
        </View>

        {/* Chart Icon */}
        <View className="items-center justify-center">
          <View 
            className="rounded-full items-center justify-center"
            style={{ 
              width: 48, 
              height: 48,
              backgroundColor: '#1f1f1f',
              borderWidth: 1.5,
              borderColor: '#34C85E'
            }}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                stroke="#34C85E"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                stroke="#34C85E"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </View>
      </View>

      {/* Four Pillars Grid */}
      <View className="px-4 pb-6">
        <View className="flex-row justify-between mb-4">
          {/* Định Giá (Valuation) */}
          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-400 mb-2">Định Giá</Text>
            <Text className="text-2xl font-bold text-white">16.1</Text>
          </View>

          {/* Tài chính (Financial) */}
          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-400 mb-2">Tài chính</Text>
            <Text className="text-2xl font-bold" style={{ color: '#34C85E' }}>84</Text>
          </View>
        </View>

        {/* Divider with Stock Symbol */}
        <View className="my-4 relative">
          <View className="h-[1px] bg-gray-600" />
          <View 
            className="absolute left-1/2 top-1/2 px-4 py-1 rounded-full items-center justify-center"
            style={{ 
              backgroundColor: '#34C85E',
              transform: [{ translateX: -25 }, { translateY: -12 }]
            }}
          >
            <Text className="text-gray-900 font-bold text-sm">ABR</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-4">
          {/* Kinh doanh (Business) */}
          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-400 mb-2">Kinh doanh</Text>
            <Text className="text-2xl font-bold text-yellow-600">70</Text>
          </View>

          {/* Hiệu quả (Efficiency) */}
          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-400 mb-2">Hiệu quả</Text>
            <Text className="text-2xl font-bold text-yellow-600">78</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
