import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { BOOKS_DATA } from '../data/booksData';
import { Book } from '../types';
import { useApp } from '../context/AppContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { BookCard } from '../components/BookCard';

const CATEGORIES = [
  { id: 'all', label: 'All Stories' },
  { id: 'national heritage', label: 'National Heritage' },
  { id: 'democracy & law', label: 'Democracy & Law' },
  { id: 'science & space', label: 'Science & Space' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'psychology', label: 'Psychology' },
  { id: 'health & body', label: 'Health & Body' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'clean energy', label: 'Clean Energy' },
  { id: 'technology', label: 'Technology' },
];

export const LibraryScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { theme, user, logout, bookmarkedIds, showToast, openBook } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  // Filter books dynamically
  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter((book) => {
      const matchesCategory =
        activeCategory === 'all' || book.category.toLowerCase() === activeCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.subtitle.toLowerCase().includes(q) ||
        (book.author && book.author.toLowerCase().includes(q)) ||
        book.category.toLowerCase().includes(q) ||
        book.shortDescription.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleCategoryPress = (catId: string) => {
    try {
      Haptics.selectionAsync();
    } catch (e) {}
    setActiveCategory(catId);
  };

  const handleBookmarksQuickView = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
    if (bookmarkedIds.length === 0) {
      showToast('No saved bookmarks yet. Tap the bookmark icon on any book.');
    } else {
      showToast(`${bookmarkedIds.length} bookmarked storybooks in your library.`);
    }
  };

  const handleBookPress = (book: Book) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
    openBook(book);
  };

  const renderHeader = () => (
    <View>
      {/* Search Input Box */}
      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            shadowColor: '#000000',
          },
        ]}
      >
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={2.2}>
          <Circle cx="11" cy="11" r="8" />
          <Line x1="21" y1="21" x2="16.65" y2="16.65" />
        </Svg>
        <TextInput
          style={[styles.searchInput, { color: theme.textPrimary }]}
          placeholder="Search books by title, topic, author..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {!!searchQuery && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => setSearchQuery('')}
            accessibilityLabel="Clear search"
          >
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={2.5}>
              <Line x1="18" y1="6" x2="6" y2="18" />
              <Line x1="6" y1="6" x2="18" y2="18" />
            </Svg>
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Category Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollContainer}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.8}
              onPress={() => handleCategoryPress(cat.id)}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isActive ? theme.primary : theme.chipBg,
                  borderColor: isActive ? 'transparent' : theme.borderSubtle,
                },
                isActive && {
                  shadowColor: theme.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.35,
                  shadowRadius: 8,
                  elevation: 4,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  { color: isActive ? '#FFFFFF' : theme.textSecondary, fontWeight: isActive ? '700' : '600' },
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Section Header Row */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Educational Storybooks</Text>
        <View style={[styles.booksCountBadge, { backgroundColor: theme.chipBg, borderColor: theme.border }]}>
          <Text style={[styles.booksCountText, { color: theme.textSecondary }]}>
            {filteredBooks.length} Book{filteredBooks.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={1.8}>
        <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <Line x1="9" y1="9" x2="15" y2="9" />
      </Svg>
      <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>No storybooks found</Text>
      <Text style={[styles.emptyDesc, { color: theme.textSecondary }]}>
        Try searching for other topics like "Constitution", "ISRO", "Democracy", or "Clean Energy".
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* App Header */}
      <View
        style={[
          styles.appHeader,
          {
            paddingTop: insets.top + 8,
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <View style={styles.brandGroup}>
          <View style={[styles.headerLogoWrap, { shadowColor: theme.primaryGlow }]}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogoImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.brandTextCol}>
            <Text style={[styles.brandTitle, { color: theme.textPrimary }]}>Paatshala</Text>
            <Text style={[styles.brandTag, { color: theme.textSecondary }]}>Stories of India &amp; Progress</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <ThemeToggle size={36} />

          {/* Saved Bookmarks Quick Icon */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleBookmarksQuickView}
            style={[
              styles.headerIconBtn,
              {
                backgroundColor: theme.chipBg,
                borderColor: theme.border,
              },
            ]}
            accessibilityLabel="View saved bookmarks"
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill={bookmarkedIds.length > 0 ? theme.primary : 'none'} stroke={theme.textPrimary} strokeWidth={2}>
              <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </Svg>
            {bookmarkedIds.length > 0 && (
              <View style={[styles.counterBadge, { backgroundColor: theme.primary }]}>
                <Text style={styles.counterBadgeText}>{bookmarkedIds.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* User Account Avatar */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => setProfileModalVisible(true)}
            style={[styles.userAvatarBtn, { backgroundColor: theme.primary }]}
            accessibilityLabel="User Account"
          >
            <Text style={styles.avatarInitials}>
              {user ? user.substring(0, 2).toUpperCase() : 'PS'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Books FlatList */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard book={item} onPress={() => handleBookPress(item)} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 30 },
        ]}
        showsVerticalScrollIndicator={false}
      />

      {/* User Profile Popover Modal */}
      <Modal
        visible={profileModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setProfileModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.popoverCard,
                  {
                    top: insets.top + 60,
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    shadowColor: '#000000',
                  },
                ]}
              >
                <View style={styles.popoverHeader}>
                  <Text style={[styles.popoverName, { color: theme.textPrimary }]}>
                    {user || 'Paatshala Student'}
                  </Text>
                  <Text style={[styles.popoverEmail, { color: theme.textSecondary }]}>
                    student@paatshala.org
                  </Text>
                </View>

                <View style={[styles.popoverDivider, { backgroundColor: theme.borderSubtle }]} />

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setProfileModalVisible(false);
                    logout();
                    showToast('Logged out successfully');
                  }}
                  style={styles.logoutRow}
                >
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <Line x1="16" y1="17" x2="21" y2="12" />
                    <Line x1="21" y1="12" x2="16" y2="7" />
                    <Line x1="21" y1="12" x2="9" y2="12" />
                  </Svg>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appHeader: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    zIndex: 10,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogoWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  headerLogoImg: {
    width: '100%',
    height: '100%',
  },
  brandTextCol: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  brandTag: {
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  counterBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  counterBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  userAvatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 6,
  },
  categoryScrollContainer: {
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12.5,
  },
  heroCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    marginBottom: 10,
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  heroHeading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  heroSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12.5,
    lineHeight: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  booksCountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  booksCountText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  popoverCard: {
    position: 'absolute',
    right: 16,
    width: 220,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 8,
  },
  popoverHeader: {
    marginBottom: 12,
  },
  popoverName: {
    fontSize: 14.5,
    fontWeight: '700',
    marginBottom: 2,
  },
  popoverEmail: {
    fontSize: 12,
  },
  popoverDivider: {
    height: 1,
    marginBottom: 10,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '700',
  },
});
