/**
 * Paatshala - Dedicated Active Chat Room Controller
 * Supports two-way real-time communication between Participant A and Participant D
 * with server database persistence, real-time sync, WhatsApp ticks, and message actions.
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Identify Current Participant & Contact
  const urlParams = new URLSearchParams(window.location.search);
  const currentUser = (urlParams.get('user') || sessionStorage.getItem('paatshala_chat_user') || 'A').toUpperCase();
  const otherUser = currentUser === 'A' ? 'D' : 'A';

  // Ensure current user session is stored
  sessionStorage.setItem('paatshala_chat_user', currentUser);

  // Storage Keys & Constants
  const SHARED_STORAGE_KEY = 'paatshala_shared_chat_messages';
  const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('paatshala_chat_sync') : null;
  const presenceChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('paatshala_presence_sync') : null;

  // Real-time Independent Presence Controller (A and D)
  function sendPresence(status) {
    try {
      localStorage.setItem('paatshala_presence_' + currentUser, status);
      if (presenceChannel) {
        presenceChannel.postMessage({ user: currentUser, status });
      }
      const payload = JSON.stringify({ user: currentUser, status });
      if (status === 'offline' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/presence', new Blob([payload], { type: 'application/json' }));
      } else {
        fetch('/api/presence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: status === 'offline'
        }).catch(() => {});
      }
    } catch (e) {}
  }

  function updateHeaderPresence(isOtherOnline) {
    if (activeOnlineDot) {
      activeOnlineDot.className = `active-online-dot ${isOtherOnline ? '' : 'offline'}`;
    }
    if (activeStatusText) {
      activeStatusText.textContent = isOtherOnline ? 'Online' : 'Offline';
      activeStatusText.className = `active-contact-status ${isOtherOnline ? '' : 'offline'}`;
      activeStatusText.style.display = 'block';
    }
  }

  async function checkOtherUserPresence() {
    try {
      const res = await fetch('/api/presence?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const presence = await res.json();
        updateHeaderPresence(!!presence[otherUser]);
      }
    } catch (e) {}
  }

  // State
  let sharedMessages = [];
  let pendingImageData = null;
  let currentEmojiCategory = 'smileys';
  let activeActionMsgId = null;

  // DOM Elements
  const activeContactAvatar = document.getElementById('activeContactAvatar');
  const activeContactName = document.getElementById('activeContactName');
  const activeContactRole = document.getElementById('activeContactRole');
  const activeStatusText = document.getElementById('activeStatusText');
  const activeOnlineDot = document.getElementById('activeOnlineDot');
  const chatThreadContainer = document.getElementById('chatThreadContainer');
  const messagesStream = document.getElementById('messagesStream');
  const chatMessageForm = document.getElementById('chatMessageForm');
  const messageTextInput = document.getElementById('messageTextInput');
  const sendMessageBtn = document.getElementById('sendMessageBtn');
  const typingStatusBar = document.getElementById('typingStatusBar');
  const typingStatusLabel = document.getElementById('typingStatusLabel');
  const contactsToggleBtn = document.getElementById('contactsToggleBtn');
  const contactsDrawerBackdrop = document.getElementById('contactsDrawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerContactsList = document.getElementById('drawerContactsList');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const chatMenuBtn = document.getElementById('chatMenuBtn');
  const chatOptionsDropdown = document.getElementById('chatOptionsDropdown');
  const clearChatBtn = document.getElementById('clearChatBtn');
  const switchBuddyOptionBtn = document.getElementById('switchBuddyOptionBtn');
  const drawerClearChatBtn = document.getElementById('drawerClearChatBtn');
  const emptyChatState = document.getElementById('emptyChatState');
  const chatDatePill = document.getElementById('chatDatePill');
  const activeContactBtn = document.getElementById('activeContactBtn');

  // Emoji Picker & Attachment Elements
  const emojiPickerBtn = document.getElementById('emojiPickerBtn');
  const emojiPickerPopover = document.getElementById('emojiPickerPopover');
  const emojiSearchInput = document.getElementById('emojiSearchInput');
  const emojiCategoryTabs = document.getElementById('emojiCategoryTabs');
  const emojiGridContainer = document.getElementById('emojiGridContainer');

  const attachImageBtn = document.getElementById('attachImageBtn');
  const imageFileInput = document.getElementById('imageFileInput');
  const inputAttachmentPreview = document.getElementById('inputAttachmentPreview');
  const attachmentThumbImg = document.getElementById('attachmentThumbImg');
  const attachmentRemoveBtn = document.getElementById('attachmentRemoveBtn');
  const attachmentFileName = document.getElementById('attachmentFileName');

  const imageModalBackdrop = document.getElementById('imageModalBackdrop');
  const imageModalClose = document.getElementById('imageModalClose');
  const imageModalTarget = document.getElementById('imageModalTarget');

  // Message Action Sheet & Edit Modal Elements
  const msgActionBackdrop = document.getElementById('msgActionBackdrop');
  const msgActionSheet = document.getElementById('msgActionSheet');
  const msgActionPreviewText = document.getElementById('msgActionPreviewText');
  const msgActionEditBtn = document.getElementById('msgActionEditBtn');
  const msgActionDeleteForMeBtn = document.getElementById('msgActionDeleteForMeBtn');
  const msgActionDeleteForEveryoneBtn = document.getElementById('msgActionDeleteForEveryoneBtn');
  const msgActionCancelBtn = document.getElementById('msgActionCancelBtn');

  const editMsgModalBackdrop = document.getElementById('editMsgModalBackdrop');
  const editMsgModalClose = document.getElementById('editMsgModalClose');
  const editMsgForm = document.getElementById('editMsgForm');
  const editMsgInput = document.getElementById('editMsgInput');
  const editMsgCancelBtn = document.getElementById('editMsgCancelBtn');

  // Emojis Dataset by Category
  const EMOJI_CATEGORIES = {
    smileys: [
      '😀','😃','😄','😁','😆','😅','😂','🤣','🥹','😊','😇','🙂','🙃','😉','😌','😍',
      '🥰','😘','😗','😙','😚','😋','😛','😜','🤪','😝','🤑','🤗','🫣','🤫','🤔','🫡',
      '🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😔','😪','🤤','😴','😷','🤒',
      '🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐','😕',
      '😟','🙁','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖'
    ],
    gestures: [
      '👍','👎','👏','🙌','👐','🤝','🤛','🤜','🤞','✌️','🤟','🤘','👌','🤌','🤏','👈',
      '👉','👆','👇','☝️','✋','🤚','🖐️','🖖','👋','🤙','💪','🦾','🤳','🙏','✍️','🧑‍🎓',
      '👨‍🎓','👩‍🎓','🧑‍🏫','👨‍🏫','👩‍🏫','🧑‍💻','👨‍💻','👩‍💻','🙋','🙋‍♂️','🙋‍♀️'
    ],
    study: [
      '📚','📖','📕','📗','📘','📙','📓','📔','📒','📝','✏️','🖊️','🖋️','🖌️','🖍️','📐',
      '📏','🖇️','📎','📌','📍','✂️','🗂️','📂','📁','📋','📊','📈','📉','🎒','🎓','🏫',
      '🏛️','🔬','🔭','🧪','🧮','💻','🖥️','📱','💡','🎯','🏆','🥇','🥈','🥉','🎖️','🏅'
    ],
    nature: [
      '🦅','🕊️','🐅','🦁','🐘','🦚','🦜','🐎','🦌','🌸','🌺','🪷','🌻','🌹','🌷','🌱',
      '🌿','🍀','🌴','🌳','🌲','☀️','🌙','⭐','🌟','✨','⚡','🔥','🌈','🌊','🌍','🌎',
      '🌏','🚀','🛰️','🇮🇳'
    ],
    symbols: [
      '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💖','💗','💓','💞','💕','💌','💘',
      '💝','💟','💯','💢','💬','💭','🗯️','💤','💥','🎉','🎊','✨','🔔','🔕','✅','❌',
      '❓','❗','⚠️'
    ]
  };

  // 2. Participant Avatars & Names Configuration
  function getParticipantAvatar(letter) {
    return letter === 'A' ? 'panda-avatar.svg' : 'caretaker-avatar.svg';
  }

  function getParticipantName(letter) {
    return letter === 'A' ? 'A' : 'D';
  }

  // 3. Theme Management
  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('paatshala-theme', theme);
  }
  const savedTheme = localStorage.getItem('paatshala-theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'light';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // 4. Back Button Navigation - cleanly returns to the source book reading page
  const chatBackBtn = document.getElementById('chatBackBtn') || document.querySelector('.chat-back-btn');
  if (chatBackBtn) {
    chatBackBtn.addEventListener('click', (e) => {
      e.preventDefault();

      let targetBookId = null;
      let targetChapter = 0;
      let targetScroll = 0;

      try {
        const storedSource = sessionStorage.getItem('paatshala_chat_source_book');
        if (storedSource) {
          const parsed = JSON.parse(storedSource);
          if (parsed && parsed.bookId) {
            targetBookId = parsed.bookId;
            targetChapter = typeof parsed.chapterIndex === 'number' ? parsed.chapterIndex : 0;
            targetScroll = typeof parsed.scrollY === 'number' ? parsed.scrollY : 0;
          }
        }
      } catch (err) {}

      // Fallback to URL search parameters if still present
      if (!targetBookId) {
        const currentUrlParams = new URLSearchParams(window.location.search);
        targetBookId = currentUrlParams.get('fromBook');
        if (currentUrlParams.get('ch')) targetChapter = parseInt(currentUrlParams.get('ch'), 10) || 0;
        if (currentUrlParams.get('scroll')) targetScroll = parseInt(currentUrlParams.get('scroll'), 10) || 0;
      }

      // Store return intent in sessionStorage so home.js restores exact chapter and scroll position
      if (targetBookId) {
        sessionStorage.setItem('paatshala_return_to_reading', JSON.stringify({
          bookId: targetBookId,
          chapterIndex: targetChapter,
          scrollY: targetScroll
        }));
      }

      // Notify presence offline immediately when exiting chat
      sendPresence('offline');

      // Clear chat authentication ticket & source book record
      sessionStorage.removeItem('paatshala_chat_authorized_ticket');
      sessionStorage.removeItem('paatshala_chat_authenticated');
      sessionStorage.removeItem('paatshala_chat_source_book');

      // Navigate back: if entered from a book, return directly to that book's reading page
      if (targetBookId) {
        window.location.replace(`home.html#book=${encodeURIComponent(targetBookId)}&ch=${targetChapter}&scroll=${targetScroll}`);
      } else {
        window.location.replace('home.html');
      }
    });
  }

  // Clear auth ticket and mark offline on pagehide/unload
  window.addEventListener('pagehide', () => {
    sendPresence('offline');
    sessionStorage.removeItem('paatshala_chat_authorized_ticket');
    sessionStorage.removeItem('paatshala_chat_authenticated');
  });

  window.addEventListener('beforeunload', () => {
    sendPresence('offline');
  });

  // 5. Time and Tick Formatting Helpers
  function getCurrentTimeString() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function getTickSvgHtml(status) {
    if (status === 'sent') {
      // Single Grey Tick (✓): Sent to server
      return `
        <svg class="status-tick single-tick grey" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sent" title="Sent (Single Grey Tick)">
          <path d="M2.5 5.5L6 9L13.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
    if (status === 'delivered') {
      // Double Grey Tick (✓✓): Delivered
      return `
        <svg class="status-tick double-tick grey" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Delivered" title="Delivered (Double Grey Tick)">
          <path d="M1.5 5.5L5 9L12.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 5.5L9.5 9L17 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
    // Double Blue Tick (✓✓): Read & Seen
    return `
      <svg class="status-tick double-tick blue" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Read" title="Read (Double Blue Tick)">
        <path d="M1.5 5.5L5 9L12.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 5.5L9.5 9L17 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  function scrollChatToBottom() {
    if (chatThreadContainer) {
      chatThreadContainer.scrollTop = chatThreadContainer.scrollHeight;
    }
  }

  function escapeHTML(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str || ''));
    return p.innerHTML;
  }

  // 6. Server Database & Storage Sync Functions
  async function fetchServerMessages() {
    try {
      const res = await fetch('/api/messages?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.messages)) {
          return data.messages;
        }
      }
    } catch (e) {
      // Network or offline fallback
    }
    try {
      const local = localStorage.getItem(SHARED_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  }

  async function postServerAction(actionPayload) {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actionPayload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.messages)) {
          return data.messages;
        }
      }
    } catch (e) {
      console.warn('Server sync post error, using local state:', e);
    }
    return null;
  }

  function saveLocalSharedMessages() {
    try {
      localStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(sharedMessages));
      localStorage.setItem('paatshala_chat_version', Date.now().toString());
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  // 7. Render Header & Profile
  function setupChatHeader() {
    const avatarSrc = getParticipantAvatar(otherUser);
    const nameDisplay = getParticipantName(otherUser);

    if (activeContactAvatar) {
      activeContactAvatar.src = avatarSrc;
      activeContactAvatar.alt = nameDisplay;
    }
    if (activeContactName) {
      activeContactName.textContent = nameDisplay;
    }
    checkOtherUserPresence();
    if (messageTextInput) {
      messageTextInput.placeholder = `Message ${nameDisplay}...`;
    }
  }

  // 8. Render Messages Stream
  function renderChatStream() {
    if (!messagesStream) return;
    messagesStream.innerHTML = '';

    // Filter out messages deleted for current user
    const visibleMessages = sharedMessages.filter(m => {
      if (m.deletedFor && Array.isArray(m.deletedFor) && m.deletedFor.includes(currentUser)) {
        return false;
      }
      return true;
    });

    if (visibleMessages.length === 0) {
      if (emptyChatState) emptyChatState.style.display = 'flex';
      if (chatDatePill) chatDatePill.style.display = 'none';
    } else {
      if (emptyChatState) emptyChatState.style.display = 'none';
      if (chatDatePill) chatDatePill.style.display = 'flex';

      visibleMessages.forEach(msg => {
        const isOutgoing = msg.sender === currentUser;
        appendBubbleToUI(
          msg.text,
          isOutgoing,
          msg.time,
          msg.image,
          msg.id,
          msg.isEdited,
          msg.status,
          msg.sender
        );
      });
    }

    scrollChatToBottom();
  }

  // 9. Append Bubble DOM Element
  function appendBubbleToUI(text, isOutgoing, timeStr, imageSrc, msgId, isEdited, status, senderRole) {
    const time = timeStr || getCurrentTimeString();
    const row = document.createElement('div');
    row.className = `chat-bubble-row ${isOutgoing ? 'outgoing' : 'incoming'}`;
    if (msgId) row.setAttribute('data-msg-id', msgId);

    let imageHtml = '';
    if (imageSrc) {
      imageHtml = `
        <div class="bubble-image-container" title="Click to view full image">
          <img src="${imageSrc}" alt="Shared image" class="bubble-image" loading="lazy">
        </div>
      `;
    }

    let textHtml = '';
    if (text) {
      textHtml = `<p class="${imageSrc ? 'bubble-caption' : ''}">${escapeHTML(text)}</p>`;
    }

    const editedHtml = isEdited ? `<span class="edited-badge">• Edited</span>` : '';

    if (isOutgoing) {
      const tickHtml = getTickSvgHtml(status || 'sent');
      row.innerHTML = `
        <div class="chat-bubble ${imageSrc ? 'has-image' : ''}">
          ${imageHtml}
          ${textHtml}
          <div class="bubble-meta">
            <time>${time} ${editedHtml}</time>
            <span class="bubble-tick-wrap">${tickHtml}</span>
          </div>
        </div>
      `;
    } else {
      const senderLetter = (senderRole === 'A' || senderRole === 'D') ? senderRole : otherUser;
      const avatarSrc = getParticipantAvatar(senderLetter);
      const nameDisplay = getParticipantName(senderLetter);

      row.innerHTML = `
        <img src="${avatarSrc}" alt="${nameDisplay}" class="chat-bubble-avatar">
        <div class="chat-bubble ${imageSrc ? 'has-image' : ''}">
          <span class="bubble-sender-name">${nameDisplay}</span>
          ${imageHtml}
          ${textHtml}
          <div class="bubble-meta">
            <time>${time} ${editedHtml}</time>
          </div>
        </div>
      `;
    }

    // Attach Long-Press action sheet to all message bubbles
    const bubbleEl = row.querySelector('.chat-bubble');
    if (bubbleEl && msgId) {
      attachLongPressListener(bubbleEl, () => {
        openMessageActionSheet(msgId);
      });
    }

    // Attach lightbox on image click
    if (imageSrc) {
      const imgEl = row.querySelector('.bubble-image');
      if (imgEl) {
        imgEl.addEventListener('click', () => {
          if (row.classList.contains('long-pressing')) return;
          openLightbox(imageSrc);
        });
      }
    }

    messagesStream.appendChild(row);
  }

  // 10. Long-Press Detection Helper
  function attachLongPressListener(element, callback) {
    let pressTimer = null;
    let startX = 0;
    let startY = 0;

    function handleStart(e) {
      if (e.type === 'mousedown' && e.button !== 0) return;

      if (e.type === 'touchstart') {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
      } else {
        startX = e.clientX;
        startY = e.clientY;
      }

      pressTimer = setTimeout(() => {
        const row = element.closest('.chat-bubble-row');
        if (row) {
          row.classList.add('highlighted');
          row.classList.add('long-pressing');
        }
        if (navigator.vibrate) {
          try { navigator.vibrate(40); } catch (err) {}
        }
        callback(e);
      }, 450);
    }

    function handleMove(e) {
      if (!pressTimer) return;
      let curX, curY;
      if (e.type === 'touchmove') {
        const touch = e.touches[0];
        curX = touch.clientX;
        curY = touch.clientY;
      } else {
        curX = e.clientX;
        curY = e.clientY;
      }

      if (Math.abs(curX - startX) > 10 || Math.abs(curY - startY) > 10) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    }

    function handleEnd() {
      if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
      setTimeout(() => {
        const row = element.closest('.chat-bubble-row');
        if (row) row.classList.remove('long-pressing');
      }, 200);
    }

    element.addEventListener('touchstart', handleStart, { passive: true });
    element.addEventListener('touchmove', handleMove, { passive: true });
    element.addEventListener('touchend', handleEnd);
    element.addEventListener('touchcancel', handleEnd);

    element.addEventListener('mousedown', handleStart);
    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseup', handleEnd);
    element.addEventListener('mouseleave', handleEnd);

    element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      callback(e);
    });
  }

  // 11. Message Action Sheet (Edit, Delete for Me, Delete for Everyone)
  function openMessageActionSheet(msgId) {
    activeActionMsgId = msgId;
    const msg = sharedMessages.find(m => m.id === msgId);
    if (!msg) return;

    if (msgActionPreviewText) {
      if (msg.text) {
        msgActionPreviewText.textContent = msg.text.length > 55 ? msg.text.substring(0, 52) + '...' : msg.text;
      } else if (msg.image) {
        msgActionPreviewText.textContent = '📷 Photo Attachment';
      } else {
        msgActionPreviewText.textContent = 'Message';
      }
    }

    // Only allow editing if current user sent this message
    if (msgActionEditBtn) {
      msgActionEditBtn.style.display = (msg.sender === currentUser) ? 'flex' : 'none';
    }

    if (msgActionBackdrop) {
      msgActionBackdrop.style.display = 'flex';
    }
  }

  function closeMessageActionSheet() {
    if (msgActionBackdrop) {
      msgActionBackdrop.style.display = 'none';
    }
    document.querySelectorAll('.chat-bubble-row.highlighted').forEach(r => r.classList.remove('highlighted'));
  }

  function deleteSelectedMessage(isForEveryone) {
    if (!activeActionMsgId) return;
    const targetId = activeActionMsgId;
    closeMessageActionSheet();

    if (isForEveryone) {
      // 1. Delete for Everyone: completely remove message
      sharedMessages = sharedMessages.filter(m => m.id !== targetId);
      saveLocalSharedMessages();
      postServerAction({ action: 'deleteForEveryone', id: targetId });
      if (syncChannel) {
        syncChannel.postMessage({ type: 'DELETE_FOR_EVERYONE', id: targetId });
      }
    } else {
      // 2. Delete for Me: hide only for current user
      const target = sharedMessages.find(m => m.id === targetId);
      if (target) {
        if (!target.deletedFor) target.deletedFor = [];
        if (!target.deletedFor.includes(currentUser)) {
          target.deletedFor.push(currentUser);
        }
        saveLocalSharedMessages();
        postServerAction({ action: 'deleteForMe', id: targetId, user: currentUser });
        if (syncChannel) {
          syncChannel.postMessage({ type: 'DELETE_FOR_ME', id: targetId, user: currentUser });
        }
      }
    }

    renderChatStream();
  }

  function openEditModal(msgId) {
    closeMessageActionSheet();
    const msg = sharedMessages.find(m => m.id === msgId);
    if (!msg || msg.sender !== currentUser) return;

    activeActionMsgId = msgId;
    if (editMsgInput) {
      editMsgInput.value = msg.text || '';
    }

    if (editMsgModalBackdrop) {
      editMsgModalBackdrop.style.display = 'flex';
      setTimeout(() => {
        if (editMsgInput) {
          editMsgInput.focus();
          editMsgInput.select();
        }
      }, 100);
    }
  }

  function closeEditModal() {
    if (editMsgModalBackdrop) {
      editMsgModalBackdrop.style.display = 'none';
    }
    if (editMsgInput) {
      editMsgInput.value = '';
    }
    document.querySelectorAll('.chat-bubble-row.highlighted').forEach(r => r.classList.remove('highlighted'));
  }

  if (msgActionCancelBtn) {
    msgActionCancelBtn.addEventListener('click', closeMessageActionSheet);
  }

  if (msgActionBackdrop) {
    msgActionBackdrop.addEventListener('click', (e) => {
      if (e.target === msgActionBackdrop) closeMessageActionSheet();
    });
  }

  if (msgActionDeleteForEveryoneBtn) {
    msgActionDeleteForEveryoneBtn.addEventListener('click', () => {
      deleteSelectedMessage(true);
    });
  }

  if (msgActionDeleteForMeBtn) {
    msgActionDeleteForMeBtn.addEventListener('click', () => {
      deleteSelectedMessage(false);
    });
  }

  if (msgActionEditBtn) {
    msgActionEditBtn.addEventListener('click', () => {
      openEditModal(activeActionMsgId);
    });
  }

  if (editMsgModalClose) {
    editMsgModalClose.addEventListener('click', closeEditModal);
  }

  if (editMsgCancelBtn) {
    editMsgCancelBtn.addEventListener('click', closeEditModal);
  }

  if (editMsgModalBackdrop) {
    editMsgModalBackdrop.addEventListener('click', (e) => {
      if (e.target === editMsgModalBackdrop) closeEditModal();
    });
  }

  if (editMsgForm) {
    editMsgForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedText = editMsgInput.value.trim();
      const targetMsg = sharedMessages.find(m => m.id === activeActionMsgId);
      if (targetMsg && targetMsg.sender === currentUser) {
        targetMsg.text = updatedText;
        targetMsg.isEdited = true;
        saveLocalSharedMessages();
        postServerAction({ action: 'edit', id: activeActionMsgId, text: updatedText });
        if (syncChannel) {
          syncChannel.postMessage({ type: 'EDIT_MESSAGE', id: activeActionMsgId, text: updatedText });
        }
        renderChatStream();
      }
      closeEditModal();
    });
  }

  // 12. Clear Chat Handler (Participant-Specific)
  function clearCurrentChat() {
    // Hide all existing messages only for current participant
    sharedMessages.forEach(m => {
      if (!m.deletedFor) m.deletedFor = [];
      if (!m.deletedFor.includes(currentUser)) {
        m.deletedFor.push(currentUser);
      }
    });

    saveLocalSharedMessages();
    clearPendingAttachment();

    // Persist participant-specific clear action to server
    postServerAction({ action: 'clear', user: currentUser });

    // Broadcast clear event to other tabs with the specific user who cleared
    if (syncChannel) {
      syncChannel.postMessage({ type: 'CLEAR_CHAT', user: currentUser });
    }

    renderChatStream();
    if (chatOptionsDropdown) chatOptionsDropdown.classList.remove('open');
    if (contactsDrawerBackdrop) contactsDrawerBackdrop.classList.remove('open');
    if (messageTextInput) messageTextInput.focus();
  }

  // 13. Auto Mark Unread Messages as Read
  function markIncomingMessagesAsRead() {
    let hasUnread = false;
    sharedMessages.forEach(m => {
      if (m.sender !== currentUser && m.status !== 'read') {
        m.status = 'read';
        hasUnread = true;
      }
    });

    if (hasUnread) {
      saveLocalSharedMessages();
      postServerAction({ action: 'markRead', reader: currentUser });
      if (syncChannel) {
        syncChannel.postMessage({ type: 'MESSAGES_READ', reader: currentUser });
      }
    }
  }

  // 14. Real-time Ticks Status Updater
  function updateMessageStatus(msgId, newStatus) {
    const msg = sharedMessages.find(m => m.id === msgId);
    if (!msg) return;

    // Do not downgrade read status
    if (msg.status === 'read' && newStatus !== 'read') return;

    msg.status = newStatus;
    saveLocalSharedMessages();

    const row = messagesStream.querySelector(`.chat-bubble-row[data-msg-id="${msgId}"]`);
    if (row) {
      const tickWrap = row.querySelector('.bubble-tick-wrap');
      if (tickWrap) {
        tickWrap.innerHTML = getTickSvgHtml(newStatus);
      }
    }
  }

  // 15. Send Message Handler
  chatMessageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = messageTextInput.value.trim();
    if (!text && !pendingImageData) return;

    const myTime = getCurrentTimeString();
    const sentImage = pendingImageData;
    const myMsgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    const initialStatus = 'sent'; // Step 1: Single Grey Tick (✓)

    const newMsg = {
      id: myMsgId,
      sender: currentUser,
      text: text,
      image: sentImage || null,
      time: myTime,
      status: initialStatus,
      deletedFor: [],
      isEdited: false,
      timestamp: Date.now()
    };

    // Add to shared list and render
    sharedMessages.push(newMsg);
    saveLocalSharedMessages();
    renderChatStream();

    // Clear inputs
    messageTextInput.value = '';
    clearPendingAttachment();
    if (emojiPickerPopover) emojiPickerPopover.classList.remove('open');

    // Broadcast typing stopped
    if (syncChannel) {
      syncChannel.postMessage({ type: 'TYPING', sender: currentUser, isTyping: false });
    }

    // Broadcast new message immediately across open tabs
    if (syncChannel) {
      syncChannel.postMessage({ type: 'NEW_MESSAGE', message: newMsg });
    }

    // Persist to server database
    postServerAction({ action: 'send', message: newMsg }).then(() => {
      // Step 2: Delivered (Double Grey Tick ✓✓) once server confirms
      setTimeout(() => {
        updateMessageStatus(myMsgId, 'delivered');
      }, 250);
    });
  });

  // 16. Real-Time Typing Notifications
  let typingTimer = null;
  if (messageTextInput) {
    messageTextInput.addEventListener('input', () => {
      if (syncChannel) {
        syncChannel.postMessage({ type: 'TYPING', sender: currentUser, isTyping: true });
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          syncChannel.postMessage({ type: 'TYPING', sender: currentUser, isTyping: false });
        }, 1200);
      }
    });
  }

  // 17. BroadcastChannel Listener (Zero-latency Cross-Tab Sync)
  if (syncChannel) {
    syncChannel.onmessage = (event) => {
      const data = event.data;
      if (!data) return;

      if (data.type === 'NEW_MESSAGE') {
        const incoming = data.message;
        if (!sharedMessages.some(m => m.id === incoming.id)) {
          sharedMessages.push(incoming);
          saveLocalSharedMessages();

          // If incoming from the other participant, mark as read
          if (incoming.sender !== currentUser) {
            incoming.status = 'read';
            saveLocalSharedMessages();
            postServerAction({ action: 'markRead', reader: currentUser });
            syncChannel.postMessage({ type: 'MESSAGES_READ', reader: currentUser });
          }
          renderChatStream();
        }
      } else if (data.type === 'MESSAGES_READ') {
        let changed = false;
        sharedMessages.forEach(m => {
          if (m.sender === currentUser && m.status !== 'read') {
            m.status = 'read';
            changed = true;
          }
        });
        if (changed) {
          saveLocalSharedMessages();
          renderChatStream();
        }
      } else if (data.type === 'EDIT_MESSAGE') {
        const target = sharedMessages.find(m => m.id === data.id);
        if (target) {
          target.text = data.text;
          target.isEdited = true;
          saveLocalSharedMessages();
          renderChatStream();
        }
      } else if (data.type === 'DELETE_FOR_EVERYONE') {
        sharedMessages = sharedMessages.filter(m => m.id !== data.id);
        saveLocalSharedMessages();
        renderChatStream();
      } else if (data.type === 'DELETE_FOR_ME') {
        const target = sharedMessages.find(m => m.id === data.id);
        if (target) {
          if (!target.deletedFor) target.deletedFor = [];
          if (!target.deletedFor.includes(data.user)) {
            target.deletedFor.push(data.user);
          }
          saveLocalSharedMessages();
          renderChatStream();
        }
      } else if (data.type === 'CLEAR_CHAT') {
        const clearedUser = data.user;
        if (clearedUser) {
          sharedMessages.forEach(m => {
            if (!m.deletedFor) m.deletedFor = [];
            if (!m.deletedFor.includes(clearedUser)) {
              m.deletedFor.push(clearedUser);
            }
          });
          saveLocalSharedMessages();
          renderChatStream();
        }
      } else if (data.type === 'TYPING') {
        if (data.sender === otherUser) {
          if (data.isTyping) {
            if (typingStatusBar && typingStatusLabel) {
              typingStatusLabel.textContent = `${getParticipantName(otherUser)} is typing...`;
              typingStatusBar.style.display = 'flex';
            }
          } else {
            if (typingStatusBar) typingStatusBar.style.display = 'none';
          }
        }
      }
    };
  }

  // 18. Periodic Server Polling Sync (1.5 seconds)
  setInterval(async () => {
    const serverMsgs = await fetchServerMessages();
    if (JSON.stringify(serverMsgs) !== JSON.stringify(sharedMessages)) {
      sharedMessages = serverMsgs;
      saveLocalSharedMessages();
      markIncomingMessagesAsRead();
      renderChatStream();
    }
  }, 1500);

  // 19. Contacts Drawer (Participant info & switcher)
  function buildContactsDrawer() {
    if (!drawerContactsList) return;
    drawerContactsList.innerHTML = '';

    const otherItem = document.createElement('div');
    otherItem.className = 'drawer-contact-item active';
    otherItem.innerHTML = `
      <img src="${getParticipantAvatar(otherUser)}" alt="${getParticipantName(otherUser)}" class="drawer-contact-avatar">
      <div class="drawer-contact-info">
        <h4 class="drawer-contact-name">${getParticipantName(otherUser)}</h4>
        <p class="drawer-contact-sub">Connected • Online</p>
      </div>
    `;
    otherItem.addEventListener('click', () => {
      contactsDrawerBackdrop.classList.remove('open');
    });
    drawerContactsList.appendChild(otherItem);

    // Identity badge showing current user
    const selfItem = document.createElement('div');
    selfItem.className = 'drawer-contact-item';
    selfItem.style.opacity = '0.75';
    selfItem.style.cursor = 'default';
    selfItem.innerHTML = `
      <img src="${getParticipantAvatar(currentUser)}" alt="You (${getParticipantName(currentUser)})" class="drawer-contact-avatar">
      <div class="drawer-contact-info">
        <h4 class="drawer-contact-name">You (${getParticipantName(currentUser)})</h4>
        <p class="drawer-contact-sub">Current Sender Identity</p>
      </div>
    `;
    drawerContactsList.appendChild(selfItem);
  }

  if (contactsToggleBtn) {
    contactsToggleBtn.addEventListener('click', () => {
      buildContactsDrawer();
      contactsDrawerBackdrop.classList.add('open');
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => {
      contactsDrawerBackdrop.classList.remove('open');
    });
  }

  if (contactsDrawerBackdrop) {
    contactsDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === contactsDrawerBackdrop) {
        contactsDrawerBackdrop.classList.remove('open');
      }
    });
  }

  if (activeContactBtn) {
    activeContactBtn.addEventListener('click', () => {
      buildContactsDrawer();
      contactsDrawerBackdrop.classList.add('open');
    });
  }

  if (switchBuddyOptionBtn) {
    switchBuddyOptionBtn.addEventListener('click', () => {
      if (chatOptionsDropdown) chatOptionsDropdown.classList.remove('open');
      buildContactsDrawer();
      contactsDrawerBackdrop.classList.add('open');
    });
  }

  // 20. Options Menu Dropdown
  if (chatMenuBtn && chatOptionsDropdown) {
    chatMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      chatOptionsDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!chatOptionsDropdown.contains(e.target) && !chatMenuBtn.contains(e.target)) {
        chatOptionsDropdown.classList.remove('open');
      }
    });
  }

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', clearCurrentChat);
  }

  if (drawerClearChatBtn) {
    drawerClearChatBtn.addEventListener('click', clearCurrentChat);
  }

  // 21. Image Compression & Attachment Helpers
  function compressImageFile(file, maxWidth = 800, maxHeight = 800, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  }

  function clearPendingAttachment() {
    pendingImageData = null;
    if (imageFileInput) imageFileInput.value = '';
    if (inputAttachmentPreview) inputAttachmentPreview.style.display = 'none';
    if (attachmentThumbImg) attachmentThumbImg.src = '';
  }

  function openLightbox(src) {
    if (imageModalTarget && imageModalBackdrop) {
      imageModalTarget.src = src;
      imageModalBackdrop.style.display = 'flex';
    }
  }

  function closeLightbox() {
    if (imageModalBackdrop) {
      imageModalBackdrop.style.display = 'none';
    }
    if (imageModalTarget) {
      imageModalTarget.src = '';
    }
  }

  if (imageModalClose) {
    imageModalClose.addEventListener('click', closeLightbox);
  }

  if (imageModalBackdrop) {
    imageModalBackdrop.addEventListener('click', (e) => {
      if (e.target === imageModalBackdrop) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Attach Image Button & File Selector
  if (attachImageBtn && imageFileInput) {
    attachImageBtn.addEventListener('click', () => {
      imageFileInput.click();
    });

    imageFileInput.addEventListener('change', () => {
      const file = imageFileInput.files && imageFileInput.files[0];
      if (!file) return;

      if (attachmentFileName) {
        attachmentFileName.textContent = file.name;
      }

      compressImageFile(file).then((compressedDataUrl) => {
        pendingImageData = compressedDataUrl;
        if (attachmentThumbImg) {
          attachmentThumbImg.src = compressedDataUrl;
        }
        if (inputAttachmentPreview) {
          inputAttachmentPreview.style.display = 'flex';
        }
        messageTextInput.focus();
      }).catch((err) => {
        console.error('Failed to compress image:', err);
      });
    });
  }

  if (attachmentRemoveBtn) {
    attachmentRemoveBtn.addEventListener('click', () => {
      clearPendingAttachment();
      messageTextInput.focus();
    });
  }

  // 22. Emoji Picker Functions
  function renderEmojis(categoryOrList) {
    if (!emojiGridContainer) return;
    emojiGridContainer.innerHTML = '';
    const list = Array.isArray(categoryOrList)
      ? categoryOrList
      : (EMOJI_CATEGORIES[categoryOrList] || EMOJI_CATEGORIES.smileys);

    list.forEach((emoji) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'emoji-btn';
      btn.textContent = emoji;
      btn.title = emoji;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        insertEmojiAtCursor(emoji);
      });
      emojiGridContainer.appendChild(btn);
    });
  }

  function insertEmojiAtCursor(emoji) {
    const start = messageTextInput.selectionStart ?? messageTextInput.value.length;
    const end = messageTextInput.selectionEnd ?? messageTextInput.value.length;
    const original = messageTextInput.value;
    messageTextInput.value = original.substring(0, start) + emoji + original.substring(end);
    const nextPos = start + emoji.length;
    messageTextInput.focus();
    messageTextInput.setSelectionRange(nextPos, nextPos);
  }

  if (emojiPickerBtn && emojiPickerPopover) {
    emojiPickerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      emojiPickerPopover.classList.toggle('open');
      if (emojiPickerPopover.classList.contains('open')) {
        renderEmojis(currentEmojiCategory);
        if (emojiSearchInput) emojiSearchInput.value = '';
      }
    });

    document.addEventListener('click', (e) => {
      if (!emojiPickerPopover.contains(e.target) && !emojiPickerBtn.contains(e.target)) {
        emojiPickerPopover.classList.remove('open');
      }
    });
  }

  if (emojiCategoryTabs) {
    emojiCategoryTabs.querySelectorAll('.emoji-tab-btn').forEach((tab) => {
      tab.addEventListener('click', () => {
        emojiCategoryTabs.querySelectorAll('.emoji-tab-btn').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-category');
        currentEmojiCategory = cat;
        renderEmojis(cat);
      });
    });
  }

  if (emojiSearchInput) {
    emojiSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        renderEmojis(currentEmojiCategory);
        return;
      }
      const all = Object.values(EMOJI_CATEGORIES).flat();
      const unique = [...new Set(all)];
      renderEmojis(unique);
    });
  }

  // 23. Initial Application Initialization
  setupChatHeader();
  sharedMessages = await fetchServerMessages();
  saveLocalSharedMessages();
  markIncomingMessagesAsRead();
  renderChatStream();

  // Establish online presence for current participant
  sendPresence('online');
  checkOtherUserPresence();

  // Periodic heartbeat and presence check (every 2s)
  setInterval(() => {
    sendPresence('online');
    checkOtherUserPresence();
  }, 2000);

  // Real-time presence listener via BroadcastChannel
  if (presenceChannel) {
    presenceChannel.onmessage = (e) => {
      if (e.data && e.data.user === otherUser) {
        updateHeaderPresence(e.data.status === 'online');
      }
    };
  }

  if (messageTextInput) {
    messageTextInput.focus();
  }

  // Re-sync on page navigation / bfcache restore
  window.addEventListener('pageshow', async () => {
    sendPresence('online');
    checkOtherUserPresence();
    sharedMessages = await fetchServerMessages();
    markIncomingMessagesAsRead();
    renderChatStream();
  });
});
