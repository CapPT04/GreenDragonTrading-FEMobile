/**
 * SessionInfoModule - Module thông tin phiên giao dịch
 * Hiển thị 3 bước giá, tỷ lệ mua/bán, và thông tin NN
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

interface PriceLevel {
  price: number;
  volume: number;
  change: number;
  changePercent: number;
  type: 'buy' | 'sell' | 'reference';
}

interface SessionInfoModuleProps {
  symbol?: string;
}

export const SessionInfoModule: React.FC<SessionInfoModuleProps> = ({ symbol = 'VCB' }) => {
  const [showTotal, setShowTotal] = useState(true);

  // Sample data for price levels - 10 orders
  const priceLevels: PriceLevel[] = [
    { price: 13.35, volume: 500, change: 0.25, changePercent: 1.91, type: 'buy' },
    { price: 13.30, volume: 400, change: 0.20, changePercent: 1.53, type: 'buy' },
    { price: 13.25, volume: 300, change: 0.15, changePercent: 1.15, type: 'buy' },
    { price: 13.20, volume: 200, change: 0.10, changePercent: 0.76, type: 'buy' },
    { price: 13.15, volume: 100, change: 0.05, changePercent: 0.38, type: 'buy' },
    { price: 13.10, volume: 150, change: 0, changePercent: 0, type: 'reference' },
    { price: 13.05, volume: 250, change: -0.05, changePercent: -0.38, type: 'sell' },
    { price: 13.00, volume: 350, change: -0.10, changePercent: -0.76, type: 'sell' },
    { price: 12.95, volume: 450, change: -0.15, changePercent: -1.15, type: 'sell' },
    { price: 12.90, volume: 550, change: -0.20, changePercent: -1.53, type: 'sell' },
  ];

  const maxVolume = Math.max(...priceLevels.map(level => level.volume));
  const bullRatio = 20;
  const bearRatio = 80;

  const toggleMode = () => {
    setShowTotal(!showTotal);
  };

  const BullIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="#282832">
      <Path d="M12 2L15 8H9L12 2Z M8 10H16L18 16H6L8 10Z M6 18H18V20H6V18Z" />
    </Svg>
  );

  const BearIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="#282832">
      <Path d="M12 22L9 16H15L12 22Z M16 14H8L6 8H18L16 14Z M18 6H6V4H18V6Z" />
    </Svg>
  );

  const SwapIcon = () => (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M17 1L21 5L17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3 11V9a4 4 0 0 1 4-4h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <Path d="M7 23L3 19L7 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 13v2a4 4 0 0 1-4 4H3" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );

  return (
    <View className="bg-[#282832] rounded-lg overflow-hidden" style={{ height: 500 }}>
      {/* Header Badge with Symbol */}
      <View className="items-center pt-3 pb-2 relative">
        {/* Symbol at top left */}
        <View className="absolute left-3 top-3">
          <LinearGradient
            colors={['#34C85E', '#2ab84d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="px-3 py-1 rounded-full"
          >
            <Text className="text-[#282832] font-bold text-xs">{symbol}</Text>
          </LinearGradient>
        </View>

        {/* Center Badge */}
        <LinearGradient
          colors={['#34C85E', '#2ab84d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="px-6 py-1.5 rounded-full"
          style={{
            shadowColor: '#34C85E',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Text className="text-[#282832] font-bold text-base">📊 3 Bước Giá</Text>
        </LinearGradient>
      </View>

      {/* Bull/Bear Ratio Bar */}
      <View className="px-4 py-3">
        <TouchableOpacity
          onPress={toggleMode}
          activeOpacity={0.8}
          className="relative overflow-hidden rounded-full"
          style={{ height: 28 }}
        >
          {/* Background */}
          <View className="absolute inset-0 bg-gray-700" />

          {/* Bull Section */}
          <View
            className="absolute left-0 top-0 bottom-0 items-center justify-center"
            style={{ width: `${bullRatio}%`, backgroundColor: '#34C85E' }}
          >
            <BullIcon />
          </View>

          {/* Bear Section */}
          <View
            className="absolute right-0 top-0 bottom-0 items-center justify-center bg-red-500"
            style={{ width: `${bearRatio}%` }}
          >
            <BearIcon />
          </View>

          {/* Toggle Icon */}
          <View className="absolute inset-0 items-center justify-center">
            <View className="bg-black/20 rounded-full p-1">
              <SwapIcon />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Price Levels Table */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="space-y-1">
          {priceLevels.map((level, index) => {
            const widthPercent = (level.volume / maxVolume) * 100;
            const isGreen = level.type === 'buy';
            const isRed = level.type === 'sell';
            const isReference = level.type === 'reference';
            const textColor = isGreen ? 'text-green-500' : isRed ? 'text-red-500' : 'text-red-500';

            return (
              <View
                key={index}
                className={`relative overflow-hidden rounded-lg ${
                  isReference ? 'bg-red-900/40' : 'bg-gray-700'
                }`}
                style={{ height: 32 }}
              >
                {/* Volume Background Bar */}
                {!isReference && (
                  <View
                    className={`absolute left-12 top-0 bottom-0 ${
                      isGreen ? 'bg-green-600/30' : 'bg-red-600/30'
                    }`}
                    style={{ width: `${widthPercent}%` }}
                  />
                )}

                {/* Content Row */}
                <View className="flex-row px-2" style={{ height: 32, alignItems: 'center' }}>
                  {/* Price */}
                  <Text 
                    className={`w-12 text-center font-semibold ${textColor}`}
                    style={{ lineHeight: 32 }}
                  >
                    {level.price.toFixed(2)}
                  </Text>

                  {/* Volume */}
                  <Text 
                    className={`flex-1 text-left px-2 ${textColor}`}
                    style={{ lineHeight: 32 }}
                  >
                    {level.volume}
                  </Text>

                  {/* Change */}
                  <Text 
                    className={`w-12 text-center ${textColor}`}
                    style={{ lineHeight: 32 }}
                  >
                    {level.change > 0 ? '+' : ''}
                    {level.change.toFixed(2)}
                  </Text>

                  {/* Change Percent */}
                  <Text 
                    className={`w-16 text-center font-semibold ${textColor}`}
                    style={{ lineHeight: 32 }}
                  >
                    {level.changePercent > 0 ? '+' : ''}
                    {level.changePercent.toFixed(2)}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Foreign Investor Section */}
      <View className="px-4 py-3 border-t border-white/[0.05]">
        <View className="bg-gray-700 rounded-full flex-row items-center justify-between px-3 py-2">
          <View className="flex-row items-center">
            <Text className="text-white text-xs mr-1">NN Mua</Text>
            <Text className="text-green-500 font-semibold text-xs">0.0%</Text>
          </View>

          <LinearGradient
            colors={['#34C85E', '#2ab84d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="px-3 py-1 rounded-full"
          >
            <Text className="text-[#282832] font-semibold text-xs">300</Text>
          </LinearGradient>

          <View className="flex-row items-center">
            <Text className="text-red-500 font-semibold text-xs">0.0%</Text>
            <Text className="text-white text-xs ml-1">NN Bán</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
