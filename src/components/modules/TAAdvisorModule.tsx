/**
 * TAAdvisorModule - Module Tư vấn phân tích kỹ thuật
 * Hiển thị điểm số 4 trụ cột TA của cổ phiếu
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

export const TAAdvisorModule: React.FC = () => {
  return (
    <View className="bg-[#1a1a1a] rounded-lg overflow-hidden">
      {/* Header Section */}
      <View className="flex-row justify-between items-start p-4">
        <View className="flex-1">
          <Text className="text-2xl font-bold" style={{ color: '#34C85E' }}>
            Technical
          </Text>
          <Text className="text-xs text-gray-400 mt-1">Analysis</Text>
          <Text className="text-sm text-gray-300 mt-2">Tứ trụ TA</Text>
        </View>

        {/* Bar Chart Icon */}
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
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="#34C85E">
              <Path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 9h2v9h-2v-9zm4-3h2v12h-2V9z"/>
            </Svg>
          </View>
        </View>
      </View>

      {/* Four Pillars Grid */}
      <View className="px-4 pb-6">
        <View className="flex-row justify-between mb-4">
          {/* RS (Relative Strength) */}
          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-400 mb-2">RS</Text>
            <Text className="text-2xl font-bold" style={{ color: '#34C85E' }}>73</Text>
          </View>

          {/* Xu hướng (Trend) */}
          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-400 mb-2">Xu hướng</Text>
            <Text className="text-base font-bold" style={{ color: '#34C85E' }}>Giảm yếu</Text>
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
          {/* Dòng tiền (Money Flow) */}
          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-400 mb-2">Dòng tiền</Text>
            <View className="items-center">
              {/* Buy Flow */}
              <View className="flex-row items-center mb-1">
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="#34C85E">
                  <Path d="M7 14l5-5 5 5z"/>
                </Svg>
                <Text className="text-sm font-semibold ml-1" style={{ color: '#34C85E' }}>
                  1,400
                </Text>
              </View>
              {/* Sell Flow */}
              <View className="flex-row items-center">
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="#ef4444">
                  <Path d="M7 10l5 5 5-5z"/>
                </Svg>
                <Text className="text-sm font-semibold ml-1 text-red-500">
                  1,900
                </Text>
              </View>
            </View>
          </View>

          {/* Mẫu hình (Pattern) */}
          <View className="flex-1 items-center justify-center">
            <Text className="text-sm text-gray-400 mb-2">Mẫu hình</Text>
            <TouchableOpacity
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: '#34C85E' }}
            >
              <Text className="text-sm font-semibold" style={{ color: '#34C85E' }}>
                Xem
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
