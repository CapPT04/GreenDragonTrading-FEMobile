/**
 * DashboardScreen - Trang Dashboard
 * Quản lý và hiển thị các module phân tích
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Primary, Neutral } from '@/constants';
import Svg, { Path, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useModules } from '@/context';
import { GlobalStockChartModule } from '@/components/modules/GlobalStockChartModule';
import { NewsModule } from '@/components/modules/NewsModule';
import { SessionInfoModule } from '@/components/modules/SessionInfoModule';
import { OrderMatchingModule } from '@/components/modules/OrderMatchingModule';

interface Module {
  id: string;
  name: string;
  image: number;
}

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { modules, removeModule } = useModules();

  const handleNavigateToNews = (newsItem: any) => {
    navigation.navigate('NewsDetail', { newsItem });
  };

  const handleNewsPress = (newsItem: any) => {
    navigation.navigate('NewsDetail', { newsItem });
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" translucent={false} />
      <SafeAreaView className="flex-1 bg-[#0d0d0d]">
        <LinearGradient
          colors={['#0d0d0d', '#1a1a1a']}
          className="flex-1"
        >
          {/* Header */}
          <View className="px-4 py-3 border-b border-white/[0.05]">
            <Text className="text-xl font-bold text-white">Dashboard</Text>
          </View>

          {/* Add Module Button */}
          <View className="px-4 pt-4">
            <TouchableOpacity
              onPress={() => navigation.navigate('AddModule')}
              className="overflow-hidden rounded-xl"
            >
              <LinearGradient
                colors={['#a855f7', '#ec4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-row items-center justify-center py-4 px-6"
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" style={{ marginRight: 10 }}>
                  <Path
                    d="M12 5v14m-7-7h14"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </Svg>
                <Text className="text-[16px] font-bold text-white">Thêm Module</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Modules List or Empty State */}
          <ScrollView 
            className="flex-1 px-4 pt-6 pb-20"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {modules.length === 0 ? (
              <View className="items-center justify-center py-20">
                <View className="w-20 h-20 rounded-full bg-white/[0.05] items-center justify-center mb-4">
                  <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
                    <Rect x="3" y="3" width="7" height="7" rx="1.5" stroke={Neutral.gray400} strokeWidth="2" />
                    <Rect x="14" y="3" width="7" height="7" rx="1.5" stroke={Neutral.gray400} strokeWidth="2" />
                    <Rect x="3" y="14" width="7" height="7" rx="1.5" stroke={Neutral.gray400} strokeWidth="2" />
                    <Rect x="14" y="14" width="7" height="7" rx="1.5" stroke={Neutral.gray400} strokeWidth="2" />
                  </Svg>
                </View>
                <Text className="text-[16px] font-semibold text-gray-300 mb-2">Chưa có module nào</Text>
                <Text className="text-[14px] text-gray-500 text-center px-8">
                  Bấm nút "Thêm Module" để bắt đầu thêm các công cụ phân tích
                </Text>
              </View>
            ) : (
              <View>
                {modules.map((module: Module, index: number) => (
                  <View key={index} className="bg-white/[0.05] rounded-xl overflow-hidden mb-3 border border-white/[0.08]">
                    {/* Module Header */}
                    <View className="flex-row items-center justify-between p-3 border-b border-white/[0.05]">
                      <Text className="text-white text-[15px] font-semibold">{module.name}</Text>
                      <TouchableOpacity
                        onPress={() => removeModule(module.id)}
                        className="w-8 h-8 items-center justify-center"
                      >
                        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                          <Path
                            d="M6 18L18 6M6 6l12 12"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </Svg>
                      </TouchableOpacity>
                    </View>
                    {/* Module Content */}
                    <View className="px-3 pb-3">
                      {module.id === 'global-stock-chart' ? (
                        <GlobalStockChartModule />
                      ) : module.id === 'news' ? (
                        <NewsModule onNewsPress={handleNavigateToNews} />
                      ) : module.id === 'session-info' ? (
                        <SessionInfoModule />
                      ) : module.id === 'order-matching' ? (
                        <OrderMatchingModule />
                      ) : (
                        <View className="bg-[#1a1a1a] rounded-lg p-4" style={{ height: 200 }}>
                          <Text className="text-gray-400 text-[13px]">Module {module.name}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};
