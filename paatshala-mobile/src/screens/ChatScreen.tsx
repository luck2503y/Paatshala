import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import Svg, { Path, Line, Polyline, Circle, Rect } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';

import { useApp } from '../context/AppContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { ChatMessage } from '../types';
import { PANDA_AVATAR_SVG, BLACK_PANTHER_AVATAR_SVG } from '../data/avatars';
import { EMOJI_CATEGORIES } from '../data/emojis';
import { BOOKS_DATA } from '../data/booksData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SHARED_STORAGE_KEY = 'paatshala_shared_chat_messages';

const INITIAL_SEED_MESSAGES: ChatMessage[] = [
  {
    id: 'seed-1',
    sender: 'D',
    text: 'Hey A! Have you started reading the new chapters in Paatshala?',
    image: null,
    time: '10:15 AM',
    status: 'read',
    deletedFor: [],
    isEdited: false,
    timestamp: Date.now() - 3600000 * 3,
  },
  {
    id: 'seed-2',
    sender: 'A',
    text: "Hey D! Yes, I just finished reading Man's Search for Meaning. The reflections on finding purpose through responsibility are incredible! 📖✨",
    image: null,
    time: '10:18 AM',
    status: 'read',
    deletedFor: [],
    isEdited: false,
    timestamp: Date.now() - 3600000 * 2,
  },
  {
    id: 'seed-3',
    sender: 'D',
    text: "Awesome! I'm currently exploring Starting Strength to understand progressive overload and physical discipline. Let's discuss our takeaways later! 💪🏋️",
    image: null,
    time: '10:22 AM',
    status: 'read',
    deletedFor: [],
    isEdited: false,
    timestamp: Date.now() - 3600000 * 1,
  },
];

export const ChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {
    theme,
    navigateTo,
    showToast,
    chatRole,
    setChatRole,
    sourceChatContext,
    openBook,
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [pendingImage, setPendingImage] = useState<string | null>(null);

  // Modals & Panels State
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeEmojiCategory, setActiveEmojiCategory] = useState('smileys');
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editText, setEditText] = useState('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const scrollViewRef = useRef<any>(null);

  const otherUser = chatRole === 'A' ? 'D' : 'A';
  const otherAvatarXml = otherUser === 'A' ? PANDA_AVATAR_SVG : BLACK_PANTHER_AVATAR_SVG;

  // Load Messages from AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(SHARED_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
            return;
          }
        }
        // Initialize with default seed messages if storage is empty
        setMessages(INITIAL_SEED_MESSAGES);
        await AsyncStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(INITIAL_SEED_MESSAGES));
      } catch (e) {
        console.error('Error loading chat messages:', e);
      }
    })();
  }, []);

  const saveMessages = async (updated: ChatMessage[]) => {
    setMessages(updated);
    try {
      await AsyncStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving chat messages:', e);
    }
  };

  // Scroll to bottom on message update
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);
    return () => clearTimeout(timer);
  }, [messages.length]);

  // Back Navigation Handler
  const handleBack = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}

    if (sourceChatContext && sourceChatContext.bookId) {
      const book = BOOKS_DATA.find((b) => b.id === sourceChatContext.bookId);
      if (book) {
        openBook(book, sourceChatContext.chapterIndex || 0);
        return;
      }
    }
    navigateTo('library');
  };

  // Format Time String
  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Send Message
  const handleSendMessage = async () => {
    const trimmed = inputText.trim();
    if (!trimmed && !pendingImage) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: chatRole,
      text: trimmed,
      image: pendingImage,
      time: formatTime(new Date()),
      status: 'read',
      deletedFor: [],
      isEdited: false,
      timestamp: Date.now(),
    };

    const next = [...messages, newMsg];
    setInputText('');
    setPendingImage(null);
    setShowEmojiPicker(false);
    await saveMessages(next);
  };

  // Pick Image
  const handlePickImage = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
        base64: true,
      });

      if (!res.canceled && res.assets && res.assets[0]) {
        const asset = res.assets[0];
        const uri = asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : asset.uri;
        setPendingImage(uri);
        showToast('Image attached');
      }
    } catch (e) {
      console.error('Image picker error:', e);
      showToast('Could not load image');
    }
  };

  // Message Actions
  const handleLongPress = (msg: ChatMessage) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (e) {}
    setSelectedMessage(msg);
    setShowActionSheet(true);
  };

  const handleCopyMessage = () => {
    if (!selectedMessage) return;
    setShowActionSheet(false);
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {}
    // Fill text into input for ease of re-use / copying
    if (selectedMessage.text) {
      setInputText(selectedMessage.text);
      showToast('Message copied to input field');
    } else {
      showToast('No text to copy');
    }
  };

  const handleStartEdit = () => {
    if (!selectedMessage || selectedMessage.sender !== chatRole) return;
    setShowActionSheet(false);
    setEditText(selectedMessage.text || '');
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedMessage) return;
    const trimmed = editText.trim();
    if (!trimmed) return;

    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {}

    const updated = messages.map((m) =>
      m.id === selectedMessage.id ? { ...m, text: trimmed, isEdited: true } : m
    );
    setShowEditModal(false);
    setSelectedMessage(null);
    await saveMessages(updated);
    showToast('Message updated');
  };

  // Delete for Me (Independent)
  const handleDeleteForMe = async () => {
    if (!selectedMessage) return;
    setShowActionSheet(false);

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}

    const updated = messages.map((m) => {
      if (m.id === selectedMessage.id) {
        const deletedFor = m.deletedFor || [];
        if (!deletedFor.includes(chatRole)) {
          return { ...m, deletedFor: [...deletedFor, chatRole] };
        }
      }
      return m;
    });

    await saveMessages(updated);
    showToast('Deleted for you');
  };

  // Delete for Everyone
  const handleDeleteForEveryone = async () => {
    if (!selectedMessage) return;
    setShowActionSheet(false);

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (e) {}

    const updated = messages.filter((m) => m.id !== selectedMessage.id);
    await saveMessages(updated);
    showToast('Deleted for everyone');
  };

  // Clear Chat Independently
  const handleClearChat = () => {
    setShowOptionsMenu(false);
    Alert.alert(
      'Clear Chat',
      `Are you sure you want to clear chat messages for Participant ${chatRole}? This will not affect the other participant's view.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            } catch (e) {}

            const updated = messages.map((m) => {
              const deletedFor = m.deletedFor || [];
              if (!deletedFor.includes(chatRole)) {
                return { ...m, deletedFor: [...deletedFor, chatRole] };
              }
              return m;
            });

            await saveMessages(updated);
            showToast(`Chat cleared for Participant ${chatRole}`);
          },
        },
      ]
    );
  };

  // Switch Role (Demo toggle between A and D)
  const handleSwitchRole = () => {
    setShowOptionsMenu(false);
    const nextRole = chatRole === 'A' ? 'D' : 'A';
    setChatRole(nextRole);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
    showToast(`Switched view to Participant ${nextRole}`);
  };

  // Filter messages visible to current participant
  const visibleMessages = messages.filter(
    (m) => !(m.deletedFor && m.deletedFor.includes(chatRole))
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      {/* Sticky Chat Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 6,
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          {/* Back Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            style={styles.backBtn}
            accessibilityLabel="Back to Book or Library"
          >
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={theme.textPrimary} strokeWidth={2.4}>
              <Line x1="19" y1="12" x2="5" y2="12" />
              <Polyline points="12 19 5 12 12 5" />
            </Svg>
          </TouchableOpacity>

          {/* Active Contact Profile */}
          <View style={styles.profileRow}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatarInner}>
                <SvgXml xml={otherAvatarXml} width={40} height={40} />
              </View>
              <View style={styles.onlineDot} />
            </View>

            <View style={styles.profileMeta}>
              <View style={styles.nameRow}>
                <Text style={[styles.contactName, { color: theme.textPrimary }]}>
                  {otherUser}
                </Text>
                <View style={[styles.roleBadge, { backgroundColor: theme.chipBg, borderColor: theme.border }]}>
                  <Text style={[styles.roleBadgeText, { color: theme.primary }]}>
                    Participant {otherUser}
                  </Text>
                </View>
              </View>
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>
        </View>

        {/* Header Right Controls */}
        <View style={styles.headerRight}>
          <ThemeToggle />

          {/* 3-dots Menu Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowOptionsMenu(true)}
            style={styles.menuBtn}
            accessibilityLabel="More options"
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill={theme.textPrimary}>
              <Circle cx="12" cy="5" r="2" />
              <Circle cx="12" cy="12" r="2" />
              <Circle cx="12" cy="19" r="2" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages Thread & Input Area wrapped in KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        style={{ flex: 1 }}
      >
        {/* Messages Thread */}
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.messagesContainer,
            { paddingBottom: 16 },
          ]}
          showsVerticalScrollIndicator={false}
        >
        {/* Date Pill */}
        <View style={styles.datePillRow}>
          <View style={[styles.datePill, { backgroundColor: theme.chipBg, borderColor: theme.border }]}>
            <Text style={[styles.datePillText, { color: theme.textSecondary }]}>Today</Text>
          </View>
        </View>

        {/* Empty State */}
        {visibleMessages.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconCircle, { backgroundColor: theme.chipBg }]}>
              <Svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth={1.8}>
                <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </Svg>
            </View>
            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>No messages yet</Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
              Say hello to Participant {otherUser} to start the conversation!
            </Text>
          </View>
        )}

        {/* Message Bubbles */}
        {visibleMessages.map((msg) => {
          const isOutgoing = msg.sender === chatRole;
          const senderAvatarXml = msg.sender === 'A' ? PANDA_AVATAR_SVG : BLACK_PANTHER_AVATAR_SVG;

          return (
            <TouchableOpacity
              key={msg.id}
              activeOpacity={0.88}
              onLongPress={() => handleLongPress(msg)}
              delayLongPress={300}
              style={[
                styles.bubbleRow,
                isOutgoing ? styles.bubbleRowOutgoing : styles.bubbleRowIncoming,
              ]}
            >
              {/* Incoming Avatar */}
              {!isOutgoing && (
                <View style={styles.incomingAvatarWrap}>
                  <SvgXml xml={senderAvatarXml} width={32} height={32} />
                </View>
              )}

              {/* Message Bubble Body */}
              <View
                style={[
                  styles.bubbleBody,
                  isOutgoing
                    ? [styles.bubbleOutgoing, { backgroundColor: theme.primary, shadowColor: theme.primary }]
                    : [styles.bubbleIncoming, { backgroundColor: theme.card, borderColor: theme.border }],
                ]}
              >
                {/* Sender Tag for Incoming */}
                {!isOutgoing && (
                  <Text style={[styles.incomingSenderName, { color: theme.primary }]}>
                    {msg.sender}
                  </Text>
                )}

                {/* Attached Image */}
                {!!msg.image && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setLightboxImage(msg.image)}
                    style={styles.bubbleImageWrap}
                  >
                    <Image source={{ uri: msg.image }} style={styles.bubbleImage} resizeMode="cover" />
                  </TouchableOpacity>
                )}

                {/* Message Text */}
                {!!msg.text && (
                  <Text
                    style={[
                      styles.bubbleText,
                      { color: isOutgoing ? '#FFFFFF' : theme.textPrimary },
                    ]}
                  >
                    {msg.text}
                  </Text>
                )}

                {/* Bubble Meta (Time, Edited, Ticks) */}
                <View style={styles.metaRow}>
                  <Text
                    style={[
                      styles.metaTime,
                      { color: isOutgoing ? 'rgba(255, 255, 255, 0.75)' : theme.textSecondary },
                    ]}
                  >
                    {msg.time}
                    {msg.isEdited ? ' • Edited' : ''}
                  </Text>

                  {/* WhatsApp / Tick Status for Outgoing */}
                  {isOutgoing && (
                    <View style={styles.tickWrap}>
                      {msg.status === 'sent' && (
                        <Svg width={14} height={10} viewBox="0 0 16 11" fill="none">
                          <Path d="M2.5 5.5L6 9L13.5 1.5" stroke="rgba(255,255,255,0.7)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                      )}
                      {msg.status === 'delivered' && (
                        <Svg width={16} height={10} viewBox="0 0 19 11" fill="none">
                          <Path d="M1.5 5.5L5 9L12.5 1.5" stroke="rgba(255,255,255,0.7)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          <Path d="M6 5.5L9.5 9L17 1.5" stroke="rgba(255,255,255,0.7)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                      )}
                      {msg.status === 'read' && (
                        <Svg width={16} height={10} viewBox="0 0 19 11" fill="none">
                          <Path d="M1.5 5.5L5 9L12.5 1.5" stroke="#60A5FA" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          <Path d="M6 5.5L9.5 9L17 1.5" stroke="#60A5FA" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Floating Bottom Input Bar */}
      <View
        style={[
          styles.bottomBarContainer,
          {
            paddingBottom: Math.max(insets.bottom, 10),
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
        ]}
      >
        {/* Pending Image Attachment Strip */}
        {!!pendingImage && (
          <View style={[styles.attachmentPreviewStrip, { backgroundColor: theme.chipBg, borderColor: theme.border }]}>
            <Image source={{ uri: pendingImage }} style={styles.attachmentThumb} />
            <Text style={[styles.attachmentLabel, { color: theme.textSecondary }]} numberOfLines={1}>
              Image ready to send
            </Text>
            <TouchableOpacity
              onPress={() => setPendingImage(null)}
              style={styles.removeAttachmentBtn}
              accessibilityLabel="Remove image attachment"
            >
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2.5}>
                <Line x1="18" y1="6" x2="6" y2="18" />
                <Line x1="6" y1="6" x2="18" y2="18" />
              </Svg>
            </TouchableOpacity>
          </View>
        )}

        {/* Input Bar Row */}
        <View style={styles.inputRow}>
          {/* Emoji Toggle Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowEmojiPicker(!showEmojiPicker)}
            style={styles.iconActionBtn}
            accessibilityLabel="Open emoji picker"
          >
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={showEmojiPicker ? theme.primary : theme.textSecondary} strokeWidth={2}>
              <Circle cx="12" cy="12" r="10" />
              <Path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <Line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={3} />
              <Line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={3} />
            </Svg>
          </TouchableOpacity>

          {/* Attach Image Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePickImage}
            style={styles.iconActionBtn}
            accessibilityLabel="Attach image"
          >
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth={2}>
              <Path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </Svg>
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.inputBg,
                color: theme.textPrimary,
                borderColor: theme.border,
              },
            ]}
            placeholder={`Message ${otherUser}...`}
            placeholderTextColor={theme.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
          />

          {/* Send Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSendMessage}
            disabled={!inputText.trim() && !pendingImage}
            style={[
              styles.sendBtn,
              {
                backgroundColor: inputText.trim() || pendingImage ? theme.primary : theme.chipBg,
              },
            ]}
            accessibilityLabel="Send message"
          >
            <Svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke={inputText.trim() || pendingImage ? '#FFFFFF' : theme.textSecondary}
              strokeWidth={2.4}
            >
              <Line x1="22" y1="2" x2="11" y2="13" />
              <Polyline points="22 2 15 22 11 13 2 9 22 2" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Integrated Emoji Picker Sheet */}
        {showEmojiPicker && (
          <View style={[styles.emojiPickerContainer, { borderTopColor: theme.border, backgroundColor: theme.card }]}>
            {/* Category Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.emojiTabsScroll}>
              {EMOJI_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeEmojiCategory;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setActiveEmojiCategory(cat.id)}
                    style={[
                      styles.emojiTab,
                      isActive && { backgroundColor: theme.chipBg, borderColor: theme.primary },
                    ]}
                  >
                    <Text style={styles.emojiTabIcon}>{cat.icon}</Text>
                    <Text
                      style={[
                        styles.emojiTabName,
                        { color: isActive ? theme.primary : theme.textSecondary, fontWeight: isActive ? '700' : '500' },
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Emoji Grid */}
            <ScrollView style={styles.emojiGridScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.emojiGrid}>
                {EMOJI_CATEGORIES.find((c) => c.id === activeEmojiCategory)?.emojis.map((emoji, idx) => (
                  <TouchableOpacity
                    key={`${emoji}-${idx}`}
                    onPress={() => {
                      setInputText((prev) => prev + emoji);
                      try {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      } catch (e) {}
                    }}
                    style={styles.emojiBtn}
                  >
                    <Text style={styles.emojiChar}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
      </KeyboardAvoidingView>

      {/* Options Menu Modal */}
      <Modal
        visible={showOptionsMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOptionsMenu(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowOptionsMenu(false)}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={[styles.menuCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={[styles.menuTitle, { color: theme.textPrimary }]}>Chat Options</Text>

                {/* Switch Role Option */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleSwitchRole}
                  style={[styles.menuItem, { borderBottomColor: theme.border }]}
                >
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth={2}>
                    <Polyline points="16 3 21 3 21 8" />
                    <Line x1="4" y1="20" x2="21" y2="3" />
                    <Polyline points="21 16 21 21 16 21" />
                    <Line x1="15" y1="15" x2="21" y2="21" />
                    <Line x1="4" y1="4" x2="9" y2="9" />
                  </Svg>
                  <View style={styles.menuItemTextWrap}>
                    <Text style={[styles.menuItemText, { color: theme.textPrimary }]}>
                      Switch to Participant {otherUser}
                    </Text>
                    <Text style={[styles.menuItemSubtext, { color: theme.textSecondary }]}>
                      Test two-way conversation from {otherUser}&apos;s viewpoint
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Clear Chat Option (Independent) */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleClearChat}
                  style={styles.menuItem}
                >
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                    <Polyline points="3 6 5 6 21 6" />
                    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </Svg>
                  <View style={styles.menuItemTextWrap}>
                    <Text style={[styles.menuItemText, { color: '#EF4444' }]}>
                      Clear Chat
                    </Text>
                    <Text style={[styles.menuItemSubtext, { color: theme.textSecondary }]}>
                      Clears messages for Participant {chatRole} only
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Cancel */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowOptionsMenu(false)}
                  style={[styles.menuCancelBtn, { backgroundColor: theme.chipBg }]}
                >
                  <Text style={[styles.menuCancelText, { color: theme.textPrimary }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Message Long-Press Action Sheet */}
      <Modal
        visible={showActionSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowActionSheet(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowActionSheet(false)}>
          <View style={styles.actionSheetBackdrop}>
            <TouchableWithoutFeedback>
              <View style={[styles.actionSheetCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <View style={styles.sheetHandle} />

                {/* Preview Selected Message */}
                <View style={[styles.sheetPreviewBox, { backgroundColor: theme.chipBg }]}>
                  <Text style={[styles.sheetPreviewText, { color: theme.textSecondary }]} numberOfLines={2}>
                    {selectedMessage?.text || (selectedMessage?.image ? '📷 Photo Attachment' : 'Message')}
                  </Text>
                </View>

                {/* Copy Message */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleCopyMessage}
                  style={styles.actionSheetRow}
                >
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.textPrimary} strokeWidth={2}>
                    <Rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </Svg>
                  <Text style={[styles.actionSheetText, { color: theme.textPrimary }]}>Copy Message</Text>
                </TouchableOpacity>

                {/* Edit Message (Only for sender) */}
                {selectedMessage?.sender === chatRole && !!selectedMessage?.text && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleStartEdit}
                    style={styles.actionSheetRow}
                  >
                    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth={2}>
                      <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </Svg>
                    <Text style={[styles.actionSheetText, { color: theme.primary }]}>Edit Message</Text>
                  </TouchableOpacity>
                )}

                {/* Delete for Me */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleDeleteForMe}
                  style={styles.actionSheetRow}
                >
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2}>
                    <Polyline points="3 6 5 6 21 6" />
                    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </Svg>
                  <Text style={[styles.actionSheetText, { color: '#F59E0B' }]}>Delete for Me</Text>
                </TouchableOpacity>

                {/* Delete for Everyone */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleDeleteForEveryone}
                  style={styles.actionSheetRow}
                >
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                    <Polyline points="3 6 5 6 21 6" />
                    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <Line x1="10" y1="11" x2="10" y2="17" />
                    <Line x1="14" y1="11" x2="14" y2="17" />
                  </Svg>
                  <Text style={[styles.actionSheetText, { color: '#EF4444' }]}>Delete for Everyone</Text>
                </TouchableOpacity>

                {/* Cancel */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowActionSheet(false)}
                  style={[styles.actionSheetCancelBtn, { backgroundColor: theme.chipBg }]}
                >
                  <Text style={[styles.actionSheetCancelText, { color: theme.textPrimary }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Edit Message Modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEditModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowEditModal(false)}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={[styles.editModalCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={[styles.editModalTitle, { color: theme.textPrimary }]}>Edit Message</Text>
                <TextInput
                  style={[
                    styles.editInput,
                    { backgroundColor: theme.inputBg, color: theme.textPrimary, borderColor: theme.border },
                  ]}
                  value={editText}
                  onChangeText={setEditText}
                  multiline
                  autoFocus
                />
                <View style={styles.editBtnRow}>
                  <TouchableOpacity
                    onPress={() => setShowEditModal(false)}
                    style={[styles.editBtn, { backgroundColor: theme.chipBg }]}
                  >
                    <Text style={{ color: theme.textPrimary, fontWeight: '600' }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSaveEdit}
                    style={[styles.editBtn, { backgroundColor: theme.primary }]}
                  >
                    <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Lightbox Modal */}
      <Modal
        visible={!!lightboxImage}
        transparent
        animationType="fade"
        onRequestClose={() => setLightboxImage(null)}
      >
        <View style={styles.lightboxBackdrop}>
          <TouchableOpacity
            style={styles.lightboxCloseBtn}
            onPress={() => setLightboxImage(null)}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5}>
              <Line x1="18" y1="6" x2="6" y2="18" />
              <Line x1="6" y1="6" x2="18" y2="18" />
            </Svg>
          </TouchableOpacity>
          {!!lightboxImage && (
            <Image
              source={{ uri: lightboxImage }}
              style={styles.lightboxImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backBtn: {
    padding: 6,
    marginRight: 6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrap: {
    position: 'relative',
    marginRight: 10,
  },
  avatarInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileMeta: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  roleBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    borderWidth: 1,
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  onlineText: {
    fontSize: 11.5,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  menuBtn: {
    padding: 8,
  },
  messagesContainer: {
    padding: 16,
    flexGrow: 1,
  },
  datePillRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
  datePill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  datePillText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 30,
  },
  emptyIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  bubbleRowOutgoing: {
    justifyContent: 'flex-end',
  },
  bubbleRowIncoming: {
    justifyContent: 'flex-start',
  },
  incomingAvatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 8,
    marginBottom: 2,
  },
  bubbleBody: {
    maxWidth: '78%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  bubbleOutgoing: {
    borderBottomRightRadius: 4,
  },
  bubbleIncoming: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  incomingSenderName: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
  },
  bubbleImageWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 6,
  },
  bubbleImage: {
    width: 220,
    height: 160,
  },
  bubbleText: {
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 4,
  },
  metaTime: {
    fontSize: 10,
    fontWeight: '500',
  },
  tickWrap: {
    marginLeft: 2,
  },
  bottomBarContainer: {
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  attachmentPreviewStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
  },
  attachmentThumb: {
    width: 36,
    height: 36,
    borderRadius: 6,
    marginRight: 8,
  },
  attachmentLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  removeAttachmentBtn: {
    padding: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconActionBtn: {
    padding: 6,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiPickerContainer: {
    height: 220,
    borderTopWidth: 1,
    marginTop: 8,
  },
  emojiTabsScroll: {
    paddingVertical: 8,
    gap: 6,
  },
  emojiTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 4,
  },
  emojiTabIcon: {
    fontSize: 14,
  },
  emojiTabName: {
    fontSize: 11.5,
  },
  emojiGridScroll: {
    flex: 1,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  emojiBtn: {
    width: '12.5%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiChar: {
    fontSize: 22,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  menuCard: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
  },
  menuItemTextWrap: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '700',
  },
  menuItemSubtext: {
    fontSize: 11.5,
    marginTop: 2,
  },
  menuCancelBtn: {
    marginTop: 14,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuCancelText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  actionSheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  actionSheetCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    padding: 20,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetPreviewBox: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 14,
  },
  sheetPreviewText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  actionSheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  actionSheetText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionSheetCancelBtn: {
    marginTop: 10,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSheetCancelText: {
    fontSize: 14,
    fontWeight: '700',
  },
  editModalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  editModalTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  editInput: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  editBtnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  editBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  lightboxBackdrop: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightboxCloseBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    zIndex: 10,
  },
  lightboxImage: {
    width: '94%',
    height: '80%',
  },
});
