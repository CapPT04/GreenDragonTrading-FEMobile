/**
 * NewsModule - Module tin tức chứng khoán
 * Hiển thị tin tức thị trường, cổ phiếu, sự kiện và báo cáo
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface NewsItem {
  id: string;
  time: string;
  title: string;
  imageUrl?: string;
}

interface EventItem {
  id: string;
  code: string;
  date: string;
  content: string;
  type: 'dividend' | 'stock-dividend' | 'rights' | 'bonus';
}

interface ReportItem {
  id: string;
  code: string;
  date: string;
  content: string;
}

type TabType = 'market' | 'stock' | 'event' | 'report';

interface FilterOptions {
  timeRange: 'all' | 'today' | 'week' | 'month';
  stockCode: string;
  category: string;
}

interface NewsModuleProps {
  onNewsPress?: (newsItem: any) => void;
}

export const NewsModule: React.FC<NewsModuleProps> = ({ onNewsPress }) => {
  const [activeTab, setActiveTab] = useState<TabType>('market');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    timeRange: 'all',
    stockCode: '',
    category: 'all',
  });

  // Market news with images
  const marketNews: NewsItem[] = [
    {
      id: '1',
      time: '2025-11-29 00:07',
      title: 'Một cổ phiếu tăng dựng đứng 350% trong 1 tháng sau khi thoái vốn giá cao, chuẩn bị họp ĐHĐCĐ bất thường',
      imageUrl: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2025/11/28/avatar1764344159160-17643441595491150467118.jpg'
    },
    {
      id: '2',
      time: '2025-11-28 21:56',
      title: 'Thị trường tiền số hôm nay, 28-11: Một quyết định khó khăn đang chờ Bitcoin',
      imageUrl: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2025/11/28/avatar1764341754175-1764341754718950929757.jpg'
    },
    {
      id: '3',
      time: '2025-11-28 19:30',
      title: 'Kinh doanh bứt phá ngoạn mục, OCBS tăng vốn liên tiếp lên 3.200 tỷ cùng hàng loạt chuyển động lớn',
      imageUrl: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2025/11/28/photo1764315530461-17643155306381843522902-1764332894253406228614.jpg'
    },
    {
      id: '4',
      time: '2025-11-28 18:40',
      title: 'Tập đoàn của tỷ phú Nguyễn Thị Phương Thảo giảm sở hữu tại HDBank',
      imageUrl: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2025/11/28/avatar1764329858045-17643298584991641091202.jpg'
    },
    {
      id: '5',
      time: '2025-11-28 18:37',
      title: 'Hai cổ phiếu nhà tỷ phú đồng loạt bị tự doanh CTCK "xả" mạnh trong phiên cuối tuần',
      imageUrl: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2025/11/28/avatar1764329830859-1764329831522965003953.png'
    }
  ];

  const handleNavigateToDetail = (item: NewsItem) => {
    if (onNewsPress) {
      onNewsPress({
        ...item,
        source: 'CafeF',
        category: activeTab === 'market' ? 'Thị trường' : 'Cổ phiếu',
        content: 'Nội dung chi tiết của tin tức...',
      });
    }
  };

  const handleApplyFilter = () => {
    setShowFilter(false);
    // TODO: Apply filter logic
  };

  const handleResetFilter = () => {
    setFilters({
      timeRange: 'all',
      stockCode: '',
      category: 'all',
    });
  };

  // Stock news (no images)
  const stockNews: NewsItem[] = [
    {
      id: '1',
      time: '2025-10-06 00:00',
      title: 'ABR: Thông báo chi trả cổ tức từ nguồn lợi nhuận sau thuế chưa phân phối lúy kế đến 31/12/2024'
    },
    {
      id: '2',
      time: '2025-09-24 00:00',
      title: 'ABR: Giấy chứng nhận đăng ký doanh nghiệp thay đổi lần thứ 17'
    },
    {
      id: '3',
      time: '2025-09-19 00:00',
      title: 'ABR: 26.9.2025, ngày GDKHQ trả cổ tức bằng tiền (2.000 đ/cp)'
    },
    {
      id: '4',
      time: '2025-09-15 00:00',
      title: 'ABR: Nghị quyết HĐQT về ngày đăng ký cuối cùng để nhận tiền cổ tức'
    },
    {
      id: '5',
      time: '2025-09-11 00:00',
      title: 'ABR: Biên bản kiểm phiếu và Nghị quyết ĐHĐCĐ về việc lấy ý kiến cổ đông bằng văn bản'
    }
  ];

  // Event data (corporate actions)
  const eventData: EventItem[] = [
    { id: '1', code: 'VTB', date: '23-10-2025', content: 'Chia cổ tức bằng tiền, tỉ lệ 0.04 (400 đồng/CP)', type: 'dividend' },
    { id: '2', code: 'VEF', date: '22-10-2025', content: 'Chia cổ tức bằng tiền, tỉ lệ 3.3 (33,000 đồng/CP)', type: 'dividend' },
    { id: '3', code: 'DHT', date: '24-10-2025', content: 'Phát hành cổ phiếu thưởng, tỉ lệ 0.1 (phát hành thêm: 8,234,026)', type: 'bonus' },
    { id: '4', code: 'TPP', date: '16-10-2025', content: 'Phát hành quyền mua CP cho cổ đông, tỉ lệ 0.44 (phát hành thêm: 20,000,000)', type: 'rights' },
    { id: '5', code: 'ELC', date: '17-10-2025', content: 'Trả cổ tức bằng cổ phiếu, tỉ lệ 0.05 (phát hành thêm: 5,242,371)', type: 'stock-dividend' },
  ];

  // Report data
  const reportData: ReportItem[] = [
    { id: '1', code: 'Báo cáo vĩ mô', date: '2025-11-27', content: 'Cập nhật kinh tế vĩ mô tháng 10 và 10 tháng đầu năm 2025' },
    { id: '2', code: 'GMD', date: '2025-11-27', content: 'GMD - KẾ HOẠCH MỞ RỘNG CẢNG ĐẢM BẢO CHO TĂNG TRƯỞNG KẾT QUẢ KINH DOANH' },
    { id: '3', code: 'PHR', date: '2025-11-27', content: 'PHR - Khoản đền bù tiềm năng thúc đẩy dòng tiền tích cực' },
    { id: '4', code: 'PVS', date: '2025-11-27', content: 'PVS (Q3/2025): Tiến độ thuận lợi' },
    { id: '5', code: 'FRT', date: '2025-11-26', content: 'FRT - Cập nhật KQKD Q3.2025' },
  ];

  const tabs = [
    { id: 'market' as TabType, label: 'Thị trường', icon: 'chart' },
    { id: 'stock' as TabType, label: 'Cổ phiếu', icon: 'stock' },
    { id: 'event' as TabType, label: 'Sự kiện', icon: 'event' },
    { id: 'report' as TabType, label: 'Báo cáo', icon: 'report' }
  ];

  const getEventIcon = (type: EventItem['type']) => {
    switch (type) {
      case 'dividend':
        return '💰';
      case 'stock-dividend':
        return '💵';
      case 'rights':
        return '💳';
      case 'bonus':
        return '🎁';
      default:
        return '💰';
    }
  };

  const renderTabIcon = (iconType: string, isActive: boolean) => {
    const color = isActive ? '#282832' : '#9ca3af';
    
    switch (iconType) {
      case 'chart':
        return (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M3 17L9 11L13 15L21 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M21 3V7H17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        );
      case 'stock':
        return (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
            <Rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
            <Rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
            <Rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
          </Svg>
        );
      case 'event':
        return (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
            <Path d="M16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </Svg>
        );
      case 'report':
        return (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M14 2V8H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        );
      default:
        return null;
    }
  };

  const renderNewsContent = () => {
    const newsItems = activeTab === 'stock' ? stockNews : activeTab === 'market' ? marketNews : [];

    if (activeTab === 'event') {
      return (
        <View className="space-y-2">
          {/* Table Header */}
          <LinearGradient
            colors={['#34C85E', '#2ab84d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-full px-3 py-2 flex-row items-center"
          >
            <Text className="flex-none w-16 text-[#282832] font-semibold text-xs text-center">Mã</Text>
            <Text className="flex-none w-24 text-[#282832] font-semibold text-xs text-center">Ngày GDKHQ</Text>
            <Text className="flex-1 text-[#282832] font-semibold text-xs">Nội dung</Text>
            <Text className="flex-none w-10 text-[#282832] font-semibold text-xs text-center">Loại</Text>
          </LinearGradient>

          {/* Event Items */}
          {eventData.map((event, index) => (
            <View
              key={event.id}
              className={`rounded-lg px-3 py-2 flex-row items-center ${
                index % 2 === 0 ? 'bg-cyan-900/20' : 'bg-transparent'
              }`}
            >
              <Text className="flex-none w-16 text-gray-300 text-xs text-center font-medium">{event.code}</Text>
              <Text className="flex-none w-24 text-gray-400 text-xs text-center">{event.date}</Text>
              <Text className="flex-1 text-gray-300 text-xs" numberOfLines={2}>{event.content}</Text>
              <Text className="flex-none w-10 text-center text-base">{getEventIcon(event.type)}</Text>
            </View>
          ))}
        </View>
      );
    }

    if (activeTab === 'report') {
      return (
        <View className="space-y-2">
          {/* Table Header */}
          <LinearGradient
            colors={['#34C85E', '#2ab84d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-full px-3 py-2 flex-row items-center"
          >
            <Text className="flex-none w-28 text-[#282832] font-semibold text-xs text-center">Mã CK</Text>
            <Text className="flex-none w-24 text-[#282832] font-semibold text-xs text-center">Ngày</Text>
            <Text className="flex-1 text-[#282832] font-semibold text-xs">Nội dung</Text>
          </LinearGradient>

          {/* Report Items */}
          {reportData.map((report, index) => (
            <TouchableOpacity
              key={report.id}
              className={`rounded-lg px-3 py-2 flex-row items-center ${
                index % 2 === 0 ? 'bg-cyan-900/20' : 'bg-transparent'
              }`}
              activeOpacity={0.7}
            >
              <Text className="flex-none w-28 text-gray-300 text-xs font-medium" numberOfLines={1}>{report.code}</Text>
              <Text className="flex-none w-24 text-gray-400 text-xs text-center">{report.date}</Text>
              <Text className="flex-1 text-gray-300 text-xs" numberOfLines={2}>{report.content}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    // News List (Market & Stock tabs)
    return (
      <View className="space-y-3">
        {newsItems.map((item) => (
          <View key={item.id} className="bg-cyan-900/20 rounded-lg px-3 py-2">
            {/* Time and AI button */}
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[#34C85E] text-xs font-medium">{item.time}</Text>
              <TouchableOpacity
                className="bg-[#34C85E]/20 rounded-full p-1.5"
                activeOpacity={0.7}
              >
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <Path d="M12 8V4H8" stroke="#34C85E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Rect width="16" height="12" x="4" y="8" rx="2" stroke="#34C85E" strokeWidth="2" />
                  <Path d="M2 14h2M20 14h2M15 13v2M9 13v2" stroke="#34C85E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* News Content */}
            <TouchableOpacity
              className="flex-row"
              activeOpacity={0.8}
              onPress={() => handleNavigateToDetail(item)}
            >
              {item.imageUrl && (
                <View className="mr-3 rounded-lg overflow-hidden" style={{ width: 96, height: 60 }}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>
              )}
              <Text className="flex-1 text-gray-300 text-sm leading-5" numberOfLines={item.imageUrl ? 3 : 4}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View className="bg-[#282832] rounded-lg overflow-hidden" style={{ height: 500 }}>
      {/* Header Badge with Filter Button */}
      <View className="items-center pt-3 pb-2 flex-row justify-center px-4">
        <View className="flex-1" />
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
          <Text className="text-[#282832] font-bold text-base">📰 Tin Tức</Text>
        </LinearGradient>
        <View className="flex-1 items-end">
          <TouchableOpacity
            onPress={() => setShowFilter(true)}
            className="w-9 h-9 items-center justify-center rounded-full bg-white/[0.05]"
            activeOpacity={0.7}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M4 6h16M4 12h16M4 18h16"
                stroke={filters.stockCode || filters.timeRange !== 'all' ? '#34C85E' : '#9ca3af'}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={showFilter}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilter(false)}
      >
        <View className="flex-1 bg-black/50" style={{ justifyContent: 'flex-end' }}>
          <View className="bg-[#282832] rounded-t-3xl px-6 py-6 border-t border-white/[0.08]">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-white font-bold text-lg">Bộ lọc</Text>
              <TouchableOpacity
                onPress={() => setShowFilter(false)}
                className="w-8 h-8 items-center justify-center rounded-full bg-white/[0.05]"
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path d="M18 6L6 18M6 6l12 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* Time Range Filter */}
            <View className="mb-4">
              <Text className="text-gray-400 text-sm mb-2">Thời gian</Text>
              <View className="flex-row gap-2">
                {[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'today', label: 'Hôm nay' },
                  { value: 'week', label: 'Tuần này' },
                  { value: 'month', label: 'Tháng này' },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => setFilters({ ...filters, timeRange: option.value as any })}
                    className={`flex-1 py-2 rounded-lg border ${
                      filters.timeRange === option.value
                        ? 'border-[#34C85E] bg-[#34C85E]/10'
                        : 'border-white/[0.08] bg-white/[0.05]'
                    }`}
                  >
                    <Text
                      className={`text-center text-xs ${
                        filters.timeRange === option.value ? 'text-[#34C85E] font-semibold' : 'text-gray-400'
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Stock Code Filter */}
            <View className="mb-4">
              <Text className="text-gray-400 text-sm mb-2">Mã cổ phiếu</Text>
              <TextInput
                value={filters.stockCode}
                onChangeText={(text) => setFilters({ ...filters, stockCode: text.toUpperCase() })}
                placeholder="Nhập mã CP (VD: VCB, HPG...)"
                placeholderTextColor="#6b7280"
                className="bg-white/[0.05] text-white px-4 py-3 rounded-lg border border-white/[0.08]"
                autoCapitalize="characters"
              />
            </View>

            {/* Category Filter */}
            <View className="mb-6">
              <Text className="text-gray-400 text-sm mb-2">Danh mục</Text>
              <View className="flex-row flex-wrap gap-2">
                {[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'market', label: 'Thị trường' },
                  { value: 'stock', label: 'Cổ phiếu' },
                  { value: 'analysis', label: 'Phân tích' },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => setFilters({ ...filters, category: option.value })}
                    className={`px-4 py-2 rounded-full border ${
                      filters.category === option.value
                        ? 'border-[#34C85E] bg-[#34C85E]/10'
                        : 'border-white/[0.08] bg-white/[0.05]'
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        filters.category === option.value ? 'text-[#34C85E] font-semibold' : 'text-gray-400'
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleResetFilter}
                className="flex-1 py-3 rounded-lg border border-white/[0.08] bg-white/[0.05]"
              >
                <Text className="text-gray-400 text-center font-semibold">Đặt lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleApplyFilter}
                className="flex-1 overflow-hidden rounded-lg"
              >
                <LinearGradient
                  colors={['#34C85E', '#2ab84d']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-3"
                >
                  <Text className="text-[#282832] text-center font-bold">Áp dụng</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Tab Buttons */}
      <View className="flex-row gap-2 px-4 py-2">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.8}
          >
            {activeTab === tab.id ? (
              <LinearGradient
                colors={['#34C85E', '#2ab84d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg"
              >
                {renderTabIcon(tab.icon, true)}
                <Text className="text-[#282832] font-semibold text-xs">{tab.label}</Text>
              </LinearGradient>
            ) : (
              <View className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent">
                {renderTabIcon(tab.icon, false)}
                <Text className="text-gray-400 text-xs">{tab.label}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content ScrollView */}
      <ScrollView
        className="flex-1 px-4 py-2"
        showsVerticalScrollIndicator={false}
      >
        {renderNewsContent()}
      </ScrollView>
    </View>
  );
};
