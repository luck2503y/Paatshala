import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeColors, lightTheme, darkTheme } from '../constants/theme';
import { Book } from '../types';
import { tokenCache } from '../utils/tokenCache';

export type ScreenName = 'login' | 'library' | 'reader' | 'chat';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
export const isClerkConfigured =
  typeof CLERK_PUBLISHABLE_KEY === 'string' &&
  (CLERK_PUBLISHABLE_KEY.startsWith('pk_test_') || CLERK_PUBLISHABLE_KEY.startsWith('pk_live_')) &&
  !CLERK_PUBLISHABLE_KEY.includes('your_clerk_publishable_key_here');

interface AppContextType {
  themeMode: 'light' | 'dark';
  theme: ThemeColors;
  toggleTheme: () => void;
  user: string | null;
  clerkUserId: string | null;
  userEmail: string | null;
  isClerkConfigured: boolean;
  login: (username: string, clerkUserId?: string, userEmail?: string) => Promise<void>;
  logout: () => Promise<void>;
  bookmarkedIds: string[];
  toggleBookmark: (bookId: string) => Promise<boolean>;
  activeScreen: ScreenName;
  navigateTo: (screen: ScreenName) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Reading State
  currentBook: Book | null;
  currentChapterIndex: number;
  readingLanguage: 'en' | 'hinglish';
  proseFontSize: number;
  openBook: (book: Book, chapterIndex?: number) => void;
  closeBook: () => void;
  setReadingLanguage: (lang: 'en' | 'hinglish') => void;
  setChapterIndex: (index: number) => void;
  adjustFontSize: (delta: number) => void;
  sourceChatContext: { bookId: string; chapterIndex: number; role: 'A' | 'D' } | null;
  setSourceChatContext: (ctx: { bookId: string; chapterIndex: number; role: 'A' | 'D' } | null) => void;

  // Chat Role State
  chatRole: 'A' | 'D';
  setChatRole: (role: 'A' | 'D') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<string | null>(null);
  const [clerkUserId, setClerkUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeScreen, setActiveScreen] = useState<ScreenName>('login');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Reader States
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [readingLanguage, setReadingLanguageState] = useState<'en' | 'hinglish'>('en');
  const [proseFontSize, setProseFontSize] = useState<number>(17);
  const [sourceChatContext, setSourceChatContext] = useState<{ bookId: string; chapterIndex: number; role: 'A' | 'D' } | null>(null);
  const [chatRole, setChatRole] = useState<'A' | 'D'>('A');

  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('paatshala-theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
          setThemeMode(savedTheme);
        }
        const savedUser = await AsyncStorage.getItem('paatshala-user');
        const savedClerkId = await AsyncStorage.getItem('paatshala-clerk-user-id');
        const savedEmail = await AsyncStorage.getItem('paatshala-user-email');
        if (savedUser) {
          setUser(savedUser);
          if (savedClerkId) setClerkUserId(savedClerkId);
          if (savedEmail) setUserEmail(savedEmail);
          setActiveScreen('library');
        }
        const savedBookmarks = await AsyncStorage.getItem('paatshala-book-bookmarks');
        if (savedBookmarks) {
          setBookmarkedIds(JSON.parse(savedBookmarks));
        }
        const savedLang = await AsyncStorage.getItem('paatshala-reading-lang');
        if (savedLang === 'hinglish' || savedLang === 'en') {
          setReadingLanguageState(savedLang);
        }
      } catch (e) {
        console.error('Error loading initial app state:', e);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextTheme);
    try {
      await AsyncStorage.setItem('paatshala-theme', nextTheme);
    } catch (e) {
      console.error('Error saving theme:', e);
    }
  };

  const login = async (username: string, clerkId?: string, email?: string) => {
    setUser(username);
    if (clerkId) setClerkUserId(clerkId);
    if (email) setUserEmail(email);
    setActiveScreen('library');
    try {
      await AsyncStorage.setItem('paatshala-user', username);
      if (clerkId) await AsyncStorage.setItem('paatshala-clerk-user-id', clerkId);
      if (email) await AsyncStorage.setItem('paatshala-user-email', email);
    } catch (e) {
      console.error('Error saving user session:', e);
    }
  };

  const logout = async () => {
    setUser(null);
    setClerkUserId(null);
    setUserEmail(null);
    setCurrentBook(null);
    setActiveScreen('login');
    try {
      await AsyncStorage.removeItem('paatshala-user');
      await AsyncStorage.removeItem('paatshala-clerk-user-id');
      await AsyncStorage.removeItem('paatshala-user-email');
      await tokenCache.clearToken?.('__clerk_client_jwt');
    } catch (e) {
      console.error('Error removing user session:', e);
    }
  };

  const toggleBookmark = async (bookId: string): Promise<boolean> => {
    let nextBookmarks: string[];
    let isNowBookmarked = false;
    if (bookmarkedIds.includes(bookId)) {
      nextBookmarks = bookmarkedIds.filter(id => id !== bookId);
    } else {
      nextBookmarks = [...bookmarkedIds, bookId];
      isNowBookmarked = true;
    }
    setBookmarkedIds(nextBookmarks);
    try {
      await AsyncStorage.setItem('paatshala-book-bookmarks', JSON.stringify(nextBookmarks));
    } catch (e) {
      console.error('Error saving bookmarks:', e);
    }
    return isNowBookmarked;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const openBook = (book: Book, chapterIndex = 0) => {
    setCurrentBook(book);
    setCurrentChapterIndex(chapterIndex);
    setActiveScreen('reader');
  };

  const closeBook = () => {
    setCurrentBook(null);
    setActiveScreen('library');
  };

  const setReadingLanguage = async (lang: 'en' | 'hinglish') => {
    setReadingLanguageState(lang);
    try {
      await AsyncStorage.setItem('paatshala-reading-lang', lang);
    } catch (e) {
      console.error('Error saving language preference:', e);
    }
  };

  const setChapterIndex = (index: number) => {
    setCurrentChapterIndex(index);
  };

  const adjustFontSize = (delta: number) => {
    setProseFontSize(prev => {
      const next = prev + delta;
      if (next < 13) return 13;
      if (next > 26) return 26;
      return next;
    });
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <AppContext.Provider
      value={{
        themeMode,
        theme,
        toggleTheme,
        user,
        clerkUserId,
        userEmail,
        isClerkConfigured,
        login,
        logout,
        bookmarkedIds,
        toggleBookmark,
        activeScreen,
        navigateTo: setActiveScreen,
        toastMessage,
        showToast,
        currentBook,
        currentChapterIndex,
        readingLanguage,
        proseFontSize,
        openBook,
        closeBook,
        setReadingLanguage,
        setChapterIndex,
        adjustFontSize,
        sourceChatContext,
        setSourceChatContext,
        chatRole,
        setChatRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
