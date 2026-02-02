/**
 * NewsDetailScreen - Màn hình chi tiết tin tức
 * Hiển thị đầy đủ thông tin của một tin tức
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Svg, { Path, Rect } from 'react-native-svg';

interface NewsDetailParams {
  newsItem: {
    id: string;
    time: string;
    title: string;
    imageUrl?: string;
    content?: string;
    source?: string;
    category?: string;
  };
}

type RouteParams = RouteProp<{ NewsDetail: NewsDetailParams }, 'NewsDetail'>;

export const NewsDetailScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteParams>();
  const { newsItem } = route.params || {};

  const [isSaved, setIsSaved] = useState(false);

  if (!newsItem) {
    return (
      <SafeAreaView className="flex-1 bg-[#0d0d0d]">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400">Không tìm thấy tin tức</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${newsItem.title}\n\n${newsItem.content || ''}`,
        title: newsItem.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save to favorites logic
  };

  // Mock full content
  const fullContent = newsItem.content || `
    Đây là nội dung chi tiết của tin tức "${newsItem.title}".
    
    Thị trường chứng khoán đang có nhiều biến động trong thời gian gần đây. Các nhà đầu tư cần theo dõi sát sao diễn biến để có những quyết định đầu tư phù hợp.
    
    Theo các chuyên gia phân tích, xu hướng thị trường trong thời gian tới sẽ phụ thuộc vào nhiều yếu tố vĩ mô như: chính sách tiền tệ, lạm phát, tăng trưởng kinh tế...
    
    Nhà đầu tư nên cân nhắc kỹ lưỡng trước khi đưa ra quyết định, đồng thời cần đa dạng hóa danh mục đầu tư để giảm thiểu rủi ro.
  `;

  const relatedNews = [
    { id: '1', title: 'VN-Index tăng điểm trong phiên giao dịch sáng', time: '2 giờ trước' },
    { id: '2', title: 'Cổ phiếu ngân hàng dẫn dắt thị trường', time: '3 giờ trước' },
    { id: '3', title: 'Nhà đầu tư nước ngoài mua ròng 500 tỷ đồng', time: '5 giờ trước' },
  ];

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
            <Text className="text-lg font-bold text-white">Chi tiết tin tức</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={handleSave}
                className="w-10 h-10 items-center justify-center rounded-full bg-white/[0.05]"
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill={isSaved ? "#34C85E" : "none"}>
                  <Path
                    d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
                    stroke={isSaved ? "#34C85E" : "#ffffff"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleShare}
                className="w-10 h-10 items-center justify-center rounded-full bg-white/[0.05]"
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Category & Time */}
            <View className="px-4 pt-4 pb-2 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                {newsItem.category && (
                  <LinearGradient
                    colors={['#34C85E', '#2ab84d']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="px-3 py-1 rounded-full"
                  >
                    <Text className="text-[#282832] font-semibold text-xs">
                      {newsItem.category}
                    </Text>
                  </LinearGradient>
                )}
              </View>
              <Text className="text-[#34C85E] text-xs font-medium">{newsItem.time}</Text>
            </View>

            {/* Title */}
            <View className="px-4 py-2">
              <Text className="text-white text-xl font-bold leading-7">{newsItem.title}</Text>
            </View>

            {/* Source */}
            {newsItem.source && (
              <View className="px-4 pb-3">
                <Text className="text-gray-400 text-xs">Nguồn: {newsItem.source}</Text>
              </View>
            )}

            {/* Featured Image */}
            {newsItem.imageUrl && (
              <View className="px-4 pb-4">
                <View className="rounded-xl overflow-hidden bg-white/[0.05]">
                  <Image
                    source={{ uri: newsItem.imageUrl }}
                    style={{ width: '100%', height: 220 }}
                    resizeMode="cover"
                  />
                </View>
              </View>
            )}

            {/* AI Analysis Button */}
            <View className="px-4 pb-4">
              <TouchableOpacity
                className="overflow-hidden rounded-xl"
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#34C85E', '#2ab84d']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="flex-row items-center justify-center py-3 px-4"
                >
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
                    <Path d="M12 8V4H8" stroke="#282832" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <Rect width="16" height="12" x="4" y="8" rx="2" stroke="#282832" strokeWidth="2" />
                    <Path d="M2 14h2M20 14h2M15 13v2M9 13v2" stroke="#282832" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                  <Text className="text-[#282832] font-bold text-sm">Phân tích bằng AI</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View className="px-4 pb-4">
              <View className="bg-white/[0.05] rounded-xl p-4 border border-white/[0.08]">
                <Text className="text-gray-300 text-base leading-7">{fullContent}</Text>
              </View>
            </View>

            {/* Tags */}
            <View className="px-4 pb-4">
              <View className="flex-row flex-wrap gap-2">
                {['Thị trường', 'Chứng khoán', 'Phân tích', 'Đầu tư'].map((tag) => (
                  <View key={tag} className="bg-white/[0.05] px-3 py-1.5 rounded-full border border-white/[0.08]">
                    <Text className="text-gray-400 text-xs">#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Related News */}
            <View className="px-4 pb-6">
              <Text className="text-white font-bold text-base mb-3">Tin liên quan</Text>
              <View className="space-y-3">
                {relatedNews.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="bg-white/[0.05] rounded-xl p-3 border border-white/[0.08] flex-row items-center justify-between"
                    activeOpacity={0.7}
                  >
                    <View className="flex-1 pr-3">
                      <Text className="text-gray-300 text-sm mb-1" numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text className="text-gray-500 text-xs">{item.time}</Text>
                    </View>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M9 18l6-6-6-6"
                        stroke="#34C85E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};
