import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Svg, { Rect, Path, Line, Polyline, Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useApp } from '../context/AppContext';

interface PasswordModalProps {
  visible: boolean;
  role: 'A' | 'D';
  onClose: () => void;
  onSuccess: (role: 'A' | 'D') => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({
  visible,
  role,
  onClose,
  onSuccess,
}) => {
  const { theme } = useApp();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validPasswords = ['2011', 'paatshala', '1234', 'admin', 'lucky', 'pass'];

  const handleSubmit = () => {
    const entered = password.trim().toLowerCase();

    if (!entered) {
      setErrorMessage('Please enter the password');
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch (e) {}
      return;
    }

    if (validPasswords.includes(entered)) {
      setErrorMessage('');
      setSubmitting(true);
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (e) {}

      setTimeout(() => {
        setSubmitting(false);
        setPassword('');
        onSuccess(role);
      }, 450);
    } else {
      setErrorMessage('Incorrect password. Please try again.');
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch (e) {}
    }
  };

  const handleClose = () => {
    setPassword('');
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.backdrop}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardWrap}
          >
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    shadowColor: '#000000',
                  },
                ]}
              >
                {/* Close Button */}
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeBtn}
                  accessibilityLabel="Close password modal"
                >
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={2.5}>
                    <Line x1="18" y1="6" x2="6" y2="18" />
                    <Line x1="6" y1="6" x2="18" y2="18" />
                  </Svg>
                </TouchableOpacity>

                {/* Header Icon */}
                <View style={[styles.iconWrap, { backgroundColor: theme.primaryGlow }]}>
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth={2.2}>
                    <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </Svg>
                </View>

                {/* Title */}
                <Text style={[styles.title, { color: theme.textPrimary }]}>
                  Participant {role} Chat Access
                </Text>

                {/* Password Input Field */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: theme.textSecondary }]}>Password</Text>
                  <View
                    style={[
                      styles.inputWrap,
                      {
                        backgroundColor: theme.inputBg,
                        borderColor: errorMessage ? theme.error : theme.border,
                      },
                    ]}
                  >
                    <View style={styles.lockIcon}>
                      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={2}>
                        <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </Svg>
                    </View>

                    <TextInput
                      style={[styles.input, { color: theme.textPrimary }]}
                      placeholder="Enter password"
                      placeholderTextColor={theme.textSecondary}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={(t) => {
                        setPassword(t);
                        if (errorMessage) setErrorMessage('');
                      }}
                      autoFocus
                    />

                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeBtn}
                      accessibilityLabel="Toggle password visibility"
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
                  {!!errorMessage && <Text style={[styles.errorText, { color: theme.error }]}>{errorMessage}</Text>}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleSubmit}
                  disabled={submitting}
                  style={[
                    styles.submitBtn,
                    {
                      backgroundColor: submitting ? '#10B981' : theme.primary,
                      shadowColor: submitting ? '#10B981' : theme.primary,
                    },
                  ]}
                >
                  {submitting ? (
                    <View style={styles.btnRow}>
                      <ActivityIndicator color="#FFFFFF" size="small" />
                      <Text style={styles.submitBtnText}>Access Granted!</Text>
                    </View>
                  ) : (
                    <View style={styles.btnRow}>
                      <Text style={styles.submitBtnText}>Unlock &amp; Enter Chat</Text>
                      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.4}>
                        <Line x1="5" y1="12" x2="19" y2="12" />
                        <Polyline points="12 5 19 12 12 19" />
                      </Svg>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  keyboardWrap: {
    width: '100%',
    maxWidth: 380,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 6,
    zIndex: 10,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 12.5,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    height: 48,
  },
  lockIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
  },
  eyeBtn: {
    padding: 6,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  submitBtn: {
    width: '100%',
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
});
