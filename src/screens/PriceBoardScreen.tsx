/**
 * PriceBoardScreen - Trang Bảng Giá
 * Hiển thị danh sách cổ phiếu với giá và biến động
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Primary, Stock, Neutral } from '@/constants';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

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
  const [activeTab, setActiveTab] = useState(0);
  const [selectedList, setSelectedList] = useState('MyList');

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
      <View style={styles.stockRow}>
        <Text style={[styles.stockSymbol, { color: changeColor }]}>{item.symbol}</Text>
        <Text style={[styles.stockPrice, { color: changeColor }]}>{item.price.toFixed(2)}</Text>
        <Text style={[styles.stockChange, { color: changeColor }]}>
          {item.change === 0 ? '-' : item.change > 0 ? `+${item.change.toFixed(2)}` : item.change.toFixed(2)}
        </Text>
        <Text style={styles.stockVolume}>{formatVolume(item.totalVolume)}</Text>
        <TouchableOpacity style={styles.deleteButton}>
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
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#0d0d0d', '#1a1a1a']}
          style={styles.gradient}
        >
          {/* Top Action Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.iconButton}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                  fill={Primary[400]}
                />
              </Svg>
            </TouchableOpacity>
            
            <View style={styles.topBarRight}>
              <TouchableOpacity style={styles.iconButton}>
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
              <TouchableOpacity style={styles.iconButton}>
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
              <TouchableOpacity style={styles.iconButton}>
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
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
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
              <TouchableOpacity style={styles.iconButton}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Rect x="3" y="3" width="7" height="7" rx="1" stroke={Neutral.gray400} strokeWidth="1.5" />
                  <Rect x="14" y="3" width="7" height="7" rx="1" stroke={Neutral.gray400} strokeWidth="1.5" />
                  <Rect x="3" y="14" width="7" height="7" rx="1" stroke={Neutral.gray400} strokeWidth="1.5" />
                  <Rect x="14" y="14" width="7" height="7" rx="1" stroke={Neutral.gray400} strokeWidth="1.5" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>

          {/* Header with Market Info */}
          <View style={styles.header}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.marketScrollContent}
            >
              <View style={styles.marketCard}>
                <Text style={styles.marketValue}>28.92K Tỷ</Text>
                <Text style={styles.marketIndex}>VNI</Text>
                <View style={styles.marketChangeRow}>
                  <Text style={styles.marketChange}>1,829.04</Text>
                  <View style={styles.marketPercentContainer}>
                    <Svg width={10} height={10} viewBox="0 0 10 10" style={{ marginRight: 2 }}>
                      <Path d="M5 0L9 8H1L5 0Z" fill={Stock.increase} />
                    </Svg>
                    <Text style={[styles.marketPercent, { color: Stock.increase }]}>0.77%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.marketCard}>
                <Text style={styles.marketValue}>17.69K Tỷ</Text>
                <Text style={styles.marketIndex}>VN30</Text>
                <View style={styles.marketChangeRow}>
                  <Text style={styles.marketChange}>2,029.81</Text>
                  <View style={styles.marketPercentContainer}>
                    <Svg width={10} height={10} viewBox="0 0 10 10" style={{ marginRight: 2 }}>
                      <Path d="M5 0L9 8H1L5 0Z" fill={Stock.increase} />
                    </Svg>
                    <Text style={[styles.marketPercent, { color: Stock.increase }]}>0.54%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.marketCard}>
                <Text style={styles.marketValue}>2.29K Tỷ</Text>
                <Text style={styles.marketIndex}>HNX</Text>
                <View style={styles.marketChangeRow}>
                  <Text style={styles.marketChange}>256.13</Text>
                  <View style={styles.marketPercentContainer}>
                    <Svg width={10} height={10} viewBox="0 0 10 10" style={{ marginRight: 2 }}>
                      <Path d="M5 0L9 8H1L5 0Z" fill={Stock.increase} />
                    </Svg>
                    <Text style={[styles.marketPercent, { color: Stock.increase }]}>1.35%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.marketCard}>
                <Text style={styles.marketValue}>1.45K Tỷ</Text>
                <Text style={styles.marketIndex}>HNX30</Text>
                <View style={styles.marketChangeRow}>
                  <Text style={styles.marketChange}>425.80</Text>
                  <View style={styles.marketPercentContainer}>
                    <Svg width={10} height={10} viewBox="0 0 10 10" style={{ marginRight: 2 }}>
                      <Path d="M5 0L9 8H1L5 0Z" fill={Stock.increase} />
                    </Svg>
                    <Text style={[styles.marketPercent, { color: Stock.increase }]}>0.92%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.marketCard}>
                <Text style={styles.marketValue}>856.3 Tỷ</Text>
                <Text style={styles.marketIndex}>UPCOM</Text>
                <View style={styles.marketChangeRow}>
                  <Text style={styles.marketChange}>89.45</Text>
                  <View style={styles.marketPercentContainer}>
                    <Svg width={10} height={10} viewBox="0 0 10 10" style={{ marginRight: 2 }}>
                      <Path d="M5 2L9 10H1L5 2Z" fill={Stock.decrease} transform="rotate(180 5 6)" />
                    </Svg>
                    <Text style={[styles.marketPercent, { color: Stock.decrease }]}>0.22%</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {TABS.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tab, activeTab === index && styles.tabActive]}
                  onPress={() => setActiveTab(index)}
                >
                  <Text style={[styles.tabText, activeTab === index && styles.tabTextActive]}>
                    {tab}
                  </Text>
                  {activeTab === index && (
                    <LinearGradient
                      colors={[Primary[600], '#14b8a6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.tabIndicator}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* List Selector and Add Button */}
          <View style={styles.controlRow}>
            <TouchableOpacity style={styles.listSelector}>
              <Text style={styles.listSelectorText}>{selectedList}</Text>
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
            <TouchableOpacity style={styles.addButton}>
              <LinearGradient
                colors={[Primary[600], '#14b8a6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addButtonGradient}
              >
                <Text style={styles.addButtonText}>Thêm mã</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Stock Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, { flex: 1 }]}>Mã CK</Text>
            <Text style={[styles.headerText, { flex: 1, textAlign: 'right' }]}>Khớp</Text>
            <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>+/-</Text>
            <Text style={[styles.headerText, { flex: 1.2, textAlign: 'right' }]}>Tổng KL</Text>
            <View style={{ width: 30 }} />
          </View>

          {/* Stock List */}
          <FlatList
            data={MOCK_STOCKS}
            renderItem={renderStockItem}
            keyExtractor={item => item.id}
            style={styles.stockList}
            showsVerticalScrollIndicator={false}
          />
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  gradient: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 6,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  notificationText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  header: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  marketScrollContent: {
    paddingHorizontal: 16,
  },
  marketCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
    minWidth: 140,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  marketValue: {
    fontSize: 11,
    color: Neutral.gray500,
    marginBottom: 2,
  },
  marketIndex: {
    fontSize: 13,
    fontWeight: '600',
    color: Neutral.gray400,
    marginBottom: 6,
  },
  marketChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marketChange: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  marketPercentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketPercent: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabsContainer: {
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  tab: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    position: 'relative',
  },
  tabActive: {},
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: Neutral.gray400,
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  listSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  listSelectorText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
  },
  addButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  addButtonGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: Neutral.gray400,
  },
  stockList: {
    flex: 1,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.03)',
  },
  stockSymbol: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  stockPrice: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'right',
  },
  stockChange: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  stockVolume: {
    flex: 1.2,
    fontSize: 13,
    fontWeight: '500',
    color: Neutral.gray400,
    textAlign: 'right',
  },
  deleteButton: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
