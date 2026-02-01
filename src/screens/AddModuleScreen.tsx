/**
 * AddModuleScreen - Trang thêm module
 * Hiển thị danh sách các module có sẵn để thêm vào Dashboard
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
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Primary, Neutral } from '@/constants';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useModules } from '@/context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

interface Module {
  id: string;
  name: string;
  image: number;
}

// Import all images at the top level
// ✓ All 15 images working!
const ModuleImages = {
  'overview-chart': require('../../assets/images/ModulePreviews/overview-chart.png'),
  'vn-stock-chart': require('../../assets/images/ModulePreviews/vn-stock-chart.png'),
  'global-stock-chart': require('../../assets/images/ModulePreviews/global-stock-chart.png'),
  'financial-report': require('../../assets/images/ModulePreviews/financial-report.png'),
  'financial-report-pro': require('../../assets/images/ModulePreviews/financial-report-pro.png'),
  'news': require('../../assets/images/ModulePreviews/news.png'),
  'session-info': require('../../assets/images/ModulePreviews/session-info.png'),
  'order-matching': require('../../assets/images/ModulePreviews/order-matching.png'),
  'fa-advisor': require('../../assets/images/ModulePreviews/fa-advisor.png'),
  'ta-advisor': require('../../assets/images/ModulePreviews/ta-advisor.png'),
  'canslim': require('../../assets/images/ModulePreviews/canslim.png'),
  'stock-screener': require('../../assets/images/ModulePreviews/stock-screener.png'),
  'trading-map': require('../../assets/images/ModulePreviews/trading-map.png'),
  'heatmap': require('../../assets/images/ModulePreviews/heatmap.png'),
  'analysis-report': require('../../assets/images/ModulePreviews/analysis-report.png'),
};

const AVAILABLE_MODULES: Module[] = [
  {
    id: 'overview-chart',
    name: 'Biểu đồ tổng quan',
    image: ModuleImages['overview-chart'],
  },
  {
    id: 'vn-stock-chart',
    name: 'Biểu đồ cổ phiếu VN',
    image: ModuleImages['vn-stock-chart'],
  },
  {
    id: 'global-stock-chart',
    name: 'Biểu đồ cổ phiếu quốc tế',
    image: ModuleImages['global-stock-chart'],
  },
  {
    id: 'financial-report',
    name: 'Báo cáo tài chính',
    image: ModuleImages['financial-report'],
  },
  {
    id: 'financial-report-pro',
    name: 'Báo cáo tài chính Pro',
    image: ModuleImages['financial-report-pro'],
  },
  {
    id: 'news',
    name: 'Tin tức',
    image: ModuleImages['news'],
  },
  {
    id: 'session-info',
    name: 'Thông tin phiên',
    image: ModuleImages['session-info'],
  },
  {
    id: 'order-matching',
    name: 'Khớp lệnh',
    image: ModuleImages['order-matching'],
  },
  {
    id: 'fa-advisor',
    name: 'Tư vấn phân tích cơ bản',
    image: ModuleImages['fa-advisor'],
  },
  {
    id: 'ta-advisor',
    name: 'Tư vấn phân tích kỹ thuật',
    image: ModuleImages['ta-advisor'],
  },
  {
    id: 'canslim',
    name: 'CANSLIM',
    image: ModuleImages['canslim'],
  },
  {
    id: 'stock-screener',
    name: 'Bộ lọc cổ phiếu',
    image: ModuleImages['stock-screener'],
  },
  {
    id: 'trading-map',
    name: 'Bản đồ giao dịch',
    image: ModuleImages['trading-map'],
  },
  {
    id: 'heatmap',
    name: 'Bản đồ nhiệt',
    image: ModuleImages['heatmap'],
  },
  {
    id: 'analysis-report',
    name: 'Báo cáo phân tích',
    image: ModuleImages['analysis-report'],
  },
];

export const AddModuleScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { addModule } = useModules();

  const handleAddModule = (module: Module) => {
    addModule(module);
    navigation.goBack();
  };

  const renderModuleCard = (module: Module, index: number) => {
    const isLeft = index % 2 === 0;
    const [imageError, setImageError] = React.useState(false);
    
    return (
      <View 
        key={module.id}
        style={{ 
          width: CARD_WIDTH,
          marginRight: isLeft ? 8 : 0,
          marginLeft: isLeft ? 0 : 8,
          marginBottom: 16,
        }}
      >
        <View className="bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.08]">
          {/* Module Image */}
          <View className="bg-[#1a1a1a] p-3 items-center justify-center" style={{ height: 160 }}>
            {!imageError ? (
              <Image 
                source={module.image}
                style={{ 
                  width: '100%', 
                  height: '100%',
                  borderRadius: 8,
                  backgroundColor: '#000000',
                }}
                resizeMode="contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <View className="items-center justify-center" style={{ width: '100%', height: '100%' }}>
                <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                    fill="#4a5568"
                  />
                </Svg>
              </View>
            )}
          </View>

          {/* Module Info */}
          <View className="p-3" style={{ minHeight: 85 }}>
            <Text className="text-[14px] font-semibold text-white mb-3" numberOfLines={2} style={{ height: 38 }}>
              {module.name}
            </Text>

            {/* Add Button */}
            <TouchableOpacity
              onPress={() => handleAddModule(module)}
              className="overflow-hidden rounded-lg"
            >
              <LinearGradient
                colors={['#22c55e', '#16a34a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center justify-center py-2.5"
              >
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }}>
                  <Path
                    d="M12 5v14m-7-7h14"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </Svg>
                <Text className="text-[13px] font-bold text-white">Thêm</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
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
          {/* Header */}
          <View className="px-4 py-3 border-b border-white/[0.05] flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 items-center justify-center -ml-2"
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M15 18l-6-6 6-6"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white ml-2">Thêm Module</Text>
          </View>

          {/* Module Grid */}
          <ScrollView 
            className="flex-1 px-4 pt-4" 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View className="flex-row flex-wrap">
              {AVAILABLE_MODULES.map((module, index) => renderModuleCard(module, index))}
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};