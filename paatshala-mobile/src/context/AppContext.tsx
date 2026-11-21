import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeColors, lightTheme, darkTheme } from '../constants/theme';
import { Book } from '../types';

export type ScreenName = 'login' | 'library' | 'reader' | 'chat';

interface AppContextType {
  themeMode: 'light' | 'dark';
  theme: ThemeColors;
  toggleTheme: () => void;
  user: string | null;
  login: (username: string) => Promise<void>;
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
        if (savedUser) {
          setUser(savedUser);
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

  const login = async (username: string) => {
    setUser(username);
    setActiveScreen('library');
    try {
      await AsyncStorage.setItem('paatshala-user', username);
    } catch (e) {
      console.error('Error saving user session:', e);
    }
  };

  const logout = async () => {
    setUser(null);
    setCurrentBook(null);
    setActiveScreen('login');
    try {
      await AsyncStorage.removeItem('paatshala-user');
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
