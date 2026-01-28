/**
 * RegisterScreen - Màn hình đăng ký tài khoản
 * Dark theme với gradient animations và particle effects
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Dimensions,
  Easing,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@/types';
import { Spacing, Primary } from '@/constants';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

// Floating Particle Component
interface ParticleProps {
  delay: number;
  duration: number;
  size: number;
  left: string;
}

const FloatingParticle: React.FC<ParticleProps> = ({ delay, duration, size, left }) => {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animValue, {
          toValue: 1,
          duration: duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const opacity = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.8, 0.3],
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: size,
          height: size,
          left: left as any, // Cast to any for percentage string
          opacity: opacity,
          transform: [{ translateY }],
        },
      ]}
    />
  );
};

// Spinner Component
const Spinner: React.FC = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.spinner,
        { transform: [{ rotate: spin }] },
      ]}
    />
  );
};

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(1)).current;

  // Input focus animations
  const inputScales = useRef(
    Array(4)
      .fill(0)
      .map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    // Entry animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation for background gradient
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Glow pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1.3,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleInputFocus = (index: number) => {
    Animated.spring(inputScales[index], {
      toValue: 1.02,
      tension: 100,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  const handleInputBlur = (index: number) => {
    Animated.spring(inputScales[index], {
      toValue: 1,
      tension: 100,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <View style={styles.container}>
        {/* Background Image with overlay */}
        <ImageBackground
          source={require('../../assets/images/LoginBackground.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(13, 13, 13, 0.4)', 'rgba(13, 13, 13, 0.85)']}
            style={StyleSheet.absoluteFill}
          />
        </ImageBackground>

        {/* Animated Background Gradients */}
        <Animated.View
          style={[
            styles.backgroundGradient1,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(34, 197, 94, 0.1)', 'transparent']}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.backgroundGradient2,
            {
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-360deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(16, 185, 129, 0.1)', 'transparent']}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        {/* Floating Particles */}
        <FloatingParticle delay={0} duration={4000} size={60} left="10%" />
        <FloatingParticle delay={1000} duration={5000} size={40} left="80%" />
        <FloatingParticle delay={2000} duration={4500} size={50} left="60%" />
        <FloatingParticle delay={500} duration={5500} size={35} left="30%" />

        {/* Glow Effects */}
        <Animated.View
          style={[
            styles.glowEffect1,
            {
              transform: [{ scale: glowAnim }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.glowEffect2,
            {
              transform: [
                {
                  scale: glowAnim.interpolate({
                    inputRange: [1, 1.3],
                    outputRange: [1.3, 1],
                  }),
                },
              ],
            },
          ]}
        />

        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              }}
            >
              {/* Header with Gradient Text */}
              <View style={styles.header}>
                <MaskedView
                  maskElement={
                    <Text style={[styles.title, { backgroundColor: 'transparent' }]}>
                      Tạo tài khoản mới
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={['#ffffff', Primary[400], Primary[500]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={[styles.title, { opacity: 0 }]}>
                      Tạo tài khoản mới
                    </Text>
                  </LinearGradient>
                </MaskedView>
                <Text style={styles.subtitle}>
                  Bắt đầu hành trình đầu tư thông minh của bạn
                </Text>
              </View>

              {/* Form với Glass Morphism */}
              <View style={styles.form}>
                {/* Full Name Input */}
                <Animated.View
                  style={[
                    styles.inputContainer,
                    { transform: [{ scale: inputScales[0] }] },
                  ]}
                >
                  <Text style={styles.inputLabel}>HỌ VÀ TÊN</Text>
                  <View style={styles.inputWrapper}>
                    <LinearGradient
                      colors={['rgba(34, 197, 94, 0.05)', 'rgba(16, 185, 129, 0.05)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.inputGradient}
                    >
                      <View style={styles.inputIcon}>
                        <Text style={styles.iconText}>👤</Text>
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Nguyễn Văn A"
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={fullName}
                        onChangeText={setFullName}
                        onFocus={() => handleInputFocus(0)}
                        onBlur={() => handleInputBlur(0)}
                        autoCapitalize="words"
                      />
                    </LinearGradient>
                  </View>
                </Animated.View>

                {/* Email Input */}
                <Animated.View
                  style={[
                    styles.inputContainer,
                    { transform: [{ scale: inputScales[1] }] },
                  ]}
                >
                  <Text style={styles.inputLabel}>EMAIL</Text>
                  <View style={styles.inputWrapper}>
                    <LinearGradient
                      colors={['rgba(34, 197, 94, 0.05)', 'rgba(16, 185, 129, 0.05)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.inputGradient}
                    >
                      <View style={styles.inputIcon}>
                        <Text style={styles.iconText}>✉️</Text>
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="email@example.com"
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => handleInputFocus(1)}
                        onBlur={() => handleInputBlur(1)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </LinearGradient>
                  </View>
                </Animated.View>

                {/* Password Input */}
                <Animated.View
                  style={[
                    styles.inputContainer,
                    { transform: [{ scale: inputScales[2] }] },
                  ]}
                >
                  <Text style={styles.inputLabel}>MẬT KHẨU</Text>
                  <View style={styles.inputWrapper}>
                    <LinearGradient
                      colors={['rgba(34, 197, 94, 0.05)', 'rgba(16, 185, 129, 0.05)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.inputGradient}
                    >
                      <View style={styles.inputIcon}>
                        <Text style={styles.iconText}>🔒</Text>
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Tối thiểu 8 ký tự"
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => handleInputFocus(2)}
                        onBlur={() => handleInputBlur(2)}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Text style={styles.eyeIconText}>
                          {showPassword ? '👁️' : '👁️‍🗨️'}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </Animated.View>

                {/* Confirm Password Input */}
                <Animated.View
                  style={[
                    styles.inputContainer,
                    { transform: [{ scale: inputScales[3] }] },
                  ]}
                >
                  <Text style={styles.inputLabel}>XÁC NHẬN MẬT KHẨU</Text>
                  <View style={styles.inputWrapper}>
                    <LinearGradient
                      colors={['rgba(34, 197, 94, 0.05)', 'rgba(16, 185, 129, 0.05)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.inputGradient}
                    >
                      <View style={styles.inputIcon}>
                        <Text style={styles.iconText}>🔐</Text>
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu"
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <Text style={styles.eyeIconText}>
                          {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </Animated.View>

                {/* Terms & Conditions */}
                <TouchableOpacity
                  style={styles.termsContainer}
                  onPress={() => setAgreeTerms(!agreeTerms)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      agreeTerms && styles.checkboxChecked,
                    ]}
                  >
                    {agreeTerms && (
                      <LinearGradient
                        colors={[Primary[600], Primary[500]]}
                        style={styles.checkboxGradient}
                      >
                        <Text style={styles.checkmark}>✓</Text>
                      </LinearGradient>
                    )}
                  </View>
                  <Text style={styles.termsText}>
                    Tôi đồng ý với{' '}
                    <Text style={styles.termsLink}>Điều khoản dịch vụ</Text>
                    {' và '}
                    <Text style={styles.termsLink}>Chính sách bảo mật</Text>
                  </Text>
                </TouchableOpacity>

                {/* Register Button với Gradient Animation */}
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                  disabled={isLoading || !agreeTerms}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={
                      agreeTerms
                        ? [Primary[600], '#14b8a6', Primary[500]]
                        : ['rgba(75, 85, 99, 0.5)', 'rgba(55, 65, 81, 0.5)']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.registerButtonGradient}
                  >
                    {isLoading ? (
                      <View style={styles.loadingContainer}>
                        <Spinner />
                      </View>
                    ) : (
                      <Text
                        style={[
                          styles.registerButtonText,
                          !agreeTerms && styles.registerButtonTextDisabled,
                        ]}
                      >
                        Tạo tài khoản
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

    


              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Đã có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaskedView
                    maskElement={
                      <Text style={[styles.loginLink, { backgroundColor: 'transparent' }]}>
                        Đăng nhập ngay
                      </Text>
                    }
                  >
                    <LinearGradient
                      colors={[Primary[400], Primary[500]]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={[styles.loginLink, { opacity: 0 }]}>
                        Đăng nhập ngay
                      </Text>
                    </LinearGradient>
                  </MaskedView>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundGradient1: {
    position: 'absolute',
    top: -height * 0.3,
    right: -width * 0.3,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
  },
  backgroundGradient2: {
    position: 'absolute',
    bottom: -height * 0.2,
    left: -width * 0.3,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
  },
  particle: {
    position: 'absolute',
    top: height * 0.7,
    borderRadius: 50,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  glowEffect1: {
    position: 'absolute',
    top: height * 0.15,
    right: -width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    opacity: 0.4,
  },
  glowEffect2: {
    position: 'absolute',
    bottom: height * 0.2,
    left: -width * 0.15,
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    opacity: 0.4,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing[6],
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    marginTop: Spacing[4],
    marginBottom: Spacing[8],
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: Spacing[2],
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(156, 163, 175, 1)',
    lineHeight: 20,
  },
  form: {
    marginBottom: Spacing[8],
  },
  inputContainer: {
    marginBottom: Spacing[5],
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(16, 185, 129, 0.8)',
    marginBottom: Spacing[2],
    letterSpacing: 1.5,
  },
  inputWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  inputGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    height: 56,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  inputIcon: {
    marginRight: Spacing[3],
    width: 20,
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    height: '100%',
  },
  eyeIcon: {
    padding: Spacing[2],
    width: 40,
    alignItems: 'center',
  },
  eyeIconText: {
    fontSize: 18,
    opacity: 0.6,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Spacing[2],
    marginBottom: Spacing[6],
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(75, 85, 99, 1)',
    backgroundColor: 'transparent',
    marginRight: Spacing[3],
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    borderColor: Primary[500],
  },
  checkboxGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(156, 163, 175, 1)',
    lineHeight: 18,
  },
  termsLink: {
    color: Primary[400],
    fontWeight: '600',
  },
  registerButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Primary[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  registerButtonGradient: {
    paddingVertical: Spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  registerButtonTextDisabled: {
    opacity: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing[8],
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  dividerText: {
    fontSize: 10,
    color: 'rgba(107, 114, 128, 1)',
    marginHorizontal: Spacing[4],
    fontWeight: '600',
    letterSpacing: 2,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: Spacing[4],
    marginBottom: Spacing[8],
  },
  socialButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  socialButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing[4],
    height: 56,
  },
  googleIconContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing[2],
  },
  googleG: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4285F4',
  },
  facebookIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1877F2',
    marginRight: Spacing[2],
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(229, 231, 235, 1)',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing[8],
  },
  loginText: {
    fontSize: 14,
    color: 'rgba(107, 114, 128, 1)',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
  },
});
