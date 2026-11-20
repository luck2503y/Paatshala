/**
 * Paatshala - Dedicated Active Chat Room Controller
 * Supports viewing messages, typing, sending, and continuous real-time conversations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Persistent Chat Storage Keys & Helpers
  const STORAGE_KEY_PREFIX = 'paatshala_chat_thread_';
  const CLEARED_KEY_PREFIX = 'paatshala_chat_cleared_';

  function saveMessages(contactId, messages) {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + contactId, JSON.stringify(messages || []));
    } catch (e) {
      console.error('Failed to save chat to localStorage:', e);
    }
  }

  function loadMessages(contactId, initialMessages) {
    try {
      const isCleared = localStorage.getItem(CLEARED_KEY_PREFIX + contactId);
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + contactId);

      // If this conversation was cleared by user, permanently keep it empty
      // unless new messages were sent after clearing
      if (isCleared === 'true') {
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed.map((m, idx) => ({
              ...m,
              id: m.id || ('msg_' + Date.now() + '_' + idx),
              status: m.sender === 'me' ? (m.status || 'read') : undefined
            }));
          }
          return [];
        }
        return [];
      }

      // If user has saved messages in localStorage, load them
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((m, idx) => ({
            ...m,
            id: m.id || ('msg_' + Date.now() + '_' + idx),
            status: m.sender === 'me' ? (m.status || 'read') : undefined
          }));
        }
        return [];
      }
    } catch (e) {
      console.error('Failed to load chat from localStorage:', e);
    }

    // First time visitor fallback
    return Array.isArray(initialMessages)
      ? initialMessages.map((m, idx) => ({
          ...m,
          id: m.id || ('init_' + idx),
          status: m.sender === 'me' ? (m.status || 'read') : undefined
        }))
      : [];
  }

  // Contacts Data & Initial Conversation Histories
  const CONTACTS = [
    {
      id: 'buddy',
      name: 'Your Buddy',
      role: '',
      avatar: 'eagle-avatar.svg',
      online: true,
      statusText: '',
      initialMessages: [
        { sender: 'them', text: 'Namaste! 🦅 Main hoon aapka Buddy! Aaj hum kaunsi educational story ya topic discuss karein?', time: '10:35 AM' },
        { sender: 'me', text: 'Hey Buddy! Main Chandrayaan-3 aur Constitution wali stories padh raha tha.', time: '10:38 AM', status: 'read' },
        { sender: 'them', text: 'Arrey wah! Dono hi stories bohot inspiring hain. Agar koi bhi question ya doubt ho, toh bejhijhak mujhse poocho! 🦅', time: '10:40 AM' }
      ]
    },
    {
      id: 'priya',
      name: 'Priya Patel',
      role: 'Study Lead',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      online: true,
      statusText: 'Online • In Study Room',
      initialMessages: [
        { sender: 'them', text: 'Namaste! Are you attending the online mathematics quiz this Saturday?', time: '09:50 AM' },
        { sender: 'me', text: 'Yes Priya, revision start kar diya hai calculus ka.', time: '10:02 AM', status: 'read' },
        { sender: 'them', text: 'Assignment submit kar diya tune?', time: '10:15 AM' }
      ]
    },
    {
      id: 'dr_verma',
      name: 'Dr. Alok Verma',
      role: 'Faculty Mentor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      online: false,
      statusText: 'Offline • Last seen 9:30 AM',
      initialMessages: [
        { sender: 'them', text: 'Please ensure all students review the Constitution Preamble chapter before Friday.', time: 'Yesterday' },
        { sender: 'me', text: 'Understood Sir, we will review the fundamental duties as well.', time: 'Yesterday', status: 'sent' },
        { sender: 'them', text: "Tomorrow's lecture is rescheduled to 11 AM in Hall 3.", time: '09:30 AM' }
      ]
    },
    {
      id: 'neha',
      name: 'Neha Singh',
      role: 'Design Club',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      online: true,
      statusText: 'Online • Active now',
      initialMessages: [
        { sender: 'them', text: 'We are designing posters for the Science Exhibition next week!', time: 'Nov 19' },
        { sender: 'them', text: 'Are you joining the hackathon team this year?', time: 'Nov 19' }
      ]
    },
    {
      id: 'campus_hub',
      name: 'Campus Coding Hub',
      role: 'Group • 32 Students',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      online: true,
      statusText: '5 members online',
      initialMessages: [
        { sender: 'them', text: 'Kavya: Shared presentation_final.pdf with the group.', time: 'Nov 18' },
        { sender: 'them', text: 'Rohan: Great work on the front-end layout everyone!', time: 'Nov 18' }
      ]
    }
  ];

  // Initialize persistent messages for each contact
  CONTACTS.forEach((c) => {
    c.messages = loadMessages(c.id, c.initialMessages);
  });

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

  // State
  let currentContact = CONTACTS[0]; // Default: Your Buddy
  let pendingImageData = null;
  let currentEmojiCategory = 'smileys';
  let activeActionMsgId = null;

  // 1. Theme Management
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

  // 2. Helper: Current Time String
  function getCurrentTimeString() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  // Helper: WhatsApp-style Delivery & Read Receipt Tick Icons
  function getTickSvgHtml(status) {
    if (status === 'sent') {
      // 1. Single Grey Tick (✓): Sent but not yet delivered
      return `
        <svg class="status-tick single-tick grey" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sent" title="Sent (Single Grey Tick)">
          <path d="M2.5 5.5L6 9L13.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
    if (status === 'delivered') {
      // 2. Double Grey Tick (✓✓): Delivered to recipient's device
      return `
        <svg class="status-tick double-tick grey" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Delivered" title="Delivered (Double Grey Tick)">
          <path d="M1.5 5.5L5 9L12.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 5.5L9.5 9L17 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
    // 3. Double Blue Tick (✓✓): Read and seen by recipient
    return `
      <svg class="status-tick double-tick blue" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Read" title="Read (Double Blue Tick)">
        <path d="M1.5 5.5L5 9L12.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 5.5L9.5 9L17 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  // Real-time Delivery & Read Receipt Status Updater
  function updateMessageStatus(msgId, newStatus) {
    let targetContact = currentContact;
    let msg = targetContact && targetContact.messages ? targetContact.messages.find(m => m.id === msgId) : null;

    // Fallback search across contacts if user switched contacts mid-flight
    if (!msg) {
      for (const c of CONTACTS) {
        const found = c.messages && c.messages.find(m => m.id === msgId);
        if (found) {
          targetContact = c;
          msg = found;
          break;
        }
      }
    }

    if (!msg) return;

    msg.status = newStatus;
    saveMessages(targetContact.id, targetContact.messages);

    // If currently visible in active chat stream, update DOM in real-time
    const row = messagesStream.querySelector(`.chat-bubble-row[data-msg-id="${msgId}"]`);
    if (row) {
      const tickWrap = row.querySelector('.bubble-tick-wrap');
      if (tickWrap) {
        tickWrap.innerHTML = getTickSvgHtml(newStatus);
      }
    }
  }

  // 3. Render Active Contact Info & Messages
  function renderActiveContact(contact) {
    currentContact = contact;

    if (activeContactAvatar) activeContactAvatar.src = contact.avatar;
    if (activeContactName) activeContactName.textContent = contact.name;
    if (activeContactRole) activeContactRole.textContent = contact.role || '';
    if (activeStatusText) {
      activeStatusText.textContent = contact.statusText || '';
      activeStatusText.style.display = contact.statusText ? 'block' : 'none';
    }
    if (activeOnlineDot) {
      activeOnlineDot.className = `active-online-dot ${contact.online ? '' : 'offline'}`;
    }

    // Render Messages Stream
    messagesStream.innerHTML = '';
    
    if (!contact.messages || contact.messages.length === 0) {
      if (emptyChatState) emptyChatState.style.display = 'flex';
      if (chatDatePill) chatDatePill.style.display = 'none';
    } else {
      if (emptyChatState) emptyChatState.style.display = 'none';
      if (chatDatePill) chatDatePill.style.display = 'flex';
      contact.messages.forEach((msg) => {
        appendBubbleToUI(msg.text, msg.sender === 'me', msg.time, msg.image, msg.id, msg.isEdited, msg.status);
      });
    }

    scrollChatToBottom();
  }

  // 4. Clear Current Chat
  function clearCurrentChat() {
    if (currentContact) {
      currentContact.messages = [];
      saveMessages(currentContact.id, []);
      try {
        localStorage.setItem(CLEARED_KEY_PREFIX + currentContact.id, 'true');
        localStorage.setItem(STORAGE_KEY_PREFIX + currentContact.id, JSON.stringify([]));
      } catch (e) {
        console.error('Error saving cleared state:', e);
      }
    }
    clearPendingAttachment();
    messagesStream.innerHTML = '';
    if (emptyChatState) emptyChatState.style.display = 'flex';
    if (chatDatePill) chatDatePill.style.display = 'none';
    if (chatOptionsDropdown) chatOptionsDropdown.classList.remove('open');
    if (contactsDrawerBackdrop) contactsDrawerBackdrop.classList.remove('open');
    if (messageTextInput) messageTextInput.focus();
  }

  // 4. Append Message Bubble to UI
  function appendBubbleToUI(text, isOutgoing, timeStr, imageSrc, msgId, isEdited, status) {
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
      const tickHtml = getTickSvgHtml(status || 'read');
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

      // Attach Long-Press action sheet to outgoing message sent by me
      const bubbleEl = row.querySelector('.chat-bubble');
      if (bubbleEl && msgId) {
        attachLongPressListener(bubbleEl, () => {
          openMessageActionSheet(msgId);
        });
      }
    } else {
      row.innerHTML = `
        <img src="${currentContact.avatar}" alt="${currentContact.name}" class="chat-bubble-avatar">
        <div class="chat-bubble ${imageSrc ? 'has-image' : ''}">
          ${imageHtml}
          ${textHtml}
          <div class="bubble-meta">
            <time>${time} ${editedHtml}</time>
          </div>
        </div>
      `;
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
    scrollChatToBottom();
  }

  // 5. Long-Press Detection Helper
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
      }, 500);
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

  // 6. Message Action Sheet & Edit Modal Handlers
  function openMessageActionSheet(msgId) {
    activeActionMsgId = msgId;
    const msg = currentContact.messages.find(m => m.id === msgId);
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

    currentContact.messages = currentContact.messages.filter(m => m.id !== activeActionMsgId);
    saveMessages(currentContact.id, currentContact.messages);

    closeMessageActionSheet();
    renderActiveContact(currentContact);
  }

  function openEditModal(msgId) {
    closeMessageActionSheet();
    const msg = currentContact.messages.find(m => m.id === msgId);
    if (!msg) return;

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
      const targetMsg = currentContact.messages.find(m => m.id === activeActionMsgId);
      if (targetMsg) {
        targetMsg.text = updatedText;
        targetMsg.isEdited = true;
        saveMessages(currentContact.id, currentContact.messages);
        renderActiveContact(currentContact);
      }
      closeEditModal();
    });
  }

  function scrollChatToBottom() {
    chatThreadContainer.scrollTop = chatThreadContainer.scrollHeight;
  }

  function escapeHTML(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }

  // 5. Build Switch Contacts Drawer
  function buildContactsDrawer() {
    drawerContactsList.innerHTML = '';
    CONTACTS.forEach((c) => {
      const item = document.createElement('div');
      item.className = `drawer-contact-item ${c.id === currentContact.id ? 'active' : ''}`;
      item.innerHTML = `
        <img src="${c.avatar}" alt="${c.name}" class="drawer-contact-avatar">
        <div class="drawer-contact-info">
          <h4 class="drawer-contact-name">${c.name}</h4>
          <p class="drawer-contact-sub">${c.role} • ${c.statusText}</p>
        </div>
      `;
      item.addEventListener('click', () => {
        renderActiveContact(c);
        contactsDrawerBackdrop.classList.remove('open');
      });
      drawerContactsList.appendChild(item);
    });
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

  // 6. Options Menu (Clear Chat, Switch Friends, etc.)
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
    clearChatBtn.addEventListener('click', () => {
      clearCurrentChat();
    });
  }

  if (drawerClearChatBtn) {
    drawerClearChatBtn.addEventListener('click', () => {
      clearCurrentChat();
    });
  }

  if (switchBuddyOptionBtn) {
    switchBuddyOptionBtn.addEventListener('click', () => {
      if (chatOptionsDropdown) chatOptionsDropdown.classList.remove('open');
      buildContactsDrawer();
      contactsDrawerBackdrop.classList.add('open');
    });
  }

  if (activeContactBtn) {
    activeContactBtn.addEventListener('click', () => {
      buildContactsDrawer();
      contactsDrawerBackdrop.classList.add('open');
    });
  }

  // 7. Image Compression & Attachment Helpers
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

  // 8. Emoji Picker Functions
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

  // 9. Dynamic Simulated Contact Response
  function getContactReply(userMessage, hasImage) {
    if (hasImage) {
      const imageReplies = [
        'Arrey wah! Yeh photo bohot badhiya hai! 🦅 Kya aap iske baare me kuch aur discuss karna chahte hain?',
        'Maine yeh image achhe se dekh li hai! 🦅 Bahut informative lag rahi hai. Shaabash!',
        'Nice picture! 🦅 Agar is topic ya photo se related koi doubt ho, toh bejhijhak poochiye!'
      ];
      return imageReplies[Math.floor(Math.random() * imageReplies.length)];
    }

    const q = (userMessage || '').toLowerCase();

    if (q.includes('notes') || q.includes('physics') || q.includes('padhai') || q.includes('exam')) {
      return 'Haan bilkul! Maine formulas and derivations ka summary note bana rakha hai. 🦅 Main abhi share karta hoon!';
    } else if (q.includes('chandrayaan') || q.includes('isro') || q.includes('space') || q.includes('moon')) {
      return 'Sahi me! South pole par lander landing wala moment sach me historic tha. ISRO scientists are truly inspiring! 🚀✨';
    } else if (q.includes('constitution') || q.includes('samvidhan') || q.includes('democracy')) {
      return 'Bilkul! Preamble, Fundamental Rights aur Article 21A hamare civic syllabus ka sabse important part hai. 📜🇮🇳';
    } else if (q.includes('assignment') || q.includes('submit') || q.includes('project')) {
      return 'Assignment complete ho gaya kya? Agar koi doubt ho toh mujhse pooch lo, saath milkar solve karenge! 🦅';
    } else if (q.includes('library') || q.includes('sham') || q.includes('milte')) {
      return 'Pakka! Library me milkar revision karenge aur Paatshala ki nayi stories padhenge. 📖';
    } else if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('kya hal')) {
      return `Hey! Main bilkul theek hoon! 🦅 Aaj Paatshala me kya naya padha tune?`;
    } else {
      const genericReplies = [
        `Got it! Main aapki help ke liye hamesha ready hoon. 🦅 Aur batao?`,
        `Bilkul sahi kaha! Let's explore this topic together in our study session. ✨`,
        `Nice question! Maine isko apni notes list me add kar liya hai. 💡`,
        `Haan exactly! Hum dono milkar isko achhe se revise kar lenge. 🦅`
      ];
      return genericReplies[Math.floor(Math.random() * genericReplies.length)];
    }
  }

  // 10. Send Message Handler
  chatMessageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = messageTextInput.value.trim();
    if (!text && !pendingImageData) return;

    // Reset empty chat state if present
    if (emptyChatState) emptyChatState.style.display = 'none';
    if (chatDatePill) chatDatePill.style.display = 'flex';

    const myTime = getCurrentTimeString();
    const sentImage = pendingImageData;

    // 1. Initial Status: 'sent' (Single Grey Tick ✓)
    const myMsgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    const initialStatus = 'sent';

    appendBubbleToUI(text, true, myTime, sentImage, myMsgId, false, initialStatus);
    currentContact.messages.push({
      id: myMsgId,
      sender: 'me',
      text: text,
      image: sentImage || null,
      time: myTime,
      isEdited: false,
      status: initialStatus
    });
    saveMessages(currentContact.id, currentContact.messages);

    // 2. Clear Input & Attachment
    messageTextInput.value = '';
    clearPendingAttachment();
    if (emojiPickerPopover) emojiPickerPopover.classList.remove('open');

    // 3. Real-Time Delivery & Read Receipts Flow
    if (currentContact.online) {
      // Step 1: Delivered (Double Grey Tick ✓✓) after 500ms
      setTimeout(() => {
        updateMessageStatus(myMsgId, 'delivered');
      }, 500);

      // Step 2: Read / Seen (Double Blue Tick ✓✓) after 1200ms
      setTimeout(() => {
        updateMessageStatus(myMsgId, 'read');
      }, 1200);

      // Step 3: Receiver starts typing after reading
      setTimeout(() => {
        if (typingStatusLabel && typingStatusBar) {
          typingStatusLabel.textContent = `${currentContact.name} is typing...`;
          typingStatusBar.style.display = 'flex';
        }
      }, 1500);

      // Step 4: Contact's reply arrives after reading and typing
      setTimeout(() => {
        if (typingStatusBar) typingStatusBar.style.display = 'none';
        const reply = getContactReply(text, !!sentImage);
        const replyTime = getCurrentTimeString();
        const replyMsgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        appendBubbleToUI(reply, false, replyTime, null, replyMsgId, false);
        currentContact.messages.push({
          id: replyMsgId,
          sender: 'them',
          text: reply,
          time: replyTime,
          isEdited: false
        });
        saveMessages(currentContact.id, currentContact.messages);
      }, 2600 + Math.random() * 400);
    } else {
      // Receiver is offline (e.g. Dr. Verma):
      // Message remains as 'sent' (Single Grey Tick ✓) and stored permanently as 'sent'.
      // No delivered or read receipt until recipient comes online!
    }
  });

  // Initial Load
  renderActiveContact(currentContact);
  messageTextInput.focus();

  // Re-sync on page navigation / bfcache restore
  window.addEventListener('pageshow', () => {
    if (currentContact) {
      currentContact.messages = loadMessages(currentContact.id, currentContact.initialMessages);
      renderActiveContact(currentContact);
    }
  });
});
