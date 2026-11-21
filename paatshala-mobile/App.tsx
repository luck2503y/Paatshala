import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useApp } from './src/context/AppContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { ReaderScreen } from './src/screens/ReaderScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { Toast } from './src/components/Toast';

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
  return (
    <SafeAreaProvider>
      <AppProvider>
        <MainNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
