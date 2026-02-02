/**
 * OrderMatchingModule - Module khớp lệnh
 * Hiển thị lịch sử các lệnh mua/bán đã khớp
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OrderMatch {
  time: string;
  price: number;
  volume: number;
  type: 'M' | 'B'; // M = Mua (Buy), B = Bán (Sell)
}

interface OrderMatchingModuleProps {
  symbol?: string;
}

export const OrderMatchingModule: React.FC<OrderMatchingModuleProps> = ({ symbol = 'VCB' }) => {
  const [orders] = useState<OrderMatch[]>([
    { time: '13:52:37', price: 12.65, volume: 100, type: 'B' },
    { time: '13:52:37', price: 12.65, volume: 100, type: 'B' },
    { time: '13:52:37', price: 12.65, volume: 100, type: 'B' },
    { time: '13:52:37', price: 12.65, volume: 100, type: 'B' },
    { time: '13:52:37', price: 12.65, volume: 100, type: 'B' },
    { time: '13:52:37', price: 12.65, volume: 100, type: 'B' },
    { time: '13:52:37', price: 12.65, volume: 100, type: 'B' },
    { time: '13:52:37', price: 12.65, volume: 100, type: 'B' },
    { time: '10:13:30', price: 13.10, volume: 100, type: 'M' },
    { time: '09:18:36', price: 13.30, volume: 100, type: 'M' },
    { time: '09:15:20', price: 13.25, volume: 200, type: 'M' },
    { time: '09:10:15', price: 13.20, volume: 150, type: 'M' },
  ]);

  // Tính tổng số cổ và tổng giá trị
  const totalVolume = orders.reduce((sum, order) => sum + order.volume, 0);
  const totalValue = orders.reduce((sum, order) => sum + (order.price * order.volume), 0);

  // Format số tiền
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} triệu`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} nghìn`;
    }
    return value.toFixed(2);
  };

  return (
    <View className="bg-[#282832] rounded-lg overflow-hidden" style={{ height: 500 }}>
      {/* Header Badge with Symbol */}
      <View className="items-center pt-3 pb-2 relative">
        {/* Symbol at top left */}
        <View className="absolute left-3 top-3">
          <LinearGradient
            colors={['#16a34a', '#14b8a6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="px-3 py-1 rounded-full"
          >
            <Text className="text-[#282832] font-bold text-xs">{symbol}</Text>
          </LinearGradient>
        </View>

        {/* Center Badge */}
        <LinearGradient
          colors={['#16a34a', '#14b8a6']}
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
          <Text className="text-[#282832] font-bold text-base">📊 Khớp Lệnh</Text>
        </LinearGradient>
      </View>

      {/* Summary Info */}
      <View className="flex-row justify-between px-4 pb-3">
        <View>
          <Text className="text-gray-400 text-xs">Tổng KL</Text>
          <Text className="text-white font-semibold">{totalVolume} cổ</Text>
        </View>
        <View className="items-end">
          <Text className="text-gray-400 text-xs">Tổng GT</Text>
          <Text className="text-white font-semibold">{formatValue(totalValue)}</Text>
        </View>
      </View>

      {/* Table Header */}
      <View className="bg-gray-700 mx-4 rounded-t-lg">
        <View className="flex-row py-2 px-2">
          <Text className="flex-1 text-center text-gray-300 font-semibold text-xs">Thời gian</Text>
          <Text className="flex-1 text-center text-gray-300 font-semibold text-xs">Giá</Text>
          <Text className="flex-1 text-center text-gray-300 font-semibold text-xs">KL</Text>
          <Text className="flex-1 text-center text-gray-300 font-semibold text-xs">Lệnh</Text>
        </View>
      </View>

      {/* Orders List */}
      <ScrollView 
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View className="bg-gray-700 rounded-b-lg">
          {orders.map((order, index) => {
            const isGreen = order.type === 'M';
            const textColor = isGreen ? 'text-green-500' : 'text-red-500';
            const bgColor = isGreen ? 'bg-green-600/20' : 'bg-red-600/20';

            return (
              <View key={index} className={`border-t border-white/[0.05]`}>
                <View className="flex-row py-2 px-2 relative">
                  {/* Background gradient */}
                  <View className={`absolute left-0 top-0 bottom-0 w-full ${bgColor}`} />
                  
                  {/* Time */}
                  <Text 
                    className="flex-1 text-center text-gray-300 text-xs"
                    style={{ lineHeight: 20 }}
                  >
                    {order.time}
                  </Text>
                  
                  {/* Price */}
                  <Text 
                    className={`flex-1 text-center font-semibold text-xs ${textColor}`}
                    style={{ lineHeight: 20 }}
                  >
                    {order.price.toFixed(2)}
                  </Text>
                  
                  {/* Volume */}
                  <Text 
                    className="flex-1 text-center text-gray-300 text-xs"
                    style={{ lineHeight: 20 }}
                  >
                    {order.volume}
                  </Text>
                  
                  {/* Type */}
                  <Text 
                    className={`flex-1 text-center font-bold text-xs ${textColor}`}
                    style={{ lineHeight: 20 }}
                  >
                    {order.type}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
