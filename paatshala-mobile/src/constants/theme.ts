export interface ThemeColors {
  background: string;
  card: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  primaryGradient: [string, string];
  primaryGlow: string;
  border: string;
  borderSubtle: string;
  accent: string;
  inputBg: string;
  chipBg: string;
  chipActiveBg: string;
  error: string;
  success: string;
}

export const lightTheme: ThemeColors = {
  background: '#EEF2F6',
  card: '#FFFFFF',
  surface: '#F8FAFC',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  primary: '#4F46E5',
  primaryGradient: ['#4F46E5', '#7C3AED'],
  primaryGlow: 'rgba(79, 70, 229, 0.35)',
  border: 'rgba(226, 232, 240, 0.8)',
  borderSubtle: 'rgba(0, 0, 0, 0.06)',
  accent: '#10B981',
  inputBg: '#F8FAFC',
  chipBg: '#F1F5F9',
  chipActiveBg: '#4F46E5',
  error: '#EF4444',
  success: '#10B981',
};

export const darkTheme: ThemeColors = {
  background: '#07090E',
  card: '#0F172A',
  surface: '#1E293B',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  primary: '#6366F1',
  primaryGradient: ['#6366F1', '#8B5CF6'],
  primaryGlow: 'rgba(99, 102, 241, 0.45)',
  border: 'rgba(255, 255, 255, 0.12)',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  accent: '#34D399',
  inputBg: '#1E293B',
  chipBg: '#1E293B',
  chipActiveBg: '#6366F1',
  error: '#F87171',
  success: '#34D399',
};
