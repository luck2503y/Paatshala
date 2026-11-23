import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider } from '@clerk/clerk-expo';
import { AppProvider, useApp } from './src/context/AppContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { ReaderScreen } from './src/screens/ReaderScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { Toast } from './src/components/Toast';
import { tokenCache } from './src/utils/tokenCache';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
const isClerkAvailable =
  typeof CLERK_PUBLISHABLE_KEY === 'string' &&
  (CLERK_PUBLISHABLE_KEY.startsWith('pk_test_') || CLERK_PUBLISHABLE_KEY.startsWith('pk_live_')) &&
  !CLERK_PUBLISHABLE_KEY.includes('your_clerk_publishable_key_here');

const MainNavigator: React.FC = () => {
  const { activeScreen, themeMode, theme } = useApp();

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      {activeScreen === 'login' && <LoginScreen />}
      {activeScreen === 'library' && <LibraryScreen />}
      {activeScreen === 'reader' && <ReaderScreen />}
      {activeScreen === 'chat' && <ChatScreen />}
      <Toast />
    </View>
  );
};

export default function App() {
  const appContent = (
    <SafeAreaProvider>
      <AppProvider>
        <MainNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );

  if (isClerkAvailable) {
    return (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        {appContent}
      </ClerkProvider>
    );
  }

  return appContent;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
