/**
 * NotificationScreen - Trang Thông Báo
 * Hiển thị danh sách thông báo của người dùng
 */

import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Neutral, Stock, Primary } from '@/constants';
import Svg, { Path, Circle } from 'react-native-svg';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'price' | 'news' | 'system';
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'VND tăng giá',
    message: 'Mã VND đã tăng 5% trong phiên giao dịch',
    time: '5 phút trước',
    isRead: false,
    type: 'price',
  },
  {
    id: '2',
    title: 'Tin tức thị trường',
    message: 'VN-Index vượt mốc 1,830 điểm',
    time: '1 giờ trước',
    isRead: false,
    type: 'news',
  },
  {
    id: '3',
    title: 'HPG báo cáo tài chính',
    message: 'Lợi nhuận quý 4 tăng trưởng 23%',
    time: '2 giờ trước',
    isRead: true,
    type: 'news',
  },
  {
    id: '4',
    title: 'Cảnh báo giá',
    message: 'FPT giảm về mức hỗ trợ 104.5',
    time: 'Hôm qua',
    isRead: true,
    type: 'price',
  },
  {
    id: '5',
    title: 'Cập nhật hệ thống',
    message: 'Phiên bản 2.1.0 đã có sẵn',
    time: '2 ngày trước',
    isRead: true,
    type: 'system',
  },
];

export const NotificationScreen: React.FC = () => {
  const getIconByType = (type: string) => {
    switch (type) {
      case 'price':
        return (
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
              fill={Stock.increase}
            />
          </Svg>
        );
      case 'news':
        return (
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              fill={Primary[400]}
            />
          </Svg>
        );
      case 'system':
        return (
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="3" fill={Neutral.gray400} />
            <Path
              d="M12 1v6m0 6v6M1 12h6m6 0h6"
              stroke={Neutral.gray400}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </Svg>
        );
      default:
        return null;
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      className={`px-4 py-4 border-b border-white/[0.05] ${!item.isRead ? 'bg-white/[0.03]' : ''}`}
    >
      <View className="flex-row items-start">
        <View className="w-10 h-10 rounded-full bg-white/[0.08] items-center justify-center mr-3">
          {getIconByType(item.type)}
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className={`text-[15px] font-semibold ${!item.isRead ? 'text-white' : 'text-gray-300'}`}>
              {item.title}
            </Text>
            {!item.isRead && (
              <View className="w-2 h-2 rounded-full bg-primary-500 ml-2" />
            )}
          </View>
          <Text className="text-[14px] text-gray-400 mb-2" numberOfLines={2}>
            {item.message}
          </Text>
          <Text className="text-[12px] text-gray-500">{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" translucent={false} />
      <SafeAreaView className="flex-1 bg-[#0d0d0d]">
        <LinearGradient
          colors={['#0d0d0d', '#1a1a1a']}
          className="flex-1"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/[0.05]">
            <View className="flex-row items-center flex-1">
              <Text className="text-xl font-bold text-white">Thông báo</Text>
              <View className="ml-2 bg-primary-500/20 px-2 py-0.5 rounded-full">
                <Text className="text-[11px] font-semibold text-primary-400">2 mới</Text>
              </View>
            </View>
            <TouchableOpacity className="px-3 py-1.5">
              <Text className="text-[13px] font-medium text-primary-400">Đọc tất cả</Text>
            </TouchableOpacity>
          </View>

          {/* Notification List */}
          <FlatList
            data={MOCK_NOTIFICATIONS}
            renderItem={renderNotification}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};
