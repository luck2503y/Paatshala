import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Svg, { Path, Line, Polyline, Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { Book } from '../types';
import { useApp } from '../context/AppContext';

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  const { theme, bookmarkedIds, toggleBookmark, showToast } = useApp();
  const isBookmarked = bookmarkedIds.includes(book.id);

  const handleBookmarkToggle = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
    const nowSaved = await toggleBookmark(book.id);
    showToast(nowSaved ? `Saved "${book.title}" to bookmarks` : `Removed "${book.title}" from bookmarks`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: '#000000',
        },
      ]}
    >
      {/* Cover Illustration */}
      <View style={styles.coverWrap}>
        <View style={styles.svgContainer}>
          <SvgXml xml={book.coverIllustration} width="100%" height={210} />
        </View>

        {/* Bookmark Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBookmarkToggle}
          style={[styles.bookmarkBtn, isBookmarked && styles.bookmarkedActive]}
          accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Bookmark story'}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24" fill={isBookmarked ? '#FFFFFF' : 'none'} stroke={isBookmarked ? '#FFFFFF' : '#0F172A'} strokeWidth={2}>
            <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Info Body */}
      <View style={styles.infoBody}>
        {/* Meta row */}
        <View style={styles.metaRow}>
          <Text style={[styles.categoryText, { color: theme.primary, backgroundColor: theme.chipBg }]}>
            {book.category}
          </Text>
          <Text style={[styles.timeText, { color: theme.textSecondary }]}>{book.readTime}</Text>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={2}>
          {book.title}
        </Text>

        {/* Author */}
        {!!book.author && (
          <View style={styles.authorRow}>
            <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={2}>
              <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <Circle cx="12" cy="7" r="4" />
            </Svg>
            <Text style={[styles.authorText, { color: theme.textSecondary }]} numberOfLines={1}>
              By {book.author}
            </Text>
          </View>
        )}

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: theme.primary }]} numberOfLines={1}>
          {book.subtitle}
        </Text>

        {/* Short Description */}
        <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={3}>
          {book.shortDescription}
        </Text>

        {/* Bottom CTA */}
        <View style={styles.ctaRow}>
          <Text style={[styles.ctaText, { color: theme.primary }]}>Read Story</Text>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth={2.4}>
            <Line x1="5" y1="12" x2="19" y2="12" />
            <Polyline points="12 5 19 12 12 19" />
          </Svg>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  coverWrap: {
    width: '100%',
    height: 210,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  svgContainer: {
    width: '100%',
    height: '100%',
  },
  badgeTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  bookmarkedActive: {
    backgroundColor: '#EF4444',
  },
  infoBody: {
    padding: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11.5,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 4,
    lineHeight: 23,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  authorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12.5,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    lineHeight: 18.5,
    marginBottom: 12,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ctaText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
});
