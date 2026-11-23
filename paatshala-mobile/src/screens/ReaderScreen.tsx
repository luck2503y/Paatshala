import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import Svg, { Path, Line, Polyline } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useApp } from '../context/AppContext';
import { HINGLISH_DATA } from '../data/hinglishData';
import { ProseRenderer } from '../components/ProseRenderer';
import { PasswordModal } from '../components/PasswordModal';

export const ReaderScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {
    currentBook,
    currentChapterIndex,
    readingLanguage,
    proseFontSize,
    closeBook,
    setReadingLanguage,
    setChapterIndex,
    theme,
    bookmarkedIds,
    toggleBookmark,
    showToast,
    setSourceChatContext,
    setChatRole,
    navigateTo,
  } = useApp();

  const scrollViewRef = useRef<any>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [targetRole, setTargetRole] = useState<'A' | 'D'>('A');

  if (!currentBook) return null;

  const isBookmarked = bookmarkedIds.includes(currentBook.id);
  const hinglishBook = HINGLISH_DATA[currentBook.id];

  // Current Chapter Data based on selected language
  const currentChapter = useMemo(() => {
    const defaultCh = currentBook.chapters[currentChapterIndex] || currentBook.chapters[0];
    if (readingLanguage === 'hinglish' && hinglishBook?.chapters?.[currentChapterIndex]) {
      const hCh = hinglishBook.chapters[currentChapterIndex];
      return {
        number: hCh.number || defaultCh.number,
        title: hCh.title || defaultCh.title,
        content: hCh.content || defaultCh.content,
      };
    }
    return defaultCh;
  }, [readingLanguage, currentBook, currentChapterIndex, hinglishBook]);

  // Scroll Progress Calculation
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const totalScrollable = contentSize.height - layoutMeasurement.height;
    if (totalScrollable > 0) {
      const progress = Math.min(Math.max(contentOffset.y / totalScrollable, 0), 1);
      setScrollProgress(progress);
    }
  };

  const handleLanguageSwitch = (lang: 'en' | 'hinglish') => {
    try {
      Haptics.selectionAsync();
    } catch (e) {}
    setReadingLanguage(lang);
  };

  const handleChapterChange = (newIdx: number) => {
    try {
      Haptics.selectionAsync();
    } catch (e) {}
    setChapterIndex(newIdx);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleBookmarkToggle = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
    const nowSaved = await toggleBookmark(currentBook.id);
    showToast(nowSaved ? `Bookmarked "${currentBook.title}"` : `Bookmark removed`);
  };

  const handleChatIconPress = (role: 'A' | 'D') => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}
    setTargetRole(role);
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = (role: 'A' | 'D') => {
    setShowPasswordModal(false);
    setChatRole(role);
    setSourceChatContext({
      bookId: currentBook.id,
      chapterIndex: currentChapterIndex,
      role,
    });
    navigateTo('chat');
  };

  const isMansSearch = currentBook.id === 'mans-search-for-meaning';
  const isStartingStrength = currentBook.id === 'starting-strength';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Sticky Reader Top Bar */}
      <View
        style={[
          styles.stickyHeader,
          {
            paddingTop: insets.top + 6,
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <View style={styles.headerRow}>
          {/* Back to Library Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={closeBook}
            style={styles.backBtn}
            accessibilityLabel="Back to Library"
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={theme.textPrimary} strokeWidth={2.4}>
              <Line x1="19" y1="12" x2="5" y2="12" />
              <Polyline points="12 19 5 12 12 5" />
            </Svg>
            <Text style={[styles.backBtnText, { color: theme.textPrimary }]}>Library</Text>
          </TouchableOpacity>

          {/* Book Title in Header */}
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]} numberOfLines={1}>
            {currentBook.title}
          </Text>

          {/* Reader Controls: Language & Font Size */}
          <View style={styles.headerControls}>
            {/* Language Segmented Pill */}
            <View style={[styles.langSegmented, { backgroundColor: theme.chipBg, borderColor: theme.border }]}>
              <TouchableOpacity
                onPress={() => handleLanguageSwitch('en')}
                style={[
                  styles.langPillBtn,
                  readingLanguage === 'en' && { backgroundColor: theme.primary },
                ]}
              >
                <Text
                  style={[
                    styles.langPillText,
                    { color: readingLanguage === 'en' ? '#FFFFFF' : theme.textSecondary, fontWeight: readingLanguage === 'en' ? '700' : '500' },
                  ]}
                >
                  EN
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleLanguageSwitch('hinglish')}
                style={[
                  styles.langPillBtn,
                  readingLanguage === 'hinglish' && { backgroundColor: theme.primary },
                ]}
              >
                <Text
                  style={[
                    styles.langPillText,
                    { color: readingLanguage === 'hinglish' ? '#FFFFFF' : theme.textSecondary, fontWeight: readingLanguage === 'hinglish' ? '700' : '500' },
                  ]}
                >
                  HI
                </Text>
              </TouchableOpacity>
            </View>

            {/* Bookmark Button */}
            <TouchableOpacity
              onPress={handleBookmarkToggle}
              style={[
                styles.bookmarkBtn,
                { backgroundColor: theme.chipBg, borderColor: theme.border },
              ]}
              accessibilityLabel="Bookmark this story"
            >
              <Svg width={17} height={17} viewBox="0 0 24 24" fill={isBookmarked ? theme.primary : 'none'} stroke={theme.textPrimary} strokeWidth={2}>
                <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic Reading Progress Bar */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: theme.primary,
                width: `${Math.max(scrollProgress * 100, 2)}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Book Hero Section Inside Reader */}
        <View style={styles.heroSection}>
          <View style={[styles.coverContainer, { shadowColor: '#000000' }]}>
            <SvgXml xml={currentBook.coverIllustration} width={120} height={165} />
          </View>

          <View style={styles.heroMeta}>
            <Text style={[styles.categoryPill, { color: theme.primary, backgroundColor: theme.chipBg }]}>
              {currentBook.category}
            </Text>
            <Text style={[styles.bookTitle, { color: theme.textPrimary }]}>
              {currentBook.title}
            </Text>
          </View>
        </View>

        {/* Chapter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContainer}
        >
          {currentBook.chapters.map((ch, idx) => {
            const isActive = idx === currentChapterIndex;
            const hCh = readingLanguage === 'hinglish' && hinglishBook?.chapters ? hinglishBook.chapters[idx] : undefined;
            const title = hCh?.title || ch.title;

            return (
              <TouchableOpacity
                key={ch.number}
                activeOpacity={0.8}
                onPress={() => handleChapterChange(idx)}
                style={[
                  styles.chapterTabBtn,
                  {
                    backgroundColor: isActive ? theme.primary : theme.chipBg,
                    borderColor: isActive ? 'transparent' : theme.borderSubtle,
                  },
                  isActive && {
                    shadowColor: theme.primary,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.35,
                    shadowRadius: 6,
                    elevation: 3,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chapterTabText,
                    {
                      color: isActive ? '#FFFFFF' : theme.textSecondary,
                      fontWeight: isActive ? '700' : '600',
                    },
                  ]}
                >
                  Ch {ch.number}: {title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Chapter Article Body */}
        <View
          style={[
            styles.articleCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          {/* Chapter Heading Wrap with A or D Icon */}
          <View style={styles.chapterHeadingWrap}>
            <View style={styles.chapterHeadingInfo}>
              <Text style={[styles.chapterBadge, { color: theme.primary }]}>
                Chapter {currentChapter.number}
              </Text>
              <Text style={[styles.chapterTitle, { color: theme.textPrimary }]}>
                {currentChapter.title}
              </Text>
            </View>

            {/* A Button (Only in "Man's Search for Meaning") */}
            {isMansSearch && (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => handleChatIconPress('A')}
                style={[styles.chatIconBtn, { backgroundColor: theme.primary, shadowColor: theme.primaryGlow }]}
                accessibilityLabel="Open Participant A Chat"
              >
                <Text style={styles.chatIconLetter}>A</Text>
              </TouchableOpacity>
            )}

            {/* D Button (Only in "Starting Strength" - exact same position) */}
            {isStartingStrength && (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => handleChatIconPress('D')}
                style={[styles.chatIconBtn, { backgroundColor: theme.primary, shadowColor: theme.primaryGlow }]}
                accessibilityLabel="Open Participant D Chat"
              >
                <Text style={styles.chatIconLetter}>D</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Chapter Prose HTML Content */}
          <View style={styles.proseContainer}>
            <ProseRenderer contentHtml={currentChapter.content} fontSize={proseFontSize} />
          </View>

          {/* Chapter Pager Navigation */}
          <View style={styles.pagerNav}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleChapterChange(currentChapterIndex - 1)}
              disabled={currentChapterIndex === 0}
              style={[
                styles.pagerBtn,
                {
                  backgroundColor: theme.chipBg,
                  borderColor: theme.border,
                  opacity: currentChapterIndex === 0 ? 0.35 : 1,
                },
              ]}
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.textPrimary} strokeWidth={2.2}>
                <Polyline points="15 18 9 12 15 6" />
              </Svg>
              <Text style={[styles.pagerBtnText, { color: theme.textPrimary }]}>Previous Chapter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleChapterChange(currentChapterIndex + 1)}
              disabled={currentChapterIndex >= currentBook.chapters.length - 1}
              style={[
                styles.pagerBtn,
                {
                  backgroundColor: theme.chipBg,
                  borderColor: theme.border,
                  opacity: currentChapterIndex >= currentBook.chapters.length - 1 ? 0.35 : 1,
                },
              ]}
            >
              <Text style={[styles.pagerBtnText, { color: theme.textPrimary }]}>Next Chapter</Text>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.textPrimary} strokeWidth={2.2}>
                <Polyline points="9 18 15 12 9 6" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Return to Library Bottom CTA */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={closeBook}
            style={[styles.finishBtn, { backgroundColor: theme.primary }]}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2}>
              <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </Svg>
            <Text style={styles.finishBtnText}>Return to Library</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Protected Chat Password Verification Modal */}
      <PasswordModal
        visible={showPasswordModal}
        role={targetRole}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    borderBottomWidth: 1,
    zIndex: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingBottom: 10,
    gap: 8,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingRight: 6,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  headerTitle: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langSegmented: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    padding: 2,
  },
  langPillBtn: {
    paddingHorizontal: 7,
    paddingVertical: 3.5,
    borderRadius: 6,
  },
  langPillText: {
    fontSize: 11,
  },
  bookmarkBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  progressFill: {
    height: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  coverContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  heroMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryPill: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 3,
    lineHeight: 23,
  },
  tabsScrollContainer: {
    paddingBottom: 16,
    gap: 8,
  },
  chapterTabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  chapterTabText: {
    fontSize: 12.5,
  },
  articleCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    marginBottom: 24,
  },
  chapterHeadingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  chapterHeadingInfo: {
    flex: 1,
    paddingRight: 10,
  },
  chapterBadge: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  chatIconBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  chatIconLetter: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  onlinePingDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  proseContainer: {
    marginBottom: 24,
  },
  pagerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
    marginBottom: 16,
  },
  pagerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  pagerBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  finishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 14,
  },
  finishBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
});
