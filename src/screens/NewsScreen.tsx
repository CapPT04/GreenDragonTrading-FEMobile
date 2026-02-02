/**
 * NewsScreen - Màn hình danh sách tin tức đầy đủ
 * Placeholder cho màn hình tin tức độc lập (nếu cần)
 */

import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Svg, { Path } from 'react-native-svg';
import { NewsModule } from '@/components/modules/NewsModule';

export const NewsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleNewsPress = (newsItem: any) => {
    navigation.navigate('NewsDetail', { newsItem });
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" translucent={false} />
      <SafeAreaView className="flex-1 bg-[#0d0d0d]">
        <LinearGradient colors={['#0d0d0d', '#1a1a1a']} className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/[0.05]">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 items-center justify-center rounded-full bg-white/[0.05]"
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M15 18l-6-6 6-6"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
            <Text className="text-lg font-bold text-white">Tin tức</Text>
            <View className="w-10" />
          </View>

          {/* News Module Full Screen */}
          <View className="flex-1 p-4">
            <NewsModule onNewsPress={handleNewsPress} />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};
