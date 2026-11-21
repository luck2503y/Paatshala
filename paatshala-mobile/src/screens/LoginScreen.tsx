import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Line, Polyline } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useApp } from '../context/AppContext';
import { ThemeToggle } from '../components/ThemeToggle';

export const LoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { theme, login, showToast } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pulsating Halo Animation
  const haloScale = useRef(new Animated.Value(0.95)).current;
  const haloOpacity = useRef(new Animated.Value(0.55)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(haloScale, {
            toValue: 1.14,
            duration: 2600,
            useNativeDriver: true,
          }),
          Animated.timing(haloOpacity, {
            toValue: 0.9,
            duration: 2600,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(haloScale, {
            toValue: 0.95,
            duration: 2600,
            useNativeDriver: true,
          }),
          Animated.timing(haloOpacity, {
            toValue: 0.55,
            duration: 2600,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const handleLogin = async () => {
    let valid = true;

    if (!username.trim()) {
      setUsernameError('Please enter your username');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Please enter your password');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch (e) {}
      return;
    }

    setLoading(true);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}

    setTimeout(async () => {
      setLoading(false);
      await login(username.trim());
      showToast(`Welcome back, ${username.trim()}!`);
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Navbar */}
        <View style={styles.navbar}>
          <View style={styles.brandGroup}>
            <View style={[styles.navLogoWrap, { shadowColor: theme.primaryGlow }]}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.navLogoImg}
                resizeMode="cover"
              />
            </View>
            <Text style={[styles.navBrandText, { color: theme.textPrimary }]}>Paatshala</Text>
          </View>
          <ThemeToggle size={38} />
        </View>

        {/* Login Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              shadowColor: theme.primaryGlow,
            },
          ]}
        >
          {/* Animated Logo with Glowing Halo */}
          <View style={styles.logoSection}>
            <Animated.View
              style={[
                styles.logoHalo,
                {
                  backgroundColor: theme.primaryGlow,
                  transform: [{ scale: haloScale }],
                  opacity: haloOpacity,
                },
              ]}
            />
            <View style={[styles.logoMark, { shadowColor: theme.primaryGlow }]}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logoImg}
                resizeMode="cover"
              />
            </View>
            <Text style={[styles.appTitle, { color: theme.primary }]}>Paatshala</Text>
          </View>

          {/* Heading */}
          <View style={styles.headingSection}>
            <Text style={[styles.authHeading, { color: theme.textPrimary }]}>Login</Text>
            <Text style={[styles.authSubtitle, { color: theme.textSecondary }]}>
              Welcome back! Please enter your details.
            </Text>
          </View>

          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Username</Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.inputBg,
                  borderColor: usernameError ? theme.error : theme.border,
                },
              ]}
            >
              <View style={styles.iconContainer}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={2}>
                  <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <Circle cx="12" cy="7" r="4" />
                </Svg>
              </View>
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Enter your username"
                placeholderTextColor={theme.textSecondary}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (usernameError) setUsernameError('');
                }}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {!!usernameError && <Text style={[styles.errorText, { color: theme.error }]}>{usernameError}</Text>}
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Password</Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.inputBg,
                  borderColor: passwordError ? theme.error : theme.border,
                },
              ]}
            >
              <View style={styles.iconContainer}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={2}>
                  <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </Svg>
              </View>
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={2}>
                    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <Circle cx="12" cy="12" r="3" />
                  </Svg>
                ) : (
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={2}>
                    <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <Line x1="1" y1="1" x2="23" y2="23" />
                  </Svg>
                )}
              </TouchableOpacity>
            </View>
            {!!passwordError && <Text style={[styles.errorText, { color: theme.error }]}>{passwordError}</Text>}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleLogin}
            disabled={loading}
            style={[styles.loginBtn, { backgroundColor: theme.primary }]}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <View style={styles.btnContentRow}>
                <Text style={styles.loginBtnText}>Login</Text>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.4}>
                  <Line x1="5" y1="12" x2="19" y2="12" />
                  <Polyline points="12 5 19 12 12 19" />
                </Svg>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  navbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navLogoWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  navLogoImg: {
    width: '100%',
    height: '100%',
  },
  navBrandText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  logoHalo: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  logoMark: {
    width: 68,
    height: 68,
    borderRadius: 34,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 6,
    marginBottom: 10,
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headingSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  authHeading: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  authSubtitle: {
    fontSize: 13.5,
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    height: 48,
  },
  iconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '500',
    paddingVertical: 0,
  },
  eyeBtn: {
    padding: 6,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    marginLeft: 2,
  },
  loginBtn: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 5,
  },
  btnContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '700',
  },
});
