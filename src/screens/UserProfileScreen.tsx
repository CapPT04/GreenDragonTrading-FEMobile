/**
 * UserProfileScreen - Trang Người Dùng
 * Hiển thị thông tin và cài đặt tài khoản
 */

import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Neutral, Primary } from '@/constants';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useNavigation, CommonActions } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '@/context/AuthContext';

export const UserProfileScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      })
    );
  };
  
  const MenuItem = ({ icon, title, subtitle, onPress }: { 
    icon: React.ReactNode; 
    title: string; 
    subtitle?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity 
      className="flex-row items-center px-4 py-4 border-b border-white/[0.05]"
      onPress={onPress}
    >
      <View className="w-10 h-10 rounded-full bg-white/[0.08] items-center justify-center mr-3">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-[15px] font-medium text-white">{title}</Text>
        {subtitle && (
          <Text className="text-[13px] text-gray-400 mt-0.5">{subtitle}</Text>
        )}
      </View>
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          d="M9 18l6-6-6-6"
          stroke={Neutral.gray400}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
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
          <View className="flex-row items-center px-4 py-3 border-b border-white/[0.05]">
            <TouchableOpacity 
              className="w-10 h-10 items-center justify-center -ml-2 mr-1"
              onPress={() => navigation.goBack()}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M19 12H5m0 0l7 7m-7-7l7-7"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white">Tài khoản</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Profile Card */}
            <View className="mx-4 mt-4 mb-6">
              <View className="bg-white/[0.05] rounded-2xl p-4 border border-white/[0.08]">
                <View className="flex-row items-center">
                  <LinearGradient
                    colors={[Primary[500], '#14b8a6']}
                    className="w-16 h-16 rounded-full items-center justify-center"
                  >
                    <Text className="text-2xl font-bold text-white">TN</Text>
                  </LinearGradient>
                  <View className="flex-1 ml-4">
                    <Text className="text-lg font-bold text-white">Trần Ngọc</Text>
                    <Text className="text-[14px] text-gray-400 mt-1">tranngoc@example.com</Text>
                  </View>
                </View>
                <TouchableOpacity className="mt-4 bg-white/[0.08] rounded-lg py-3 items-center">
                  <Text className="text-[15px] font-semibold text-primary-400">Chỉnh sửa hồ sơ</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Account Section */}
            <View className="mb-4">
              <Text className="px-4 py-2 text-[13px] font-semibold text-gray-500 uppercase">Tài khoản</Text>
              <MenuItem
                icon={
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="12" r="10" stroke={Primary[400]} strokeWidth="2" />
                    <Path d="M12 6v6l4 2" stroke={Primary[400]} strokeWidth="2" strokeLinecap="round" />
                  </Svg>
                }
                title="Lịch sử giao dịch"
                subtitle="Xem các giao dịch đã thực hiện"
              />
              <MenuItem
                icon={
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Rect x="3" y="11" width="18" height="11" rx="2" stroke={Primary[400]} strokeWidth="2" />
                    <Path d="M7 11V7a5 5 0 0110 0v4" stroke={Primary[400]} strokeWidth="2" strokeLinecap="round" />
                  </Svg>
                }
                title="Bảo mật"
                subtitle="Mật khẩu, xác thực 2 yếu tố"
              />
              <MenuItem
                icon={
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2L2 7l10 5 10-5-10-5z"
                      stroke={Primary[400]}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke={Primary[400]}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                }
                title="Danh mục đầu tư"
                subtitle="Quản lý cổ phiếu của bạn"
              />
            </View>

            {/* Settings Section */}
            <View className="mb-4">
              <Text className="px-4 py-2 text-[13px] font-semibold text-gray-500 uppercase">Cài đặt</Text>
              <MenuItem
                icon={
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9"
                      stroke={Neutral.gray300}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M13.73 21a2 2 0 01-3.46 0"
                      stroke={Neutral.gray300}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                }
                title="Thông báo"
                subtitle="Quản lý thông báo và cảnh báo"
              />
              <MenuItem
                icon={
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="12" r="3" stroke={Neutral.gray300} strokeWidth="2" />
                    <Path
                      d="M12 1v3m0 14v3m9-9h-3m-14 0H1m15.364-6.364l-2.121 2.121m-8.486 0L3.636 5.636m12.728 12.728l-2.121-2.121m-8.486 0l-2.121 2.121"
                      stroke={Neutral.gray300}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </Svg>
                }
                title="Giao diện"
                subtitle="Chế độ sáng, tối, màu sắc"
              />
              <MenuItem
                icon={
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z"
                      stroke={Neutral.gray300}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                      stroke={Neutral.gray300}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path d="M2 12h20" stroke={Neutral.gray300} strokeWidth="2" strokeLinecap="round" />
                  </Svg>
                }
                title="Ngôn ngữ"
                subtitle="Tiếng Việt"
              />
            </View>

            {/* Support Section */}
            <View className="mb-4">
              <Text className="px-4 py-2 text-[13px] font-semibold text-gray-500 uppercase">Hỗ trợ</Text>
              <MenuItem
                icon={
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="12" r="10" stroke={Neutral.gray300} strokeWidth="2" />
                    <Path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke={Neutral.gray300} strokeWidth="2" strokeLinecap="round" />
                    <Circle cx="12" cy="17" r="0.5" fill={Neutral.gray300} strokeWidth="1.5" />
                  </Svg>
                }
                title="Trợ giúp"
                subtitle="Câu hỏi thường gặp, hướng dẫn"
              />
              <MenuItem
                icon={
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                      stroke={Neutral.gray300}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                }
                title="Liên hệ"
                subtitle="Gửi phản hồi, báo lỗi"
              />
            </View>

            {/* Logout Button */}
            <View className="px-4 py-6">
              <TouchableOpacity 
                className="bg-red-500/10 rounded-lg py-3 items-center border border-red-500/30"
                onPress={handleLogout}
              >
                <Text className="text-[15px] font-semibold text-red-500">Đăng xuất</Text>
              </TouchableOpacity>
            </View>

            <View className="items-center pb-8">
              <Text className="text-[12px] text-gray-500">Phiên bản 2.1.0</Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};
