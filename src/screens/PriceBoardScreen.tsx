/**
 * PriceBoardScreen - Trang Bảng Giá
 * Hiển thị danh sách cổ phiếu với giá và biến động
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stock, Neutral, Primary } from '@/constants';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

interface StockData {
  id: string;
  symbol: string;
  price: number;
  change: number;
  totalVolume: number;
  changePercent: number;
}

const MOCK_STOCKS: StockData[] = [
  { id: '1', symbol: 'VND', price: 18.50, change: 0.05, totalVolume: 10447600, changePercent: 0.27 },
  { id: '2', symbol: 'CTR', price: 96.70, change: 0.70, totalVolume: 613000, changePercent: 0.73 },
  { id: '3', symbol: 'HAH', price: 56.50, change: 0.30, totalVolume: 1262300, changePercent: 0.53 },
  { id: '4', symbol: 'SSI', price: 31.15, change: 0, totalVolume: 18979800, changePercent: 0 },
  { id: '5', symbol: 'FPT', price: 104.50, change: -1.60, totalVolume: 10833200, changePercent: -1.51 },
  { id: '6', symbol: 'MSN', price: 84.00, change: -0.10, totalVolume: 10777800, changePercent: -0.12 },
  { id: '7', symbol: 'VIC', price: 140.50, change: 0, totalVolume: 6881400, changePercent: 0 },
  { id: '8', symbol: 'HPG', price: 25.80, change: 0.15, totalVolume: 8543200, changePercent: 0.58 },
  { id: '9', symbol: 'VCB', price: 89.50, change: -0.50, totalVolume: 5432100, changePercent: -0.56 },
  { id: '10', symbol: 'TCB', price: 45.20, change: 0.80, totalVolume: 9876500, changePercent: 1.80 },
  
];

const TABS = ['Danh mục', 'Thị trường', 'Phái sinh', 'Chứng quyền', 'ETF'];

export const PriceBoardScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedList, setSelectedList] = useState('MyList');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      const formatted = (num / 1000000).toFixed(2);
      return `${formatted}M`;
    } else if (num >= 1000) {
      const formatted = (num / 1000).toFixed(2);
      // Remove trailing zeros
      return `${parseFloat(formatted).toFixed(2)}K`;
    }
    return num.toFixed(2);
  };

  const formatVolume = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2).replace(/\.00$/, '')}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2).replace(/\.?0+$/, '')}K`;
    }
    return num.toString();
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return Stock.increase;
    if (change < 0) return Stock.decrease;
    return Stock.reference;
  };

  const renderStockItem = ({ item }: { item: StockData }) => {
    const changeColor = getChangeColor(item.change);
    
    return (
      <View className="flex-row items-center px-4 py-4 border-b border-white/[0.03]">
        <View className="flex-1 items-start">
          <Text className="text-[15px] font-bold" style={{ color: changeColor }}>{item.symbol}</Text>
        </View>
        <View className="flex-1 items-end">
          <Text className="text-[15px] font-semibold" style={{ color: changeColor }}>{item.price.toFixed(2)}</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-[14px] font-semibold" style={{ color: changeColor }}>
            {item.change === 0 ? '-' : item.change > 0 ? `+${item.change.toFixed(2)}` : item.change.toFixed(2)}
          </Text>
        </View>
        <View className="flex-[1.2] items-end">
          <Text className="text-[13px] font-medium" style={{ color: Neutral.gray400 }}>{formatVolume(item.totalVolume)}</Text>
        </View>
        <TouchableOpacity className="w-[30px] items-center justify-center ml-2">
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M6 18L18 6M6 6l12 12"
              stroke={Neutral.gray400}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" translucent={false} />
      <SafeAreaView className="flex-1 bg-[#0d0d0d]">
        <LinearGradient
          colors={['#0d0d0d', '#1a1a1a']}
          className="flex-1"
        >
          {/* Top Action Bar with Search */}
          <View className="px-4 pt-3 pb-2">
            {/* Search Bar */}
            <View className={`flex-row items-center bg-white/[0.08] rounded-xl px-4 py-2.5 mb-3 ${searchFocused ? 'border-2 border-primary-500' : 'border border-white/[0.1]'}`}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" style={{ marginRight: 10 }}>
                <Circle cx="11" cy="11" r="8" stroke={searchFocused ? Primary[400] : Neutral.gray400} strokeWidth="2" />
                <Path
                  d="M21 21l-4.35-4.35"
                  stroke={searchFocused ? Primary[400] : Neutral.gray400}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Tìm mã chứng khoán..."
                placeholderTextColor={Neutral.gray500}
                className="flex-1 text-white text-[15px]"
                style={{ color: '#ffffff', fontSize: 15 }}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} className="ml-2">
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M18 6L6 18M6 6l12 12"
                      stroke={Neutral.gray400}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </Svg>
                </TouchableOpacity>
              )}
            </View>

            {/* Action Icons Row */}
            <View className="flex-row justify-between items-center">
              <TouchableOpacity className="w-10 h-10 items-center justify-center">
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                    fill="#4ade80"
                  />
                </Svg>
              </TouchableOpacity>
              
              <View className="flex-row items-center gap-3">
                <TouchableOpacity className="w-10 h-10 items-center justify-center">
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="12" r="9" stroke={Neutral.gray400} strokeWidth="1.5" />
                    <Path
                      d="M12 7v5l3.5 2"
                      stroke={Neutral.gray400}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 items-center justify-center">
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke={Neutral.gray400}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Circle cx="12" cy="9" r="2.5" stroke={Neutral.gray400} strokeWidth="1.5" />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="w-10 h-10 items-center justify-center"
                  onPress={() => navigation.navigate('Notification')}
                >
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                      stroke={Neutral.gray400}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M13.73 21a2 2 0 0 1-3.46 0"
                      stroke={Neutral.gray400}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                  <View className="absolute top-1 right-2 bg-red-500 rounded-lg min-w-[14px] h-[14px] items-center justify-center px-[3px]">
                    <Text className="text-white text-[9px] font-bold">2</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="w-10 h-10 items-center justify-center"
                  onPress={() => navigation.navigate('UserProfile')}
                >
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      stroke={Neutral.gray400}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Circle cx="12" cy="7" r="4" stroke={Neutral.gray400} strokeWidth="1.5" />
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Header with Market Info */}
          <View className="pt-2 pb-3">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            >
              <View className="bg-white/[0.05] rounded-xl p-3.5 mr-3 min-w-[140px] border border-white/[0.08]">
                <Text className="text-[11px] text-gray-500 mb-0.5">28.92K Tỷ</Text>
                <Text className="text-[13px] font-semibold text-gray-400 mb-1.5">VNI</Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-bold text-white">1,829.04</Text>
                  <View className="flex-row items-center">
                    <Svg width={10} height={10} viewBox="0 0 10 10" style={{ marginRight: 2 }}>
                      <Path d="M5 0L9 8H1L5 0Z" fill={Stock.increase} />
                    </Svg>
                    <Text className="text-xs font-semibold" style={{ color: Stock.increase }}>0.77%</Text>
                  </View>
                </View>
              </View>
              <View className="bg-white/[0.05] rounded-xl p-3.5 mr-3 min-w-[140px] border border-white/[0.08]">
                <Text className="text-[11px] text-gray-500 mb-0.5">17.69K Tỷ</Text>
                <Text className="text-[13px] font-semibold text-gray-400 mb-1.5">VN30</Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-bold text-white">2,029.81</Text>
                  <View className="flex-row items-center">
                    <Svg width={10} height={10} viewBox="0 0 10 10" style={{ marginRight: 2 }}>
                      <Path d="M5 0L9 8H1L5 0Z" fill={Stock.increase} />
                    </Svg>
                    <Text className="text-xs font-semibold" style={{ color: Stock.increase }}>0.54%</Text>
                  </View>
                </View>
              </View>
              <View className="bg-white/[0.05] rounded-xl p-3.5 mr-3 min-w-[140px] border border-white/[0.08]">
                <Text className="text-[11px] text-gray-500 mb-0.5">2.29K Tỷ</Text>
                <Text className="text-[13px] font-semibold text-gray-400 mb-1.5">HNX</Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-bold text-white">256.13</Text>
                  <View className="flex-row items-center">
                    <Svg width={10} height={10} viewBox="0 0 10 10" style={{ marginRight: 2 }}>
                      <Path d="M5 0L9 8H1L5 0Z" fill={Stock.increase} />
                    </Svg>
                    <Text className="text-xs font-semibold" style={{ color: Stock.increase }}>1.35%</Text>
                  </View>
                </View>
              </View>
              <View className="bg-white/[0.05] rounded-xl p-3.5 mr-3 min-w-[140px] border border-white/[0.08]">
                <Text className="text-[11px] text-gray-500 mb-0.5">1.45K Tỷ</Text>
                <Text className="text-[13px] font-semibold text-gray-400 mb-1.5">HNX30</Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-bold text-white">425.80</Text>
                  <View className="flex-row items-center">
                    <Svg width={10} height={10} viewBox="0 0 10 10" style={{ marginRight: 2 }}>
                      <Path d="M5 0L9 8H1L5 0Z" fill={Stock.increase} />
                    </Svg>
                    <Text className="text-xs font-semibold" style={{ color: Stock.increase }}>0.92%</Text>
                  </View>
                </View>
              </View>
              <View className="bg-white/[0.05] rounded-xl p-3.5 mr-3 min-w-[140px] border border-white/[0.08]">
                <Text className="text-[11px] text-gray-500 mb-0.5">856.3 Tỷ</Text>
                <Text className="text-[13px] font-semibold text-gray-400 mb-1.5">UPCOM</Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-bold text-white">89.45</Text>
                  <View className="flex-row items-center">
                    <Svg width={10} height={10} viewBox="0 0 10 10" style={{ marginRight: 2 }}>
                      <Path d="M5 2L9 10H1L5 2Z" fill={Stock.decrease} transform="rotate(180 5 6)" />
                    </Svg>
                    <Text className="text-xs font-semibold" style={{ color: Stock.decrease }}>0.22%</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Tabs */}
          <View className="pt-4 border-b border-white/[0.05]">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {TABS.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  className="px-5 pb-3 relative"
                  onPress={() => setActiveTab(index)}
                >
                  <Text className={`text-[15px] font-medium ${activeTab === index ? 'text-white font-semibold' : 'text-gray-400'}`}>
                    {tab}
                  </Text>
                  {activeTab === index && (
                    <LinearGradient
                      colors={['#16a34a', '#14b8a6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      className="absolute -bottom-px left-0 right-0 h-[3px] rounded-t"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* List Selector and Add Button */}
          <View className="flex-row items-center justify-between px-4 py-4">
            <TouchableOpacity className="flex-1 flex-row items-center bg-white/[0.05] rounded-lg px-4 py-3 mr-3 border border-white/[0.08]">
              <Text className="flex-1 text-[15px] font-medium text-white">{selectedList}</Text>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M6 9l6 6 6-6"
                  stroke={Neutral.gray300}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-lg overflow-hidden">
              <LinearGradient
                colors={['#16a34a', '#14b8a6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="px-6 py-3"
              >
                <Text className="text-[15px] font-semibold text-white">Thêm mã</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Stock Table Header */}
          <View className="flex-row items-center px-4 py-3 bg-white/[0.02] border-b border-white/[0.05]">
            <View className="flex-1 items-start">
              <Text className="text-[13px] font-semibold text-gray-400">Mã CK</Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-[13px] font-semibold text-gray-400">Khớp</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-[13px] font-semibold text-gray-400">+/-</Text>
            </View>
            <View className="flex-[1.2] items-end">
              <Text className="text-[13px] font-semibold text-gray-400">Tổng KL</Text>
            </View>
            <View className="w-[30px]" />
          </View>

          {/* Stock List */}
          <FlatList
            data={MOCK_STOCKS}
            renderItem={renderStockItem}
            keyExtractor={item => item.id}
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};
